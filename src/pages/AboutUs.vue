<template>
  <div :class="isMobile ? 'q-pa-sm' : 'q-pa-xl'">
    <div class="font-inter fs-16 fw-600 q-px-sm">
      <span class="text-grey cursor-pointer" @click="goTo('home')">Home / </span>
      <span class="text-primary cursor-pointer"  @click="goTo('about-us')">About Us</span>
      <div class="grey-border q-pa-md">
        <q-img src="~assets/hospitalImage.svg"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
  computed: {
    isMobile () {
      return this.$q.screen.lt.sm
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
.grey-border {
  border: 1px solid #EEE;
}
</style>
