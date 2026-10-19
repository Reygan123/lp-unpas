<script setup lang="ts">
import { computed } from 'vue';
import TextSection from '@/components/TextSection.vue';
import TitleSection from '@/components/TitleSection.vue';
import type { Faculty } from '@/core/types/fakultas';
import SectionLayout from '@/layouts/SectionLayout.vue';

interface MisiItem {
  title: string;
  description: string;
}

interface ParsedVisiMisi {
  quote: string;
  descriptions: string[];
  intro: string;
  items: MisiItem[];
}

const props = defineProps<{
  fakultas: Faculty | null;
  isLoading?: boolean;
}>();

const cleanText = (value: string | null | undefined) =>
  (value ?? '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();

const parsed = computed<ParsedVisiMisi | null>(() => {
  const html = props.fakultas?.description3 || '';
  if (!html || typeof DOMParser === 'undefined') return null;

  const doc = new DOMParser().parseFromString(html, 'text/html');
  const list = doc.querySelector('ol, ul');
  if (!list) return null;

  const items: MisiItem[] = Array.from(list.querySelectorAll(':scope > li')).map((li) => {
    const strong = li.querySelector('strong, b');
    const title = cleanText(strong?.textContent);
    const full = cleanText(li.textContent);
    const description = title ? cleanText(full.replace(title, '')) : '';
    return { title: title || full, description };
  });

  const paragraphs = Array.from(doc.body.children)
    .filter((el) => el.tagName === 'P')
    .map((p) => ({
      text: cleanText(p.textContent),
      hasEm: !!p.querySelector('em, i'),
    }))
    .filter((p) => p.text);

  const misiIndex = paragraphs.findIndex((p) => /^misi/i.test(p.text));
  const visiParagraphs = misiIndex === -1 ? paragraphs : paragraphs.slice(0, misiIndex);
  const misiParagraphs = misiIndex === -1 ? [] : paragraphs.slice(misiIndex + 1);

  const foundQuote = visiParagraphs.findIndex((p) => p.hasEm);
  const quoteIndex = foundQuote === -1 ? 0 : foundQuote;
  const quote = (visiParagraphs[quoteIndex]?.text ?? '').replace(/^[\u201C\u201D"]+|[\u201C\u201D"]+$/g, '');

  if (!quote || items.length === 0) return null;

  return {
    quote,
    descriptions: visiParagraphs.filter((_, i) => i !== quoteIndex).map((p) => p.text),
    intro: misiParagraphs.map((p) => p.text).join(' '),
    items,
  };
});
</script>

<template>
  <SectionLayout>
    <div class="w-full mx-auto space-y-8 md:space-y-10 lg:space-y-12">
      <div class="space-y-4">
        <TitleSection text="Visi dan Misi <br/> Fakultas Teknik" :html="true" class="text-center lg:w-1/2 mx-auto"></TitleSection>
  
        <div v-if="parsed" class="w-full lg:w-[70%] mx-auto space-y-8 md:space-y-10 lg:space-y-12">
          <div class="flex flex-col items-center text-center gap-3 md:gap-4">
            <div class="w-11 h-11 md:w-14 md:h-14 rounded-full bg-colorPrimary/10 text-colorPrimary flex items-center justify-center">
              <svg class="w-5 h-5 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5" />
                <path d="M19 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5" />
              </svg>
            </div>
  
            <span class="inline-block bg-colorPrimary text-white text-[12px] md:text-[14px] font-bold px-4 py-1 rounded-full">
              Visi
            </span>
  
            <p class="text-[16px] md:text-[20px] lg:text-[24px] font-bold leading-snug text-[#1a1a1a]">
              {{ parsed.quote }}
            </p>
  
            <TextSection v-for="(text, i) in parsed.descriptions" :key="i" :align-text="'text-center'"
              class="text-gray-600">
              {{ text }}
            </TextSection>
          </div>
  
          <div class="space-y-4 md:space-y-5">
            <div class="flex flex-col items-center text-center gap-2 md:gap-3">
              <span class="inline-block bg-colorPrimary text-white text-[12px] md:text-[14px] font-bold px-4 py-1 rounded-full">
                Misi
              </span>
              <TextSection v-if="parsed.intro" :align-text="'text-center'" class="text-gray-600">
                {{ parsed.intro }}
              </TextSection>
            </div>
  
            <div class="flex flex-col gap-3 md:gap-4">
              <div v-for="(item, index) in parsed.items" :key="index"
                class="flex items-start md:items-center gap-3 md:gap-4 bg-white border border-gray-200 rounded-[16px] md:rounded-[24px] p-3 md:p-4">
                <div
                  class="shrink-0 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl bg-colorPrimary/10 text-colorPrimary flex items-center justify-center text-[14px] md:text-[16px] lg:text-[18px] font-bold">
                  {{ String(index + 1).padStart(2, '0') }}
                </div>
                <div class="space-y-1">
                  <h3 class="text-[14px] md:text-[16px] lg:text-[18px] font-bold leading-snug text-[#1a1a1a]">
                    {{ item.title }}
                  </h3>
                  <p v-if="item.description" class="text-[12px] md:text-[14px] lg:text-[16px] leading-relaxed text-gray-600">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TextSection v-else class="lg:w-[70%] mx-auto text-center">
          <span v-html="fakultas?.description3"></span>
        </TextSection>
      </div>

    </div>
  </SectionLayout>
</template>