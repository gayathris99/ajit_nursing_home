<template>
  <div class=" bg-navbar">
    <div class="row items-center justify-evenly align-center q-pa-lg font-inter fw-600" v-if="isDesktop">
    <div class="row items-center cursor-pointer q-gutter-x-xl">
      <div class="row items-center q-gutter-x-xs">
        <q-icon name="near_me" size="sm"></q-icon>
        <a href="https://goo.gl/maps/C1FRWzovnftC26i17" target="_blank" class="fs-20 q-pr-sm q-pl-xs">Get Directions</a>
      </div>
      <div class="border-right text-navbar">&nbsp;</div>
    </div>
    <div class="row items-center cursor-pointer q-gutter-x-xl">
      <div class="row items-center q-gutter-x-xs">
        <q-icon name="phone_in_talk" size="sm"></q-icon>
        <a href="tel:08046808371" class="fs-20 q-pr-sm q-pl-xs">Call Now</a>
      </div>
      <div class="border-right text-navbar">&nbsp;</div>
    </div>
    <div class="row items-center cursor-pointer q-gutter-x-xl" @click="goTo('aappointment')">
      <div class="row items-center q-gutter-x-xs">
        <q-icon name="bookmarks" size="sm"></q-icon>
        <div class="fs-20 q-pr-sm q-pl-xs">Book an Appointment</div>
      </div>
      <div class="border-right text-navbar">&nbsp;</div>
    </div>
    <div class="row items-center cursor-pointer q-gutter-x-xl">
      <div class="row items-center q-gutter-x-xs">
        <q-icon name="mark_email_unread" size="sm"></q-icon>
        <a href = "mailto:ajitnursinghomeraybag@gmail.com" class="fs-20 q-pr-sm q-pl-xs">Connect on Mail</a>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroNavbar',
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
.bg-navbar {
  background-color: #F6F6F6;
  color: #3363AC;
}
.text-navbar {
  color: #21222A;
}
.border-right {
  border-right: 1px solid #3363AC;
}
a {
  color: inherit;
  text-decoration: none;
}
</style>
