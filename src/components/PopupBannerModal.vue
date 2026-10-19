<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import PopupBannerService from '@/core/services/PopupBannerService';

interface PopupData {
  id: number;
  title: string;
  image: string;
  link?: string | null;
  is_active: boolean;
}

const isVisible = ref(false);
const banner = ref<PopupData | null>(null);
const dontShowToday = ref(false);

const baseUrl = import.meta.env.VITE_APP_IMG_URL || 'http://127.0.0.1:8000/storage';

const getBannerImageUrl = (image: string) => {
  if (!image) return '';
  if (/^https?:\/\//i.test(image)) return image;
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanPath = image.startsWith('/') ? image.slice(1) : image;
  return `${cleanBase}/${cleanPath}`;
};

const closePopup = () => {
  isVisible.value = false;
  try {
    sessionStorage.setItem('has_seen_popup_banner', 'true');
    if (dontShowToday.value) {
      const tomorrow = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('popup_banner_hide_until', String(tomorrow));
    }
  } catch (e) {
    // ignore storage errors
  }
};

const handleBannerClick = () => {
  if (banner.value?.link) {
    window.open(banner.value.link, '_blank', 'noopener,noreferrer');
  }
  closePopup();
};

const handleOverlayClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    closePopup();
  }
};

// Lock scroll saat popup aktif
watch(isVisible, (val) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = val ? 'hidden' : '';
  }
});

onMounted(async () => {
  try {
    // Cek apakah sudah pernah ditutup dalam sesi ini
    const hasSeenThisSession = sessionStorage.getItem('has_seen_popup_banner');
    if (hasSeenThisSession) return;

    // Cek apakah user mencentang 'jangan tampilkan hari ini'
    const hideUntil = localStorage.getItem('popup_banner_hide_until');
    if (hideUntil && Number(hideUntil) > Date.now()) return;

    const response = await PopupBannerService.getBanner();
    if (response.data && response.data.active && response.data.data) {
      banner.value = response.data.data;
      // Beri sedikit jeda waktu agar transisi halus setelah halaman termuat
      setTimeout(() => {
        isVisible.value = true;
      }, 700);
    }
  } catch (error) {
    // Fail silently if API fails or backend is unreachable
    console.debug('Popup banner check:', error);
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isVisible && banner"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/65 backdrop-blur-sm p-4"
        @click="handleOverlayClick"
      >
        <Transition name="scale">
          <div
            v-if="isVisible"
            class="relative bg-white rounded-2xl shadow-2xl w-[95vw] sm:w-[90vw] md:w-[88vw] max-w-lg sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-[92vh] flex flex-col overflow-hidden border border-white/20 animate-in"
          >
            <!-- Tombol Close (X) -->
            <button
              @click="closePopup"
              class="absolute top-3.5 right-3.5 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-all shadow-lg hover:scale-110 backdrop-blur-sm"
              aria-label="Tutup Banner"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Banner Content -->
            <div
              :class="[banner.link ? 'cursor-pointer group' : '']"
              @click="banner.link ? handleBannerClick() : null"
              class="relative flex items-center justify-center bg-gray-50 flex-1 overflow-hidden"
            >
              <img
                :src="getBannerImageUrl(banner.image)"
                :alt="banner.title"
                class="w-full h-auto max-h-[80vh] object-contain mx-auto transition-transform duration-300 group-hover:scale-[1.008]"
              />

              <!-- Hover Link Badge jika ada tautan -->
              <div
                v-if="banner.link"
                class="absolute bottom-4 right-4 bg-colorPrimary text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full shadow-xl flex items-center gap-2 opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all"
              >
                <span>Lihat Promo</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>

            <!-- Footer Pop-up: Checkbox Jangan tampilkan lagi & Tombol Tutup -->
            <div class="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
              <label class="inline-flex items-center gap-2 cursor-pointer select-none hover:text-gray-900">
                <input
                  type="checkbox"
                  v-model="dontShowToday"
                  class="rounded border-gray-300 text-colorPrimary focus:ring-colorPrimary"
                />
                <span>Jangan tampilkan lagi hari ini</span>
              </label>

              <button
                @click="closePopup"
                class="font-medium text-gray-500 hover:text-gray-800 transition-colors px-2 py-1"
              >
                Tutup
              </button>
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
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.scale-leave-active {
  transition: all 0.25s ease-in;
}
.scale-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}
.scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
