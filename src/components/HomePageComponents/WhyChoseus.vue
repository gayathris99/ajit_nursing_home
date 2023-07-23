<template>
  <div class="bg-image">
    <div class="font-oxygen text-primary fs-16 fw-700 padding-left" :class="isMobile ? 'q-pt-md': 'q-pt-xl'">WHY CHOSE US</div>
    <div class="check-row">
      <div class="padding-left font-radley text-primary">
        <div class="fw-600 q-mt-sm title">Clinic experts on <br/>obstetric, gynecologic.</div>
        <div class="q-mt-md text-justify description q-pb-xl">Located in Raibag, our hospital stands as a beacon of healthcare within the community. With its state-of-the-art facilities and compassionate staff, it has garnered a reputation for delivering exceptional medical services. The hospital's commitment to patient care is evident in every aspect of its operation, making it a trusted institution among locals.</div>
      </div>
      <div class="image-section">
        <img src="~assets/pregnantcarryingchild.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhyChoseus',
  computed: {
    isMobile () {
      return this.$q.screen.lt.sm
    },
  }
}
</script>

<style lang="scss" scoped>
.bg-image {
  background-image: url('~assets/whychoseusbg.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  max-height: 679px;
}
.image-section {
  align-self: end;
  img {
    max-width: 800px;
    width: 700px;
    @media only screen and (max-width: 1210px) and (min-width:1100px){
    width: 600px;
    }
    @media only screen and (max-width: 1099px) and (min-width:1000px){
    width: 500px;
    }
    @media only screen and (max-width: 999px) and (min-width:800px){
    width: 475px;
    }
    @media only screen and (max-width: 799px) and (min-width:500px) {
      width: 500px
    }
    @media only screen and (max-width: 499px) and (min-width:0px) {
       width: 300px
    }
  }
  @media only screen and (max-width: 799px) and (min-width:0px) {
    align-self: center;
  }
}
.title {
  font-size: 36px;
   @media only screen and (max-width: 999px) and (min-width:500px) {
    font-size: 30px;
   }
  @media only screen and (max-width: 499px) and (min-width:0px) {
    font-size: 24px;
    }
}
.description {
  font-size: 20px;
  max-width: 500px;
   @media only screen and (max-width: 1099px) and (min-width:1000px) {
    font-size: 16px;
    max-width: 450px;
   }
  @media only screen and (max-width: 999px) and (min-width:800px) {
    font-size: 16px;
    max-width: 350px;
  }
  @media only screen and (max-width: 799px) and (min-width:0px) {
    max-width: none;
    font-size: 14px;
    padding-right: 24px
  }
}
.check-row {
   display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 799px) and (min-width:0px) {
    // display: block;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }
}

.padding-left {
  padding-left: 48px;
  @media only screen and (max-width: 799px) and (min-width:0px)  {
    padding-left: 24px;
  }
}
</style>
