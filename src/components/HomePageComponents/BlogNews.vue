<template>
  <div>
    <div class="font-inter text-primary fs-24 fw-600 text-center q-mt-md">Blogs</div>
    <div class="row items-center align-center q-py-lg font-inter q-gutter-y-md q-mb-md q-gutter-x-sm q-py-sm" :class="{'q-px-lg' : !isDesktop, 'q-px-xl' : isDesktop}">
        <swiper
          :slidesPerView="getSlides"
          :slidesPerGroup="getSlides"
          :spaceBetween="30"
          :pagination="{
            clickable: true,
          }"
          :modules="modules"
          class="mySwiper"
        >
          <swiper-slide class="col-md-5  col-sm-12" v-for="(blog, key) in blogs" :key="key">
            <div class="container q-pa-md">
              <div class="fs-20 text-primary fw-600 q-mb-lg">{{blog.title}}</div>
              <div v-for="(insideBlog, id) in blog?.popularTabsInside" :key="id" class="q-mb-md cursor-pointer" @click="goToBlog(insideBlog.id)">
                <div class="row items-center q-gutter-x-md">
                  <div class="image-container">
                    <img v-if="insideBlog.image" :src="insideBlog.image" alt="">
                    <img v-else src="https://portfolio-platform.s3.amazonaws.com/media/anh/public/original_images/camylla-battani-son4VHt4Ld0-unsplash.jpg" alt="">
                  </div>
                  <div class="details">
                    <div class="q-mt-sm text-primary fw-600 fs-18 blog-title">{{insideBlog.title}}</div>
                    <div class="blog-intro q-mt-xs fw-400 fs-12 ellipsis-2-lines">{{insideBlog.intro}}</div>
                    <div class="q-mt-md fw-600 fs-12 text-primary">Fact Checked By</div>
                    <span class="fw-400 fs-12">Dr. Abhishek MBBS &#8226; {{getDate(insideBlog?.lastPublishedAt)}}</span>
                  </div>
                </div>
              </div>
              <div class="row justify-center q-mt-sm">
                <q-btn
                  color="secondary"
                  label="See More"
                  @click="goTo('blogs')"
                  no-caps
                  class="fs-18 q-mt-md q-px-lg font-inter"/>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      <!-- Blogs -->
      <!-- <div class="container col-md-5  col-sm-12 q-mr-xs  q-pa-md">
        <div class="fs-24 fw-600 text-primary q-mb-md">Blogs</div>
        <div v-for="(blog) in blogs" :key="blog.id" class="q-mb-lg cursor-pointer" @click="goToBlog(blog.id)">
          <div class="row items-center font-inter q-gutter-x-md">
            <div class="image-container">
              <img :src="blog?.image?.meta?.download_url"/>
            </div>
            <div class="details">
              <div class="color-primary-two fw-600 fs-12" :class="{'q-mt-sm' : isMobile}">blog.tag}}</div>
              <div class="q-mt-sm text-primary fw-600 fs-18 blog-title">{{blog.title}}</div>
              <div class="blog-intro q-mt-xs fw-400 fs-12 ellipsis-2-lines">{{blog.intro}}</div>
              <div class="q-mt-md fw-600 fs-12 text-primary">Fact Checked By</div>
              <span class="fw-400 fs-12">Dr. Abhishek MBBS &#8226; {{blog?.date}}</span>
            </div>
          </div>
        </div>
        <div class="row justify-center q-mt-lg">
          <q-btn
            color="secondary"
            label="See More"
            @click="goTo('blogs')"
            no-caps
            class="fs-18 q-mt-md q-px-lg font-inter"/>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Pagination } from 'swiper/modules';
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'OurBlog',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination, Navigation],
    };
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
    countBlog () {
      return this.isTablet ? 2 : 3
    },
    getSlides () {
      return this.isMobile || this.isTablet ? 1 : 2
    }
  },
  methods: {
    ...mapActions({
      getAllTabs: 'nursingHome/getAllTabs'
    }),
    ...mapMutations({
      setAllTabsData: 'nursingHome/setAllTabsData'
    }),
    goTo (name) {
      this.$router.push({
        name
      })
    },
    getDate (value) {
      const newValue = new Date(value)
      const monthValue = (newValue.getMonth() + 1) < 10 ? `0${newValue.getMonth() + 1}` : newValue.getMonth() + 1
      return `${newValue.getDate()}-${monthValue}-${newValue.getFullYear()}`
    },
    async fetchAllBlogs () {
      try {
        const { data } = await this.getAllTabs()
        this.setAllTabsData(data)
        this.blogs = []
        const tabData = JSON.parse(JSON.stringify(data))
        tabData?.forEach(data => {
          const popularTabsInside = data?.popularTabsInside.slice(0,2)
          this.blogs.push({...data, popularTabsInside})
        })
        console.log(this.blogs)
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
      blogs: [],
      news: []
    }
  }
}
</script>

