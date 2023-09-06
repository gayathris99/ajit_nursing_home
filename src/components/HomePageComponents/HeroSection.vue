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
          <div class="fs-60 font-oxygen fw-400 text-primary q-mt-sm">You never understand <br/>life until it grows inside you!</div>
          <div class="q-mt-md font-oxygen color-primary-two  fs-20 fw-400 para-block">Discover the difference at Ajit Nursing Home, where medical excellence meets personalised care. Our mission is to guide you on your path to better health with cutting-edge treatments and unwavering support.</div>

          <div class="row items-center q-gutter-md font-inter fw-500 q-my-xl">
            <q-btn
            color="secondary"
            label="Make an appointment"
            @click="goTo('appointment')"
            no-caps
            rounded
            class="btn-fixed-width fs-18 q-py-sm"/>

            <!-- <q-btn
            outline
            color="secondary"
            label="Promo"
            no-caps
            rounded
            class="btn-fixed-width bg-white fs-18 q-py-sm"/> -->
          </div>
        </div>
      </div>
    </div>
    <div v-else class="bg-image">
      <!-- <img v-if="isTablet" src="~assets/heroImage.svg" alt=""> -->
      <!-- <img v-if="isMobile" src="~assets/heroMobile.svg" alt=""> -->
      <div class="content q-pt-xl q-px-md">
        <div class="fs-36 font-oxygen fw-400 text-primary q-mt-sm text-center">You never understand life until it grows inside you!</div>
        <div class="q-mt-md font-oxygen fs-400 text-center" :class="isMobile ? 'fs-16': 'fs-20'">Discover the difference at Ajit Nursing Home, where medical excellence meets personalised care. Our mission is to guide you on your path to better health with cutting-edge treatments and unwavering support.</div>
        <div class=" justify-center items-center q-gutter-md q-mt-md column">
        <q-btn
          color="secondary"
          label="Make an appointment"
          @click="goTo('appointment')"
          no-caps
          rounded
          class="fs-18 q-mt-md btn-fixed-width font-inter"/>
        <!-- <q-btn
          color="secondary"
          label="Promo"
          outline
          no-caps
          rounded
          class="fs-18 bg-white q-mt-md btn-fixed-width font-inter"/> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeroSection',
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
.bg-image {
  background-image: url('~assets/background.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  max-height: 679px;
  @media only screen and (max-width: $breakpoint-sm-max){
    background-image: url('~assets/heroTablet.svg');
    height: 350px;
  }
  @media only screen and (max-width: $breakpoint-xs-max){
    background-image: url('~assets/heroMobile.svg');
    height: 480px;
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
</style>
