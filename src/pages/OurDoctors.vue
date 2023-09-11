<template>
  <div :class="isMobile ? 'q-pa-sm' : 'q-pa-xl'">
    <div class="font-inter fs-16 fw-600 q-px-sm">
      <span class="text-grey cursor-pointer" @click="goTo('home')">Home / </span>
      <span class="text-primary cursor-pointer"  @click="goTo('our-doctors')">Our Doctors</span>
    </div>
    <div class="font-roboto text-primary fw-700 q-mt-sm q-mb-lg q-px-sm" :class="isMobile ? 'fs-28': 'fs-40'">Our Doctors</div>
    <div class="doctors q-mt-sm font-inter">
      <q-card bordered flat dense v-for="(doctor, id) in doctors" :key="id" class="q-my-md" :class="`${doctor.firstName}`">
        <div class="row items-center q-gutter-x-xl q-gutter-y-xs" :class="{'justify-center': !isDesktop}">
          <div class="col-sm-12 col-md-4 col-xs-12 doctor-image">
            <img :src="doctor.profileImage" alt=""/>
          </div>
          <div class="details column" :class="{'q-pa-md': isMobile}">
            <div class="text-primary q-mt-lg fs-36 fw-600 q-mb-md">{{doctor.title}} {{doctor.firstName}} {{doctor.lastName}}</div>
            <div class="row items-center q-gutter-x-lg q-gutter-y-md">
              <div class="speciality-container container-details">
                <div class="row icons q-gutter-sm items-center">
                  <div class="speciality row items-center align-center justify-center">
                    <img src="~assets/speciality.svg" alt="" width="18">
                  </div>
                  <div style="color: #959595;" class="fs-14 fw-500">Speciality</div>
                </div>
                <div class="q-mt-sm text-primary fs-14 fw-500 detail-value">{{doctor.profilesShowcase}}</div>
              </div>
              <div class="education-container container-details">
                <div class="row icons q-gutter-sm items-center">
                  <div class="education row items-center align-center justify-center">
                    <img src="~assets/education.svg" alt="" width="18">
                  </div>
                  <div style="color: #959595;" class="fs-14 fw-500">Education</div>
                </div>
                <div class="q-mt-sm text-primary fs-14 fw-500 detail-value">{{doctor.education}}</div>
              </div>
              <div class="experience-container container-details">
                <div class="row icons q-gutter-sm items-center">
                  <div class="experience row items-center align-center justify-center">
                    <img src="~assets/experience.svg" alt="" width="18">
                  </div>
                  <div style="color: #959595;" class="fs-14 fw-500">Experience</div>
                </div>
                <div class="q-mt-sm text-primary fs-14 fw-500 detail-value">with {{doctor.yearsOfExperience}} years of experience overall</div>
              </div>
            </div>
            <div class="fw-500 fs-18 q-mt-lg" style="color: #3363AC;">Bio</div>
            <q-scroll-area :style="isMobile ? 'height: 400px' : 'height: 230px;'" class="text-primary fs-14 fw-500">
              <div class="q-mt-sm text-primary fs-14 fw-500">{{doctor.bio}}</div>
            </q-scroll-area>
            <div class="row justify-center">
              <q-btn
              color="secondary"
              label="Make an Appointment"
              @click="goTo('appointment')"
              no-caps
              rounded
              class="fs-18 q-py-sm q-mb-lg"/>
            </div>
          </div>
          <br/>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'OurDoctors',
  data () {
    return {
      doctors: [],
      doctorKey: null
    }
  },
  mounted () {
    this.fetchDoctors()
  },
  computed: {
    ...mapGetters({
      getDoctorId: 'nursingHome/getDoctorId'
    }),
    isMobile () {
      return this.$q.screen.lt.sm
    },
    isDesktop () {
      return this.$q.screen.gt.sm
    }
  },
  methods: {
    ...mapActions({
      getDoctors: 'nursingHome/getDoctors'
    }),
    ...mapMutations({
      setDoctorId: 'nursingHome/setDoctorId'
    }),
    goTo (name) {
      this.$router.push({
        name
      })
    },
    async fetchDoctors () {
      try {
        const { data } = await this.getDoctors()
        console.log(data)
        this.doctors = data
        this.doctorKey = this.getDoctorId
        // console.log(this.getDoctorId)
        // const doctor = this.getDoctorId
        // console.log(document.getElementsByClassName(doctor))
        // document.getElementsByClassName(doctor).scrollIntoView()
        // document.getElementById(this.doctorKey).scrollIntoView()
        // console.log(this.doctorKey, 'this.doctorKey')
        // this.$refs[this.doctorKey].scrollIntoView()
      } catch (error) {
          this.$q.notify({
            message: "Something went wrong, please try again",
            color: "red",
            position: "top",
            icon: "warning",
          });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.doctor-image {
  img {
    width: 100%;
    @media only screen and (max-width: $breakpoint-sm-max) {
      height: 450px;
      width: 500px;
      object-fit: cover;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      height: 270px;
      width: 270px;
      object-fit: cover;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }
}
.speciality {
  border-radius: 8px;
  background: #EBF8FE;
  width: 24px;
  height: 24px;
}
.education {
  border-radius: 8px;
  background: #FDF1F3;
  width: 24px;
  height: 24px;
}
.experience {
  border-radius: 8px;
  background: #FEF6EC;
  width: 24px;
  height: 24px;
}
.detail-value {
  width: 180px;
   @media only screen and (max-width: $breakpoint-xs-max) {
    width: 100%;
   }
}
.container-details {
     @media only screen and (max-width: $breakpoint-xs-max) {
    width: 100%;
   }
}
</style>
