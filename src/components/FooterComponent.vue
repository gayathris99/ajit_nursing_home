<template>
  <div class="bg-footer text-white font-inter">
    <div class="row items-center q-gutter-x-md" :class="isMobile ? 'justify-center q-pa-sm q-gutter-y-sm' : isDesktop ? 'justify-between q-pa-sm' :'justify-evenly q-pa-sm'">
      <div class="row items-center q-gutter-sm">
        <img src="~assets/footerLogo.svg" width="40" alt="">
        <div class="text-white fs-16 fw-400">Ajit Nursing Home</div>
      </div>
      <div class="fs-16" :class="isMobile ? 'text-center' : ''">2023 Ajit Nursing Home. All right reserved</div>
      <div class="q-gutter-x-md row items-center fs-16" >
        <div class="cursor-pointer" @click="goTo('privacy')">Privacy</div>
        <div class="cursor-pointer" @click="goTo('faq')">FAQs</div>
        <div class="cursor-pointer" @click="goTo('terms')">Terms</div>
      </div>
      <div class="q-gutter-x-md justify-center row items-center" :class="isDesktop ? 'q-pr-lg': ''">
        <a href="https://www.facebook.com/ajitnursinghome" target="_blank" class="q-mt-sm">
          <img src="~assets/brand/facebook.svg" class="cursor-pointer" alt="facebook" width="25">
        </a>
        <a href="https://www.instagram.com/ajitnursinghome" target="_blank" class="q-mt-sm">
          <img src="~assets/brand/instagram.svg" class="cursor-pointer" alt="instagram" width="25">
        </a>
      </div>
    </div>
    <div class="text-center">Designed and Developed by <a href="https://www.foxgloveteam.com/#/" target="_blank"> Foxglove Tech</a></div>
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
  methods: {
    goTo (name) {
      this.$router.push({
        name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-footer {
  background: #3363AC;
  margin-top: auto;
}

a {
  color: inherit;
  font-weight: bold;
}
</style>
