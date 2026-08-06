<script setup lang="ts">
import { ref } from "vue";
import { FileUp, Send } from "lucide-vue-next";

const props = defineProps<{
  submitting: boolean;
  success: boolean;
  error: string | null;
}>();

const emit = defineEmits<{
  submit: [payload: any];
}>();

const nama = ref("");
const email = ref("");
const idDepartement = ref("");
const jenisLayanan = ref("review_cv");
const catatanPemohon = ref("");
const fileUpload = ref<File | null>(null);

const jenisLayananOptions = [
  { value: "review_cv", label: "Review CV" },
  { value: "konsultasi_karier", label: "Konsultasi Karier" },
  { value: "simulasi_wawancara", label: "Simulasi Wawancara" },
];

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  fileUpload.value = target.files ? target.files[0] : null;
};

const handleSubmit = () => {
  const formData = new FormData();
  formData.append("nama", nama.value);
  formData.append("email", email.value);
  if (idDepartement.value) {
    formData.append("id_departement", idDepartement.value);
  }
  formData.append("jenis_layanan", jenisLayanan.value);
  formData.append("catatan_pemohon", catatanPemohon.value);
  if (fileUpload.value) {
    formData.append("file_upload", fileUpload.value);
  }
  emit("submit", formData);
};
</script>

<template>
  <div id="review-cv" class="scroll-mt-24 bg-white border border-outline rounded-xl p-5">
    <h2 class="font-sora font-bold text-text mb-2">Konsultasi & Review CV</h2>
    <p class="text-desc text-sm mb-5">
      Unggah CV Anda dan tim CDC akan memberikan masukan perbaikan sebelum melamar
      pekerjaan.
    </p>

    <div
      v-if="success"
      class="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-4 mb-5"
    >
      Permintaan review CV berhasil dikirim. Tim kami akan menghubungi Anda.
    </div>
    <div
      v-if="error"
      class="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-4 mb-5"
    >
      {{ error }}
    </div>

    <form @submit.prevent="handleSubmit" class="grid sm:grid-cols-2 gap-4">
      <div class="flex flex-col gap-1">
        <label class="text-xs text-desc">Nama Lengkap</label>
        <input
          v-model="nama"
          type="text"
          placeholder="Masukkan nama lengkap Anda"
          required
          class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white outline-none"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-xs text-desc">Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="contoh@email.com"
          required
          class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white outline-none"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-xs text-desc">Jenis Layanan</label>
        <select
          v-model="jenisLayanan"
          class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white outline-none"
        >
          <option
            v-for="item in jenisLayananOptions"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </option>
        </select>
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-xs text-desc">File CV (PDF)</label>
        <div
          class="relative border border-outline border-dashed rounded-lg px-3 py-2 flex items-center gap-2 text-desc text-sm"
        >
          <FileUp class="w-4 h-4 shrink-0" />
          <span class="truncate">{{
            fileUpload ? fileUpload.name : "Klik untuk pilih file PDF"
          }}</span>
          <input
            type="file"
            accept="application/pdf"
            required
            @change="handleFileChange"
            class="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>
      <div class="flex flex-col gap-1 sm:col-span-2">
        <label class="text-xs text-desc">Catatan Tambahan</label>
        <textarea
          v-model="catatanPemohon"
          rows="3"
          placeholder="Tuliskan catatan atau pertanyaan spesifik terkait CV/karier Anda (opsional)"
          class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white outline-none resize-none"
        ></textarea>
      </div>

      <div class="sm:col-span-2">
        <button
          type="submit"
          :disabled="submitting"
          class="inline-flex items-center justify-center gap-2 bg-colorPrimary text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition disabled:opacity-60"
        >
          <Send class="w-4 h-4" />
          {{ submitting ? "Mengirim..." : "Kirim Permintaan Review" }}
        </button>
      </div>
    </form>
  </div>
</template>