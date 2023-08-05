<template>
  <div class=" bg-navbar text-white">
    <div class="row items-center justify-evenly align-center q-pa-lg" v-if="isDesktop">
    <div class="row items-center text-white font-overpass cursor-pointer q-gutter-x-xl">
      <div class="row items-center q-gutter-x-xs">
        <q-icon name="near_me" size="sm"></q-icon>
        <div class="fs-20 q-pr-sm">Get Directions</div>
      </div>
      <div class="border-right text-navbar">&nbsp;</div>
    </div>
    <div class="row items-center text-white font-overpass cursor-pointer q-gutter-x-xl">
      <div class="row items-center q-gutter-x-xs">
        <q-icon name="phone_in_talk" size="sm"></q-icon>
        <div class="fs-20 q-pr-sm">Call Now</div>
      </div>
      <div class="border-right text-navbar">&nbsp;</div>
    </div>
    <div class="row items-center text-white font-overpass cursor-pointer q-gutter-x-xl">
      <div class="row items-center q-gutter-x-xs">
        <q-icon name="bookmarks" size="sm"></q-icon>
        <div class="fs-20 q-pr-sm">Book an Appointment</div>
      </div>
      <div class="border-right text-navbar">&nbsp;</div>
    </div>
    <div class="row items-center text-white font-overpass cursor-pointer q-gutter-x-xl">
      <div class="row items-center q-gutter-x-xs">
        <q-icon name="mark_email_unread" size="sm"></q-icon>
        <div class="fs-20 q-pr-sm">Connect on Mail</div>
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
  }
}
</script>

<style lang="scss" scoped>
.bg-navbar {
  background-color: #21222A;
}
.text-navbar {
  color: #21222A;
}
.border-right {
  border-right: 1px solid white;
}
</style>
