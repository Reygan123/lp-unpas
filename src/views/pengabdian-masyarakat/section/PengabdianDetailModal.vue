<!-- src/views/pengabdian-masyarakat/section/PengabdianDetailModal.vue -->
<script setup lang="ts">
import { watch } from 'vue';
import MediaVideoPlayer from '@/components/MediaVideoPlayer.vue';
// import type { Pengabdian } from '@/core/types/pengabdian';

const props = defineProps<{
  item: any | null;
}>();

const emit = defineEmits<{
  close: [];
}>();

// Lock scroll body saat modal terbuka
watch(() => props.item, (val) => {
  document.body.style.overflow = val ? 'hidden' : '';
});

const handleOverlayClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) emit('close');
};

const formatDate = (date: string | null) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="item"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
        @click="handleOverlayClick"
      >
        <Transition name="scale">
          <div
            v-if="item"
            class="relative bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl shadow-xl"
          >
            <!-- Tombol close -->
            <button
              @click="emit('close')"
              class="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-md transition-colors"
              aria-label="Tutup"
            >
              <span class="pi pi-times text-gray-600"></span>
            </button>

            <div class="w-full h-64 md:h-80 rounded-t-2xl overflow-hidden bg-black/5">
              <MediaVideoPlayer
                :video="item.video"
                :poster="item.gambar"
                :autoplay="true"
                :muted="true"
                :loop="true"
                :controls="true"
                class-name="w-full h-full object-cover"
              />
            </div>

            <div class="p-6 md:p-8">
              <span class="inline-block text-xs font-semibold text-colorPrimary bg-colorPrimary/10 px-3 py-1 rounded-full mb-4">
                {{ item.kategori }}
              </span>

              <h2 class="text-xl md:text-2xl font-bold text-[#444444] mb-4 leading-snug">
                {{ item.judul }}
              </h2>

              <p class="text-sm md:text-base text-gray-600 leading-relaxed mb-6">
                {{ item.deskripsi }}
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm border-t border-gray-100 pt-5">
                <div>
                  <p class="font-medium text-gray-500 mb-1">Lokasi</p>
                  <p class="text-gray-700">{{ item.lokasi }}</p>
                </div>
                <div>
                  <p class="font-medium text-gray-500 mb-1">Tanggal</p>
                  <p class="text-gray-700">{{ formatDate(item.tanggal) }}</p>
                </div>
                <div>
                  <p class="font-medium text-gray-500 mb-1">Program Studi Terlibat</p>
                  <ul class="text-gray-700 list-disc list-inside">
                    <li v-for="prodi in item.prodi" :key="prodi">{{ prodi }}</li>
                  </ul>
                </div>
                <div>
                  <p class="font-medium text-gray-500 mb-1">Tim Dosen</p>
                  <ul class="text-gray-700 list-disc list-inside">
                    <li v-for="dosen in item.dosenPenanggungJawab" :key="dosen">{{ dosen }}</li>
                  </ul>
                </div>
              </div>

<a
                v-if="item.sumber"
                :href="item.sumber"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 mt-6 text-sm font-medium text-colorPrimary hover:underline"
              >
                Baca berita lengkap
                <span class="pi pi-external-link text-xs"></span>
              </a>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.scale-enter-from,
.scale-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
</style>