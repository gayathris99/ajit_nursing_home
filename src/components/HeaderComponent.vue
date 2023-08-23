<template>
  <q-header class="text-primary font-quicksand q-py-sm bg-header">
    <div>
      <div class="row justify-between align-center items-center" :class="isDesktop ? 'q-px-xl' : 'q-px-md'">
        <div class="row items-center cursor-pointer">
          <q-icon name="menu" size="md" v-if="!isDesktop" class="text-primary cursor-pointer q-pr-sm" @click="openDrawer"/>
          <img src="~assets/Logo128.png" alt="Ajit nursing home logo" width="45" @click="goTo('home')">
          <div class="column fw-600 q-pl-md" @click="goTo('home')">
            <div :class="isMobile ? 'fs-16 fw-700' : 'fs-24'">Ajit Nursing Home</div>
            <div :class="isMobile ? 'fs-14' : 'fs-16'">Healing Hands and Caring Hearts</div>
          </div>
        </div>
        <div class="row items-center q-gutter-md fs-16 fw-600" v-if="isDesktop">
          <q-btn-dropdown label="Hospital" no-caps class="fs-16 fw-600 font-quicksand" flat dense>
            <q-list class="fs-14 fw-600 font-quicksand text-primary column justify-center" style="width: 150px">
              <q-item clickable v-close-popup @click="goTo('about-us')">
                <q-item-section @click="goTo('about-us')">About Us</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Our Doctors</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Facilities</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Gallery</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn-dropdown label="Women Wellness" no-caps class="fs-16 fw-600 font-quicksand" flat dense>
            <q-list class="fs-14 fw-600 font-quicksand text-primary column justify-center" style="width: 150px">
              <q-item clickable v-close-popup>
                <q-item-section>Planning a pregnancy</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Being Pregnant</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Giving birth</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>After the birth</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Babies</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Life as a parent</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn-dropdown label="Tools" no-caps class="fs-16 fw-600 font-quicksand" flat dense>
            <q-list class="fs-14 fw-600 font-quicksand text-primary column justify-center" style="width: 150px">
              <q-item clickable v-close-popup>
                <q-item-section>Ovulation Calculator</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Pregnancy Due Date Calculator</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn-dropdown label="News" no-caps class="fs-16 fw-600 font-quicksand" flat dense></q-btn-dropdown>
          <q-btn-dropdown label="Contact Us" no-caps class="fs-16 fw-600 font-quicksand" flat dense></q-btn-dropdown>
          <q-btn-dropdown label="Login" no-caps class="fs-16 fw-600 font-quicksand" flat dense></q-btn-dropdown>
        </div>
      </div>
      <q-drawer v-if="!isDesktop"
      v-model="openMenu">
        <div class="row items-center q-gutter-sm bg-header q-pa-md" @click="goTo('home')">
          <img src="~assets/Logo128.png" alt="Ajit nursing home logo" width="45">
          <div class="column fw-600">
            <div class="fs-20">Ajit Nursing Home</div>
          </div>
        </div>
        <div class="column q-gutter-x-md q-mt-md fw-600 text-primary">
          <q-expansion-item
            class="fs-16"
            label="Hospital"
            group="somegroup"
            dense
            >
            <div class="q-py-sm q-px-md cursor-pointer fs-14" @click="goTo('about-us')">About Us</div>
            <div class="q-py-sm q-px-md cursor-pointer fs-14">Our Doctors</div>
            <div class="q-py-sm q-px-md cursor-pointer fs-14">Facilities</div>
            <div class="q-py-sm q-px-md cursor-pointer fs-14">Gallery</div>
          </q-expansion-item>
          <q-expansion-item
            class="fs-16"
            label="Women Wellness"
            group="somegroup"
            dense
            >
            <div class="q-py-sm q-px-md cursor-pointer fs-14">Planning a pregnancy</div>
            <div class="q-py-sm q-px-md cursor-pointer fs-14">Being Pregnant</div>
            <div class="q-py-sm q-px-md cursor-pointer fs-14">Giving birth</div>
            <div class="q-py-sm q-px-md cursor-pointer fs-14">After the birth</div>
            <div class="q-py-sm q-px-md cursor-pointer fs-14">Babies</div>
            <div class="q-py-sm q-px-md cursor-pointer fs-14">Life as a parent</div>
          </q-expansion-item>
          <q-expansion-item
            class="fs-16"
            label="Tools"
            group="somegroup"
            dense
            >
            <div class="q-py-sm q-px-md cursor-pointer fs-14">Ovulation Calculator</div>
            <div class="q-py-sm q-px-md cursor-pointer fs-14">Pregnancy Due Date Calculator</div>
          </q-expansion-item>
          <div class="cursor-pointer q-py-sm q-px-md fs-16">News</div>
          <div class="cursor-pointer q-py-sm q-px-md fs-16">Contact Us</div>
          <div class="cursor-pointer q-py-sm q-px-md fs-16">Login</div>
        </div>
      </q-drawer>
    </div>
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
.text-underline {
  text-decoration: underline;
}
:deep(.q-btn-dropdown__arrow) {
  display: none;
}
</style>
