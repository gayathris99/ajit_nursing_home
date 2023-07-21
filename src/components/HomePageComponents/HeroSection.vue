<template>
  <div class="bg-image row align-center justify-between items-center ">
    <div class="col-6">
      <div class="items-center row align-center justify-center hero-image relative-position">
        <img src="~assets/heroImage.svg" alt="">
      </div>
    </div>
    <div class="q-mt-xl col-6">
      <div class="bg-light-pink q-pa-sm text-primary font-red-hat-text fw-500 fit-content">
        #The best OBGYN clinic at Belgaum
      </div>
      <div class="fs-56 font-orelega text-primary q-mt-sm">Collaborative <br/>care focused on you!</div>
      <div class="q-mt-md font-overlock fs-20 fs-500 para-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et vehicula justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</div>

      <div class="row items-center q-gutter-md font-overlock q-my-xl">
        <q-btn
        color="secondary"
        label="Make an appointment"
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
</template>
<script>
export default {
  name: 'HeroSection'
}
</script>

<style lang="scss" scoped>
.bg-image {
  background-image: url('~assets/background.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.bg-light-pink {
  background-color: #FFD8E9;
  border-radius: 40px;
  display: inline-block;
}
.para-block {
  max-width: 450px;
}
.btn-fixed-width {
  width: 250px;
}

.hero-image
{
  position: absolute;
  top: -20px;
  left: 100px;
}

img {
  width: 420px;
}
</style>
