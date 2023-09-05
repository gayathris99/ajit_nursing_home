<template>
  <div class="container"></div>
  <div class="bg-bar" :class="isDesktop ? 'q-px-xl q-py-lg' : 'q-pa-md'">
    <div class="row justify-between items-center q-gutter-md make-appt">
      <div class="text-white font-inter title text-bold">Want to make an appointment now?</div>
      <q-btn
      style="background: #3363AC; color: white"
      label="Make an appointment"
      rounded
      no-caps
      class="font-inter fs-18"
      :size="isDesktop ? 'lg' : 'md'"
      @click="scrollToContact"
      />
    </div>
  </div>
  <div class="row justify-center items-center">
    <q-card flat dense bordered class="col-md-6 col-sm-12 col-xs-12 q-pa-xl font-oxygen">
      <div class=" text-primary fw-700 fs-36">QUESTION ?</div>
      <div class="text-primary fw-700 fs-20 q-mt-sm">Ask to doctor</div>
      <div class="q-mt-md fw-400 fs-18 text-primary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</div>
      <div class="q-mt-lg">
        <q-btn
        style="background: #3363AC; color: white"
        label="Ask a question"
        rounded
        no-caps
        class="font-inter fs-18"
        :size="isDesktop ? 'lg' : 'md'"
        @click="redirectToWhatsapp"
        />
      </div>
    </q-card>
    <q-card flat dense bordered class="col-md-6 col-sm-12 col-xs-12 q-pa-xl font-oxygen">
      <div class=" text-primary fw-700 fs-36">APPOINTMENT</div>
      <div class="text-primary fw-700 fs-20 q-mt-sm">Book  with gynecologist</div>
      <div class="q-mt-md fw-400 fs-18 text-primary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</div>
      <div class="q-mt-lg">
        <q-btn
        style="background: #3363AC; color: white"
        label="Make an Appointment"
        rounded
        no-caps
        class="font-inter fs-18"
        :size="isDesktop ? 'lg' : 'md'"
        />
      </div>
    </q-card>
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
  },
  redirectToWhatsapp () {
    window.open('https://wa.me/919448420369', '_blank')
  },
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
