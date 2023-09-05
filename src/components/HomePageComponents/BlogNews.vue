<template>
  <div class="row items-center justify-evenly q-py-lg font-inter">
    <!-- Blogs -->
    <div class="container col-md-5 col-sm-5 q-mr-xs col-xs-12 q-pa-md">
      <div class="fs-24 fw-600 text-primary">Blogs</div>
    <swiper
      :direction="'vertical'"
      :slidesPerView="2"
      :slidesPerGroup="2"
      :spaceBetween="30"
      :pagination="{
        clickable: true
      }"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide></swiper-slide>
      <!-- <swiper-slide class="q-pt-md q-pb-xl column" v-for="(doctor,key) in doctors" :key="key">
        <q-img :src="doctor.profileImage" alt=""/>
        <div class="text-primary q-mt-sm fs-16 font-inter fw-600 text-center">{{doctor.title}} {{doctor.firstName}} {{doctor.lastName}}</div>
        <div class="fs-14 font-inter fw-500 text-primary text-center">{{doctor.education}}</div>
        <div class="q-mt-xs fs-14 color-grey font-inter fw-600 text-center">{{doctor.profilesShowcase}}</div>
        <div class="fs-12 color-grey font-inter fw-500 text-center">with {{doctor.yearsOfExperience }} years experience overall</div>
      </swiper-slide> -->
    </swiper>
    </div>

    <!-- News -->
    <div class="container col-md-5 col-sm-5 col-xs-12 q-pa-md">
      <div class="fs-24 fw-600 text-primary">News</div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Pagination } from 'swiper/modules';
import { mapActions } from 'vuex'
export default {
  name: 'OurBlog',
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
    countBlog () {
      return this.isTablet ? 2 : 3
    }
  },
  methods: {
    ...mapActions({
      getAllBlogs: 'nursingHome/getAllBlogs'
    }),
    goTo (name) {
      this.$router.push({
        name
      })
    },
    async fetchAllBlogs () {
      try {
        const { data: { items }} = await this.getAllBlogs()
        this.blogs = items
        console.log(items)
      } catch (error) {
        this.$q.notify({
          message: "Something went wrong, please try again",
          color: "red",
          position: "top",
          icon: "warning",
        });
      }
    },
    goToBlog (id) {
      this.$router.push({
        name: 'individual-blog',
        params: {
          id
        }
      })
    }
  },
  mounted () {
    this.fetchAllBlogs()
  },
  data () {
    return {
      blogs: []
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
.container {
  border-radius: 15px;
  background: #F6F6F6;
}
</style>
