<template>
  <q-card class="no-padding">
    <div class="row items-center justify-end cursor-pointer q-pt-xs q-pr-sm" v-close-popup>
      <img src="~assets/closeIconSecondary.svg" width="24" alt="">
    </div>
    <q-card-section class="font-montserrat text-primary q-px-lg">
      <div class="fs-18 fw-700">Remove from profile</div>
      <div class="q-mt-md fs-14 fw-500">
        All information related to this child has been removed from your profile, and your email subscriptions associated with this child have been canceled.
      </div>
      <div class="q-mt-md fs-14 fw-500">
        To manage your subscriptions, visit Email/Whatsapp Subscriptions
      </div>
      <div class="q-my-lg row items-center justify-center">
        <q-btn
        label="Remove"
        style="background-color:##b84334; color:white;"
        class="save-btn"
        @click="onRemove"/>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'RemoveChild',
  props: {
    editFamilyValue: {
      default: []
    }
  },
  methods: {
    ...mapActions({
      editFamilyInfo: 'nursingHome/editFamilyInfo'
    }),
    async onRemove () {
      try {
        this.$q.loading.show()
        const experiencedLoss = 'True'
        const isActive = 'False'
        const formData = new FormData()
        formData.append('date', this.editFamilyValue.date)
        formData.append('name', this.editFamilyValue.name)
        formData.append('gender', this.editFamilyValue.gender)
        formData.append('isActive', isActive)
        formData.append('experiencedLoss', experiencedLoss)
        const { data } = await this.editFamilyInfo({
          accessToken: JSON.parse(localStorage.getItem('userObj'))?.token,
          payload: formData,
          id: this.editFamilyValue.id
        })
        this.$emit('closeFamilyPopup')
      } catch (error) {
      }
      finally {
        this.$q.loading.hide()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.q-card {
  max-width: 450px;
}
.save-btn {
  width: 140px;
  background: #b84334;
  color: white;
  height: 50px;
  font-weight: bolder;
  padding: 0px 12px;
  :deep(.q-btn__content) {
    font-size: 18px;
  }
}
</style>
