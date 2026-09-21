<template>
  <div class="p-4 space-y-4 pb-28">
    <!-- Header Modul Ekosistem Sosial -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
          <Users class="text-emerald-600" :size="24" /> Ekosistem Sosial Tani
        </h2>
        <p class="text-xs text-slate-500 mt-0.5">Komunitas, Kios Saprotan, & Bursa Pasar Panen</p>
      </div>

      <span class="text-xs font-extrabold px-3 py-1 rounded-full border bg-emerald-100 text-emerald-800 border-emerald-300">
        {{ currentPersona.badge }}
      </span>
    </div>


    <!-- 3 SUB-TAB UTAMA EKOSISTEM -->
    <div class="grid grid-cols-3 bg-slate-200/80 p-1 rounded-2xl gap-1">
      <button
        @click="activeTab = 'komunitas'"
        class="py-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1"
        :class="activeTab === 'komunitas' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'"
      >
        <MessageSquare :size="14" /> Komunitas
      </button>

      <button
        @click="activeTab = 'kios'"
        class="py-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1"
        :class="activeTab === 'kios' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'"
      >
        <ShoppingBag :size="14" /> Kios Pupuk
      </button>

      <button
        @click="activeTab = 'bursa'"
        class="py-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1"
        :class="activeTab === 'bursa' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'"
      >
        <TrendingUp :size="14" /> Bursa Pasar
      </button>
    </div>

    <!-- ================================================================= -->
    <!-- 1. TAB KOMUNITAS & FEED SOSIAL                                    -->
    <!-- ================================================================= -->
    <div v-if="activeTab === 'komunitas'" class="space-y-4">
      <!-- Input Buat Postingan Baru -->
      <div class="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-3">
        <div class="flex items-center gap-2">
          <span class="text-2xl">{{ currentPersona.avatar }}</span>
          <input
            v-model="newPost.title"
            type="text"
            placeholder="Judul topik diskusi / info tani..."
            class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
          />
        </div>
        <textarea
          v-model="newPost.content"
          rows="2"
          placeholder="Bagikan kabar lahan, kendala hama, atau jadwal kegiatan kelompok tani..."
          class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-500"
        ></textarea>

        <div class="flex items-center justify-between pt-1">
          <select
            v-model="newPost.category"
            class="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 bg-slate-50 focus:outline-none"
          >
            <option value="TANYA_HAMA">🔍 Hama & Penyakit</option>
            <option value="INFO_POKTAN">📢 Info Poktan</option>
            <option value="TIPS_TANI">🌾 Tips Budidaya</option>
            <option value="BERITA_HARGA">💰 Info Pasar</option>
          </select>

          <button
            @click="submitPost"
            class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Send :size="13" /> Bagikan
          </button>
        </div>
      </div>

      <!-- Feed Daftar Postingan -->
      <div class="space-y-3">
        <div
          v-for="post in posts"
          :key="post.id"
          class="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-3"
        >
          <!-- Info Penulis -->
          <div class="flex items-start justify-between">
            <div @click="openProfileModal(post.author_name)" class="flex items-center gap-2.5 cursor-pointer group">
              <div class="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center text-lg border border-emerald-100 group-hover:scale-105 group-hover:border-emerald-400 transition-all shadow-sm">
                {{ getAvatarByRole(post.author_role) }}
              </div>
              <div>
                <div class="text-xs font-extrabold text-slate-800 group-hover:text-emerald-700 group-hover:underline flex items-center gap-1 transition-all">
                  {{ post.author_name }}
                  <span class="text-[9px] bg-slate-100 text-slate-500 px-1 rounded">Lihat Profil</span>
                </div>
                <div class="flex items-center gap-1.5 mt-0.5">
                  <span class="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                    {{ post.author_role_label }}
                  </span>
                  <span class="text-[10px] text-slate-400">• {{ post.created_at }}</span>
                </div>
              </div>
            </div>

            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {{ post.category_label }}
            </span>
          </div>

          <!-- Konten Post -->
          <div>
            <h4 class="text-sm font-extrabold text-slate-800">{{ post.title }}</h4>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">{{ post.content }}</p>
          </div>

          <!-- Bar Interaksi (Like & Komentar) -->
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <button
              @click="likePost(post.id)"
              class="flex items-center gap-1.5 hover:text-rose-600 active:scale-110 transition-all font-bold"
            >
              <Heart :size="15" class="text-rose-500 fill-rose-500" />
              <span>{{ post.likes_count }} Suka</span>
            </button>

            <span class="flex items-center gap-1">
              <MessageCircle :size="15" /> {{ post.comments.length }} Komentar
            </span>
          </div>

          <!-- Kolom Komentar yang Sudah Ada -->
          <div v-if="post.comments.length > 0" class="space-y-1.5 bg-slate-50 p-2.5 rounded-2xl">
            <div
              v-for="comm in post.comments"
              :key="comm.id"
              class="text-xs leading-relaxed flex items-start gap-1"
            >
              <span
                @click="openProfileModal(comm.author_name)"
                class="font-bold text-slate-800 hover:text-emerald-700 cursor-pointer hover:underline shrink-0"
              >
                {{ comm.author_name }}:
              </span>
              <span class="text-slate-600">{{ comm.comment }}</span>
            </div>
          </div>

          <!-- Input Tambah Komentar Cepat -->
          <div class="flex gap-2">
            <input
              v-model="commentInputs[post.id]"
              type="text"
              placeholder="Tulis balasan saran/tanggapan..."
              class="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-500"
              @keyup.enter="submitComment(post.id)"
            />
            <button
              @click="submitComment(post.id)"
              class="bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ================================================================= -->
    <!-- 2. TAB KIOS SAPROTAN (PEMESANAN PUPUK & BENIH IN-APP)             -->
    <!-- ================================================================= -->
    <div v-else-if="activeTab === 'kios'" class="space-y-4">
      <!-- Banner Integrasi Otomatis -->
      <div class="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-4 rounded-3xl shadow-sm">
        <div class="flex items-center gap-2 text-xs font-bold text-emerald-200 mb-1">
          <Sparkles :size="14" /> Integrasi Otomatis ke Buku Tani
        </div>
        <h3 class="text-sm font-extrabold">Katalog Kios Saprotan Resmi</h3>
        <p class="text-[11px] text-emerald-100 mt-0.5 leading-relaxed">
          Pesan pupuk atau benih langsung dari distributor. Begitu pesanan selesai, stok akan <strong>otomatis bertambah ke modul Buku Tani Anda!</strong>
        </p>
      </div>

      <!-- Sub Toggle: Katalog Produk vs Riwayat Pesanan -->
      <div class="flex gap-2">
        <button
          @click="kiosSubTab = 'katalog'"
          class="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
          :class="kiosSubTab === 'katalog' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-slate-100 text-slate-600'"
        >
          Katalog Produk
        </button>
        <button
          @click="kiosSubTab = 'pesanan'"
          class="px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5"
          :class="kiosSubTab === 'pesanan' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-slate-100 text-slate-600'"
        >
          Riwayat Pesanan In-App
          <span v-if="orders.length > 0" class="bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded-full text-[10px] font-black">
            {{ orders.length }}
          </span>
        </button>
      </div>

      <!-- KATALOG PRODUK -->
      <div v-if="kiosSubTab === 'katalog'" class="space-y-3">
        <div
          v-for="prod in products"
          :key="prod.id"
          class="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-3"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl border border-emerald-100">
                {{ prod.image_emoji }}
              </div>
              <div>
                <div class="flex items-center gap-1.5">
                  <span
                    class="text-[10px] font-extrabold px-2 py-0.2 rounded-full uppercase"
                    :class="prod.is_subsidi ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'"
                  >
                    {{ prod.is_subsidi ? 'Subsidi Pemerintah' : prod.category }}
                  </span>
                  <span class="text-[10px] text-slate-400 font-medium">Stok: {{ prod.stock_available }}</span>
                </div>
                <h4 class="font-extrabold text-sm text-slate-800 mt-1">{{ prod.name }}</h4>
                <p class="text-[11px] text-slate-500">{{ prod.seller_name }}</p>
              </div>
            </div>

            <div class="text-right">
              <div class="text-sm font-black text-emerald-700">
                Rp {{ prod.price.toLocaleString() }}
              </div>
              <span class="text-[10px] text-slate-400">/ {{ prod.unit }}</span>
            </div>
          </div>

          <p class="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-2xl">
            {{ prod.description }}
          </p>

          <button
            @click="openOrderModal(prod)"
            class="w-full btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-2.5 rounded-xl shadow-sm"
          >
            <ShoppingBag :size="15" /> Pesan Sekarang (In-App)
          </button>
        </div>
      </div>

      <!-- DAFTAR PESANAN IN-APP -->
      <div v-else class="space-y-3">
        <div v-if="orders.length === 0" class="text-center py-8 text-slate-400 bg-white rounded-3xl border border-slate-200 p-6">
          <Package :size="32" class="mx-auto mb-2 text-slate-300" />
          <p class="text-xs font-bold text-slate-600">Belum Ada Pesanan</p>
        </div>

        <div
          v-for="order in orders"
          :key="order.id"
          class="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-3"
        >
          <div class="flex items-start justify-between">
            <div>
              <span
                class="text-[10px] font-black px-2.5 py-0.5 rounded-full"
                :class="{
                  'bg-amber-100 text-amber-800': order.status === 'DIPESAN',
                  'bg-sky-100 text-sky-800': order.status === 'DIKONFIRMASI',
                  'bg-emerald-100 text-emerald-800': order.status === 'SELESAI'
                }"
              >
                {{ order.status }}
              </span>
              <h4 class="font-extrabold text-sm text-slate-800 mt-1">{{ order.product_name }}</h4>
              <p class="text-xs text-slate-500">
                {{ order.quantity }} {{ order.unit }} • Pembeli: <strong>{{ order.buyer_name }}</strong>
              </p>
            </div>

            <div class="text-right">
              <div class="text-sm font-black text-slate-800">
                Rp {{ order.total_price.toLocaleString() }}
              </div>
              <span class="text-[10px] text-slate-500">{{ order.payment_method }}</span>
            </div>
          </div>

          <div class="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-xl flex items-center justify-between">
            <span>Catatan: {{ order.delivery_note }}</span>
            <span>{{ order.created_at }}</span>
          </div>

          <!-- Aksi Perubahan Status Pesanan -->
          <div class="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
            <!-- Jika Distributor: Konfirmasi Pesanan -->
            <button
              v-if="order.status === 'DIPESAN' && activeRole === 'DISTRIBUTOR'"
              @click="changeOrderStatus(order.id, 'DIKONFIRMASI')"
              class="text-xs font-bold px-3 py-1.5 rounded-xl bg-sky-600 text-white hover:bg-sky-700 transition-all"
            >
              ✓ Konfirmasi Pesanan
            </button>

            <!-- Jika Petani atau Distributor: Selesaikan Pesanan (Auto Sync ke Buku Tani!) -->
            <button
              v-if="order.status !== 'SELESAI'"
              @click="changeOrderStatus(order.id, 'SELESAI')"
              class="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-all flex items-center gap-1.5"
            >
              <Check :size="14" /> Konfirmasi Terima Barang (Masuk Buku Tani)
            </button>

            <span v-else class="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 :size="14" /> Selesai & Tersinkron ke Buku Tani
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- ================================================================= -->
    <!-- 3. TAB BURSA PASAR (LELANG & JUAL PANEN LUMBUNG)                  -->
    <!-- ================================================================= -->
    <div v-else class="space-y-4">
      <!-- Banner Jual Panen -->
      <div class="bg-gradient-to-r from-amber-600 to-amber-800 text-white p-4 rounded-3xl shadow-sm flex items-center justify-between">
        <div>
          <h3 class="text-sm font-extrabold">Bursa Lelang Komoditas Panen</h3>
          <p class="text-[11px] text-amber-100 mt-0.5">
            Petani listing panen langsung dari lumbung, agen/penggilingan menawar secara transparan.
          </p>
        </div>
        <button
          @click="showCreateListingModal = true"
          class="bg-white text-amber-900 font-extrabold text-xs px-3 py-2 rounded-2xl shadow active:scale-95 transition-all shrink-0 flex items-center gap-1"
        >
          <Plus :size="14" /> Jual Panen
        </button>
      </div>

      <!-- Daftar Listing Komoditas yang Dibuka -->
      <div class="space-y-4">
        <div
          v-for="item in listings"
          :key="item.id"
          class="bg-white border rounded-3xl p-4 shadow-sm space-y-3"
          :class="item.status === 'TERJUAL' ? 'border-slate-200 bg-slate-50/50' : 'border-amber-300'"
        >
          <!-- Header Listing -->
          <div class="flex items-start justify-between">
            <div>
              <span
                class="text-[10px] font-black px-2.5 py-0.5 rounded-full"
                :class="item.status === 'DIBUKA' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'"
              >
                {{ item.status === 'DIBUKA' ? '🟢 Bursa Terbuka' : '✓ Telah Terjual' }}
              </span>
              <h4 class="font-extrabold text-base text-slate-800 mt-1">{{ item.commodity }}</h4>
              <p class="text-xs text-slate-500">Penjual: <strong>{{ item.seller_name }}</strong> • {{ item.location }}</p>
            </div>

            <div class="text-right">
              <div class="text-lg font-black text-amber-800">{{ item.total_weight_kg.toLocaleString() }} Kg</div>
              <span class="text-[10px] text-slate-500">Mulai: Rp {{ item.starting_price_per_kg.toLocaleString() }}/kg</span>
            </div>
          </div>

          <p v-if="item.notes" class="text-xs text-slate-600 bg-amber-50/50 p-2.5 rounded-2xl border border-amber-100">
            {{ item.notes }}
          </p>

          <!-- Daftar Tawaran Harga yang Masuk (Bids) -->
          <div class="space-y-2 pt-2 border-t border-slate-100">
            <div class="flex items-center justify-between text-xs font-bold text-slate-700">
              <span class="flex items-center gap-1">
                <Gavel :size="14" class="text-amber-600" /> Penawaran Pembeli ({{ item.bids.length }})
              </span>
              <button
                v-if="item.status === 'DIBUKA' && activeRole !== 'PETANI'"
                @click="openBidModal(item)"
                class="text-xs font-extrabold text-amber-800 hover:text-amber-900 bg-amber-100 px-2.5 py-1 rounded-xl"
              >
                + Ajukan Tawaran Beli
              </button>
            </div>

            <div v-if="item.bids.length === 0" class="text-[11px] text-slate-400 italic py-2">
              Belum ada tawaran harga dari pembeli.
            </div>

            <div
              v-for="bid in item.bids"
              :key="bid.id"
              class="p-2.5 rounded-2xl border flex items-center justify-between text-xs transition-all"
              :class="{
                'bg-emerald-50 border-emerald-300': bid.status === 'DISETUJUI',
                'bg-white border-slate-200': bid.status === 'MENUNGGU',
                'bg-slate-100 border-slate-200 opacity-60': bid.status === 'DITOLAK'
              }"
            >
              <div>
                <div class="font-extrabold text-slate-800 flex items-center gap-1.5">
                  {{ bid.bidder_name }}
                  <span class="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-bold">
                    {{ bid.bidder_role }}
                  </span>
                </div>
                <div class="text-[11px] text-slate-500 mt-0.5">{{ bid.notes }}</div>
              </div>

              <div class="text-right flex items-center gap-3">
                <div>
                  <div class="font-black text-sm text-emerald-800">
                    Rp {{ bid.bid_price_per_kg.toLocaleString() }} <span class="text-[10px] text-slate-500">/kg</span>
                  </div>
                  <span class="text-[10px] font-bold" :class="bid.status === 'DISETUJUI' ? 'text-emerald-700' : 'text-slate-400'">
                    {{ bid.status }}
                  </span>
                </div>

                <!-- Tombol Terima Tawaran (Khusus Petani) -->
                <button
                  v-if="item.status === 'DIBUKA' && bid.status === 'MENUNGGU' && activeRole === 'PETANI'"
                  @click="acceptBid(item.id, bid.id)"
                  class="btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-xl shadow-sm"
                >
                  Terima Tawaran
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL PESAN SAPROTAN IN-APP -->
    <div v-if="showOrderModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white w-full max-w-sm rounded-3xl p-5 shadow-xl space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-extrabold text-base text-slate-800">Pemesanan In-App</h3>
            <p class="text-xs text-emerald-700 font-bold">{{ selectedProduct?.name }}</p>
          </div>
          <button @click="showOrderModal = false" class="text-slate-400 hover:text-slate-600">
            <X :size="20" />
          </button>
        </div>

        <div class="space-y-3">
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Jumlah Pesanan ({{ selectedProduct?.unit }})</label>
            <input
              v-model.number="orderQuantity"
              type="number"
              min="1"
              :max="selectedProduct?.stock_available"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500 font-bold"
            />
          </div>

          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Metode Pembayaran</label>
            <select
              v-model="paymentMethod"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500 bg-white"
            >
              <option value="COD / Bayar Saat Ambil">COD / Bayar Tunai Saat Ambil di Kios</option>
              <option value="YARNEN (Bayar Panen)">YARNEN (Tempo Pembayaran Saat Panen)</option>
              <option value="Transfer Bank Koperasi">Transfer Rekening Koperasi / Bank</option>
            </select>
          </div>

          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Catatan Pengambilan</label>
            <input
              v-model="deliveryNote"
              type="text"
              placeholder="Contoh: Diambil besok pagi pakai motor"
              class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div class="bg-slate-50 p-3 rounded-2xl flex items-center justify-between">
            <span class="text-xs font-bold text-slate-600">Total Pembayaran:</span>
            <span class="text-base font-black text-emerald-800">
              Rp {{ ((selectedProduct?.price || 0) * orderQuantity).toLocaleString() }}
            </span>
          </div>
        </div>

        <div class="pt-2 flex gap-2">
          <button
            @click="showOrderModal = false"
            class="w-1/2 py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-600"
          >
            Batal
          </button>
          <button
            @click="submitOrder"
            class="w-1/2 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
          >
            Konfirmasi Pesan
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL LISTING PANEN BARU -->
    <div v-if="showCreateListingModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white w-full max-w-sm rounded-3xl p-5 shadow-xl space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-extrabold text-base text-slate-800">Pasang Panen ke Bursa</h3>
          <button @click="showCreateListingModal = false" class="text-slate-400 hover:text-slate-600">
            <X :size="20" />
          </button>
        </div>

        <div class="space-y-3">
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Komoditas Panen</label>
            <select
              v-model="newListing.commodity"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500 bg-white"
            >
              <option value="Gabah Kering Panen (GKP)">Gabah Kering Panen (GKP)</option>
              <option value="Gabah Kering Giling (GKG)">Gabah Kering Giling (GKG)</option>
              <option value="Beras Medium Inpari 32">Beras Medium Inpari 32</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Berat Total (Kg)</label>
              <input
                v-model.number="newListing.total_weight_kg"
                type="number"
                min="100"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500 font-bold"
              />
            </div>
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Harga Buka/kg</label>
              <input
                v-model.number="newListing.starting_price_per_kg"
                type="number"
                step="50"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500 font-bold"
              />
            </div>
          </div>

          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Keterangan / Kualitas</label>
            <input
              v-model="newListing.notes"
              type="text"
              placeholder="Contoh: Kadar air 14%, siap timbang di lumbung timur"
              class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div class="pt-2 flex gap-2">
          <button
            @click="showCreateListingModal = false"
            class="w-1/2 py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-600"
          >
            Batal
          </button>
          <button
            @click="submitListing"
            class="w-1/2 py-2.5 rounded-xl font-bold text-xs bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
          >
            Buka Bursa Panen
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL AJUKAN BID LELANG (KHUSUS AGEN / PEMBELI) -->
    <div v-if="showBidModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white w-full max-w-sm rounded-3xl p-5 shadow-xl space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-extrabold text-base text-slate-800">Ajukan Harga Beli</h3>
            <p class="text-xs text-amber-800 font-bold">{{ activeListingTarget?.commodity }}</p>
          </div>
          <button @click="showBidModal = false" class="text-slate-400 hover:text-slate-600">
            <X :size="20" />
          </button>
        </div>

        <div class="space-y-3">
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Tawaran Harga Beli per Kg</label>
            <input
              v-model.number="bidForm.bid_price_per_kg"
              type="number"
              step="50"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-base focus:outline-none focus:border-emerald-500 font-black text-emerald-800"
            />
          </div>

          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Catatan Pengambilan & Timbangan</label>
            <input
              v-model="bidForm.notes"
              type="text"
              placeholder="Contoh: Truk pick-up siap datang besok, bayar tunai di tempat"
              class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div class="pt-2 flex gap-2">
          <button
            @click="showBidModal = false"
            class="w-1/2 py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-600"
          >
            Batal
          </button>
          <button
            @click="submitBid"
            class="w-1/2 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
          >
            Kirim Tawaran Harga
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL PROFIL PENGGUNA PUBLIK (INTERAKTIF & IKUTI) -->
    <UserProfileModal
      :is-open="showProfileModal"
      :author-name="selectedAuthorName"
      @close="showProfileModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserState } from '@/services/userState';
