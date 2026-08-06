<script setup lang="ts">
import { ref, computed } from "vue";
import { ChevronDown } from "lucide-vue-next";
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
    </div>
  </SectionLayout>
</template>