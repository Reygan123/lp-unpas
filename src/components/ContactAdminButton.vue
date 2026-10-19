<script setup lang="ts">
import InteractiveHoverButton from '@/components/ui/interactive-hover-button/InteractiveHoverButton.vue';

defineProps({
  bgColor: {
    type: String,
    default: 'bg-[#b35300]'
  },
  textColor: {
    type: String,
    default: 'text-white'
  },
  bgHover: {
    type: String,
    default: 'bg-white'
  },
  textHover: {
    type: String,
    default: 'text-[#b35300]'
  },
  borderColor: {
    type: String,
    default: 'border-white'
  },
  borderHover: {
    type: String,
    default: 'border-white'
  },
  buttonText: {
    type: String,
    default: 'Hubungi Admin'
  }
});

const contactAdmin = () => {
  // const phoneNumber = identityStore.identity?.phone;
  // const chatMessage = analyticStore.analytic?.chat;

  // if (phoneNumber) {
  //   const cleanedPhone = phoneNumber.replace(/\D/g, '');
  // } else {
  //   console.error('Nomor telepon admin tidak tersedia');
  //   alert('Maaf, tidak dapat menghubungi admin saat ini.');
  // }
  const encodedMessage = encodeURIComponent('Halo, saya ingin bertanya...');
  const whatsappUrl = `https://wa.me/628111317193?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};
</script>

<template>
  <InteractiveHoverButton
    :bg-color="bgColor"
    :text-color="textColor"
    :bg-hover="bgHover"
    :text-hover="textHover"
    :border-color="borderColor"
    :border-hover="borderHover"
    :text="buttonText"
    @click="contactAdmin"
  />
</template>