import UserProfileModal from '@/components/UserProfileModal.vue';
import { 
  api, CommunityPost, ShopProduct, SaprotanOrder, 
  MarketListing 
} from '@/services/api';
import { 
  Users, MessageSquare, ShoppingBag, TrendingUp, Send, 
  Heart, MessageCircle, Sparkles, Package, Check, CheckCircle2, 
  Plus, Gavel, X 
} from 'lucide-vue-next';

const { activeRole, currentPersona } = useUserState();

const activeTab = ref<'komunitas' | 'kios' | 'bursa'>('komunitas');
const kiosSubTab = ref<'katalog' | 'pesanan'>('katalog');

// Modal Profil Publik Interaktif
const showProfileModal = ref(false);
const selectedAuthorName = ref('');

const openProfileModal = (name: string) => {
  selectedAuthorName.value = name;
  showProfileModal.value = true;
};

// Feed Komunitas Data
const posts = ref<CommunityPost[]>([]);
const newPost = ref({
  title: '',
  content: '',
  category: 'TANYA_HAMA'
});
const commentInputs = ref<Record<string, string>>({});

// Kios Saprotan Data
const products = ref<ShopProduct[]>([]);
const orders = ref<SaprotanOrder[]>([]);
const showOrderModal = ref(false);
const selectedProduct = ref<ShopProduct | null>(null);
const orderQuantity = ref(1);
const paymentMethod = ref('COD / Bayar Saat Ambil');
const deliveryNote = ref('');

