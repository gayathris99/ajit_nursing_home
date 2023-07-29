<template>
  <q-layout view="lHh Lpr lFf">
    <header-component/>
    <q-page-container>
      <router-view />
    </q-page-container>
    <footer-component/>
  </q-layout>
</template>

<script>
import HeaderComponent from 'src/components/HeaderComponent.vue'
import FooterComponent from 'src/components/FooterComponent.vue'
export default {
  name: 'MainLayout',
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>
