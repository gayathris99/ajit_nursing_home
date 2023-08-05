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
          <div class="fs-56 font-orelega text-primary q-mt-sm">Collaborative <br/>care focused on you!</div>
          <div class="q-mt-md font-overlock fs-20 fs-500 para-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et vehicula justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</div>

          <div class="row items-center q-gutter-md font-overlock q-my-xl">
            <q-btn
            color="secondary"
            label="Make an appointment"
            @click="scrollToContact"
            no-caps
            rounded
            class="fs-20 btn-fixed-width"/>

            <q-btn
            outline
            color="secondary"
            label="Promo"
            no-caps
            rounded
            class="fs-20 btn-fixed-width"/>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="tab-mobile">
      <img v-if="isTablet" src="~assets/heroImage.svg" alt="">
      <img v-if="isMobile" src="~assets/heroMobile.svg" alt="">
      <div class="content column justify-center items-center">
        <div class="fs-40 font-orelega text-primary q-mt-sm">Collaborative care focused on you!</div>
        <div class="q-mt-md font-overlock fs-20 fs-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et vehicula justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</div>
        <q-btn
          color="secondary"
          label="Make an appointment"
          @click="scrollToContact"
          no-caps
          rounded
          class="fs-20 q-mt-md btn-fixed-width font-overlock"/>
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
    scrollToContact () {
      this.$emit('onScrollElement', 'contact-us')
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
}
.para-block {
  max-width: 450px;
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
.tab-mobile {
  position: relative;
  img {
    display: block;
    vertical-align: middle;
    opacity: 0.6;
    object-fit: scale-down;
    @media only screen and (max-width: $breakpoint-xs-max) {
      height: 501px !important;
    }
  }
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
  }
}
</style>
