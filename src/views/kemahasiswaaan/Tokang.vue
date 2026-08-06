<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
import TokangHero from './sections/TokangHero.vue';
import TujuanProgram from './sections/TujuanProgram.vue';
import FilterAngkatan from './sections/FilterAngkatan.vue';
import DaftarAngkatan from './sections/DaftarAngkatan.vue';
import TokangSidebar from './sections/TokangSidebar.vue';
// import TokangCta from './sections/TokangCta.vue';
import { useTokangStore } from '@/stores/tokang.ts';
import { computed, onMounted, ref } from 'vue';
import CTASection from '@/components/sections/CTASection.vue';

const tokangStore = useTokangStore();
const isLoading = ref(true);

const filters = ref({
  unit: 'Semua Unit',
  tahun: 'Semua Tahun',
  prodi: 'Semua Program Studi',
  status: 'Semua Status',
  search: '',
});

const unitOptions = computed(() => {
  const unique = Array.from(new Set((tokangStore.tokang || []).map((item: any) => item.departement?.name).filter(Boolean)));
  return ['Semua Unit', ...unique];
});

const tahunOptions = computed(() => {
  const unique = Array.from(new Set((tokangStore.tokang || []).map((item: any) => item.angkatan).filter(Boolean))).sort((a: any, b: any) => b - a);
  return ['Semua Tahun', ...unique];
});

const prodiOptions = computed(() => {
  const unique = Array.from(new Set((tokangStore.tokang || []).map((item: any) => item.departement?.name).filter(Boolean)));
  return ['Semua Program Studi', ...unique];
});

const filteredTokang = computed(() => {
  return (tokangStore.tokang || []).filter((item: any) => {
    const matchUnit = filters.value.unit === 'Semua Unit' || item.departement?.name === filters.value.unit;
    const matchTahun = filters.value.tahun === 'Semua Tahun' || String(item.angkatan) === String(filters.value.tahun);
    const matchProdi = filters.value.prodi === 'Semua Program Studi' || item.departement?.name === filters.value.prodi;
    const matchStatus =
      filters.value.status === 'Semua Status' ||
      (filters.value.status === 'On Duty' && item.status_on_duty) ||
      (filters.value.status === 'Tidak Aktif' && !item.status_on_duty) ||
      filters.value.status === 'Standby';
    const matchSearch =
      !filters.value.search ||
      item.nama?.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      String(item.angkatan).includes(filters.value.search) ||
      item.kontak?.includes(filters.value.search);

    return matchUnit && matchTahun && matchProdi && matchStatus && matchSearch;
  });
});

onMounted(async () => {
  try {
    await Promise.all([
      tokangStore.fetchTokang(),
    ]);
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <MainLayout>
    <TokangHero />
    <TujuanProgram />
    <FilterAngkatan
      v-model:unit="filters.unit"
      v-model:tahun="filters.tahun"
      v-model:prodi="filters.prodi"
      v-model:status="filters.status"
      v-model:search="filters.search"
      :unit-options="unitOptions"
      :tahun-options="tahunOptions"
      :prodi-options="prodiOptions"
    />

    <div
      class="w-full px-[20px] py-[10px] md:px-[60px] md:py-[20px] lg:px-[120px] lg:py-[20px] space-y-4 md:space-y-4 lg:space-y-4">
      <div class="grid lg:grid-cols-3 gap-6 items-start pb-8">
        <div class="lg:col-span-2">
          <DaftarAngkatan :data="filteredTokang" :is-loading="isLoading" />
        </div>
        <TokangSidebar />
      </div>
    </div>

    <!-- <TokangCta /> -->
    <CTASection />
  </MainLayout>
</template>