<template>
  <div :class="isMobile ? 'bg-greyish': ''">
    <div class="font-inter text-primary fs-24 fw-600 padding-left" :class="isMobile ? 'q-pt-md': 'q-pt-xl'">Our Blogs</div>
    <div class="padding-left font-oxygen text-primary">
      <div class="fw-400 q-mt-sm title">See the latest news we present</div>
    </div>
    <div class="row justify-between items-center">
      <div v-for="(blog, key) in blogs" :key="key" class="col-md-6 col-sm-12 col-sm-12">
        <div v-if="isTablet || isDesktop">
          <q-img :src="blog?.image?.meta?.download_url" crossorigin="desktop-image"/>
        </div>
      </div>
    </div>
    <!-- <div v-if="isTablet || isDesktop" class="tablet-desktop-blog">
      <div class="row q-mt-md q-pb-xl items-center q-gutter-lg q-px-md" :class="isMobile ? 'justify-center' : 'justify-evenly'">
        <template v-for="i in countBlog" :key="i">
          <q-card @click="goToBlog(blogs[i-1]?.id)" rounded class="cursor-pointer">
            <q-card-section class="no-padding no-margin">
              <div>
                <img :src="blogs[i-1]?.image.meta.download_url" alt="">
              </div>
              <div class="q-pa-md font-overpass">
                <div class="text-uppercase text-bold text-primary">{{ blogs[i-1]?.tag }}</div>
                <div class="q-mt-md fs-20 blog-title text-primary">{{ blogs[i-1]?.title }}</div>
                <div class="fs-12" style="color:#646464">Medically reviewed by Abhishek, MBBS</div>
              </div>
            </q-card-section>
          </q-card>
        </template>
      </div>
    </div>
    <div v-if="isMobile" class="q-mb-lg mobile-blog">
      <q-card v-for="(blog, key) in blogs" :key="key" flat class="q-my-sm">
        <q-card-section class="row items-center justify-between q-py-md" @click="goToBlog(blog.id)">
          <div class="col-6 font-overpass">
            <div class="text-uppercase text-bold text-primary">{{ blog.tag }}</div>
             <div class="q-mt-md fs-20 blog-title text-primary">{{ blog.title }}</div>
             <div class="fs-12" style="color:#646464">Medically reviewed by Abhishek, MBBS</div>
          </div>
          <q-img :src="blog?.image.meta.download_url" class="rounded-borders"/>
        </q-card-section>
      </q-card>
    </div> -->
    <div class="row justify-center">
      <q-btn
      no-caps
      rounded
      class="fs-18 q-mb-xl q-px-lg font-inter fw-500"
      style="background: #3363AC; color: white"
      label="See More"/>
    </div>
  </div>
</template>

<script>
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
    async fetchAllBlogs () {
      try {
        const { data: { items }} = await this.getAllBlogs()
        this.blogs = items
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
      console.log(id)
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
  }
}
</script>

<style lang="scss" scoped>
.tablet-desktop-blog {
  .q-card {
    width: 350px;
    height: 350px;
    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    @media only screen and (max-width: $breakpoint-xs-max) {
      width: 280px;
      // height: 240px;
    }
  }
  .q-card:hover {
    transform: scale(1.05);
  }
  img {
    width: 100%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    height: 175px; //static
    object-fit: cover;
    transition: transform .4s;
  }
  .blog-title {
    height: 75px;
  }
}

.mobile-blog {
  .q-img {
    max-width: 140px;
  }
}

.desktop-image {
  widows: 160px;
  height: 140px;
}

</style>
