<template>
  <div class="bg-footer text-white font-inter">
    <div class="row items-center q-gutter-md" :class="isMobile ? 'justify-center q-pa-sm' : isDesktop ? 'justify-between q-pa-sm' :'justify-evenly q-pa-sm'">
      <div class="row items-center q-gutter-sm">
        <img src="~assets/Logo128.png" width="40" alt="">
        <div class="text-white fs-16 fw-400">Ajit Nursing Home</div>
      </div>
      <div class="fs-16" :class="isMobile ? 'text-center' : ''">2023 Ajith Nursing Home. All right reserved</div>
      <div class="q-gutter-x-md row items-center fs-16" >
        <div class="cursor-pointer">Privacy</div>
        <div class="cursor-pointer">FAQs</div>
        <div class="cursor-pointer">Terms</div>
      </div>
      <div class="q-gutter-x-md justify-center row items-center">
        <img src="~assets/brand/facebook.svg" class="cursor-pointer" alt="facebook" width="30">
        <img src="~assets/brand/instagram.svg" class="cursor-pointer" alt="instagram" width="25">
        <img src="~assets/brand/LinkedIn.svg" class="cursor-pointer" alt="linkedin" width="30">
        <img src="~assets/brand/twitter.svg" class="cursor-pointer" alt="twitter" width="30">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FooterComponent',
  computed: {
    isMobile () {
      return this.$q.screen.lt.sm
    },
    isTablet () {
      return this.$q.screen.gt.xs && this.$q.screen.lt.md
    },
    isDesktop () {
      return this.$q.screen.gt.sm
    }
  },
}
</script>

<style lang="scss" scoped>
.bg-footer {
  background: #3363AC;
}
</style>
