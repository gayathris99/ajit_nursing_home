<template>
  <q-page>
    <header-component/>
    <hero-section/>
  </q-page>
</template>

<script>
import HeaderComponent from 'src/components/HeaderComponent.vue'
import HeroSection from 'src/components/HomePageComponents/HeroSection.vue'
export default {
  name: 'IndexPage',
  components: { HeaderComponent, HeroSection }
}
</script>


