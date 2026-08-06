<script setup lang="ts">
import { computed } from 'vue';
import { CalendarDays, Building2 } from 'lucide-vue-next';

const props = defineProps<{
  activity: any[];
  isLoading: boolean;
}>();

const kategoriLabel: Record<string, string> = {
  kegiatan_kemahasiswaan: 'Kegiatan Kemahasiswaan',
  seminar: 'Seminar',
  pengabdian: 'Pengabdian Masyarakat',
  lomba: 'Lomba',
};

const baseUrl = import.meta.env.VITE_APP_IMG_URL

const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) return ''
  return `${baseUrl}/${imagePath}`
}

const activities = computed(() => {
  return (props.activity || []).map((item: any) => ({
    id: item.id,
    slug: item.slug,
    judul: item.judul,
    gambar: getImageUrl(item.gambar),
    tanggal: new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    penyelenggara: item.penyelenggara,
    kategori: kategoriLabel[item.kategori] || item.kategori,
    ringkasan: item.ringkasan,
  }));
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="font-sora text-xl lg:text-2xl font-bold text-text border-l-4 border-colorPrimary pl-3">
        Aktivitas Kampus
      </h2>
      <!-- <router-link
        to="/kemahasiswaan-dan-alumni/aktivitas"
        class="inline-flex items-center gap-1 text-colorPrimary font-semibold text-sm hover:opacity-80 whitespace-nowrap"
      >
        Lihat Semua
        <i class="pi pi-arrow-right text-xs"></i>
      </router-link> -->
    </div>

    <div v-if="isLoading" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 3" :key="n" class="bg-white rounded-xl border border-outline overflow-hidden animate-pulse">
        <div class="w-full aspect-video bg-netral"></div>
        <div class="p-5 flex flex-col gap-2">
          <div class="h-3 w-24 bg-netral rounded"></div>
          <div class="h-4 w-full bg-netral rounded"></div>
          <div class="h-3 w-3/4 bg-netral rounded"></div>
        </div>
      </div>
    </div>

    <div v-else-if="activities.length === 0" class="bg-white rounded-xl border border-outline p-10 text-center">
      <p class="text-desc text-sm">Belum ada aktivitas kampus yang dipublikasikan.</p>
    </div>

    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link
        v-for="item in activities"
        :key="item.id"
        :to="`/kemahasiswaan-dan-alumni/aktivitas/${item.slug}`"
        class="bg-white rounded-xl border border-outline overflow-hidden hover:shadow-md transition flex flex-col"
      >
        <img :src="item.gambar" :alt="item.judul" class="w-full aspect-video object-cover" />
        <div class="p-5 flex flex-col flex-1">
          <span class="inline-block w-fit bg-colorPrimary/10 text-colorPrimary text-[10px] font-semibold px-2 py-0.5 rounded mb-2">
            {{ item.kategori }}
          </span>
          <p class="font-sora font-bold text-text text-sm leading-snug mb-2">
            {{ item.judul }}
          </p>
          <p class="text-desc text-xs leading-relaxed mb-4 flex-1">
            {{ item.ringkasan }}
          </p>
          <div class="flex items-center gap-4 text-desc text-xs pt-3 border-t border-outline">
            <span class="flex items-center gap-1.5">
              <CalendarDays class="w-3.5 h-3.5 shrink-0" />
              {{ item.tanggal }}
            </span>
            <span class="flex items-center gap-1.5">
              <Building2 class="w-3.5 h-3.5 shrink-0" />
              {{ item.penyelenggara }}
            </span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>