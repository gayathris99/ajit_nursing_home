<template>
  <div :class="isMobile || isTablet ? 'bg-footer' : ''">
    <div class="row items-center q-gutter-md" :class="isMobile ? 'justify-center q-pa-sm' : 'justify-between q-pa-sm'">
      <div class="row items-center q-gutter-sm">
        <img src="~assets/Logo128.png" width="40" alt="">
        <div class="font-petrona text-primary fs-18 text-bold">Ajit <br/> Nursing Home</div>
      </div>
      <div class="font-petrona fs-18" :class="isMobile ? 'text-center' : ''">2023 Ajith Nursing Home. All right reserved</div>
      <div class="q-gutter-x-md row items-center font-petrona fs-18" >
        <div class="cursor-pointer">Privacy</div>
        <div class="cursor-pointer">FAQs</div>
        <div class="cursor-pointer">Terms</div>
      </div>
      <div class="q-gutter-x-md row items-center">
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
    }
  },
}
</script>

<style lang="scss" scoped>
.bg-footer {
  background-image: linear-gradient(to right, #C2E2E1 , #CFECE8, #DEEFEE);
}
</style>
