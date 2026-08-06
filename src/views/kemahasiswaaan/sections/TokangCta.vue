<script setup lang="ts">
import { Phone, ListChecks } from 'lucide-vue-next';
</script>

<template>
  <section class="bg-colorPrimary">
    <div class="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-white font-semibold text-center sm:text-left">
        Bersama membangun komunikasi, kepedulian, dan solidaritas antar generasi FT Unpas.
      </p>
      <div class="flex items-center gap-3 shrink-0">
        <button class="inline-flex items-center gap-2 bg-white text-colorPrimary font-semibold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition">
          <Phone class="w-4 h-4" />
          Hubungi Admin
        </button>
        <button class="inline-flex items-center gap-2 bg-white/10 text-white border border-white/40 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-white/20 transition">
          <ListChecks class="w-4 h-4" />
          Lihat Semua Angkatan
        </button>
      </div>
    </div>
  </section>
</template>