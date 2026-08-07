<script setup lang="ts">
import { ref, computed } from "vue";
import { ChevronDown, HelpCircle } from "lucide-vue-next";
import SectionLayout from "@/layouts/SectionLayout.vue";

const props = defineProps<{
  faq: any[];
}>();

const filteredFaqs = computed(() => {
  return props.faq
    .filter(item => 
      item.category_name.toLowerCase().includes("program") || 
      item.category_name.toLowerCase().includes("biaya")
    )
    .map(item => ({
      q: item.question,
      a: item.answer.replace(/<[^>]*>/g, '')
    }));
});

const openIndex = ref<number | null>(null);

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>

<template>
  <SectionLayout id="faq">
    <h2
      class="font-sora text-xl lg:text-2xl font-bold text-text border-l-4 border-colorPrimary pl-3 mb-6"
    >
      FAQ
    </h2>

    <div class="bg-white rounded-xl border border-outline divide-y divide-outline">
      <div v-for="(item, index) in filteredFaqs" :key="item.q">
        <button
          class="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
          @click="toggle(index)"
        >
          <span class="text-text text-sm font-semibold">{{ item.q }}</span>
          <ChevronDown
            class="w-4 h-4 text-colorPrimary shrink-0 transition-transform duration-300"
            :class="{ 'rotate-180': openIndex === index }"
          />
        </button>
        <div v-show="openIndex === index" class="px-5 pb-4">
          <p class="text-desc text-sm leading-relaxed" v-html="item.a"></p>
        </div>
      </div>

      <div
        v-if="!filteredFaqs || filteredFaqs.length === 0"
        class="flex flex-col items-center justify-center text-center py-12"
      >
        <div class="w-12 h-12 rounded-lg bg-colorPrimary/10 flex items-center justify-center mb-3">
          <HelpCircle class="w-6 h-6 text-colorPrimary" stroke-width="1.5" />
        </div>
        <p class="font-sora font-bold text-text text-sm mb-1">Belum Ada FAQ</p>
        <p class="text-desc text-xs">Pertanyaan yang sering diajukan akan muncul di sini</p>
      </div>
    </div>
  </SectionLayout>
</template>