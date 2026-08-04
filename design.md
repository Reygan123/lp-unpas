# 🎨 Design Document — Landing Page Fakultas Teknik UNPAS

> **Versi**: 1.0  
> **Terakhir diperbarui**: 3 Agustus 2026  
> **Status**: ✅ Aktif  

Dokumen ini menjelaskan keputusan desain, arsitektur sistem, design system, pola komponen, dan panduan pengembangan untuk proyek **Landing Page PMB Fakultas Teknik Universitas Pasundan**.

---

## 📋 Daftar Isi

1. [Gambaran Umum](#1--gambaran-umum)
2. [Arsitektur Sistem](#2--arsitektur-sistem)
3. [Design System](#3--design-system)
4. [Pola Komponen & Hierarki](#4--pola-komponen--hierarki)
5. [Alur Data (Data Flow)](#5--alur-data-data-flow)
6. [Routing & Navigasi](#6--routing--navigasi)
7. [Strategi SEO](#7--strategi-seo)
8. [Responsivitas & Aksesibilitas](#8--responsivitas--aksesibilitas)
9. [Performa & Optimisasi](#9--performa--optimisasi)
10. [Panduan Pengembangan](#10--panduan-pengembangan)

---

## 1. 🌐 Gambaran Umum

### 1.1 Tujuan Proyek

Membangun portal web **Single Page Application (SPA)** sebagai landing page penerimaan mahasiswa baru (PMB) untuk Fakultas Teknik Universitas Pasundan. Website dirancang untuk menyajikan informasi akademik, program studi, fasilitas, dan mendorong calon mahasiswa mendaftar.

### 1.2 Target Pengguna

| Segmen | Deskripsi |
| :--- | :--- |
| **Calon Mahasiswa Baru** | Siswa SMA/SMK yang mencari informasi prodi & pendaftaran |
| **Orang Tua/Wali** | Pihak keluarga yang ingin mengetahui kualitas & fasilitas |
| **Alumni** | Lulusan yang ingin tetap terhubung & memberikan testimoni |
| **Mitra Industri** | Perusahaan/instansi yang ingin menjalin kerjasama |
| **Dosen & Staf** | Civitas akademika untuk representasi digital |

### 1.3 Tech Stack

```
┌─────────────────────────────────────────────────┐
│  FRONTEND                                       │
│  ├── Framework   : Vue 3 (Composition API + TS) │
│  ├── Build Tool  : Vite 6                       │
│  ├── Styling     : Tailwind CSS 3 + HSL Vars    │
│  ├── State       : Pinia 3                      │
│  ├── Routing     : Vue Router 4                 │
│  ├── HTTP Client : Axios                        │
│  ├── Animasi     : GSAP, Motion-v, Swiper       │
│  ├── Icons       : PrimeIcons, Lucide, Heroicons│
│  └── UI Library  : Inspira UI, HeadlessUI       │
│                                                 │
│  BACKEND (Eksternal REST API)                   │
│  └── Diakses via VITE_APP_BE_URL env variable   │
└─────────────────────────────────────────────────┘
```

---

## 2. 🏛️ Arsitektur Sistem

### 2.1 Layered Architecture

Proyek mengadopsi arsitektur berlapis untuk memisahkan tanggung jawab secara jelas:

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                    │
│   Views (Pages) → Layouts → Components (Sections + UI)  │
├─────────────────────────────────────────────────────────┤
│                  STATE MANAGEMENT LAYER                  │
│        Pinia Stores (per domain / entitas data)         │
├─────────────────────────────────────────────────────────┤
│                   DATA ACCESS LAYER                     │
│   ApiService (Axios) → Entity Services → Type Defs     │
├─────────────────────────────────────────────────────────┤
│                     UTILITY LAYER                       │
│     Composables → Helpers → Lib (class utilities)       │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Struktur Direktori

```
src/
├── assets/              # CSS utama & aset statis
├── components/          # Komponen UI reusable
│   ├── insipra-ui/      #   └── Komponen animasi modern (border-beam, card-spotlight, dll.)
│   ├── prodi/           #   └── Komponen khusus halaman prodi
│   ├── sections/        #   └── Seksi reusable lintas halaman (CTA, Mitra, Testimonials)
│   └── ui/              #   └── Komponen atomic (border-beam, card-spotlight, number-ticker)
├── composables/         # Vue Composables (useDateFormat, useSanitize)
├── core/                # Logika inti & integrasi backend
│   ├── helpers/         #   └── Utility functions (hex↔HSL, formatting, URL resolver)
│   ├── services/        #   └── Axios API services per entitas
│   └── types/           #   └── TypeScript interfaces & type definitions
├── layouts/             # Template layout
│   └── components/      #   └── Header, AppFooter, CTASection
├── lib/                 # Class utilities (cn/clsx helper)
├── router/              # Vue Router config + SEO meta manager
├── stores/              # Pinia Stores per domain
└── views/               # Halaman-halaman utama (18 view directories)
```

### 2.3 Prinsip Arsitektur

| Prinsip | Implementasi |
| :--- | :--- |
| **Separation of Concerns** | View hanya mengatur komposisi section, logika data di store, akses API di service |
| **Single Responsibility** | Setiap service file menangani satu entitas data (PostService, TeamService, dll.) |
| **DRY (Don't Repeat Yourself)** | Seksi reusable (`CTASection`, `MitraSection`, `TestimonialsSection`) dipakai lintas halaman |
| **Type Safety** | Seluruh entitas data memiliki TypeScript interface di `core/types/` |
| **Lazy Loading** | Mayoritas view di-import secara lazy (`() => import(...)`) untuk optimisasi bundle |

---

## 3. 🎨 Design System

### 3.1 Skema Warna

Design system menggunakan **CSS Custom Properties berbasis HSL** untuk fleksibilitas theming dinamis. Warna utama fakultas di-fetch dari backend dan diinjeksi ke `:root` CSS variables saat runtime.

#### Warna Statis (Tailwind Config)

| Token | Nilai | Kegunaan |
| :--- | :--- | :--- |
| `netral` | `#F3F4F4` | Background utama halaman |
| `fakultas` | `#AA2132` | Warna brand statis (fallback) |
| `outline` | `#FAFAFA80` | Border semi-transparan |
| `desc` | `#A9A9A9` | Teks deskripsi/muted |
| `text.DEFAULT` | `#444444` | Teks body utama |

#### Warna Dinamis (HSL CSS Variables)

```css
/* Diinjeksi oleh fakultasStore.getFacultyColor() */
--color-primary-r / --color-primary-g / --color-primary-b   /* RGB channels */
--background                                                 /* HSL background */

/* Semantic tokens (shadcn/Inspira UI compatible) */
--primary / --primary-foreground
--secondary / --secondary-foreground
--muted / --muted-foreground
--accent / --accent-foreground
--destructive / --destructive-foreground
--border / --input / --ring
--card / --card-foreground
--popover / --popover-foreground
--radius
```

#### Mekanisme Dynamic Theming

```
Backend API → fakultasStore.getFacultyColor()
  ├── hexToRgb(color) → --color-primary-r/g/b (RGB channels)
  └── hexToCssHsl(color) → --background (HSL string)
       └── Tailwind `colorPrimary` → rgb(var(--color-primary-r), ...)
```

Ini memungkinkan **setiap fakultas memiliki warna brand berbeda** tanpa mengubah kode frontend.

### 3.2 Tipografi

| Font | Variasi | Kegunaan |
| :--- | :--- | :--- |
| **Inter** | 100–900 (variable) | Font utama body text & UI |
| **Sora** | 100–800 (variable) | Font heading & display text |

Kedua font dimuat via Google Fonts dengan `preconnect` untuk optimisasi loading.

### 3.3 Spacing & Border Radius

Border radius menggunakan sistem berbasis CSS variable `--radius`:

| Token | Formula |
| :--- | :--- |
| `rounded-xl` | `calc(var(--radius) + 4px)` |
| `rounded-lg` | `var(--radius)` |
| `rounded-md` | `calc(var(--radius) - 2px)` |
| `rounded-sm` | `calc(var(--radius) - 4px)` |

### 3.4 Animasi & Transisi

| Library | Kegunaan |
| :--- | :--- |
| **GSAP** | Animasi scroll-triggered kompleks, timeline animasi |
| **Motion-v** | Animasi deklaratif berbasis Vue directive |
| **Swiper** | Carousel/slider interaktif (hero banner, testimoni) |
| **Inspira UI** | Efek visual modern (border-beam, card-spotlight, number-ticker, interactive-hover-button) |
| **Vue Transition** | Transisi halaman (fade-up pada `MainLayout`) |

#### Pola Transisi Halaman

```vue
<!-- MainLayout.vue -->
<Transition name="fade-up" appear>
  <div v-show="showContent" class="slot-container lg:mt-28">
    <slot></slot>
  </div>
</Transition>
```

Animasi: `opacity: 0 → 1` + `translateY(20px → 0)` dengan durasi **1 detik** ease-out.

---

## 4. 🧩 Pola Komponen & Hierarki

### 4.1 Tipe Komponen

```
Komponen
├── 📐 Layout Components          → MainLayout, DefaultLayout, SectionLayout
│   └── Layout Sub-components     → Header, AppFooter
├── 📄 Page Components (Views)    → BerandaView, ProdiView, dll.
├── 📦 Section Components         → CTASection, MitraSection, TestimonialsSection
├── 🧱 Feature Components         → HomeSlider, TitleSection, ArticleCard, dll.
├── ✨ Inspira UI Components      → BorderBeam, CardSpotlight, NumberTicker
└── 🔧 Atomic UI Components      → Button, Text, Title, Skeleton, Loading
```

### 4.2 Hierarki Komponen

```
App.vue
└── RouterView (:key="$route.fullPath")
    └── View Page (e.g., BerandaView)
        └── MainLayout
            ├── Header (Navigasi global)
            ├── <slot> → Section Components
            │   ├── HeroSection / HomeSlider
            │   ├── Feature Sections (konten unik per halaman)
            │   ├── Reusable Sections (CTA, Mitra, Testimonials)
            │   └── Atomic Components (Button, Card, Title, dll.)
            └── AppFooter (Footer global)
```

### 4.3 Pola Komposisi Halaman

Setiap halaman (view) mengikuti pola **Section Composition**:

```vue
<!-- Contoh: BerandaView.vue -->
<MainLayout>
  <HomeSlider />              <!-- 1. Hero Section -->
  <BerandaSambutan />         <!-- 2. Introduction -->
  <BerandaTentang />          <!-- 3. About -->
  <ProdiAlasan />             <!-- 4. USP / Keunggulan -->
  ...
  <TestimonialsSection />     <!-- N-1. Social Proof -->
  <CTASection />              <!-- N. Call to Action (selalu terakhir) -->
</MainLayout>
```

> **Konvensi**: Setiap halaman **selalu diakhiri** dengan `CTASection` sebagai ajakan pendaftaran PMB.

### 4.4 Komponen Reusable Lintas Halaman

| Komponen | Dipakai di Halaman |
| :--- | :--- |
| `CTASection` | Semua 15 halaman |
| `MitraSection` | Beranda, Tentang Fakultas, Detail Prodi |
| `TestimonialsSection` | Beranda, Tentang Fakultas, Detail Prodi |
| `ProdiAlasan` | Beranda, Prodi, Detail Prodi |
| `TitleSection` | Hampir semua halaman (heading seksi) |
| `ArticleCard` | Beranda, Berita, Detail Prodi |
| `AgendaCard` | Beranda, Berita, Detail Prodi |

---

## 5. 🔄 Alur Data (Data Flow)

### 5.1 Arsitektur Data

```
┌──────────────┐     HTTP/REST      ┌──────────────────┐
│  REST API    │ ◄─────────────────► │   ApiService     │
│  (Backend)   │                     │   (Axios client) │
└──────────────┘                     └────────┬─────────┘
                                              │
                                    ┌─────────▼──────────┐
                                    │  Entity Services    │
                                    │  (per-resource API) │
                                    │  PostService        │
                                    │  TeamService        │
                                    │  FakultasService    │
                                    │  DepartmentService  │
                                    │  ... (20 services)  │
                                    └─────────┬──────────┘
                                              │
                                    ┌─────────▼──────────┐
                                    │  Pinia Stores       │
                                    │  (state + actions)  │
                                    │  berandaStore       │
                                    │  tentangStore       │
                                    │  fakultasStore      │
                                    │  departementStore   │
                                    │  ... (19+ stores)   │
                                    └─────────┬──────────┘
                                              │
                                    ┌─────────▼──────────┐
                                    │  Vue Components     │
                                    │  (reactive binding) │
                                    └────────────────────┘
```

### 5.2 Pola Service Layer

Setiap entity service adalah wrapper tipis di atas `ApiService`:

```typescript
// Contoh: PostService.ts
import ApiService from "./ApiService";

const PostService = {
  getAll()           { return ApiService.get("posts"); },
  getBySlug(slug)    { return ApiService.get("posts", slug); },
};
```

### 5.3 Pola Store

Store Pinia menggunakan Options API style dengan pola konsisten:

```typescript
// Pola umum setiap store
export const useXxxStore = defineStore("xxx", {
  state: () => ({
    items: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchItems() {
      this.loading = true;
      try {
        const response = await XxxService.getAll();
        this.items = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
```

### 5.4 TypeScript Type Definitions

Setiap entitas data memiliki interface di `core/types/`:

```
core/types/
├── agenda.ts          # Agenda/Event
├── analytic.ts        # Analytics tracking
├── departement.ts     # Program Studi/Departemen
├── fakultas.ts        # Data Fakultas + branding
├── faq.ts             # FAQ items
├── fasilitas.ts       # Fasilitas kampus
├── identity.ts        # Identitas institusi
├── jurnal.ts          # Jurnal ilmiah
├── kurikulum.ts       # Kurikulum/mata kuliah
├── location.ts        # Lokasi/peta
├── organisasi.ts      # Organisasi kemahasiswaan
├── partner.ts         # Mitra kerjasama
├── portofolio.ts      # Portofolio riset
├── post.ts            # Berita/artikel
├── Prestasi.ts        # Prestasi/penghargaan
├── prospek.ts         # Prospek karir
├── sidebanner.ts      # Side banner ads
├── slider.ts          # Slider/banner images
├── team.ts            # Dosen & tim
├── testimoni.ts       # Testimoni alumni
└── unggulan.ts        # Keunggulan/USP
```

---

## 6. 🧭 Routing & Navigasi

### 6.1 Peta Rute

```
/                           → Beranda (lazy loaded)
/tentang                   → Tentang Fakultas (lazy loaded)
/prodi                      → Daftar Program Studi (eager)
/prodi/:slug                → Detail Program Studi (eager)
/berita                     → Daftar Berita (eager)
/berita/:slug               → Detail Berita (eager)
/penelitian                 → Riset & Inovasi (lazy loaded)
/kemahasiswaan-dan-alumni   → Kegiatan (eager)
/fasilitas                  → Fasilitas (lazy loaded)
/prestasi                   → Prestasi (lazy loaded)
/tenaga-pengajar            → Tenaga Pengajar (lazy loaded)
/kerjasama                  → Kerjasama (lazy loaded)
/testimoni                  → Testimoni (lazy loaded)
/kontak                     → Kontak (eager)
/faq                        → FAQ (eager)
/pengabdian-masyarakat      → Pengabdian Masyarakat (lazy loaded)
/:pathMatch(.*)*            → Redirect ke / (catch-all 404)
```

### 6.2 Strategi Loading

| Strategi | Rute | Alasan |
| :--- | :--- | :--- |
| **Lazy Loading** | Beranda, Akademik, Riset, Fasilitas, Prestasi, Tenaga, Kerjasama, Testimoni, Pengabdian | Halaman sekunder, mengurangi initial bundle |
| **Eager Loading** | Prodi, Berita, Kontak, FAQ, Kegiatan | Halaman utama yang sering diakses langsung |

### 6.3 Navigation Guard

Router memiliki `beforeEach` guard yang menjalankan:

1. **Dynamic SEO Meta** — Update `<title>`, meta description, Open Graph, Twitter Card, dan canonical URL
2. **Auth Header** — Set JWT authorization header via `ApiService.setHeader()`
3. **Session Validation** — Cek expired token untuk rute yang memerlukan autentikasi

---

## 7. 🔍 Strategi SEO

### 7.1 Meta Management

SEO meta tags dikelola secara **dinamis per rute** melalui navigation guard:

```typescript
// Setiap rute memiliki meta
meta: {
  pageTitle: "Program Studi",
  description: "Daftar program studi di Fakultas Teknik...",
}

// Guard menggenerate:
// - <title> = "{pageTitle} - Fakultas Teknik Universitas Pasundan"
// - <meta name="description">
// - <meta property="og:title/description/url">
// - <meta name="twitter:title/description">
// - <link rel="canonical">
```

### 7.2 Static SEO Assets

| File | Fungsi |
| :--- | :--- |
| `public/robots.txt` | Instruksi crawler (allow/disallow) |
| `public/sitemap.xml` | Peta situs XML untuk search engine indexing |
| `index.html` | Fallback meta tags, Open Graph, Twitter Card |

### 7.3 SEO Checklist

- [x] Semantic HTML5 (`<header>`, `<main>`, `<footer>`, `<section>`, `<article>`)
- [x] Dynamic `<title>` per halaman
- [x] Meta description per halaman
- [x] Open Graph tags (og:title, og:description, og:url, og:image)
- [x] Twitter Card tags
- [x] Canonical URLs
- [x] `lang="id"` pada `<html>`
- [x] Sitemap XML
- [x] Robots.txt
- [x] Google Tag Manager integration (GTM-WQ2SK5LN)

---

## 8. 📱 Responsivitas & Aksesibilitas

### 8.1 Breakpoints

Menggunakan breakpoint default Tailwind CSS:

| Breakpoint | Min-width | Target Device |
| :--- | :--- | :--- |
| `sm` | 640px | Smartphone landscape |
| `md` | 768px | Tablet portrait |
| `lg` | 1024px | Tablet landscape / Laptop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large desktop |

### 8.2 Layout Strategy

- **Mobile-first approach** — Style dasar untuk mobile, lalu override di breakpoint lebih besar
- **Main content offset** — `lg:mt-28` pada slot container (mengakomodasi fixed header di desktop)
- **Overflow control** — `overflow-x: clip` global untuk mencegah horizontal scroll dari elemen animasi

### 8.3 Komponen Responsif

| Komponen | Adaptasi Mobile |
| :--- | :--- |
| `Header` | Hamburger menu / drawer navigation |
| `TestimonialsSection` | Versi mobile terpisah (`TestimonialsSectionMobile.vue`) |
| `HomeSlider` | Layout dan ukuran slide yang adaptif |
| Grid layouts | Kolom responsif (1 col mobile → 2-3 col desktop) |

---

## 9. ⚡ Performa & Optimisasi

### 9.1 Strategi Optimisasi

| Teknik | Implementasi |
| :--- | :--- |
| **Code Splitting** | Lazy loading routes via dynamic `import()` |
| **Font Optimization** | `preconnect` ke Google Fonts domain |
| **Image Format** | WebP untuk logo dan aset gambar |
| **Tree Shaking** | Vite + ES modules untuk eliminasi dead code |
| **CSS Purging** | Tailwind CSS PurgeCSS (otomatis di production build) |
| **Dev Tools** | `vite-plugin-vue-devtools` (dev only) |

### 9.2 Bundle Strategy

```
Entry Point: src/main.ts
├── Vendor chunk: Vue, Pinia, Vue Router, Axios
├── UI chunk: Swiper, GSAP, Motion-v
├── Route chunks: Per-page lazy loaded modules
└── Style: main.css + Tailwind utilities (purged)
```

### 9.3 API Optimization

- **Caching di Store**: `fakultasStore` menyimpan warna fakultas, menghindari fetch ulang setelah pertama kali
- **Conditional Rendering**: Beberapa seksi hanya ditampilkan jika data tersedia (e.g., `BerandaAgenda`)

---

## 10. 📖 Panduan Pengembangan

### 10.1 Environment Setup

```bash
# 1. Clone & install
npm install

# 2. Konfigurasi environment
cp .env.example .env
# Edit .env dengan URL backend yang sesuai

# 3. Development server
npm run dev

# 4. Production build
npm run build
```

### 10.2 Environment Variables

| Variable | Deskripsi | Contoh |
| :--- | :--- | :--- |
| `VITE_APP_NAME` | Nama aplikasi | `PMB Fakultas Teknik UNPAS` |
| `VITE_APP_BE_URL` | Base URL REST API | `https://api.example.com/api` |
| `VITE_IMAGES_URL` | Base URL storage gambar | `https://api.example.com/storage/` |

### 10.3 Konvensi Penamaan

| Elemen | Konvensi | Contoh |
| :--- | :--- | :--- |
| **View files** | PascalCase + View/Detail suffix | `BerandaView.vue`, `ProdiDetail.vue` |
| **Component files** | PascalCase deskriptif | `HomeSlider.vue`, `TitleSection.vue` |
| **Store files** | kebab-case / camelCase | `beranda-store.ts`, `fakultas.ts` |
| **Service files** | PascalCase + Service suffix | `PostService.ts`, `ApiService.ts` |
| **Type files** | camelCase | `departement.ts`, `fakultas.ts` |
| **Composable files** | camelCase + use prefix | `useDateFormat.ts`, `useSanitize.ts` |
| **Directories** | kebab-case | `riset-dan-inovasi/`, `tentang-fakultas/` |

### 10.4 Pola Menambah Halaman Baru

```
1. Buat view di: src/views/<nama-halaman>/<NamaHalaman>.vue
2. Buat type jika perlu: src/core/types/<entitas>.ts
3. Buat service: src/core/services/<Entitas>Service.ts
4. Buat store: src/stores/<entitas>.ts
5. Daftarkan route di: src/router/index.ts (dengan meta SEO)
6. Komposisikan sections di view, akhiri dengan <CTASection />
```

### 10.5 Pola Menambah Section Component Baru

```vue
<!-- Template section component -->
<script setup lang="ts">
import TitleSection from '@/components/TitleSection.vue'
// import data store jika perlu

// props, state, logic
</script>

<template>
  <section class="py-16 lg:py-24">
    <div class="max-w-7xl mx-auto px-4">
      <TitleSection title="..." subtitle="..." />
      <!-- konten section -->
    </div>
  </section>
</template>
```

### 10.6 Skrip yang Tersedia

| Perintah | Fungsi |
| :--- | :--- |
| `npm run dev` | Jalankan Vite dev server |
| `npm run build` | Type-check + production build |
| `npm run build-only` | Production build tanpa type-check |
| `npm run preview` | Preview production build lokal |
| `npm run type-check` | TypeScript type checking (`vue-tsc`) |
| `npm run lint` | ESLint auto-fix |
| `npm run format` | Prettier formatting |

### 10.7 Konfigurasi Tooling

| Tool | File Konfigurasi |
| :--- | :--- |
| Vite | `vite.config.ts` — Vue plugin, devtools, path alias (`@` → `src/`) |
| Tailwind | `tailwind.config.js` — Custom colors, fonts, Inspira UI plugin |
| TypeScript | `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` |
| ESLint | `eslint.config.ts` — Vue + TypeScript rules |
| Prettier | `.prettierrc.json` — Formatting preferences |
| PostCSS | `postcss.config.js` — Tailwind + Autoprefixer |
| Editor | `.editorconfig` — Konsistensi indentasi lintas editor |

---

## 📎 Lampiran

### A. Daftar Lengkap Entity Services (20 services)

| Service | Endpoint Resource |
| :--- | :--- |
| `AgendaService` | Agenda & event |
| `AnalyticService` | Analytics/tracking |
| `ApiService` | Base Axios client |
| `DepartmentService` | Program studi |
| `FakultasService` | Data fakultas |
| `FaqService` | FAQ |
| `FasilitasService` | Fasilitas kampus |
| `IdentityService` | Identitas institusi |
| `JwtService` | Token JWT management |
| `KurikulumService` | Kurikulum/mata kuliah |
| `OrganisasiService` | Organisasi kemahasiswaan |
| `PartnerService` | Mitra kerjasama |
| `PostService` | Berita/artikel |
| `PrestasiService` | Prestasi |
| `ProspekService` | Prospek karir |
| `SideBannerService` | Side banner iklan |
| `SliderService` | Slider/banner gambar |
| `TeamService` | Dosen & staf |
| `TestimoniService` | Testimoni alumni |
| `UnggulanService` | Keunggulan/USP |

### B. Peta Halaman Lengkap

| # | Halaman | Path | Jumlah Seksi |
| :--- | :--- | :--- | :--- |
| 1 | Beranda | `/` | 13 |
| 2 | Tentang Fakultas | `/tentang` | 9 |
| 3 | Program Studi | `/prodi` | 6 |
| 4 | Detail Prodi | `/prodi/:slug` | 18 |
| 5 | Riset & Inovasi | `/penelitian` | 5 |
| 6 | Kemahasiswaan | `/kemahasiswaan-dan-alumni` | 3 |
| 7 | Fasilitas | `/fasilitas` | 3 |
| 8 | Prestasi | `/prestasi` | 3 |
| 9 | Berita | `/berita` | 4 |
| 10 | Detail Berita | `/berita/:slug` | 3 |
| 11 | Tenaga Pengajar | `/tenaga-pengajar` | 4 |
| 12 | Kerjasama | `/kerjasama` | 4 |
| 13 | Testimoni | `/testimoni` | 4 |
| 14 | Kontak | `/kontak` | 4 |
| 15 | FAQ | `/faq` | 3 |
| 16 | Pengabdian Masyarakat | `/pengabdian-masyarakat` | — |

### C. Composables

| Composable | Fungsi |
| :--- | :--- |
| `useDateFormat` | Format tanggal ke locale Indonesia (`id-ID`) |
| `useSanitize` | Sanitasi HTML menggunakan DOMPurify untuk mencegah XSS |

### D. Helper Utilities

| Fungsi | Deskripsi |
| :--- | :--- |
| `hexToRgb(hex)` | Konversi warna HEX ke objek `{r, g, b}` |
| `hexToCssHsl(hex)` | Konversi HEX ke CSS HSL string (`"H S% L%"`) |
| `getImageUrl(image)` | Resolve path gambar ke full URL storage backend |
| `formatDate(dateString)` | Format ISO date ke format Indonesia (`1 Januari 2026`) |