// Bursa Pasar Data
const listings = ref<MarketListing[]>([]);
const showCreateListingModal = ref(false);
const newListing = ref({
  commodity: 'Gabah Kering Panen (GKP)',
  total_weight_kg: 1000,
  starting_price_per_kg: 6850,
  notes: 'Kadar air bagus, siap timbang di lumbung'
});

const showBidModal = ref(false);
const activeListingTarget = ref<MarketListing | null>(null);
const bidForm = ref({
  bid_price_per_kg: 7000,
  notes: 'Siap angkut pick-up bayar tunai'
});

const getAvatarByRole = (role: string) => {
  if (role === 'KETUA_POKTAN') return '👑';
  if (role === 'DISTRIBUTOR') return '🏪';
  if (role === 'AGEN' || role === 'PENGGILINGAN') return '🚚';
  return '👨‍🌾';
};

const loadAllData = async () => {
  try {
    const [pList, prdList, ordList, listList] = await Promise.all([
      api.getCommunityPosts(),
      api.getShopProducts(),
      api.getSaprotanOrders(),
      api.getMarketListings()
    ]);
    posts.value = pList;
    products.value = prdList;
    orders.value = ordList;
    listings.value = listList;
  } catch (err) {
    console.error('Error loading ecosystem data:', err);
  }
};

