<template>
  <div>
    <div :class="isMobile ? 'bg-greyish': 'bg-grey-desktop'">
      <div class="font-inter text-primary fs-24 fw-600 text-center q-px-md" :class="isMobile ? 'q-pt-md': 'q-pt-xl'">Our Doctors</div>
      <div class="fw-400 text-primary q-mt-sm title text-center font-oxygen q-px-md">Specialist obgyne, surgical team</div>
      <div class="q-mt-md text-center fw-400 font-oxygen fs-18 text-primary q-px-md" :class="isMobile ? 'q-pb-md': 'q-pb-xl'">Has a team of the best specialist doctors in the field of obstetrics & gynaecology as well as surgery. In addition, we also have several other specialists.</div>
      <swiper
        v-if="isDesktop || isTablet"
        :slidesPerView="slidesCount"
        :slidesPerGroup="slidesCount"
        :spaceBetween="30"
        :pagination="{
          clickable: true
        }"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide class="q-pt-md q-pb-xl column cursor-pointer bg-grey-desktop" v-for="(doctor,key) in doctors" :key="key" @click="goToDoctorPage(doctor.firstName)">
          <q-img :src="doctor.profileImage" alt=""/>
          <div class="text-primary q-mt-sm fs-16 font-inter fw-600 text-center">{{doctor.title}} {{doctor.firstName}} {{doctor.lastName}}</div>
          <div class="fs-14 font-inter fw-500 text-primary text-center">{{doctor.education}}</div>
          <div class="q-mt-xs fs-14 color-grey font-inter fw-600 text-center">{{doctor.profilesShowcase}}</div>
          <div class="fs-12 color-grey font-inter fw-500 text-center">with {{doctor.yearsOfExperience }} years experience overall</div>
        </swiper-slide>
      </swiper>
      <div v-if="isMobile">
        <q-card v-for="(doctor, key) in doctors" :key="key" class="q-my-xs" flat>
          <q-card-section class="row justify-around items-center q-px-md">
            <q-img :src="doctor.profileImage" alt=""/>
            <div class="col-6">
              <div class="text-primary q-mt-sm fs-18 font-inter fw-600">{{doctor.firstName}} {{doctor.lastName}}</div>
              <div class="fs-14 font-inter fw-500 text-primary">{{doctor.education}}</div>
              <div class="q-mt-xs fs-14 color-grey font-inter fw-600">{{doctor.profilesShowcase}}</div>
              <div class="fs-12  color-grey font-inter fw-500">with {{doctor.yearsOfExperience }} years experience overall</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="medical-board q-ma-md">
      <q-expansion-item class="no-padding bg-grey-desktop" >
        <template v-slot:header>
          <div class="font-domine text-center fw-700 fs-20 text-primary  expander q-py-sm">
            Medical Review Board
          </div>
        </template>
        <q-card>
          <q-card-section class="text-center bg-grey-desktop">
            <div class="font-montserrat fs-16 text-primary fw-500">
              Meet our medical advisors — highly respected experts who ensure our content is complete and accurate.
            </div>
            <div class="row items-center q-gutter-y-md q-my-sm">
              <div v-for="(doctor, key) in doctors" :key="key" class="col-md-6 col-sm-6 col-xs-12">
                <div class="row items-center justify-center align-start">
                <img :src="doctor.profileImage" alt=""/>
                 <div class="font-montserrat q-pl-xs" :style="isMobile ? 'text-align: center' : 'text-align: start'">
                    <div class="q-mt-sm fw-600 fs-16" style="color: #004953">{{doctor.firstName}} {{doctor.lastName}}</div>
                    <div class="fs-14 fw-500 text-black q-mt-xs" style="max-width: 200px">{{doctor.education}}</div>
                    <div class="fs-14 fw-500 text-black q-mt-xs">{{doctor.profilesShowcase}}</div>
                 </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Pagination } from 'swiper/modules';
import { mapActions, mapMutations } from 'vuex';
export default {
  name: 'OurDoctors',
  data () {
    return {
      doctors: []
    }
  },
  computed: {
    isMobile () {
      return this.$q.screen.lt.sm
    },
    isTablet () {
      return this.$q.screen.gt.xs && this.$q.screen.lt.md
    },
    isDesktop () {
      return this.$q.screen.gt.sm
    },
    slidesCount () {
      return this.isTablet ? 2 : 3
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination, Navigation],
    };
  },
  methods: {
    ...mapActions({
      getDoctors: 'nursingHome/getDoctors'
    }),
    ...mapMutations({
      setDoctorId: 'nursingHome/setDoctorId'
    }),
    goToDoctorPage (key) {
      this.setDoctorId(key)
      this.$router.push({
        name: 'our-doctors'
      })
    },
    async fetchDoctors () {
      try {
        const { data } = await this.getDoctors()
        this.doctors = data
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
  mounted () {
    this.fetchDoctors()
  }
}
</script>

<style lang="scss" scoped>
.padding-x-axis {
  padding: 0 48px;
  @media only screen and (max-width: 799px) and (min-width:0px)  {
    padding: 0 24px;
  }
}
.description {
  font-size: 20px;
  max-width: 600px;
   @media only screen and (max-width: 1099px) and (min-width:1000px) {
    font-size: 16px;
    max-width: 450px;
   }
  @media only screen and (max-width: 999px) and (min-width:800px) {
    font-size: 16px;
    max-width: 350px;
  }
  @media only screen and (max-width: 799px) and (min-width:0px) {
    max-width: none;
    font-size: 14px;
    padding-right: 24px
  }
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide .q-img {
  max-width: 250px;
}
.q-card .q-img {
  max-width: 130px;
}
.bg-grey-desktop {
  background:#F6F6F6
}
.color-grey {
  color: #959595;
}
.expander {
  width: 100%;
}

.medical-board {
  :deep(.q-icon) {
    font-size: 30px;
    color: $primary;
  }
  img {
    width: 90px;
    border-radius: 50%;
  }
}
</style>
