// src/views/pengabdian-masyarakat/data/pengabdian-data.ts
// import type { Pengabdian } from '@/core/types/pengabdian';

// import ImgBeber from '@/assets/pengabdian/pengabdian-beber-sorgum.jpg';

export const pengabdianData: any[] = [
  {
    id: 1,
    judul: 'Kerja Sama Pengembangan Sorgum sebagai Ikon Unggulan Desa Beber',
    kategori: 'Pemberdayaan Ekonomi',
    lokasi: 'Desa Beber, Kecamatan Beber, Kabupaten Cirebon',
    tanggal: '21 Juli 2026',
    deskripsi: 'Fakultas Teknik UNPAS menjalin kerja sama resmi dengan Pemerintah Desa Beber melalui penandatanganan Perjanjian Kerja Sama, dengan fokus mengembangkan sorgum sebagai komoditas unggulan sekaligus penggerak ekonomi desa. Tim lintas bidang keilmuan memberikan pendampingan mulai dari budidaya, pengelolaan sumber daya air dan lingkungan, pengolahan hasil, digitalisasi tata kelola, hingga branding dan pemasaran, bekerja sama dengan Kelompok Tani Sorgum Silihwangi dan didukung rencana pelibatan BUMDes ke depannya.',
    gambar: 'https://img.jabartandang.com/2026/07/IMG-20260721-WA0077.jpg',
    dosenPenanggungJawab: [
      'Prof. Dr. Ir. Wisnu Cahyadi, M.Si.',
      'Dr. Ayi Purbasari, S.T., M.T.',
      'Dr. Ir. Riza Fathoni Ishak, M.T.',
      'Prof. Dr. Yonik M. Yustiani, S.T., M.T.',
      'Nabila Marthia, S.T., M.S.IP.',
    ],
    prodi: [
      'Teknologi Pangan',
      'Teknik Lingkungan dan Sumber Daya Air',
      'Informatika dan Tata Kelola',
      'Teknik Industri',
    ],
    sumber: 'https://jabartandang.com/2026/07/21/fakultas-teknik-unpas-dan-pemerintah-desa-beber-resmi-jalin-kerja-sama-sorgum-diproyeksikan-jadi-ikon-unggulan-desa/',
  },
];

export const pengabdianKategori: string[] = [
  'Semua',
  'Edukasi',
  'Pemberdayaan Ekonomi',
  'Lingkungan',
  'Kesehatan',
];