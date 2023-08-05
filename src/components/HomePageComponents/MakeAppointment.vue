<template>
  <div class="container"></div>
  <div class="bg-bar" :class="isDesktop ? 'q-px-xl q-py-lg' : 'q-pa-md'">
    <div class="row justify-between items-center q-gutter-md make-appt">
      <div class="text-white font-radley title text-bold">Want to make an appointment now?</div>
      <q-btn
      style="background: #D05757; color: white"
      label="Make an appointment"
      rounded
      no-caps
      class="font-overlock"
      :size="isDesktop ? 'lg' : 'md'"
      @click="scrollToContact"
      />
    </div>
  </div>
</template>


<script>
export default {
  name: 'MakeAppointment',
  computed: {
  isDesktop () {
    return this.$q.screen.gt.sm
    }
  },
  methods: {
    scrollToContact () {
      this.$emit('onScrollElement', 'contact-us')
    }
  }
}
</script>


<style lang="scss" scoped>
.container {
  width: 100%;
  height: 500px;
  background-image: url('~assets/imagebg1.svg');
  background-size: cover;
  background-position: center;
  @media only screen and (max-width: $breakpoint-sm-max) {
    height: 350px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    height: 210px;
  }
}

.bg-bar {
  background-color: #21222A;
}
.title {
  font-size: 24px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
   }
}
.make-appt {
   @media only screen and (max-width: 516px) {
    justify-content: center;
   }
}
</style>
