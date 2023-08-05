<template>
  <div>
    <div class="font-oxygen text-primary fs-16 fw-700 padding-left" :class="isMobile ? 'q-pt-md': 'q-pt-xl'">OUR DOCTORS</div>
    <div class="row justify-between  font-radley text-primary padding-x-axis">
      <div class="fw-600 q-mt-sm title">Specialist obgyne, <br/>pediatricians team</div>
      <div class="text-justify description q-pb-xl q-mt-md">Has a team of the best specialist doctors in the field of obstetrics & gynaecology as well as paediatricians. In addition, we also have several other specialists.</div>
      <!-- Desktop and Tablet Swiper -->
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
      <swiper-slide class="q-pt-md q-pb-xl font-overlock column" v-for="(doctor,key) in doctors" :key="key">
        <q-img src="~assets/checkdoctor.svg" alt=""/>
        <div class="text-black q-mt-sm fs-18">{{doctor.name}}</div>
        <div class="fs-14">{{doctor.qualification}}</div>
        <div class="fs-14">{{doctor.position}}</div>
        <div class="fs-14">{{doctor.experience}}</div>
      </swiper-slide>
      </swiper>

    </div>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';

  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  // import required modules
  import { Navigation, Pagination } from 'swiper/modules';
export default {
  name: 'OurDoctors',
  data () {
    return {
      doctors: [
        {
          name: 'Dr. Gayathri S Bane',
          qualification: 'MBBS, MD - Obstetrics & Gynaecology',
          position: 'Obstetrician , Gynaecologist',
          experience: 'with 30 years experience overall'
        },
        {
          name: 'Dr. Shrimant.S.Bane',
          qualification: 'MBBS, MS - General Surrgery',
          position: 'General Surgeon',
          experience: 'with 33 years experience overall'
        },
        {
          name: 'Dr. Abhishek S Bane',
          qualification: 'MBBS, MS - General Surrgery',
          position: 'General Surgeon',
          experience: 'with 7 years experience overall'
        }
      ]
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

.swiper-button-prev {
    color: red;
}

.swiper-button-next {
    color: #000;
}

</style>
