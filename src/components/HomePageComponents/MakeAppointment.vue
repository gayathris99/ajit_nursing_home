<template>
  <!-- <div class="container"></div> -->
  <!-- <div class="bg-bar" :class="isDesktop ? 'q-px-xl q-py-lg' : 'q-pa-md'">
    <div class="row justify-between items-center q-gutter-md make-appt">
      <div class="text-white font-inter title text-bold">Want to make an appointment now?</div>
      <q-btn
      style="background: #3363AC; color: white"
      label="Make an appointment"
      no-caps
      class="font-inter fs-18"
      :size="isDesktop ? 'lg' : 'md'"
      @click="goTo('appointment')"
      />
    </div>
  </div> -->
  <div class="row justify-center items-center">
    <q-card flat dense class="col-md-6 col-sm-12 col-xs-12 q-pa-xl font-oxygen question-card">
      <div class=" text-primary font-domine fw-700 fs-36">QUESTION ?</div>
      <div class="text-primary fw-700 fs-20 q-mt-sm">Ask to doctor</div>
      <div class="q-mt-md fw-400 fs-18 text-primary" style="height: 85px"> For quick responses regarding diagnosis, evaluation and treatment regarding pregnancy and other gynaecological issues kindly click on the button below.</div>
      <div class="q-mt-lg" :class="{'q-mt-xl q-pt-lg' : isMobile}">
        <q-btn
        style="background: #3363AC; color: white"
        label="Ask a question"
        no-caps
        class="font-inter fs-18"
        :size="isDesktop ? 'lg' : 'md'"
        @click="redirectToWhatsapp"
        />
      </div>
    </q-card>
    <q-card flat dense class="col-md-6 col-sm-12 col-xs-12 q-pa-xl font-oxygen">
      <div class=" text-primary fw-700 font-domine fs-36">APPOINTMENT</div>
      <div class="text-primary fw-700 fs-20 q-mt-sm">Book  with gynaecologist</div>
      <div class="q-mt-md fw-400 fs-18 text-primary" style="height: 85px">Schedule an Appointment with Dr. Gayathri, an experienced female OBGYN with a wealth of knowledge to address your needs. Click here to book your appointment.</div>
      <div class="q-mt-lg" :class="{'q-mt-xl q-pt-xl' : isMobile}">
        <q-btn
        style="background: #3363AC; color: white"
        label="Make an Appointment"
        no-caps
        @click="goTo('appointment')"
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
    },
    isMobile () {
      return this.$q.screen.lt.sm
    },
  },
  methods: {

    redirectToWhatsapp () {
      window.open('https://wa.me/919448420369', '_blank')
    },
    onClickAppt () {
      document.getElementsByClassName('practo_abs_widget_button').href.click()
    },
    goTo (name) {
      this.$router.push({
        name
      })
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

// :deep(.practo_link) {
//   display: none;
// }
.question-card {
  border-right: dashed 1px lightgray;
  @media only screen and (max-width: $breakpoint-sm-max) {
    border-bottom: dashed 1px lightgray
  }
}
</style>
