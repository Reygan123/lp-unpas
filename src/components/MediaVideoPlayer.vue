<script setup lang="ts">
import { computed } from 'vue';
import { getVideoType, getVideoUrl, getInstagramEmbedUrl, getYouTubeEmbedUrl } from '@/core/helpers/videoHelper';

const props = withDefaults(defineProps<{
  video?: string | null;
  poster?: string | null;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
}>(), {
  video: null,
  poster: null,
  autoplay: true,
  controls: true,
  loop: true,
  muted: true,
  className: 'w-full h-full object-cover',
});

const videoType = computed(() => getVideoType(props.video));
const resolvedVideoUrl = computed(() => getVideoUrl(props.video));
const instagramEmbedUrl = computed(() => props.video ? getInstagramEmbedUrl(props.video) : null);
const youtubeEmbedUrl = computed(() => props.video ? getYouTubeEmbedUrl(props.video) : null);
</script>

<template>
  <div class="relative w-full h-full overflow-hidden flex items-center justify-center bg-black/5">
    <!-- Uploaded Video (Autoplay supported by HTML5) -->
    <video
      v-if="videoType === 'upload' && resolvedVideoUrl"
      :src="resolvedVideoUrl"
      :poster="poster || undefined"
      :autoplay="autoplay"
      :muted="muted"
      :loop="loop"
      :controls="controls"
      playsinline
      :class="className"
    ></video>

    <!-- Instagram Embed -->
    <div
      v-else-if="videoType === 'instagram' && instagramEmbedUrl"
      class="w-full h-full min-h-[320px] flex items-center justify-center bg-white"
    >
      <iframe
        :src="instagramEmbedUrl"
        class="w-full h-full min-h-[320px] border-0 rounded-lg"
        frameborder="0"
        scrolling="no"
        allowtransparency="true"
      ></iframe>
    </div>

    <!-- YouTube Embed -->
    <div
      v-else-if="videoType === 'youtube' && youtubeEmbedUrl"
      class="w-full h-full min-h-[240px] flex items-center justify-center bg-black"
    >
      <iframe
        :src="youtubeEmbedUrl"
        class="w-full h-full border-0 rounded-lg"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <!-- Fallback Gambar Cover -->
    <img
      v-else-if="poster"
      :src="poster"
      alt="Cover media"
      :class="className"
      loading="lazy"
    />

    <!-- Fallback Kosong jika tidak ada video maupun poster -->
    <div v-else class="w-full h-full flex items-center justify-center text-gray-400 text-xs">
      Tidak ada media
    </div>
  </div>
</template>
