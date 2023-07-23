<template>
 <div class="row items-center justify-evenly align-center bg-navbar q-pa-lg">
  <div class="row items-center text-white font-overpass cursor-pointer q-gutter-sm">
    <q-icon name="near_me" size="sm"></q-icon>
    <div class="fs-20 q-pr-sm">Get Directions</div>
  </div>
  <div class="border-right text-navbar">&nbsp;</div>
  <div class="row items-center text-white font-overpass cursor-pointer q-gutter-sm">
    <q-icon name="phone_in_talk" size="sm"></q-icon>
    <div class="fs-20 q-pr-sm">Call Now</div>
  </div>
  <div class="border-right text-navbar">&nbsp;</div>
  <div class="row items-center text-white font-overpass cursor-pointer q-gutter-sm">
    <q-icon name="bookmarks" size="sm"></q-icon>
    <div class="fs-20 q-pr-sm">Book an Appointment</div>
  </div>
  <div class="border-right text-navbar">&nbsp;</div>
  <div class="row items-center text-white font-overpass cursor-pointer q-gutter-sm">
    <q-icon name="mark_email_unread" size="sm"></q-icon>
    <div class="fs-20 q-pr-sm">Connect on Mail</div>
  </div>
 </div>
</template>

<script>
export default {
  name: 'HeroNavbar'
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
