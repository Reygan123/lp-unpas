<script lang="ts" setup>
import InteractiveHoverButton from '@/components/ui/interactive-hover-button/InteractiveHoverButton.vue';
</script>

<template>
  <div class="min-w-full p-0 md:p-4 lg:p-8">
    <svg :style="{ visibility: 'hidden', position: 'absolute' }" width="0" height="0"
      xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>

    <div class="relative w-full h-[80vh] md:h-[426px] lg:h-[656px] overflow-hidden">
      <div class="w-full h-full absolute top-0 left-0 bg-cover bg-top rounded-b-[32px] md:rounded-[24px] lg:rounded-[32px]">
        <div class="w-full h-full z-10 img-container">
          <img src="/Gedung.webp" alt="Gedung" width="1024" height="683" fetchpriority="high" decoding="async" class="w-full h-full object-cover object-[10_10] img-box">
        </div>

        <div class="md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] absolute bottom-0 right-0 md:flex items-center lg:gap-4 hidden">
          <h1 class="w-full text-[20px] md:text-[26px] lg:text-[32px] font-bold leading-tight text-[#444444] text-left">
            Fakultas Teknik Universitas Pasundan
          </h1>

          <div class="flex items-center gap-6">
            <div class="side-arrow">
              <span class="side-arrow__chevron"></span>
              <span class="side-arrow__chevron"></span>
            </div>

            <a href="https://pmb.unpas.ac.id/" target="_blank">
              <InteractiveHoverButton :text="'Daftar Sekarang'" />
            </a>

          </div>
        </div>

        <div class="absolute bottom-0 left-0 hidden md:block">
          <div class="scrolldown">
            <div class="chevrons">
              <div class="chevrondown"></div>
              <div class="chevrondown"></div>
            </div>
          </div>
        </div>

        <div class="md:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 class="text-[20px] md:text-[26px] lg:text-[32px] font-bold leading-tight text-white text-center p-4">
            Fakultas Teknik Universitas Pasundan
          </h1>
        </div>

        <div class="absolute bottom-0 right-0 md:hidden">
          <InteractiveHoverButton :text="'Daftar Sekarang'"></InteractiveHoverButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scopeds>
.img-container {
  filter: url("#goo") drop-shadow(0px -2px 0px transparent)
}

.img-box {
  clip-path: polygon(100% 92%, 70% 92%, 60% 100%, 10% 100%, 0% 92%, 0% 0%, 100% 0%);
}

@media (min-width: 320px) {
  .img-box {
    clip-path: polygon(100% 92%, 60% 92%, 50% 100%, 10% 100%, 0% 90%, 0% 0%, 100% 0%);
  }
}

@media (min-width: 360px) {
  .img-box {
    clip-path: polygon(100% 90%, 65% 90%, 60% 100%, 10% 100%, 0% 92%, 0% 0%, 100% 0%);
  }
}

@media (min-width: 440px) {
  .img-box {
    clip-path: polygon(100% 92%, 70% 92%, 60% 100%, 10% 100%, 0% 92%, 0% 0%, 100% 0%);
  }
}

@media (min-width: 460px) {
  .img-box {
    clip-path: polygon(100% 92%, 75% 92%, 65% 100%, 10% 100%, 0% 92%, 0% 0%, 100% 0%);
  }
}

@media (min-width: 560px) {
  .img-box {
    clip-path: polygon(100% 92%, 78% 92%, 68% 100%, 10% 100%, 0% 92%, 0% 0%, 100% 0%);
  }
}

@media (min-width: 680px) {
  .img-box {
    clip-path: polygon(100% 92%, 80% 92%, 70% 100%, 10% 100%, 0% 92%, 0% 0%, 100% 0%);
  }
}

@media (min-width: 768px) {
  .img-box {
    clip-path: polygon(100% 80%, 20% 80%, 15% 100%, 10% 100%, 0% 75%, 0% 0%, 100% 0%);
  }
}

@media (min-width: 868px) {
  .img-box {
    clip-path: polygon(100% 80%, 20% 80%, 15% 100%, 10% 100%, 0% 75%, 0% 0%, 100% 0%);
  }
}

@media (min-width: 968px) {
  .img-box {
    clip-path: polygon(100% 80%, 20% 80%, 15% 100%, 10% 100%, 0% 70%, 0% 0%, 100% 0%);
  }
}

@media (min-width: 1024px) {
  .img-box {
    clip-path: polygon(100% 85%, 30% 85%, 25% 100%, 8% 100%, 0% 80%, 0% 0%, 100% 0%);
  }
}

@media (min-width: 1124px) {
  .img-box {
    clip-path: polygon(100% 85%, 30% 85%, 25% 100%, 8% 100%, 0% 80%, 0% 0%, 100% 0%);
  }
}

@media (min-width: 1224px) {
  .img-box {
    clip-path: polygon(100% 85%, 30% 85%, 25% 100%, 8% 100%, 0% 80%, 0% 0%, 100% 0%);
  }
}

@media (min-width: 1280px) {
  .img-box {
    clip-path: polygon(100% 85%, 40% 85%, 35% 100%, 8% 100%, 0% 80%, 0% 0%, 100% 0%);
  }
}

@media (min-width: 1400px) {
  .img-box {
    clip-path: polygon(100% 85%, 40% 85%, 35% 100%, 8% 100%, 0% 80%, 0% 0%, 100% 0%);
  }
}

@media (min-width: 1500px) {
  .img-box {
    clip-path: polygon(100% 85%, 50% 85%, 45% 100%, 8% 100%, 0% 80%, 0% 0%, 100% 0%);
  }
}

@media (min-width: 1600px) {
  .img-box {
    clip-path: polygon(100% 85%, 50% 85%, 45% 100%, 8% 100%, 0% 80%, 0% 0%, 100% 0%);
  }
}

@media (min-width: 1700px) {
  .img-box {
    clip-path: polygon(100% 85%, 50% 85%, 45% 100%, 8% 100%, 0% 80%, 0% 0%, 100% 0%);
  }
}

@media (min-width: 768px) {
  .img-container {
    filter: url("#goo") drop-shadow(0px -2px 0px transparent)
  }
}

.scrolldown .chevrons {
  animation: chevron-bounce 1.6s ease-in-out infinite;
}

.scrolldown .chevrondown {
  opacity: 0;
  animation: chevron-fade 1.6s ease-in-out infinite;
}

.scrolldown .chevrondown:nth-child(1) {
  animation-delay: 0s;
}

.scrolldown .chevrondown:nth-child(2) {
  animation-delay: 0.2s;
}

@keyframes chevron-bounce {
  0%, 100% {
    transform: translateY(-4px);
  }
  50% {
    transform: translateY(6px);
  }
}

@keyframes chevron-fade {
  0% {
    opacity: 0;
  }
  40%, 60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.side-arrow {
  display: flex;
  align-items: center;
  animation: side-arrow-move 1.6s ease-in-out infinite;
}

.side-arrow__chevron {
  width: 14px;
  height: 14px;
  margin-left: -6px;
  border-right: 3px solid #f59e0b;
  border-bottom: 3px solid #f59e0b;
  transform: rotate(-45deg);
  opacity: 0;
  animation: side-arrow-fade 1.6s ease-in-out infinite;
}

.side-arrow__chevron:nth-child(2) {
  animation-delay: 0.2s;
}

@keyframes side-arrow-move {
  0%, 100% {
    transform: translateX(-4px);
  }
  50% {
    transform: translateX(6px);
  }
}

@keyframes side-arrow-fade {
  0% {
    opacity: 0;
  }
  40%, 60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>