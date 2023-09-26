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
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'MainLayout',
  components: {
    HeaderComponent,
    FooterComponent
  },
  computed: {
    ...mapGetters({
      getTabDetailsData: 'nursingHome/getTabDetailsData'
    })
  },
  methods: {
    ...mapActions({
      getAllTabDetails: 'nursingHome/getAllTabDetails'
    }),
    ...mapMutations({
      setTabDetailsData: 'nursingHome/setTabDetailsData'
    }),
    async fetchAllTabDetails () {
      try {
        const { data } = await this.getAllTabDetails()
        this.setTabDetailsData(data)
      } catch (error) {
        this.$q.notify({
          message: "Something went wrong, please try again",
          color: "red",
          position: "top",
          icon: "warning",
        });
      }
    }
  },
  created () {
    if (!this.getTabDetailsData) {
      this.fetchAllTabDetails()
    }
  }
}
</script>


<style lang="scss" scoped>
.q-page-container {
  min-height: 100vh;
}
</style>
