import { createRouter, createWebHistory } from 'vue-router'
import ApiService from "@/core/services/ApiService";
import { destroyExpDt, destroyToken } from "@/core/services/JwtService";
import { isExpired } from '@/stores/auth';

const BASE_URL = 'https://teknik.unpas.ac.id'
const SITE_NAME = 'Fakultas Teknik Universitas Pasundan'

function setMeta(name: string, content: string, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(path: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', `${BASE_URL}${path}`)
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      children: [
        {
          path: "/",
          name: "beranda",
          component: () => import("@/views/beranda/BerandaView.vue"),
          meta: {
            pageTitle: "Beranda",
            description: "Selamat datang di Fakultas Teknik Universitas Pasundan. Temukan program studi unggulan, riset, inovasi, dan informasi akademik terkini.",
          },
        },
        {
          path: "/tentang",
          name: "tentang",
          component: () => import("@/views/tentang-fakultas/TentangFakultas.vue"),
          meta: {
            pageTitle: "Tentang Fakultas",
            description: "Kenali lebih dalam Fakultas Teknik Universitas Pasundan — visi, misi, sejarah, dan komitmen kami dalam mencetak insinyur berkualitas.",
          },
        },
        {
          path: "/akademik",
          name: "akademik",
          component: () => import("@/views/akademik/Akademik.vue"),
          meta: {
            pageTitle: "Akademik",
            description: "Informasi lengkap mengenai program studi, kurikulum, kompetensi lulusan, peraturan akademik, biaya pendidikan, dan layanan akademik di Fakultas Teknik Universitas Pasundan.",
          },
        },
        {
          path: '/akademik/program-perkuliahan',
          name: 'Program Perkuliahan',
          component: () => import('@/views/akademik/ProgramPerkuliahan.vue'),
          meta: {
            pageTitle: "Program Perkuliahan",
            description: "Cerita sukses dan testimoni alumni Fakultas Teknik Universitas Pasundan di dunia profesional dan industri.",
          },
        },
        {
          path: '/akademik/peraturan',
          name: 'peraturan-akademik',
          component: () => import('@/views/akademik/PeraturanAkademik.vue'),
          meta: {
            pageTitle: "Peraturan Akademik",
            description: "Informasi lengkap mengenai peraturan akademik di Fakultas Teknik Universitas Pasundan.",
          },
        },
        {
          path: "/testimoni",
          name: "testimoni",
          component: () => import("@/views/testimoni/TestimoniView.vue"),
          meta: {
            pageTitle: "Testimoni",
            description: "Cerita sukses dan testimoni alumni Fakultas Teknik Universitas Pasundan di dunia profesional dan industri.",
          },
        },
        {
          path: "/kerjasama",
          name: "kerjasama",
          component: () => import("@/views/kerjasama/Kerjasama.vue"),
          meta: {
            pageTitle: "Kerjasama",
            description: "Jaringan kerjasama Fakultas Teknik Universitas Pasundan dengan industri, instansi pemerintah, dan mitra internasional.",
          },
        },
        {
          path: "/penelitian",
          name: "penelitian",
          component: () => import("@/views/riset-dan-inovasi/RisetDanInovasi.vue"),
          meta: {
            pageTitle: "Riset dan Inovasi",
            description: "Eksplorasi riset dan inovasi terkini dari dosen dan mahasiswa Fakultas Teknik Universitas Pasundan untuk kemajuan teknologi Indonesia.",
          },
        },
        {
          path: "/fasilitas",
          name: "fasilitas",
          component: () => import("@/views/fasilitas/FasilitasView.vue"),
          meta: {
            pageTitle: "Fasilitas",
            description: "Fasilitas modern Fakultas Teknik Universitas Pasundan — laboratorium, ruang kuliah, dan sarana pendukung pembelajaran berstandar tinggi.",
          },
        },
        {
          path: "/prestasi",
          name: "prestasi",
          component: () => import("@/views/prestasi/PrestasiView.vue"),
          meta: {
            pageTitle: "Prestasi",
            description: "Daftar prestasi membanggakan mahasiswa dan dosen Fakultas Teknik Universitas Pasundan di tingkat nasional maupun internasional.",
          },
        },
        {
          path: "/tenaga-pengajar",
          name: "tenaga",
          component: () => import("@/views/tenaga/Tenaga.vue"),
          meta: {
            pageTitle: "Tenaga & Pelajar",
            description: "Profil tenaga pengajar dan civitas akademika Fakultas Teknik Universitas Pasundan yang berpengalaman dan berdedikasi.",
          },
        },
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
    {
      path: '/prodi',
      name: 'prodi',
      component: () => import('@/views/prodi/ProdiView.vue'),
      meta: {
        pageTitle: "Program Studi",
        description: "Daftar program studi di Fakultas Teknik Universitas Pasundan. Pilih jurusan teknik terbaik sesuai minat dan karir impian Anda.",
      },
    },
    {
      path: '/prodi/:slug',
      name: 'prodiDetail',
      component: () => import('@/views/prodiDetail/ProdiDetail.vue'),
      meta: {
        pageTitle: "Prodi Detail",
        description: "Informasi lengkap program studi di Fakultas Teknik Universitas Pasundan — kurikulum, prospek karir, dan keunggulan jurusan.",
      },
    },
    {
      path: '/berita',
      name: 'berita',
      component: () => import('@/views/berita/BeritaView.vue'),
      meta: {
        pageTitle: "Berita",
        description: "Berita terbaru seputar kegiatan, prestasi, dan informasi akademik Fakultas Teknik Universitas Pasundan.",
      },
    },
    {
      path: '/berita/:slug',
      name: 'beritaDetail',
      component: () => import('@/views/beritaDetail/BeritaDetail.vue'),
      meta: {
        pageTitle: "Berita Detail",
        description: "Baca berita lengkap dari Fakultas Teknik Universitas Pasundan.",
      },
    },
    {
      path: '/kontak',
      name: 'kontak',
      component: () => import('@/views/kontak/KontakView.vue'),
      meta: {
        pageTitle: "Kontak",
        description: "Hubungi Fakultas Teknik Universitas Pasundan — alamat, nomor telepon, email, dan formulir kontak tersedia untuk Anda.",
      },
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('@/views/Faq/Faq.vue'),
      meta: {
        pageTitle: "FAQ",
        description: "Pertanyaan yang sering diajukan seputar Fakultas Teknik Universitas Pasundan — penerimaan mahasiswa, akademik, dan lainnya.",
      },
    },
    {
      path: '/kemahasiswaan-dan-alumni',
      name: 'kegiatan',
      component: () => import('@/views/kegiatan/Kegiatan.vue'),
      meta: {
        pageTitle: "Kemahasiswaan & Alumni",
        description: "Kegiatan dan organisasi mahasiswa Fakultas Teknik Universitas Pasundan — UKM, himpunan, dan berbagai aktivitas kampus.",
      },
    },
    {
      path: '/kemahasiswaan-dan-alumni/kehidupan',
      name: 'kehidupan',
      component: () => import('@/views/kehidupan/Kehidupan.vue'),
      meta: {
        pageTitle: "Peraturan Akademik",
        description: "Informasi lengkap mengenai peraturan akademik di Fakultas Teknik Universitas Pasundan.",
      },
    },
    {
      path: '/kemahasiswaan-dan-alumni/karir',
      name: 'karir-alumni',
      component: () => import('@/views/karier/Karier.vue'),
      meta: {
        pageTitle: "Karir Alumni Teknik UNPAS",
        description: "Jelajahi peluang karir alumni Fakultas Teknik Universitas Pasundan. Temukan bagaimana lulusan UNPAS bersaing di industri teknik nasional dan internasional.",
      },
    },
    {
      path: '/kemahasiswaan-dan-alumni/tokang',
      name: 'tokang',
      component: () => import('@/views/kemahasiswaaan/Tokang.vue'),
      meta: {
        pageTitle: "Peraturan Akademik",
        description: "Informasi lengkap mengenai peraturan akademik di Fakultas Teknik Universitas Pasundan.",
      },
    },
    {
      path: '/kemahasiswaan-dan-alumni/organisasi/:slug',
      name: 'organisasi-detail',
      component: () => import('@/views/organisasiDetail/OrganisasiDetail.vue'),
      meta: {
        pageTitle: "Organisasi Mahasiswa",
        description: "Informasi lengkap mengenai organisasi mahasiswa di Fakultas Teknik Universitas Pasundan.",
      },
    },
    {
      path: '/kemahasiswaan-dan-alumni/ikaft-alumni',
      name: 'ikaft-alumni',
      component: () => import('@/views/ikaft/IkaFt.vue'),
      meta: {
        pageTitle: "IKA FT",
        description: "Informasi tentang Ikatan Alumni Fakultas Teknik Universitas Pasundan.",
      },
    },
    {
      path: '/pengabdian-masyarakat',
      name: 'pengabdian-masyarakat',
      component: () => import('@/views/pengabdian-masyarakat/PengabdianMasyarakatView.vue'),
      meta: {
        title: 'Pengabdian Masyarakat - Fakultas Teknik UNPAS',
        description: 'Program pengabdian kepada masyarakat oleh dosen dan mahasiswa Fakultas Teknik Universitas Pasundan.',
      },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const pageTitle = to.meta.pageTitle as string | undefined
  const description = to.meta.description as string | undefined

  const fullTitle = pageTitle
    ? `${pageTitle} - ${SITE_NAME}`
    : SITE_NAME

  const metaDesc = description ?? `Fakultas Teknik Universitas Pasundan — program studi unggulan bidang teknik, riset dan inovasi, fasilitas modern, serta lulusan siap kerja di era industri.`

  document.title = fullTitle

  setMeta('description', metaDesc)
  setMeta('og:title', fullTitle, 'property')
  setMeta('og:description', metaDesc, 'property')
  setMeta('og:url', `${BASE_URL}${to.fullPath}`, 'property')
  setMeta('twitter:title', fullTitle)
  setMeta('twitter:description', metaDesc)
  setCanonical(to.path)

  ApiService.setHeader();

  if (to.meta.middleware == "auth") {
    if (isExpired()) {
      destroyToken();
      destroyExpDt();
      next({ name: "sign-in" });
      const { default: Swal } = await import('sweetalert2');
      Swal.fire({
        title: "Session Ended",
        text: "Session Ended, please relogin.",
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "OK",
        heightAuto: false,
        customClass: {
          confirmButton: "btn fw-semibold btn-light-danger",
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router