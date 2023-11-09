<template>
  <q-card class="no-padding add-pregnancy-popup">
    <q-card-section>
      <div class="row items-center justify-end cursor-pointer q-pt-xs q-pr-sm" v-close-popup>
        <img src="~assets/closeIconSecondary.svg" width="24" alt="">
      </div>
      <q-form @submit.prevent.stop="updateFamilyData">
        <div class="q-px-md q-pb-md q-pt-xs font-montserrat">
          <div class="fw-700 text-primary fs-20 q-mb-lg">{{getTitle}}</div>
          <div class="fw-700 text-primary fs-16">Photo</div>
          <div class="row items-center no-wrap q-mt-sm q-gutter-x-md">
            <div class="text-primary fs-16 fw-500 photo-subtitle">A photo helps you personalize your baby's account</div>
            <q-avatar size="75px" class="avatar-container">
              <q-icon name="account_circle" v-if="!profilePic && !editFamilyValue?.image" size="75px" color="grey" class="icon-img"/>
              <img v-show="profilePic" src="" alt="" id="uploaded-image">
              <img v-if="editFamilyValue?.image && !profilePic" :src="editFamilyValue?.image" alt="" class="existing-image">
              <!-- <img src="https://cdn.quasar.dev/img/avatar.png"> -->
              <q-file v-model="profilePic" v-show="false" ref="filepicker" accept=".jpg, image/*"></q-file>
              <span class="material-symbols-outlined add-icon" @click="addPicture">
              add_a_photo
              </span>
            </q-avatar>

          </div>
          <div class="fw-700 text-primary fs-16 q-mt-md">{{getDateTitle}} <span class="text-red">*</span></div>
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
          <q-input v-model="babyName" label="Baby's name" class="font-montserrat q-mt-lg q-mb-sm" outlined></q-input>
          <div class="q-mt-lg text-primary fs-16 fw-700">Baby's sex</div>
          <div class="row items-center q-gutter-x-sm">
            <q-radio name="babySex" v-model="babySex" class="fw-500" val="M" label="Boy" />
            <q-radio name="babySex" v-model="babySex" class="fw-500" val="F" label="Girl" />
            <q-radio name="babySex" v-model="babySex" class="fw-500" val="DK" label="Don't know" />
          </div>
          <div v-if="!isEditFamily">
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
          <div v-else>
          <div class="row items-center justify-center q-mb-md q-mt-lg">
            <q-btn
            label="SAVE"
            class="font-montserrat fw-700 save-btn"
            color="secondary"
            type="submit"
            ></q-btn>
          </div>
          <div class="column q-gutter-y-md items-center justify-center text-primary fs-14">
            <div class="cursor-pointer" v-if="!isFamilyTypeChild" @click="() => this.$emit('showBabyBornPopup', editFamilyValue)">My baby is born</div>
            <div class="cursor-pointer" @click="() => this.$emit('showExperiencePopup', editFamilyValue)" v-if="editFamilyValue.status !== 'EXPERIENCED_LOSS'">I experienced a loss</div>
            <div class="cursor-pointer" @click="() => this.$emit('removeChildPopup', editFamilyValue)">Remove from profile</div>
          </div>
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AddFamilyPopup',
  data () {
    return {
      profilePic: null,
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
      babyName: '',
      babySex: 'DK',
      isSubscribed: true,
      accessToken: JSON.parse(localStorage.getItem('userObj'))?.token
    }
  },
  props: {
    isFamilyTypeChild: {
      default: false
    },
    editFamilyValue: {
      default: null
    },
    isEditFamily: {
      default: false
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
          const splitDate = newVal?.date.split('-')
          this.selectedDate = splitDate[0]
          this.selectedYear = splitDate[2]
          this.selectedMonth = this.monthOptions.filter(month => month.value === splitDate[1])[0]?.value
        }
      }
    },
    profilePic: {
      handler (newVal) {
        if (newVal) {
          const imageEl = document.getElementById('uploaded-image')
          console.log(document.getElementById('uploaded-image'))
          imageEl.src = URL.createObjectURL(newVal)
        }
      }
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
  methods: {
    ...mapActions({
      addFamilyInfo: 'nursingHome/addFamilyInfo',
      editFamilyInfo: 'nursingHome/editFamilyInfo'
    }),
    updateFamilyData (e) {
      e.preventDefault()
      this.isEditFamily ? this.onEditFamily(e) : this.onNewFamilyAdded(e)
    },
    addPicture () {
      this.$refs.filepicker.pickFiles()
    },
    async onNewFamilyAdded (e) {
      e.preventDefault()
      try {
        this.$q.loading.show()
        const formData = new FormData()
        formData.append('date', `${this.selectedDate}-${this.selectedMonth}-${this.selectedYear}`)
        formData.append('name', this.babyName)
        formData.append('gender', this.babySex)
        if (this.profilePic) {
          formData.append('image', this.profilePic)
        }
        const { data } = await this.addFamilyInfo({
          accessToken: this.accessToken,
          payload: formData,
        })
        this.$emit('closeFamilyPopup')
      } catch (error) {}
      finally {
        this.$q.loading.hide()
      }
    },
    async onEditFamily (e) {
      try {
        this.$q.loading.show()
        const formData = new FormData()
        formData.append('date', `${this.selectedDate}-${this.selectedMonth}-${this.selectedYear}`)
        formData.append('name', this.babyName)
        formData.append('gender', this.babySex)
        if (this.profilePic) {
          formData.append('image', this.profilePic)
        }
        // else if (this.editFamilyValue?.image) {
        //   formData.append('image', this.editFamilyValue?.image)
        // }
        formData.append('isActive', 'True')
        const { data } = await this.editFamilyInfo({
          accessToken: this.accessToken,
          payload: formData,
          id: this.editFamilyValue.id
        })
        this.$emit('closeFamilyPopup')
      } catch (error) {}
      finally {
        this.$q.loading.hide()
      }
    },
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
.save-btn {
  width: 110px;
  height: 50px;
  font-weight: bolder;
  padding: 0px 12px;
  :deep(.q-btn__content) {
    font-size: 18px;
  }
}
#uploaded-image {
  object-fit: cover;
  width: 75px;
}
.existing-image {
  object-fit: cover;
  width: 75px;
}
</style>
