# Dokumentasi Proyek: Landing Page Fakultas Teknik Universitas Pasundan (PMB)

Dokumentasi ini menyajikan analisis menyeluruh dari codebase **Fakultas Teknik Universitas Pasundan (PMB Landing Page)**. Proyek ini dibangun sebagai portal informasi interaktif dan penerimaan mahasiswa baru (PMB) berbasis web SPA (*Single Page Application*).

---

## 📋 Ringkasan Proyek

| Parameter | Detail |
| :--- | :--- |
| **Nama Aplikasi** | Fakultas Teknik UNPAS Landing Page (`fakultas-landing`) |
| **Framework Utama** | [Vue 3](https://vuejs.org/) (Composition API + TypeScript) |
| **Build Tool** | [Vite 6](https://vitejs.dev/) |
| **State Management** | [Pinia](https://pinia.vuejs.org/) |
| **Routing** | [Vue Router 4](https://router.vuejs.org/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + Custom HSL Theme Variables |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Animasi & UI** | GSAP, Motion-v, Swiper, PrimeIcons, Lucide Icons, Inspira UI |

---

## 🏛️ Arsitektur & Struktur Direktori

Proyek menggunakan pendekatan modular berbasis **Layered Architecture** untuk memisahkan antara layer *Presentation (Views/Components)*, *State Management (Stores)*, dan *Data Access (Core Services & Helpers)*.

```text
fakultas-teknik/
├── public/                 # Static public assets (logo.webp, dll)
├── src/
│   ├── assets/             # Style utama (main.css) & asset gambar
│   ├── components/         # Komponen UI reusabel
│   │   ├── insipra-ui/     # UI Component animasi modern (border-beam, card-spotlight, etc.)
│   │   ├── prodi/          # Komponen khusus halaman Program Studi
│   │   ├── sections/       # Komponen seksi halaman (CTA, Mitra, Testimonials)
│   │   └── ui/             # Komponen UI atomic dasar
│   ├── composables/        # Custom Vue Composables (useDateFormat, useSanitize)
│   ├── core/               # Layer logika inti & integrasi backend
│   │   ├── helpers/        # Helper utility (Konversi Warna HSL/RGB, Formatting, URL Resolver)
│   │   ├── services/       # Axios API client & service per entitas data
│   │   └── types/          # TypeScript Type definitions / Interfaces
│   ├── layouts/            # Template Layout (MainLayout, Header, AppFooter)
│   ├── router/             # Konfigurasi Vue Router & Dynamic SEO Meta Manager
│   ├── stores/             # Pinia Store (State Management per domain)
│   ├── views/              # Halaman-halaman utama (Pages)
│   ├── App.vue             # Root Component
│   ├── env.d.ts            # Type declaration variabel environment
│   └── main.ts             # Entry point pembentukan aplikasi Vue
├── .env / .env.example     # Variabel konfigurasi environment
├── index.html              # HTML entry point
├── package.json            # Dependensi & script pmb-unpas
├── tailwind.config.js      # Konfigurasi Tailwind CSS
└── vite.config.ts          # Konfigurasi Vite Builder
```

---

## 🔍 Breakdown Detail Komponen Per Halaman

Berikut adalah komposisi seksi dan komponen yang menyusun setiap halaman dalam aplikasi:

### 1. 🏠 Beranda (`/`)
* **Path Component**: `src/views/beranda/BerandaView.vue`
* **Komponen & Seksi yang Penyusun**:
  1. `HomeSlider`: Carousel hero banner utama dengan indikator & slider interaktif.
  2. `BerandaSambutan`: Sambutan Dekan/Pimpinan Fakultas Teknik beserta profil singkat.
  3. `BerandaTentang`: Pengenalan singkat profil Fakultas Teknik UNPAS.
  4. `ProdiAlasan`: Seksi alasan memilih FT UNPAS & keunggulan (USP).
  5. `BerandaInovasi`: Highlight produk riset dan inovasi unggulan.
  6. `MitraSection`: Grid/Carousel mitra industri dan kerjasama lembaga.
  7. `ProdiDetailPrestasi`: Showcase prestasi dosen dan mahasiswa.
  8. `ProdiDetailKegiatan`: Seksi kegiatan organisasi mahasiswa (Himpunan/UKM).
  9. `BerandaAgenda`: Jadwal agenda & event mendatang (tampil jika data agenda ada).
  10. `BerandaFasilitas`: Highlight sarana dan fasilitas kampus.
  11. `TestimonialsSection`: Carousel testimoni alumni dan mahasiswa.
  12. `BerandaBerita`: 3 artikel berita terbaru.
  13. `CTASection`: Call-to-Action ajakan pendaftaran PMB.

### 2. 🏛️ Tentang Fakultas (`/tentang-fakultas`)
* **Path Component**: `src/views/tentang-fakultas/TentangFakultas.vue`
* **Komponen & Seksi yang Penyusun**:
  1. `TentangHero`: Header visual halaman tentang fakultas.
  2. `Timeline`: Timeline interaktif sejarah & milestone perjalanan fakultas.
  3. `TentangSejarah`: Uraian naratif sejarah pendaftaran dan berdirinya fakultas.
  4. `TentangVisiMisi`: Deskripsi Visi, Misi, dan Tujuan Strategis fakultas.
  5. `TentangStatistik`: Counter angka statistik (jumlah mahasiswa, dosen, lulusan, lab).
  6. `MitraSection`: Daftar jaringan mitra institusi.
  7. `DosenCard (Paginasi Tim)`: Grid profil pimpinan, dosen, dan tim akademis dengan sistem paginasi custom.
  8. `TestimonialsSection`: Seksi testimoni alumni.
  9. `CTASection`: Banner pendaftaran.

### 3. 🎓 Program Studi (`/prodi`)
* **Path Component**: `src/views/prodi/ProdiView.vue`
* **Komponen & Seksi yang Penyusun**:
  1. `ProdiHero`: Banner hero jurusan/prodi.
  2. `ImageSection`: Galeri gambar & lingkungan belajar prodi.
  3. `ProdiAlasan`: Poin-poin alasan memilih prodi di FT UNPAS.
  4. `ProdiProgramList`: Grid daftar seluruh program studi (Teknik Informatika, Industri, Mesin, Sipil, Lingkungan, Teknologi Pangan).
  5. `ProdiTestimonials`: Testimoni lulusan prodi.
  6. `CTASection`: Banner daftar PMB.

### 4. 📚 Detail Program Studi (`/prodi/:slug`)
* **Path Component**: `src/views/prodiDetail/ProdiDetail.vue`
* **Komponen & Seksi yang Penyusun**:
  1. `HeroSection`: Header informasi nama prodi, jenjang akreditasi, dan deskripsi.
  2. `AboutSection`: Penjelasan mendalam gambaran umum prodi.
  3. `ProdiDetailPoster`: Banner slider khusus prodi (jika tersedia).
  4. `StatistikSection`: Angka statistik khusus prodi.
  5. `ProdiDetailAkreditas`: Informasi Sertifikasi & Akreditasi BAN-PT/LAM Tek.
  6. `ProdiDetailProspek`: Peluang dan profil karir lulusan.
  7. `ProdiAlasan`: Alasan keunggulan spesifik prodi ini.
  8. `ProdiDetailKurikulum`: Tabulasi/Daftar sebaran mata kuliah per semester.
  9. `ProdiDetailMitra`: Mitra spesifik prodi.
  10. `ProdiDetailPrestasi`: Prestasi civitas akademika prodi.
  11. `GaleriSection`: Fasilitas & lab spesifik milik prodi.
  12. `DosenSection`: Daftar dosen pengajar prodi.
  13. `ProdiDetailKegiatan`: Kegiatan Himpunan Mahasiswa Jurusan (HMJ).
  14. `ProdiDetailAgenda`: Agenda acara internal prodi.
  15. `PanduanSection`: Panduan pendaftaran prodi.
  16. `TestimonialsSection`: Testimoni spesifik prodi.
  17. `ProdiDetailBerita`: Berita terkini seputar prodi (3 berita).
  18. `CTASection`: Banner pendaftaran.

### 5. 🔬 Riset & Inovasi (`/riset-dan-inovasi`)
* **Path Component**: `src/views/riset-dan-inovasi/RisetDanInovasi.vue`
* **Komponen & Seksi yang Penyusun**:
  1. `RisetHero`: Banner hero pusat riset & inovasi.
  2. `ImageSection`: Galeri kegiatan laboratorium & penelitian.
  3. `RisetInovasi`: Card catalog portofolio produk inovasi & karya ilmiah.
  4. `RisetJurnal`: Daftar jurnal terakreditasi dan publikasi ilmiah fakultas.
  5. `CTASection`: Banner pendaftaran.

### 6. 🏀 Kemahasiswaan & Alumni (`/kegiatan`)
* **Path Component**: `src/views/kegiatan/Kegiatan.vue`
* **Komponen & Seksi yang Penyusun**:
  1. `KegiatanHero`: Banner utama seputar kehidupan kampus dan Ormawa.
  2. `KegiatanList`: Filterable list Kemahasiswaan & Alumni, Lembaga Kemahasiswaan, BEM, DPM, HMJ, dan UKM.
  3. `CTASection`: Banner pendaftaran.

### 7. 🏫 Fasilitas (`/fasilitas`)
* **Path Component**: `src/views/fasilitas/FasilitasView.vue`
* **Komponen & Seksi yang Penyusun**:
  1. `FasilitasHero`: Header visual fasilitas kampus.
  2. `FasilitasList`: Catalog fasilitas (Laboratorium Komputer, Workshop Mesin, Perpustakaan, Ruang Kuliah AC, Sarana Olahraga) yang dapat difilter per Program Studi.
  3. `CTASection`: Banner pendaftaran.

### 8. 🏆 Prestasi (`/prestasi`)
* **Path Component**: `src/views/prestasi/PrestasiView.vue`
* **Komponen & Seksi yang Penyusun**:
  1. `PrestasiHero`: Banner hero pencapaian civitas akademika.
  2. `PrestasiList`: Card catalog daftar kejuaraan, lomba, dan penghargaan tingkat lokal, nasional, hingga internasional.
  3. `CTASection`: Banner pendaftaran.

### 9. 📰 Berita (`/berita`)
* **Path Component**: `src/views/berita/BeritaView.vue`
* **Komponen & Seksi yang Penyusun**:
  1. `HeroSection`: Featured news / berita utama paling baru.
  2. `BeritaListSection`: Grid list daftar seluruh berita dengan search & pagination.
  3. `AcaraSection`: Highlight 3 event/agenda terdekat.
  4. `CTASection`: Banner pendaftaran.

### 10. 📖 Detail Berita (`/berita/:slug`)
* **Path Component**: `src/views/beritaDetail/BeritaDetail.vue`
* **Komponen & Seksi yang Penyusun**:
  1. `HeroSection`: Judul artikel, tanggal rilis, penulisan, dan banner gambar berita.
  2. `BodySection`: Konten artikel berita lengkap (HTML ter-sanitize) disamping sidebar iklan banner (`sidebanner`).
  3. `CTASection`: Banner pendaftaran.

### 11. 👨‍🏫 Tenaga Pengajar (`/tenaga-pengajar`)
* **Path Component**: `src/views/tenaga/Tenaga.vue`
* **Komponen & Seksi yang Penyusun**:
  1. `TenagaHero`: Header profil dosen & staf akademik.
  2. `TenagaAlasan`: Keunggulan dan kualifikasi pengajar (Magister, Doktor, Profesor, Praktisi Industri).
  3. `ProdiDetailDosen`: Grid daftar dosen lengkap dengan tautan media sosial / profil akademis.
  4. `CTASection`: Banner pendaftaran.

### 12. 🤝 Kerjasama (`/kerjasama`)
* **Path Component**: `src/views/kerjasama/Kerjasama.vue`
* **Komponen & Seksi yang Penyusun**:
  1. `KerjasamaHero`: Banner jaringan kemitraan internasional dan nasional.
  2. `KerjasamaList (KerjasamaMitra)`: List daftar instansi pemerintah, BUMN, perbankan, & perusahaan swasta mitra.
  3. `MitraSection`: Logo marquee/grid mitra kerja sama.
  4. `CTASection`: Banner pendaftaran.

### 13. 💬 Testimoni (`/testimoni`)
* **Path Component**: `src/views/testimoni/TestimoniView.vue`
* **Komponen & Seksi yang Penyusun**:
  1. `TestimoniHero`: Banner hero kisah sukses alumni.
  2. `TestimoniCarousel`: Carousel highlight testimoni alumni terkemuka.
  3. `TestimoniList`: Grid ulasan & kutipan lengkap alumni dari berbagai angkatan dan prodi.
  4. `CTASection`: Banner pendaftaran.

### 14. 📞 Kontak (`/kontak`)
* **Path Component**: `src/views/kontak/KontakView.vue`
* **Komponen & Seksi yang Penyusun**:
  1. `HeroSection`: Informasi alamat kampus, nomor telepon, email, & jam operasional.
  2. `LokasiSection`: Embed peta interaktif Google Maps lokasi Kampus IV UNPAS (Setiabudhi / Dr. Setiabudi Bandung).
  3. `KontakForm`: Form kirim pesan / pengaduan publik.
  4. `CTASection`: Banner pendaftaran.

### 15. ❓ FAQ (`/faq`)
* **Path Component**: `src/views/Faq/Faq.vue`
* **Komponen & Seksi yang Penyusun**:
  1. `FaqQuestion`: Header pencarian pertanyaan umum.
  2. `FaqAnswer`: Accordion interaktif daftar pertanyaan & jawaban seputar PMB, syarat pendaftaran, beasiswa, dan biaya studi.
  3. `CTASection`: Banner pendaftaran.

---

## 🛠️ Modul State Management (Pinia Stores)

Beberapa Pinia Store utama yang mengelola state data aplikasi:

1. **`berandaStore`** (`src/stores/beranda/beranda-store.ts`):
   - Mengelola fetching data utama beranda (Banner slider, data fakultas, keunggulan, berita, prestasi, fasilitas, dosen, mitra, portofolio).
2. **`tentangStore`** (`src/stores/tentang/tentang-store.ts`):
   - Mengelola data profil fakultas, visi-misi, dan sejarah (timeline).
3. **`kerjasamaStore`** (`src/stores/kerjasama/kerjasama-store.ts`):
   - Mengelola daftar mitra industri & instansi kerjasama.
4. **`fakultasStore`** (`src/stores/fakultas.ts`):
   - Mengelola warna branding dan konfigurasi spesifik fakultas.
5. **`authStore`** (`src/stores/auth/auth.ts`):
   - Mengelola status autentikasi JWT token dan verifikasi sesi user.
6. **`departementStore`** (`src/stores/departement.ts`):
   - Mengelola daftar & detail program studi berdasarkan slug/ID.
7. **`postStore`** (`src/stores/post.ts`):
   - Mengelola data artikel & berita.

---

## ⚙️ Variabel Lingkungan (.env)

Aplikasi memerlukan variabel berikut agar terhubung dengan REST API Backend:

```env
VITE_APP_NAME="PMB Fakultas Teknik UNPAS"
VITE_APP_BE_URL="https://api-backend-url.com/api"
VITE_IMAGES_URL="https://api-backend-url.com/storage/"
```

---

## 🚀 Panduan Jalankan Proyek

### 1. Install Dependensi
```bash
npm install
```

### 2. Jalankan Mode Development
```bash
npm run dev
```

### 3. Type Checking & Build Produksi
```bash
npm run build
```
