<template>
  <div class="bg-image">
   <div class="font-inter text-primary fs-16 fw-600 padding-left" :class="isMobile ? 'q-pt-md': 'q-pt-xl'">Testimonials</div>
   <div class="padding-left font-oxygen text-primary">
    <div class="fw-400 q-mt-sm title">See what our patients say!</div>
   </div>
    <swiper
      :slidesPerView="slidesCount"
      :slidesPerGroup="slidesCount"
      :spaceBetween="10"
      :pagination="{
        clickable: true
      }"
      :modules="modules"
      class="mySwiper"
    >
    <swiper-slide v-for="(review, key) in reviews" :key="key">
      <q-card class="q-my-xl">
        <q-card-section>
          <template v-for="(rating, index) in review.rating" :key="index">
            <q-icon name="grade" size="sm" color="warning"/>
          </template>
          <div class="font-inter fw-400 fs-18 review q-mt-md text-primary">{{review.description}}</div>
          <div class="font-inter fw-600 text-primary fs-18">- {{review.clientName}}</div>
        </q-card-section>
      </q-card>
    </swiper-slide>
    </swiper>
    <!-- <div class="row justify-center q-mt-md">
      <q-btn
      no-caps
      dense
      rounded
      class="fs-20 q-mb-xl font-overlock text-bold"
      style="background: #3363AC; color: white"
      label="See More"/>
    </div> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Pagination } from 'swiper/modules';
export default {
  name: 'OurTestimonials',
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
      return this.isDesktop ? 3 : this.isTablet ? 2 : 1
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
      getReviews: 'nursingHome/getReviews'
    }),
    async callReviews () {
      try {
        const { data } = await this.getReviews()
        this.reviews = data
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
    this.callReviews()
  },
  data () {
    return {
      reviews: []
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-image {
  background-image: url('~assets/testimonialsbg.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  max-height: 800px;
}
.swiper {
  width: 100%;
  height: 100%;
}
.q-card {
  border-radius: 6px;
  width: 350px;
  height: 300px;
  @media only screen and (max-width: 1200px) and (min-width:1050px) {
    width: 320px;
  }
  @media only screen and (max-width: 1049px) and (min-width:1025px) {
    width: 300px;
  }
  @media only screen and (max-width: 1024px) and (min-width:750px) {
    width: 320px;
  }
  @media only screen and (max-width: 749px) and (min-width:660px) {
    width: 300px;
  }
  @media only screen and (max-width: 659px) and (min-width:601px) {
    width: 260px;
  }
  @media only screen and (max-width: 600px) and (min-width:0px) {
   max-width: 300px;
  }

}
.swiper-slide {
  font-size: 18px;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.review {
  height: 180px
}
</style>
