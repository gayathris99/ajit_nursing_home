<template>
  <q-page>
    <header-component/>
    <hero-section/>
    <hero-navbar/>
  </q-page>
</template>

<script>
import HeaderComponent from 'src/components/HeaderComponent.vue'
import HeroSection from 'src/components/HomePageComponents/HeroSection.vue'
import HeroNavbar from 'src/components/HomePageComponents/HeroNavbar.vue'
export default {
  name: 'IndexPage',
  components: { HeaderComponent, HeroSection, HeroNavbar }
}
</script>