<style lang="scss" scoped>
// .mySwiper {
//   :deep(.swiper-pagination) {
//     margin-top: 40px
//   }
// }
.container {
  border-radius: 15px;
  background: #F6F6F6;
  height: 480px;
  @media only screen and (max-width: 1024px) {
    height: 560px;
  }
  @media only screen and (max-width: 1023px) and (min-width: 0px) {
    height: auto;
  }
}
.image-container {
  img {
    width: 200px;
    height: 150px;
    object-fit: cover;
    @media only screen and (max-width: 1317px) and (min-width:1174px)  {
      width: 190px;
      height: 150px;
      object-fit: cover;
    }
    @media only screen and (max-width: 1173px) and (min-width: 1024px)  {
      width: 160px;
      height: 130px;
      object-fit: cover;
    }
    @media only screen and (max-width: 599px) and (min-width: 0px)  {
      width: 80vw;
      height: 200px;
      object-fit: cover;
    }

  }
}

.blog-title {
  max-width: 300px;
  @media only screen and (max-width: 1317px) and (min-width:1245px)  {
    max-width: 280px;
  }
  @media only screen and (max-width: 1244px) and (min-width:1102px)  {
    max-width: 250px;
  }
  @media only screen and (max-width: 1101px) and (min-width: 1024px)  {
    max-width: 210px;
  }
  @media only screen and (max-width: 1023px) and (min-width: 850px)  {
    max-width: 65vw;
  }
  @media only screen and (max-width: 849px) and (min-width: 740px)  {
    max-width: 60vw;
  }
  @media only screen and (max-width: 739px) and (min-width: 600px)  {
    max-width: 50vw;
  }
  @media only screen and (max-width: 599px) and (min-width: 0px)  {
    width: 85vw;
  }
}
.blog-intro {
 color: rgba(29, 47, 78, 0.40);
 max-width: 300px;
  @media only screen and (max-width: 1317px) and (min-width:1245px)  {
    max-width: 280px;
  }
  @media only screen and (max-width: 1244px) and (min-width:1102px)  {
    max-width: 250px;
  }
  @media only screen and (max-width: 1101px) and (min-width: 1024px)  {
    max-width: 210px;
  }
  @media only screen and (max-width: 1023px) and (min-width: 850px)  {
    max-width: 65vw;
  }
  @media only screen and (max-width: 849px) and (min-width: 740px)  {
    max-width: 60vw;
  }
  @media only screen and (max-width: 739px) and (min-width: 600px)  {
    max-width: 50vw;
  }
  @media only screen and (max-width: 599px) and (min-width: 0px)  {
    width: 85vw;
  }
}
.swiper {
  // width: 100%;
  // height: fit-content;
}

.swiper-slide {
  height: 540px;
  @media only screen and (max-width: 1024px) {
    height: 560px;
  }
  @media only screen and (max-width: 1023px) and (min-width: 0px) {
    height: auto;
  }
}
</style>