// Actions Komunitas
const submitPost = async () => {
  if (!newPost.value.title || !newPost.value.content) {
    alert('Mohon isi judul dan isi diskusi');
    return;
  }
  try {
    const created = await api.createCommunityPost({
      author_name: currentPersona.value.name,
      author_role: activeRole.value,
      title: newPost.value.title,
      content: newPost.value.content,
      category: newPost.value.category
    });
    posts.value.unshift(created);
    newPost.value = { title: '', content: '', category: 'TANYA_HAMA' };
  } catch (err) {
    console.error(err);
  }
};

const likePost = async (postId: string) => {
  try {
    const res = await api.likeCommunityPost(postId);
    const p = posts.value.find(item => item.id === postId);
    if (p) p.likes_count = res.likes_count;
  } catch (err) {
    console.error(err);
  }
};

const submitComment = async (postId: string) => {
  const text = commentInputs.value[postId];
  if (!text) return;
  try {
    const comm = await api.addCommunityComment(postId, {
      author_name: currentPersona.value.name,
      author_role: currentPersona.value.badge,
      comment: text
    });
    const p = posts.value.find(item => item.id === postId);
    if (p) p.comments.push(comm);
    commentInputs.value[postId] = '';
  } catch (err) {
    console.error(err);
  }
};

