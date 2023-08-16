<template>
  <q-header class="text-primary font-quicksand q-py-sm" :class="[{ 'q-px-xl' : isDesktop, 'q-px-sm' : '!isDesktop', 'bg-header': isHomePage, 'bg-white-header': !isHomePage }]">
    <div class="row justify-between align-center">
      <div class="row items-center q-gutter-sm cursor-pointer">
        <q-icon name="menu" size="md" v-if="!isDesktop" class="text-primary cursor-pointer q-pr-sm" @click="openDrawer"/>
        <img src="~assets/Logo128.png" alt="Ajit nursing home logo" width="45" @click="goTo('home')">
        <div class="fs-16 fw-600" @click="goTo('home')">Ajit Nursing Home</div>
      </div>
      <div class="row items-center q-gutter-md fs-16 fw-600" v-if="isDesktop">
        <div class="cursor-pointer" @click="goTo('about-us')">About Us</div>
        <div class="cursor-pointer" @click="comingSoon">Pregnancy</div>
        <div class="cursor-pointer" @click="comingSoon">Getting Pregnant</div>
        <div class="cursor-pointer" @click="comingSoon">Tools</div>
        <div class="cursor-pointer" @click="comingSoon">Life as a Parent?</div>
        <div class="cursor-pointer" @click="comingSoon">Gynaecology</div>
        <div class="cursor-pointer" @click="comingSoon">News</div>
      </div>
    </div>
    <q-drawer v-if="!isDesktop"
    v-model="openMenu">
      <div class="row items-center q-gutter-sm bg-header q-pa-md" @click="goTo('home')">
        <img src="~assets/Logo128.png" alt="Ajit nursing home logo" width="50">
        <div class="fs-20 fw-600">Ajit Nursing Home</div>
      </div>
      <div class="column q-gutter-md fw-600 q-mt-sm q-pa-md">
        <div class="cursor-pointer" @click="goTo('about-us')">About Us</div>
        <div class="cursor-pointer" @click="comingSoon">Pregnancy</div>
        <div class="cursor-pointer" @click="comingSoon">Getting Pregnant</div>
        <div class="cursor-pointer" @click="comingSoon">Tools</div>
        <div class="cursor-pointer" @click="comingSoon">Life as a Parent?</div>
        <div class="cursor-pointer" @click="comingSoon">Gynaecology</div>
        <div class="cursor-pointer" @click="comingSoon">News</div>
      </div>
    </q-drawer>
  </q-header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data () {
    return {
      openMenu: false
    }
  },
  methods: {
    openDrawer () {
      this.openMenu = true
    },
    comingSoon () {
      this.$q.notify({
        message: "We are working on it, Stay tuned! :)",
        color: "green",
        position: "top"
      });
    },
    goTo (route) {
      this.$router.push({
        name: route
      })
    }
  },
  computed: {
    isMobile () {
      return this.$q.screen.lt.sm
    },
    isTablet () {
      return this.$q.screen.gt.xs && this.$q.screen.lt.md
    },
    isDesktop () {
      return this.$q.screen.gt.sm
    },
    isHomePage () {
      return this.$route.name === 'home'
    }
  },
}
</script>

<style lang="scss" scoped>
.bg-header {
  background-image: linear-gradient(to right, #C2E2E1 , #CFECE8, #DEEFEE);
}
.bg-white-header {
  background: #FFF;
}
</style>
