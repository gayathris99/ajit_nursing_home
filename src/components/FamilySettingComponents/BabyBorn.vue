<template>
  <q-card>
    <div class="row items-center justify-end cursor-pointer q-pt-xs q-pr-sm" v-close-popup>
      <img src="~assets/closeIconSecondary.svg" width="24" alt="">
    </div>
    <q-card-section class="q-px-lg font-montserrat text-primary">
      <div class="fs-18 fw-700">Congratulations!</div>
      <div class="q-mt-md fs-14 fw-500">We're excited to hear that your baby has arrived. Enjoy the snuggles!</div>
      <div class="q-mt-md fs-700 fs-16">Birthday</div>
      <q-form @submit.prevent.stop="onSave">
        <div class="row items-center  no-wrap font-montserrat q-mt-sm justify-between">
          <q-select
          class="col-4"
          outlined
          v-model="selectedDate"
          :options="datesOptions"
          transition-show="scale"
          transition-hide="scale"
          popup-content-class="font-montserrat"
          label="dd"
          :rules="[val => !!val || 'Date Required']"></q-select>
          <q-select
            class="col-4"
            outlined
            v-model="selectedMonth"
            emit-value
            map-options
            :options="monthOptions"
            label="mm"
            transition-show="scale"
            transition-hide="scale"
            popup-content-class="font-montserrat"
            :rules="[val => !!val || 'Month Required']"
        ></q-select>
          <q-select
          class="col-3"
          outlined
          v-model="selectedYear"
          transition-show="scale"
          transition-hide="scale"
          popup-content-class="font-montserrat"
          :options="yearsOptions" label="yyyy"
          :rules="[val => !!val || 'Year Required']"></q-select>
        </div>
        <div class="q-mt-lg text-primary fs-16 fw-700">Baby's sex</div>
        <div class="row items-center q-gutter-x-sm">
          <q-radio name="babySex" v-model="babySex" class="fw-500" val="M" label="Boy" />
          <q-radio name="babySex" v-model="babySex" class="fw-500" val="F" label="Girl" />
          <q-radio name="babySex" v-model="babySex" class="fw-500" val="DK" label="Don't know" />
        </div>
          <div class="row items-center justify-center q-my-md">
            <q-btn
            label="SAVE"
            class="font-montserrat fw-700 save-btn"
            color="secondary"
            type="submit"
            ></q-btn>
          </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'BabyBorn',
  data () {
    return {
      babySex: 'DK',
      monthOptions: [
        { label: 'January', value: '01'},
        { label: 'February', value: '02'},
        { label: 'March', value: '03'},
        { label: 'April', value: '04'},
        { label: 'May', value: '05'},
        { label: 'June', value: '06'},
        { label: 'July', value: '07'},
        { label: 'August', value: '08'},
        { label: 'September', value: '09'},
        { label: 'October', value: '10'},
        { label: 'November', value: '11'},
        { label: 'December', value: '12'},
      ],
      selectedMonth: '',
      selectedDate: '',
      selectedYear: '',
    }
  },
  methods: {
    ...mapActions({
      editFamilyInfo: 'nursingHome/editFamilyInfo'
    }),
    async onSave () {
      try {
        this.$q.loading.show()
        const formData = new FormData()
        formData.append('date', `${this.selectedDate}-${this.selectedMonth}-${this.selectedYear}`)
        formData.append('name', this.editFamilyValue.name)
        formData.append('gender', this.babySex)
        formData.append('image', this.editFamilyValue.image)
        const { data } = await this.editFamilyInfo({
          accessToken: JSON.parse(localStorage.getItem('userObj'))?.token,
          id: this.editFamilyValue.id,
          payload: formData
        })
        this.$emit('closeFamilyPopup')
      } catch (error) {}
      finally {
        this.$q.loading.hide()
      }
    }
  },
  watch: {
    editFamilyValue: {
      deep: true,
      immediate: true,
      handler (newVal) {
        if (newVal) {
          this.babyName = newVal.name
          this.babySex = newVal.gender
          const splitDate = newVal?.date?.split('-')
          if (splitDate.length) {
          this.selectedDate = splitDate[0]
          this.selectedYear = splitDate[2]
          this.selectedMonth = this.monthOptions.filter(month => month.value === splitDate[1])[0]?.value
          }
        }
      }
    }
  },
  computed: {
    datesOptions () {
      const dates = []
      for (let i = 1; i < 32; i++) {
        const x = i < 10 ? `0${i}` : i
        dates.push(x)
      }
      return dates
    },
    yearsOptions () {
      const nextYear = new Date().getFullYear()+1
      const options = []
      for (let i=0; i<11; i++) {
        options.push(nextYear - i)
      }
      return options
    }
  },
  props: {
    editFamilyValue: {
      default: {}
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
