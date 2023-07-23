<template>
  <q-page>
    <header-component/>
    <hero-section/>
    <hero-navbar/>
    <why-choseus/>
    <our-doctors/>
  </q-page>
</template>

<script>
import HeaderComponent from 'src/components/HeaderComponent.vue'
import HeroSection from 'src/components/HomePageComponents/HeroSection.vue'
import HeroNavbar from 'src/components/HomePageComponents/HeroNavbar.vue'
import WhyChoseus from 'src/components/HomePageComponents/WhyChoseus.vue'
import OurDoctors from 'src/components/HomePageComponents/OurDoctors.vue'
export default {
  name: 'IndexPage',
  components: { HeaderComponent, HeroSection, HeroNavbar, WhyChoseus, OurDoctors }
}
</script>


