<template>
  <q-card class="no-padding add-pregnancy-popup">
    <q-card-section>
      <div class="row items-center justify-end cursor-pointer q-pt-xs q-pr-sm" v-close-popup>
        <img src="~assets/closeIconSecondary.svg" width="24" alt="">
      </div>
      <div class="q-px-md q-pb-md q-pt-xs font-montserrat">
        <div class="fw-700 text-primary fs-20 q-mb-lg">{{getTitle}}</div>
        <div class="fw-700 text-primary fs-16">Photo</div>
        <div class="row items-center no-wrap q-mt-sm q-gutter-x-md">
          <div class="text-primary fs-16 fw-500 photo-subtitle">A photo helps you personalize your baby's account</div>
          <q-avatar size="75px" class="avatar-container">
            <q-icon name="account_circle" size="75px" color="grey" class="icon-img"/>
            <!-- <img src="https://cdn.quasar.dev/img/avatar.png"> -->
            <span class="material-symbols-outlined add-icon">
            add_a_photo
            </span>
          </q-avatar>

        </div>
        <div class="fw-700 text-primary fs-16 q-mt-md">{{getDateTitle}}</div>
        <div class="row items-center  no-wrap font-montserrat q-mt-sm justify-between">
          <q-select
          class="col-4"
          outlined
          v-model="selectedDate"
          :options="datesOptions"
          transition-show="scale"
          transition-hide="scale"
          popup-content-class="font-montserrat"
          label="dd"></q-select>
          <q-select
            class="col-4"
             outlined
             v-model="selectedMonth"
             :options="monthOptions"
             label="mm"
            transition-show="scale"
            transition-hide="scale"
            popup-content-class="font-montserrat"
        ></q-select>
          <q-select
          class="col-3"
          outlined
          v-model="selectedYear"
          transition-show="scale"
          transition-hide="scale"
          popup-content-class="font-montserrat"
          :options="yearsOptions" label="yyyy"></q-select>
        </div>
        <q-input v-model="babyName" label="Baby's name" class="font-montserrat q-mt-lg q-mb-sm" outlined></q-input>
        <div class="q-mt-lg text-primary fs-16 fw-700">Baby's sex</div>
        <div class="row items-center q-gutter-x-sm">
          <q-radio name="babySex" v-model="babySex" class="fw-500" val="M" label="Boy" />
          <q-radio name="babySex" v-model="babySex" class="fw-500" val="F" label="Girl" />
          <q-radio name="babySex" v-model="babySex" class="fw-500" val="O" label="Other" />
          <q-radio name="babySex" v-model="babySex" class="fw-500" val="DK" label="Don't know" />
        </div>
        <div class="q-mt-lg text-primary fs-16 fw-700">Subscribe to Ajit Nursing Home</div>
         <div class="border-bottom q-my-md"></div>
        <q-checkbox v-model="isSubscribed" class="fs-16 fw-500 font-montserrat text-primary" label="My newsletter with personalized baby development info and expert tips." color="secondary"/>
        <div class="fs-12 text-center q-mt-md" style="color:#56584B; margin-bottom:20px">
          You can unsubscribe at any time. By continuing, you agree to our  <span class="cursor-pointer text-underline" @click="goToNewTab('terms')">Terms of Use</span> & <span class="cursor-pointer text-underline" @click="goToNewTab('privacy')">Privacy Policy</span>.
        </div>
        <div class="row items-center justify-center q-my-md">
            <q-btn
            label="ADD TO MY FAMILY"
            class="font-montserrat fw-700"
            color="secondary"
            type="submit"
            ></q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'AddFamilyPopup',
  data () {
    return {
      monthOptions: [
        'January',  'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
      ],
      selectedMonth: '',
      selectedDate: '',
      selectedYear: '',
      babyName: '',
      babySex: 'DK',
      isSubscribed: true
    }
  },
  props: {
    isFamilyTypeChild: {
      default: false
    }
  },
  computed: {
    getTitle () {
      return this.isFamilyTypeChild ? 'My Child' : 'My pregnancy'
    },
    getDateTitle () {
      return this.isFamilyTypeChild ? 'Birthday' : 'Due Date'
    },
    datesOptions () {
      const dates = []
      for (let i = 1; i < 32; i++) {
        dates.push(i)
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
  methods: {
    goToNewTab (path) {
      let route = this.$router.resolve({name: path});
      window.open(route.href, '_blank');
    },
  }
}
</script>

<style scoped>
@import "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
</style>

<style lang="scss" scoped>
.add-pregnancy-popup {
  max-width: 450px;
  :deep(.q-card__section--vert) {
    padding: 8px;
  }
  :deep(.q-checkbox__label) {
    margin-left: 8px;
  }
}
.photo-subtitle {
  max-width: 78%
}
.avatar-container {
  cursor: pointer;
  position: relative;
  img {
    display: block;
  }
  .icon-img {
    display: block;
  }
  .add-icon {
    position: absolute;
    bottom: 2px;
    right:2px;
    color: #004953;
  }
}
.border-bottom {
  border-bottom: 1px solid grey
}

</style>
