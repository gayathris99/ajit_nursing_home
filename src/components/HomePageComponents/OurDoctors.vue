<template>
  <div>
    <div class="font-oxygen text-primary fs-16 fw-700 padding-left" :class="isMobile ? 'q-pt-md': 'q-pt-xl'">OUR DOCTORS</div>
    <div class="row justify-between  font-radley text-primary padding-x-axis">
      <div class="fw-600 q-mt-sm title">Specialist obgyne, <br/>pediatricians team</div>
      <div class="text-justify description q-pb-xl q-mt-md">Has a team of the best specialist doctors in the field of obstetrics & gynaecology as well as paediatricians. In addition, we also have several other specialists.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OurDoctors',
  computed: {
    isMobile () {
      return this.$q.screen.lt.sm
    },
  }
}
</script>

<style lang="scss" scoped>
.padding-x-axis {
  padding: 0 48px;
  @media only screen and (max-width: 799px) and (min-width:0px)  {
    padding: 0 24px;
  }
}
.description {
  font-size: 20px;
  max-width: 600px;
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
</style>
