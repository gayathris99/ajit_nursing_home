<template>
  <div :class="isMobile ? 'bg-greyish': ''">
    <div class="font-inter text-primary fs-24 fw-600 padding-left" :class="isMobile ? 'q-pt-md': 'q-pt-xl'">Our Blogs</div>
    <div class="padding-left font-oxygen text-primary">
      <div class="fw-400 q-mt-sm title padding-right">See the latest news we present</div>
    </div>
    <div class="row items-center justify-evenly q-gutter-y-lg padding-left q-mt-md">
      <div class="col-md-6 col-sm-12 col-xs-12 cursor-pointer" v-for="(blog, key) in blogs" :key="key"  @click="goToBlog(blog.id)">
        <div class="row items-center q-gutter-md blog-image" v-if="isDesktop || isTablet">
           <img :src="blog?.image.meta.download_url" class="desktop-image"/>
           <div class="column font-inter">
              <div class="color-primary-two fs-12 fw-600">{{blog.tag}}</div>
              <div class="color-primary-two fs-18 fw-600 blog-title">{{blog.title}}</div>
              <div class="text-grey intro fs-12 ellipsis-2-lines">{{blog.intro}}</div>
              <div class="color-primary-two fs-12 fw-600 q-mt-md">Fact Checked By</div>
              <div class="fw-400 color-primary-two fs-12">Dr. Abhishek MBBS &#x2022; {{blog.date}}</div>
           </div>
        </div>
        <div class="padding-right font-inter" v-if="isMobile" @click="goToBlog(blog.id)">
          <img :src="blog?.image.meta.download_url" class="mobile-image"/>
          <div class="color-primary-two fs-12 fw-600 q-mt-lg">{{blog.tag}}</div>
          <div class="color-primary-two fs-18 fw-600">{{blog.title}}</div>
          <div class="text-grey fs-12 ellipsis-2-lines q-mt-sm">{{blog.intro}}</div>
          <div class="color-primary-two fs-12 fw-600 q-mt-md">Fact Checked By</div>
          <div class="fw-400 color-primary-two fs-12">Dr. Abhishek MBBS &#x2022; {{blog.date}}</div>
        </div>
      </div>
    </div>
    <div class="row justify-center q-mt-xl">
      <q-btn
      no-caps
      rounded
      class="fs-18 q-mb-xl q-px-lg font-inter fw-500"
      style="background: #3363AC; color: white"
      label="See More"
      @click="goTo('blogs')"/>
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
    goTo (name) {
      this.$router.push({
        name
      })
    },
    async fetchAllBlogs () {
      try {
        const { data: { items }} = await this.getAllBlogs()
        this.blogs = items.slice(0,4)
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
  }
}
</script>

<style lang="scss" scoped>
// .tablet-desktop-blog {
//   .q-card {
//     width: 350px;
//     height: 350px;
//     border-radius: 20px;
//     box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//     @media only screen and (max-width: $breakpoint-xs-max) {
//       width: 280px;
//       // height: 240px;
//     }
//   }
//   .q-card:hover {
//     transform: scale(1.05);
//   }
//   img {
//     width: 100%;
//     border-top-left-radius: 20px;
//     border-top-right-radius: 20px;
//     height: 175px; //static
//     object-fit: cover;
//     transition: transform .4s;
//   }
//   .blog-title {
//     height: 75px;
//   }
// }

.mobile-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  @media only screen and (max-width: 599px) and (min-width: 400px) {
    height: 200px;
  }
}

.desktop-image {
  width: 200px;
  height: 160px;
  object-fit: contain;
}

.intro {
  max-width: 320px;
  width: 240px;
  @media only screen and (max-width: $breakpoint-sm-max) and (min-width: 731px) {
    max-width: 500px;
    width: 500px;
  }
  @media only screen and (max-width: 730px) and (min-width: 620px){
    max-width: 400px;
    width: 400px;
  }
  @media only screen and (max-width: 620px) and (min-width: 600px){
    max-width: 350px;
    width: 350px;
  }
}
.blog-title {
   @media only screen and (max-width: 1190px) and (min-width: 1024px) {
      max-width: 250px;
   }
   @media only screen and (max-width: 730px) and (min-width: 600px) {
    max-width: 200px;
   }
}
.padding-right {
  padding-right: 48px;
  @media only screen and (max-width: 799px) and (min-width:0px)  {
    padding-right: 24px;
  }
}
.blog-image {
  img {
    // max-width: 200px;
    height: 150px;
    // height: auto;
    width: 200px;
    object-fit: cover;
    // object-position: bottom;
  }
}
</style>
