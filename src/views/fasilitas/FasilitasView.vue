<script setup lang="ts">
import { berandaStore } from '@/stores'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import FasilitasHero from './sections/FasilitasHero.vue'
import FasilitasList from './sections/FasilitasList.vue'
import CTASection from '@/components/sections/CTASection.vue'
import { useDepartementStore } from '@/stores/departement.ts'

const router = useRouter()
const departementStore = useDepartementStore()

onMounted(async () => {
  if (router.currentRoute.value.name == 'beranda') {
    await berandaStore.getDataFasilitas(true)
  } else {
    await berandaStore.getDataFasilitas()
  }
  await departementStore.fetchDepartements()
})
</script>
<template>
  <MainLayout>
    <FasilitasHero />
    <FasilitasList
      :fasilitas="berandaStore.fasilitasData"
      :departements="departementStore.departements"
    />
    <CTASection />
  </MainLayout>
</template>