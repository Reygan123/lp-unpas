<script lang="ts" setup>
import TitleSection from '@/components/TitleSection.vue';
import SectionLayout from '@/layouts/SectionLayout.vue';
import { ref, computed } from 'vue';

/**
 * No new tables, and NO store changes needed either.
 *
 * Just pass the raw array you already fetch for `kurikulums`
 * (e.g. `kurikulumStore.currentKurikulum`) straight into the `kurikulum`
 * prop below — as-is, cards row + the '__kurikulum_detail__' row together.
 * This component finds the '__kurikulum_detail__' row itself and parses
 * its `description` (JSON) into the semester list.
 *
 * If you still want the old "kartu keunggulan" grid elsewhere, filter out
 * the marker row for that component:
 *   cardRows = kurikulums.filter(k => k.title !== '__kurikulum_detail__')
 */
export interface KurikulumMataKuliah {
  no_urut: number;
  kode: string;
  nama: string;
  sks: number;
  status: string;
  nilai_min?: string | null;
  prasyarat?: string | null;
  konsentrasi?: string | null;
}

export interface KurikulumSemester {
  semester_ke: number;
  total_sks: number;
  matakuliah: KurikulumMataKuliah[];
}

// Raw row shape as it comes straight from the `kurikulums` table/API
// (the array you get from kurikulumStore.currentKurikulum).
interface KurikulumRow {
  id: number;
  id_departement: number;
  title: string;
  description: string;
  image?: string | null;
  icon?: string | null;
  home?: string | null;
}

const MARKER_TITLE = '__kurikulum_detail__';

const props = defineProps<{
  // Accepts EITHER the raw kurikulums rows (recommended — just pass the
  // store's array as-is) OR an already-parsed KurikulumSemester[].
  kurikulum: KurikulumRow[] | KurikulumSemester[];
  isLoading?: boolean;
}>();

// Normalizes whatever comes in into KurikulumSemester[], so the parent
// doesn't need any extra logic — just pass kurikulumStore.currentKurikulum.
const semesters = computed<KurikulumSemester[]>(() => {
  const raw = props.kurikulum as unknown[];
  if (!Array.isArray(raw) || raw.length === 0) return [];

  // Already in the semester shape (has `matakuliah`)?
  if ((raw[0] as any)?.matakuliah !== undefined) {
    return raw as KurikulumSemester[];
  }

  // Otherwise treat it as raw kurikulums rows: find the marker row and
  // parse its `description` (JSON) into the semester list.
  const detailRow = (raw as KurikulumRow[]).find((r) => r.title === MARKER_TITLE);
  if (!detailRow?.description) return [];

  try {
    const parsed = JSON.parse(detailRow.description);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Gagal parse data kurikulum:', e);
    return [];
  }
});

const sortedSemesters = computed(() =>
  [...semesters.value].sort((a, b) => a.semester_ke - b.semester_ke)
);

const totalSks = computed(() =>
  semesters.value.reduce((sum, s) => sum + (s.total_sks || 0), 0)
);

// Semester 1 open by default so the section doesn't look empty on load.
const openSemesters = ref<Set<number>>(new Set([1]));

const toggle = (semesterKe: number) => {
  const next = new Set(openSemesters.value);
  if (next.has(semesterKe)) {
    next.delete(semesterKe);
  } else {
    next.add(semesterKe);
  }
  openSemesters.value = next;
};

const isOpen = (semesterKe: number) => openSemesters.value.has(semesterKe);
</script>

<template>
  <SectionLayout>
    <div class="w-full flex flex-col items-center gap-2 mb-8 md:mb-10">
      <TitleSection class="text-colorPrimary" text="Kurikulum" />
      <p v-if="!isLoading" class="text-sm md:text-base text-gray-500 text-center max-w-xl">
        {{ sortedSemesters.length }} semester &middot; {{ totalSks }} total SKS
      </p>
    </div>

    <!-- Loading skeleton -->
    <div v-if="isLoading" class="flex flex-col gap-3 max-w-3xl mx-auto animate-pulse">
      <div v-for="i in 8" :key="i" class="h-14 rounded-xl bg-gray-200"></div>
    </div>

    <!-- Accordion -->
    <div v-else class="flex flex-col gap-3 max-w-3xl mx-auto">
      <div
        v-for="semester in sortedSemesters"
        :key="semester.semester_ke"
        class="border border-gray-200 rounded-xl overflow-hidden"
      >
        <button
          type="button"
          @click="toggle(semester.semester_ke)"
          class="w-full flex items-center justify-between gap-4 px-4 md:px-5 py-3 md:py-4 bg-white hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-colorPrimary text-left"
          :aria-expanded="isOpen(semester.semester_ke)"
        >
          <div class="flex items-center gap-3">
            <span
              class="flex items-center justify-center w-8 h-8 rounded-full bg-colorPrimary/10 text-colorPrimary font-semibold text-sm flex-shrink-0"
            >
              {{ semester.semester_ke }}
            </span>
            <div>
              <p class="font-semibold text-gray-800 text-sm md:text-base">
                Semester {{ semester.semester_ke }}
              </p>
              <p class="text-xs md:text-sm text-gray-500">
                {{ semester.total_sks }} SKS &middot; {{ semester.matakuliah.length }} mata kuliah
              </p>
            </div>
          </div>
          <span
            class="text-gray-400 transition-transform duration-200 flex-shrink-0"
            :class="{ 'rotate-180': isOpen(semester.semester_ke) }"
          >
            &#9660;
          </span>
        </button>

        <div v-show="isOpen(semester.semester_ke)" class="border-t border-gray-100 px-4 md:px-5 py-3">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-gray-500 border-b border-gray-100">
                <th class="py-2 pr-2 font-medium">Kode</th>
                <th class="py-2 pr-2 font-medium">Mata Kuliah</th>
                <th class="py-2 pr-2 font-medium text-center">SKS</th>
                <th class="py-2 pr-2 font-medium hidden sm:table-cell">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="mk in semester.matakuliah"
                :key="mk.kode"
                class="border-b border-gray-50 last:border-0"
              >
                <td class="py-2 pr-2 font-mono text-xs text-gray-600">{{ mk.kode }}</td>
                <td class="py-2 pr-2 text-gray-800">{{ mk.nama }}</td>
                <td class="py-2 pr-2 text-center text-gray-700">{{ mk.sks }}</td>
                <td class="py-2 pr-2 hidden sm:table-cell">
                  <span
                    class="inline-block px-2 py-0.5 rounded-full text-xs"
                    :class="mk.status?.toLowerCase().includes('pilihan')
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-colorPrimary/10 text-colorPrimary'"
                  >
                    {{ mk.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </SectionLayout>
</template>