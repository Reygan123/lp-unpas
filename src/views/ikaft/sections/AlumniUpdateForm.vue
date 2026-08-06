<script setup lang="ts">
import { ref } from 'vue';
import { Send } from 'lucide-vue-next';

interface DepartementOption {
  id: number;
  name: string;
  slug: string;
}

const props = defineProps<{
  submitting: boolean;
  success: boolean;
  error: string | null;
  departements: DepartementOption[];
}>();

const emit = defineEmits<{
  submit: [payload: any];
}>();

const nama = ref('');
const email = ref('');
const noHp = ref('');
const prodi = ref('');
const angkatan = ref('');
const tahunLulus = ref('');
const profesiTerkini = ref('');
const perusahaan = ref('');
const alamat = ref('');

const handleSubmit = () => {
  emit('submit', {
    nama: nama.value,
    email: email.value,
    no_hp: noHp.value.toString(),
    prodi: prodi.value,
    angkatan: angkatan.value.toString(),
    tahun_lulus: tahunLulus.value,
    profesi_terkini: profesiTerkini.value,
    perusahaan: perusahaan.value,
    alamat: alamat.value,
  });
};
</script>

<template>
  <div id="update-data" class="scroll-mt-24 bg-white border border-outline rounded-xl p-5">
    <h2 class="font-sora font-bold text-text mb-2">Update Data Alumni</h2>
    <p class="text-desc text-sm mb-5">
      Perbarui data diri Anda agar tetap terhubung dengan jaringan alumni Fakultas Teknik Unpas.
    </p>

    <div v-if="success" class="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-4 mb-5">
      Data alumni berhasil diperbarui. Terima kasih telah tetap terhubung dengan IKAFT.
    </div>
    <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-4 mb-5">
      {{ error }}
    </div>

    <form @submit.prevent="handleSubmit" class="grid sm:grid-cols-2 gap-4">
      <div class="flex flex-col gap-1">
        <label class="text-xs text-desc">Nama Lengkap</label>
        <input
          v-model="nama"
          type="text"
          required
          placeholder="Masukkan nama lengkap"
          class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white outline-none"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-xs text-desc">Email</label>
        <input
          v-model="email"
          type="email"
          required
          placeholder="nama@email.com"
          class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white outline-none"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-xs text-desc">Nomor HP / WhatsApp</label>
        <input
          v-model="noHp"
          type="number"
          required
          placeholder="08xxxxxxxxxx"
          class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white outline-none"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-xs text-desc">Program Studi</label>
        <select
          v-model="prodi"
          class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white outline-none"
        >
          <option value="">Pilih program studi</option>
          <option v-for="option in props.departements" :key="option.id" :value="option.slug">
            {{ option.name }}
          </option>
        </select>
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-xs text-desc">Angkatan</label>
        <input
          v-model="angkatan"
          type="number"
          required
          placeholder="Contoh: 2020"
          class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white outline-none"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-xs text-desc">Tahun Lulus</label>
        <input
          v-model="tahunLulus"
          type="number"
          required
          placeholder="Contoh: 2024"
          class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white outline-none"
        />
      </div>
      <div class="flex flex-col gap-1 sm:col-span-2">
        <label class="text-xs text-desc">Profesi Terkini</label>
        <input
          v-model="profesiTerkini"
          type="text"
          placeholder="Contoh: Software Engineer"
          class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white outline-none"
        />
      </div>
      <div class="flex flex-col gap-1 sm:col-span-2">
        <label class="text-xs text-desc">Perusahaan / Instansi</label>
        <input
          v-model="perusahaan"
          type="text"
          placeholder="Contoh: PT Teknologi Nusantara"
          class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white outline-none"
        />
      </div>
      <div class="flex flex-col gap-1 sm:col-span-2">
        <label class="text-xs text-desc">Alamat</label>
        <textarea
          v-model="alamat"
          rows="3"
          placeholder="Masukkan alamat domisili saat ini"
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
          {{ submitting ? 'Mengirim...' : 'Kirim Data Terbaru' }}
        </button>
      </div>
    </form>
  </div>
</template>