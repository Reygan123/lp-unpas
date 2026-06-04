import Agenda from '@/views/agenda/Agenda.vue'
import AgendaDetail from '@/views/agendaDetail/AgendaDetail.vue'
import Berita from '@/views/berita/BeritaView.vue'
import BeritaDetail from '@/views/beritaDetail/BeritaDetail.vue'
import Faq from '@/views/Faq/Faq.vue'
import Kegiatan from '@/views/kegiatan/Kegiatan.vue'
import Kontak from '@/views/kontak/KontakView.vue'
import Prodi from '@/views/prodi/ProdiView.vue'
import ProdiDetail from '@/views/prodiDetail/ProdiDetail.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ApiService from "@/core/services/ApiService";
import { destroyExpDt, destroyToken } from "@/core/services/JwtService";
import { isExpired } from '@/stores/auth';
import Swal from 'sweetalert2';

const BASE_URL = 'https://ft.unpas.ac.id'
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
          path: "/tentang-fakultas",
          name: "tentang-fakultas",
          component: () => import("@/views/tentang-fakultas/TentangFakultas.vue"),
          meta: {
            pageTitle: "Tentang Fakultas",
            description: "Kenali lebih dalam Fakultas Teknik Universitas Pasundan — visi, misi, sejarah, dan komitmen kami dalam mencetak insinyur berkualitas.",
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
          path: "/riset-dan-inovasi",
          name: "riset-dan-inovasi",
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
      component: Prodi,
      meta: {
        pageTitle: "Program Studi",
        description: "Daftar program studi di Fakultas Teknik Universitas Pasundan. Pilih jurusan teknik terbaik sesuai minat dan karir impian Anda.",
      },
    },
    {
      path: '/prodi/:slug',
      name: 'prodiDetail',
      component: ProdiDetail,
      meta: {
        pageTitle: "Prodi Detail",
        description: "Informasi lengkap program studi di Fakultas Teknik Universitas Pasundan — kurikulum, prospek karir, dan keunggulan jurusan.",
      },
    },
    {
      path: '/berita',
      name: 'berita',
      component: Berita,
      meta: {
        pageTitle: "Berita",
        description: "Berita terbaru seputar kegiatan, prestasi, dan informasi akademik Fakultas Teknik Universitas Pasundan.",
      },
    },
    {
      path: '/berita/:slug',
      name: 'beritaDetail',
      component: BeritaDetail,
      meta: {
        pageTitle: "Berita Detail",
        description: "Baca berita lengkap dari Fakultas Teknik Universitas Pasundan.",
      },
    },
    {
      path: '/kontak',
      name: 'kontak',
      component: Kontak,
      meta: {
        pageTitle: "Kontak",
        description: "Hubungi Fakultas Teknik Universitas Pasundan — alamat, nomor telepon, email, dan formulir kontak tersedia untuk Anda.",
      },
    },
    {
      path: '/agenda',
      name: 'agenda',
      component: Agenda,
      meta: {
        pageTitle: "Agenda",
        description: "Jadwal agenda dan acara Fakultas Teknik Universitas Pasundan — seminar, workshop, dan kegiatan akademik terkini.",
      },
    },
    {
      path: '/agenda/:slug',
      name: 'agendaDetail',
      component: AgendaDetail,
      meta: {
        pageTitle: "Agenda Detail",
        description: "Detail agenda dan acara Fakultas Teknik Universitas Pasundan.",
      },
    },
    {
      path: '/faq',
      name: 'faq',
      component: Faq,
      meta: {
        pageTitle: "FAQ",
        description: "Pertanyaan yang sering diajukan seputar Fakultas Teknik Universitas Pasundan — penerimaan mahasiswa, akademik, dan lainnya.",
      },
    },
    {
      path: '/kegiatan',
      name: 'kegiatan',
      component: Kegiatan,
      meta: {
        pageTitle: "Kegiatan Mahasiswa",
        description: "Kegiatan dan organisasi mahasiswa Fakultas Teknik Universitas Pasundan — UKM, himpunan, dan berbagai aktivitas kampus.",
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
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