import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.resolve(DATA_DIR, 'local_db.json');

export class DatabaseManager {
  private dataDir: string;
  private dbFile: string;

  constructor() {
    this.dataDir = DATA_DIR;
    this.dbFile = DB_FILE;
    this.ensureInitialized();
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

  public readRaw(): Record<string, any[]> {
    try {
      const content = fs.readFileSync(this.dbFile, 'utf-8');
      return JSON.parse(content);
    } catch (err) {
      console.error('Error reading local_db.json:', err);
      return {};
    }
  }

  public saveRaw(data: Record<string, any[]>): void {
    try {
      fs.writeFileSync(this.dbFile, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving local_db.json:', err);
    }
  }

  public getCollection(collectionName: string): any[] {
    const data = this.readRaw();
    return data[collectionName] || [];
  }

  public insert(collectionName: string, item: Record<string, any>): any {
    const data = this.readRaw();
    if (!item.id) {
      const prefix = collectionName.substring(0, 3);
      item.id = `${prefix}_${crypto.randomBytes(4).toString('hex')}`;
    }
    if (!item.created_at) {
      item.created_at = new Date().toISOString();
    }

    if (!data[collectionName]) {
      data[collectionName] = [];
    }
    data[collectionName].push(item);
    this.saveRaw(data);
    return item;
  }

  public update(collectionName: string, itemId: string, updates: Record<string, any>): any | null {
    const data = this.readRaw();
    const items = data[collectionName] || [];
    const index = items.findIndex((i: any) => i.id === itemId);

    if (index !== -1) {
      const updatedItem = {
        ...items[index],
        ...updates,
        updated_at: new Date().toISOString()
      };
      items[index] = updatedItem;
      data[collectionName] = items;
      this.saveRaw(data);
      return updatedItem;
    }
    return null;
  }

  public delete(collectionName: string, itemId: string): boolean {
    const data = this.readRaw();
    const items = data[collectionName] || [];
    const initialLen = items.length;
    const filtered = items.filter((i: any) => i.id !== itemId);

    if (filtered.length < initialLen) {
      data[collectionName] = filtered;
      this.saveRaw(data);
      return true;
    }
    return false;
  }
}

export const db = new DatabaseManager();
