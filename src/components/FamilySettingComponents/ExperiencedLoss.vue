<template>
  <q-card class="no-padding">
    <div class="row items-center justify-end cursor-pointer q-pt-sm q-pr-sm" v-close-popup>
      <img src="~assets/closeIconSecondary.svg" width="24" alt="">
    </div>
    <q-card-section class="font-montserrat text-primary">
      <div class="text-primary fw-700 fs-18">We're deeply sorry for your loss</div>
      <div class="q-mt-md fs-14 fw-500">
        We'll stop sending you emails and notifications related to this child, and won't customize our site for this child any longer.
      </div>
      <div class="column q-gutter-y-sm q-mt-sm fs-16">
        <q-radio name="lossValue" v-model="lossValue" class="fw-500" val="keep" label="Keep child in profile" />
        <q-radio name="lossValue" v-model="lossValue" class="fw-500" val="remove" label="Remove child from profile"/>
      </div>
      <div class="text-justify fs-14 q-mt-xs fw-500" style="color:#56584B; margin-bottom:20px">
        This will erase all photos, milestones, and announcements associated with this child on our website.
      </div>
      <div class="row items-center justify-center q-my-md">
            <q-btn
            label="SAVE"
            class="font-montserrat fw-700 save-btn"
            color="secondary"
            type="submit"
            @click="onSave"
            ></q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ExperiencedLoss',
  data () {
    return {
      lossValue: 'keep',
      accessToken: JSON.parse(localStorage.getItem('userObj'))?.token
    }
  },
  props: {
    editFamilyValue: {
      default: []
    }
  },
  methods: {
    ...mapActions({
      editFamilyInfo: 'nursingHome/editFamilyInfo'
    }),
    async onSave () {
      try {
        console.log('onsave')
        this.$q.loading.show()
        const experiencedLoss = 'True'
        const isActive = this.lossValue === 'keep' ? 'True' : 'False'
        const formData = new FormData()
        formData.append('date', this.editFamilyValue.date)
        formData.append('name', this.editFamilyValue.name)
        formData.append('gender', this.editFamilyValue.gender)
        formData.append('isActive', isActive)
        formData.append('experiencedLoss', experiencedLoss)
        const { data } = await this.editFamilyInfo({
          accessToken: this.accessToken,
          payload: formData,
          id: this.editFamilyValue.id
        })
        this.$emit('closeFamilyPopup', { lossType: this.lossValue })
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
  width: 110px;
  height: 50px;
  font-weight: bolder;
  padding: 0px 12px;
  :deep(.q-btn__content) {
    font-size: 18px;
  }
}
</style>
