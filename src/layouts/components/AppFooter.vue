<template>
  <div class="p-4 md:p-6 lg:p-6 w-full mb-20 md:mb-0">
    <footer
      :class="[
        'w-full text-white p-6 mx-auto rounded-[16px] shadow-lg relative overflow-hidden bg-colorPrimary'
      ]"
    >
      <div class="absolute inset-0 bg-black/65 pointer-events-none"></div>
      <div class="absolute top-0 -right-20 h-full opacity-50 pointer-events-none">
        <img
          :src="LogoOutline"
          alt="Logo Outline Unpas"
          width="530"
          height="486"
          loading="lazy"
          decoding="async"
          class="h-full w-auto object-contain object-right"
        />
      </div>

      <div class="max-w-full mx-auto flex flex-col gap-6 relative z-10">
        <div class="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-16">
          <div class="flex flex-col gap-4 w-full md:w-auto lg:w-[60%]">
            <img :src="Logo" alt="Logo Universitas Pasundan" width="64" height="64" class="w-16 h-16" loading="lazy" decoding="async" />
            <h3 class="text-white text-2xl md:text-3xl font-bold">Terhubung Dengan Kami</h3>
            <div class="flex gap-4">
              <a
                v-for="social in socialMedia"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="social.name"
                class="text-white hover:text-[#FEF251] transition-colors duration-200"
              >
                <component :is="social.icon" :size="20" />
              </a>
            </div>
          </div>

          <!-- Navigation Links -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 w-full">
            <!-- Navigation -->
            <div class="flex flex-col gap-3">
              <p class="text-white text-lg font-bold">Navigasi</p>
              <nav class="flex flex-col gap-2">
                <a
                  v-for="link in navigationLinks.slice(0, 7)"
                  :key="link.path"
                  :href="link.path"
                  class="text-white text-sm hover:text-[#FEF251] transition-colors duration-200"
                >
                  {{ link.label }}
                </a>
              </nav>
            </div>

            <!-- Legal -->
            <div class="flex flex-col gap-3">
              <!-- <p class="text-white text-lg font-bold">Legal</p> -->
              <div class="mt-[23px]"></div>
              <nav class="flex flex-col gap-2">
                <a
                  v-for="link in navigationLinks.slice(7, 15)"
                  :key="link.path"
                  :href="link.path"
                  class="text-white text-sm hover:text-[#FEF251] transition-colors duration-200"
                >
                  {{ link.label }}
                </a>
              </nav>
            </div>

            <!-- Location -->
            <div class="flex flex-col gap-3">
              <p class="text-white text-lg font-bold">Lokasi</p>
              <div class="flex flex-col gap-2">
                <div
                  v-for="campus in campuses.slice(0, 1)"
                  :key="campus.name"
                  class="flex flex-col"
                >
                  <p class="text-white text-sm">{{ campus.address }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Copyright -->
        <div class="w-full p-3 bg-[#FEF251] rounded-2xl text-center mt-4">
          <p class="text-[#1A1A1A] text-sm md:text-md font-medium">
            © {{ new Date().getFullYear() }} Fakultas Teknik Universitas Pasundan Copyright and rights reserved
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/assets/logo.webp'
import LogoOutline from '@/assets/logo-outline1.png'
import { Twitter, Instagram, Facebook, Youtube } from 'lucide-vue-next'
import { h } from 'vue'

const TiktokIcon = {
  name: 'TiktokIcon',
  props: {
    size: {
      type: [Number, String],
      default: 20,
    },
  },
  setup(props: { size: number | string }) {
    return () =>
      h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          width: props.size,
          height: props.size,
          viewBox: '0 0 24 24',
          fill: 'currentColor',
        },
        [
          h('path', {
            d: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z',
          }),
        ],
      )
  },
}

const socialMedia = [
  { name: 'Twitter', icon: Twitter, url: 'https://x.com/ftunpas' },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://www.instagram.com/fakultasteknikunpas/?hl=id',
  },
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://web.facebook.com/ftunpas/?locale=id_ID&_rdc=1&_rdr#',
  },
  { name: 'TikTok', icon: TiktokIcon, url: 'https://www.tiktok.com/@fakultasteknikunpas' },
  {
    name: 'YouTube',
    icon: Youtube,
    url: 'https://youtube.com/@fakultasteknikunpas?si=M_-jvkbjiqgaxcm6',
  },
]

const navigationLinks = [
  { path: '/', label: 'Beranda' },
  { path: '/tentang', label: 'Tentang' },
  { path: '/akademik', label: 'Akademik' },
  { path: '/prodi', label: 'Program Studi' },
  { path: '/prestasi', label: 'Prestasi' },
  { path: '/kemahasiswaan-dan-alumni', label: 'Kegiatan' },
  { path: '/fasilitas', label: 'Fasilitas' },
  { path: '/tenaga-pengajar', label: 'Tenaga Pengajar' },
  { path: '/penelitian', label: 'Penelitian & Inovasi' },
  { path: '/testimoni', label: 'Testimoni' },
  { path: '/kerjasama', label: 'Kerjasama & Mitra' },
  { path: '/berita', label: 'Berita' },
  // { path: '/agenda', label: 'Agenda' },
  { path: '/Faq', label: 'Faq & Bantuan' },
  { path: '/kontak', label: 'Kontak' },
]

const campuses = [
  { name: 'Kampus I', address: 'Jl. Dr. Setiabudi No. 193, Gegerkalong, Sukasari, Kota Bandung, Jawa Barat.' },
  { name: 'Kampus II', address: 'Jl. Tamansari No.6-8' },
  { name: 'Kampus IV', address: 'Jl. Dr. Setiabudhi No.193' },
  { name: 'Kampus V', address: 'Jl. Sumatera No.41' },
]
</script>

<style scoped>
@media (max-width: 640px) {
  .absolute {
    width: 60%;
    opacity: 0.3;
  }
}
</style>