// Actions Kios Saprotan
const openOrderModal = (prod: ShopProduct) => {
  selectedProduct.value = prod;
  orderQuantity.value = 1;
  showOrderModal.value = true;
};

const submitOrder = async () => {
  if (!selectedProduct.value) return;
  try {
    const created = await api.createSaprotanOrder({
      product_id: selectedProduct.value.id,
      quantity: orderQuantity.value,
      buyer_name: currentPersona.value.name,
      payment_method: paymentMethod.value,
      delivery_note: deliveryNote.value
    });
    orders.value.unshift(created);
    showOrderModal.value = false;
    kiosSubTab.value = 'pesanan';
    alert(`Pesanan ${created.product_name} berhasil dibuat!`);
  } catch (err) {
    alert('Gagal membuat pesanan');
    console.error(err);
  }
};

const changeOrderStatus = async (orderId: string, status: string) => {
  try {
    const res = await api.updateOrderStatus(orderId, status);
    const o = orders.value.find(item => item.id === orderId);
    if (o) o.status = status as any;
    alert(res.message);
  } catch (err) {
    console.error(err);
  }
};

// Actions Bursa Pasar
const submitListing = async () => {
  try {
    const created = await api.createMarketListing({
      seller_name: currentPersona.value.name,
      commodity: newListing.value.commodity,
      total_weight_kg: newListing.value.total_weight_kg,
      starting_price_per_kg: newListing.value.starting_price_per_kg,
      notes: newListing.value.notes
    });
    listings.value.unshift(created);
    showCreateListingModal.value = false;
    alert('Hasil panen berhasil dibuka di bursa lelang pasar!');
  } catch (err) {
    console.error(err);
  }
};

