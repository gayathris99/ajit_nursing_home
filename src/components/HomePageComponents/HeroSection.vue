<template>
  <div class="bg-image">
    <div v-if="isDesktop" class="row align-center justify-between items-center ">
      <div class="col-6">
        <div class="hero-image">
          <img src="~assets/heroImage.svg" alt="">
        </div>
      </div>
      <div class="q-mt-xl col-6">
        <div>
          <div class="fs-60 font-domine fw-700 text-primary q-mt-sm q-mr-lg">You never understand <br/>life until it grows inside you!</div>
          <div class="q-mt-md font-oxygen color-primary-two  fs-20 fw-400 para-block">Discover the difference at Ajit Nursing Home, where medical excellence meets personalised care. Our mission is to guide you on your path to better health with cutting-edge treatments and unwavering support.</div>

          <div class="row items-center q-gutter-x-lg font-inter fw-500 q-my-xl">
            <q-btn
            color="secondary"
            label="Make an appointment"
            @click="goTo('appointment')"
            no-caps
            class="btn-fixed-width fs-18 q-py-sm"/>

            <q-btn
            label="Emergency Contact"
            no-caps
            style="background: #BC3430;"
            @click="toggleEmergencyPopup(true)"
            class="btn-fixed-width fs-18 text-white q-py-sm"/>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="bg-image">
      <div class="content q-pt-xl q-px-md">
        <div class="fs-36 font-oxygen fw-400 text-primary q-mt-sm text-center">You never understand life until it grows inside you!</div>
        <div class="q-mt-md font-oxygen fs-400 text-center" :class="isMobile ? 'fs-16': 'fs-20'">Discover the difference at Ajit Nursing Home, where medical excellence meets personalised care. Our mission is to guide you on your path to better health with cutting-edge treatments and unwavering support.</div>
        <div class=" justify-center items-center q-gutter-md q-mt-md" :class="isMobile ? 'column' : 'row'">
        <q-btn
          color="secondary"
          label="Make an appointment"
          @click="goTo('appointment')"
          no-caps
          class="fs-18 q-mt-md btn-fixed-width font-inter"/>
          <q-btn
          label="Emergency Contact"
          no-caps
          style="background: #BC3430;"
          @click="toggleEmergencyPopup(true)"
          class="btn-fixed-width fs-18 text-white q-py-sm"/>
        </div>
      </div>
    </div>
    <q-dialog v-model="isEmergency">
      <q-card>
        <div class="row items-center justify-end cursor-pointer q-pt-sm q-pr-sm" v-close-popup>
          <img src="~assets/closeIcon.svg" width="24" alt="">
        </div>
        <q-card-section class="font-montserrat emergency-contacts column items-center justify-center q-px-md">
          <div>
            <a href="tel:08046808371" class="fs-20 q-pr-sm q-pl-xs">
              <q-btn  class="fw-700 q-my-sm" style="background-color: #BC3430; color: white">
                <div class="row">
                  <q-icon left>
                    <img src="~assets/emergency-call.svg">
                  </q-icon>
                  <div>
                    Call Now
                  </div>
                </div>
              </q-btn>
            </a>
          </div>
          <div>
            <q-btn   style="background-color: #004953; color: white" class="fw-700 q-my-sm" @click="goToWhatsapp">
              <div class="row">
                <q-icon left>
                  <img src="~assets/whatsappLogo.svg">
                </q-icon>
                <div>
                  Connect on whatsapp
                </div>
              </div>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  name: 'HeroSection',
  data () {
    return {
      isEmergency: false
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
    }
  },
  methods: {
    goTo (name) {
      this.$router.push({
        name
      })
    },
    goToWhatsapp () {
      window.open('https://wa.me/919448420369', '_blank')
    },
    toggleEmergencyPopup (value) {
      this.isEmergency = value
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-image {
  background-image: url('~assets/background.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  max-height: 679px;
  @media only screen and (max-width: $breakpoint-sm-max){
    background-image: url('~assets/heroTablet.svg');
    height: 380px;
  }
  @media only screen and (max-width: $breakpoint-xs-max){
    background-image: url('~assets/heroMobile.svg');
    height: 550px;
  }
}
.para-block {
  max-width: 500px;
}
.btn-fixed-width {
  width: 250px;
   @media only screen and (max-width: 1060px) and (min-width:1024px){
    width: 220px;
   }
}

.hero-image
{
  img {
  display: block;
  max-width: 700px;
  width: 599px;
  @media only screen and (max-width: 1240px) and (min-width:1061px){
    width: 500px;
  }
  @media only screen and (max-width: 1060px) and (min-width:1024px){
    width: 500px;
  }
  }
}
.hero-image-non-desktop {
  img {
    max-width: 300px;
  }
}
  // .content {

  // }
// .tab-mobile {
//   position: relative;
//   img {
//     display: block;
//     vertical-align: middle;
//     opacity: 0.6;
//     object-fit: scale-down;
//     @media only screen and (max-width: $breakpoint-xs-max) {
//       height: 501px !important;
//     }
//   }
//   .content {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     text-align: center;
//     transform: translate(-50%, -50%);
//   }
// }
.or-content {
   width: 100%;
   text-align: center;
   border-bottom: 1px solid #000;
   line-height: 0.1em;
   margin: 10px 0 20px;
}

.or-content span {
    background:#fff;
    padding:0 10px;
}
.emergency-contacts {
  .q-btn {
    width: 300px;
  }
}
</style>
