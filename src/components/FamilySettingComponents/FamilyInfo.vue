<template>
  <div class="q-mt-lg font-montserrat">
    <div class="font-domine subtitle fw-500 text-primary">My Family</div>
    <q-checkbox v-model="isTryingToConceive" class="fs-16 q-mt-md fw-500 font-montserrat text-primary" label="Trying to conceive" color="secondary" @click="() => tryingToConceivePopup = true"/>
    <div class="q-mt-md fw-700 fs-18 text-primary">My pregnancy</div>
    <!-- <div class="border-bottom q-my-lg"></div> -->
    <!-- <div class="row items-center justify-between">
      <div>
        <div class="fw-700 fs-16 text-primary">My pregnancy</div>
        <div class="row items-center justify-between q-gutter-x-sm q-mt-sm">
          <q-icon name="event" size="sm" color="grey"></q-icon>
          <div class="text-grey fw-500 fs-16">April 11 2024</div>
        </div>
      </div>
      <div>
        <q-icon name="edit" color="secondary" class="cursor-pointer" size="sm"></q-icon>
      </div>
    </div> -->
    <div class="border-bottom q-my-lg"></div>
    <div class="row items-center q-gutter-x-sm cursor-pointer" @click="() => showAddPregnancyPopup = true">
      <q-icon name="add" size="sm" color="secondary"></q-icon>
      <div class="fs-16 fw-700 text-secondary">Add Pregnancy</div>
    </div>
    <div class="border-bottom q-my-lg"></div>
    <div class="q-mt-xl fw-700 fs-18 text-primary">My children</div>
    <div class="border-bottom q-my-lg"></div>
    <div class="row items-center q-gutter-x-sm cursor-pointer">
      <q-icon name="add" size="sm" color="secondary"></q-icon>
      <div class="fs-16 fw-700 text-secondary">Add a child</div>
    </div>
    <div class="border-bottom q-mt-lg q-mb-xl"></div>
  </div>
  <q-dialog persistent v-model="tryingToConceivePopup">
    <trying-to-conceive-popup/>
  </q-dialog>
  <q-dialog  v-model="showAddPregnancyPopup">
    <add-pregnancy-popup/>
  </q-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import TryingToConceivePopup from './TryingToConceivePopup.vue'
import AddPregnancyPopup from './AddPregnancyPopup.vue'
export default {
  name: 'FamilyInfo',
  components: { TryingToConceivePopup, AddPregnancyPopup },
  data () {
    return {
      isTryingToConceive: false,
      tryingToConceivePopup: false,
      showAddPregnancyPopup: false
    }
  },
  mounted () {
    this.fetchFamilyInfo()
  },
  methods: {
    ...mapActions({
      getFamilyInfo: 'nursingHome/getFamilyInfo'
    }),
    async fetchFamilyInfo () {
      try {
        this.$q.loading.show()
        const { data } = await this.getFamilyInfo({
          accessToken: JSON.parse(localStorage.getItem('userObj'))?.token
        })
        console.log(data)
      } catch (error) {}
      finally {
        this.$q.loading.hide()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.border-bottom {
  border-bottom: 1px solid grey
}
</style>