const openBidModal = (item: MarketListing) => {
  activeListingTarget.value = item;
  bidForm.value.bid_price_per_kg = item.starting_price_per_kg + 100;
  showBidModal.value = true;
};

const submitBid = async () => {
  if (!activeListingTarget.value) return;
  try {
    const newBid = await api.submitMarketBid(activeListingTarget.value.id, {
      bidder_name: currentPersona.value.entityName,
      bidder_role: activeRole.value,
      bid_price_per_kg: bidForm.value.bid_price_per_kg,
      bid_weight_kg: activeListingTarget.value.total_weight_kg,
      notes: bidForm.value.notes
    });
    activeListingTarget.value.bids.push(newBid);
    showBidModal.value = false;
    alert('Tawaran harga beli Anda berhasil dikirimkan ke petani!');
  } catch (err) {
    console.error(err);
  }
};

const acceptBid = async (listingId: string, bidId: string) => {
  if (confirm('Setujui tawaran ini? Transaksi akan diselesaikan dan stok lumbung Anda akan otomatis disesuaikan.')) {
    try {
      const res = await api.acceptMarketBid(listingId, bidId);
      const target = listings.value.find(l => l.id === listingId);
      if (target) {
        target.status = 'TERJUAL';
        for (const b of target.bids) {
          b.status = b.id === bidId ? 'DISETUJUI' : 'DITOLAK';
        }
      }
      alert(res.message);
    } catch (err) {
      console.error(err);
    }
  }
};

onMounted(loadAllData);
</script>
