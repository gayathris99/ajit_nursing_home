<template>
  <q-layout view="lHh Lpr lFf">
    <header-component/>
    <q-page-container>
      <router-view />
    </q-page-container>
    <footer-component class="footer"/>
  </q-layout>
</template>

<script>
import HeaderComponent from 'src/components/HeaderComponent.vue'
import FooterComponent from 'src/components/FooterComponent.vue'
export default {
  name: 'HospitalLayout',
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>


<style lang="scss" scoped>
.q-page-container {
  min-height: 100vh;
}
</style>
