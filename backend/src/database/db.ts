import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import pg from 'pg';
import { config } from '../config/env.js';

const { Pool } = pg;

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.resolve(DATA_DIR, 'local_db.json');

export class DatabaseManager {
  private dataDir: string;
  private dbFile: string;
  private cache: Record<string, any[]> = {};
  private pool: pg.Pool | null = null;
  private isPostgresActive: boolean = false;

  constructor() {
    this.dataDir = DATA_DIR;
    this.dbFile = DB_FILE;
    this.ensureInitialized();
    this.cache = this.readFromDisk();
    this.sanitizeFarmlandsInDb();
  }

  private ensureInitialized() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
    if (!fs.existsSync(this.dbFile)) {
      fs.writeFileSync(this.dbFile, JSON.stringify({
        users: [],
        inventory: [],
        harvests: [],
        diagnoses: [],
        partners: [],
        offers: [],
        shop_products: [],
        saprotan_orders: [],
        market_listings: [],
        community_posts: [],
        farm_plans: [],
        ecosystem_services: [],
        farmlands: [],
        service_orders: [],
        notifications: [],
        order_messages: [],
        product_discussions: []
      }, null, 2), 'utf-8');
    }
  }

  private readFromDisk(): Record<string, any[]> {
    try {
      const content = fs.readFileSync(this.dbFile, 'utf-8');
      return JSON.parse(content);
    } catch (err) {
      console.error('Error reading local_db.json:', err);
      return {};
    }
  }

  private saveToDisk(data: Record<string, any[]>): void {
    try {
      fs.writeFileSync(this.dbFile, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving local_db.json:', err);
    }
  }

  /**
   * Menginisialisasi koneksi PostgreSQL jika DATABASE_URL tersedia.
   * Membuat tabel agribuddy_records dan secara otomatis melakukan seed data dari local_db.json
   * bila database masih kosong, sehingga data akun dan usahatani langsung tersedia di server cloud.
   */
  public async initPostgres(): Promise<void> {
    const dbUrl = config.databaseUrl;
    if (!dbUrl) {
      console.log('ℹ️ DATABASE_URL belum diatur. Menggunakan database file lokal (data/local_db.json).');
      return;
    }

    try {
      console.log('🔌 Menghubungkan ke database PostgreSQL...');
      this.pool = new Pool({
        connectionString: dbUrl,
        ssl: dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1') ? false : { rejectUnauthorized: false }
      });

      const client = await this.pool.connect();
      console.log('✅ Berhasil terhubung ke PostgreSQL!');

      // Buat tabel penyimpanan permanen jika belum ada
      await client.query(`
        CREATE TABLE IF NOT EXISTS agribuddy_records (
          collection VARCHAR(64) NOT NULL,
          id VARCHAR(128) NOT NULL,
          data JSONB NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (collection, id)
        );
        CREATE INDEX IF NOT EXISTS idx_agribuddy_collection ON agribuddy_records(collection);
      `);

      // Cek apakah sudah ada data di PostgreSQL
      const countRes = await client.query('SELECT COUNT(*) FROM agribuddy_records');
      const count = parseInt(countRes.rows[0].count, 10);

      if (count === 0) {
        console.log('🌱 Database PostgreSQL masih kosong. Melakukan seeding data awal dari local_db.json...');
        const diskData = this.readFromDisk();
        let insertedCount = 0;

        for (const [colName, items] of Object.entries(diskData)) {
          if (Array.isArray(items)) {
            for (const item of items) {
              if (item && item.id) {
                await client.query(
                  `INSERT INTO agribuddy_records (collection, id, data) 
                   VALUES ($1, $2, $3)
                   ON CONFLICT (collection, id) DO UPDATE SET data = $3, updated_at = CURRENT_TIMESTAMP`,
                  [colName, item.id, JSON.stringify(item)]
                );
                insertedCount++;
              }
            }
          }
        }
        console.log(`🎉 Berhasil men-seed ${insertedCount} record akun, sawah, dan inventaris ke PostgreSQL!`);
      } else {
        console.log(`📦 Memuat ${count} record dari PostgreSQL ke server cache...`);
        const rowsRes = await client.query('SELECT collection, id, data FROM agribuddy_records');
        const loaded: Record<string, any[]> = {};
        for (const row of rowsRes.rows) {
          if (!loaded[row.collection]) loaded[row.collection] = [];
          loaded[row.collection].push(row.data);
        }
        this.cache = loaded;
        this.saveToDisk(this.cache); // Sinkronkan ke disk lokal
        console.log('✅ Sinkronisasi PostgreSQL ke cache selesai.');
      }

      client.release();
      this.isPostgresActive = true;
      this.sanitizeFarmlandsInDb();
    } catch (err: any) {
      console.error('⚠️ Gagal inisialisasi PostgreSQL:', err.message || err);
      console.log('🔄 Beroperasi menggunakan file lokal local_db.json.');
    }
  }

  private sanitizeFarmlandsInDb(): void {
    const farmlands = this.cache['farmlands'] || [];
    let updatedCount = 0;
    const isJoko = (uid: string) => uid === 'usr_petani' || uid === 'usr_001' || uid === 'pak_joko';

    for (const farm of farmlands) {
      if (!farm || !farm.collaborators || !Array.isArray(farm.collaborators)) continue;
      const farmUserId = farm.user_id;
      const ownerName = (farm.owner_name || (isJoko(farmUserId) ? 'Pak Joko' : '')).toLowerCase().trim();

      const filtered = farm.collaborators.filter((c: any) => {
        if (!c) return false;
        if (c.user_id && farmUserId && c.user_id === farmUserId) return false;
        if (c.user_id && farmUserId && isJoko(c.user_id) && isJoko(farmUserId)) return false;
        const cName = (c.name || '').toLowerCase().trim();
        if (cName && (cName === ownerName || (isJoko(farmUserId) && cName.includes('joko')))) return false;
        const cRole = (c.role || '').toLowerCase();
        if (cRole.includes('pemilik')) return false;
        return true;
      });

      if (filtered.length !== farm.collaborators.length) {
        farm.collaborators = filtered;
        updatedCount++;
        if (this.isPostgresActive && this.pool) {
          this.pool.query(
            `UPDATE agribuddy_records SET data = $1, updated_at = CURRENT_TIMESTAMP WHERE collection = 'farmlands' AND id = $2`,
            [JSON.stringify(farm), farm.id]
          ).catch(e => console.error(`Error updating farm ${farm.id} in PG:`, e));
        }
      }
    }

    if (updatedCount > 0) {
      this.saveToDisk(this.cache);
      console.log(`🧹 Sanitasi otomatis database: ${updatedCount} lahan berhasil dibersihkan dari duplikasi pemilik di kolaborator.`);
    }
  }

  public readRaw(): Record<string, any[]> {
    return this.cache;
  }

  public saveRaw(data: Record<string, any[]>): void {
    this.cache = data;
    this.saveToDisk(data);
  }

  public getCollection(collectionName: string): any[] {
    return this.cache[collectionName] || [];
  }

  public insert(collectionName: string, item: Record<string, any>): any {
    if (!item.id) {
      const prefix = collectionName.substring(0, 3);
      item.id = `${prefix}_${crypto.randomBytes(4).toString('hex')}`;
    }
    if (!item.created_at) {
      item.created_at = new Date().toISOString();
    }

    if (!this.cache[collectionName]) {
      this.cache[collectionName] = [];
    }
    this.cache[collectionName].push(item);
    this.saveToDisk(this.cache);

    // Persistensi asinkron ke PostgreSQL jika aktif
    if (this.isPostgresActive && this.pool) {
      this.pool.query(
        `INSERT INTO agribuddy_records (collection, id, data) 
         VALUES ($1, $2, $3)
         ON CONFLICT (collection, id) DO UPDATE SET data = $3, updated_at = CURRENT_TIMESTAMP`,
        [collectionName, item.id, JSON.stringify(item)]
      ).catch(err => {
        console.error(`Gagal menyimpan ke PostgreSQL [${collectionName}]:`, err.message);
      });
    }

    return item;
  }

  public update(collectionName: string, itemId: string, updates: Record<string, any>): any | null {
    const items = this.cache[collectionName] || [];
    const index = items.findIndex((i: any) => i.id === itemId);

    if (index !== -1) {
      const updatedItem = {
        ...items[index],
        ...updates,
        updated_at: new Date().toISOString()
      };
      items[index] = updatedItem;
      this.cache[collectionName] = items;
      this.saveToDisk(this.cache);

      // Persistensi asinkron ke PostgreSQL jika aktif
      if (this.isPostgresActive && this.pool) {
        this.pool.query(
          `INSERT INTO agribuddy_records (collection, id, data) 
           VALUES ($1, $2, $3)
           ON CONFLICT (collection, id) DO UPDATE SET data = $3, updated_at = CURRENT_TIMESTAMP`,
          [collectionName, itemId, JSON.stringify(updatedItem)]
        ).catch(err => {
          console.error(`Gagal update ke PostgreSQL [${collectionName}/${itemId}]:`, err.message);
        });
      }

      return updatedItem;
    }
    return null;
  }

  public delete(collectionName: string, itemId: string): boolean {
    const items = this.cache[collectionName] || [];
    const initialLen = items.length;
    const filtered = items.filter((i: any) => i.id !== itemId);

    if (filtered.length < initialLen) {
      this.cache[collectionName] = filtered;
      this.saveToDisk(this.cache);

      // Hapus dari PostgreSQL jika aktif
      if (this.isPostgresActive && this.pool) {
        this.pool.query(
          `DELETE FROM agribuddy_records WHERE collection = $1 AND id = $2`,
          [collectionName, itemId]
        ).catch(err => {
          console.error(`Gagal delete di PostgreSQL [${collectionName}/${itemId}]:`, err.message);
        });
      }

      return true;
    }
    return false;
  }
}

export const db = new DatabaseManager();
