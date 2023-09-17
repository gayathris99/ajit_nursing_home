<template>
  <div class="row items-center align-center justify-evenly q-py-lg font-inter q-gutter-y-md" :class="{'q-px-lg' : !isDesktop}">
    <!-- Blogs -->
    <div class="container col-md-5  col-sm-12 q-mr-xs  q-pa-md">
      <div class="fs-24 fw-600 text-primary q-mb-md">Blogs</div>
      <div v-for="(blog) in blogs" :key="blog.id" class="q-mb-lg cursor-pointer" @click="goToBlog(blog.id)">
        <div class="row items-center font-inter q-gutter-x-md">
          <div class="image-container">
            <img :src="blog?.image?.meta?.download_url"/>
          </div>
          <div class="details">
            <div class="color-primary-two fw-600 fs-12" :class="{'q-mt-sm' : isMobile}">{{blog.tag}}</div>
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
    </div>

    <!-- News -->
    <div class="container col-md-5  col-sm-12 q-pa-md">
      <div class="fs-24 fw-600 text-primary q-mb-md">News</div>
      <div v-for="(singleNews) in news" :key="singleNews.id" class="q-mb-lg cursor-pointer">
        <div class="row items-center font-inter q-gutter-x-md">
          <div class="image-container">
            <img :src="singleNews?.image?.meta?.download_url"/>
          </div>
          <div class="details">
            <div class="color-primary-two fw-600 fs-12">{{singleNews.tag}}</div>
            <div class="q-mt-sm text-primary fw-600 fs-18 blog-title">{{singleNews.title}}</div>
            <div class="blog-intro q-mt-xs fw-400 fs-12 ellipsis-2-lines">{{singleNews.intro}}</div>
            <div class="q-mt-md fw-600 fs-12 text-primary">Fact Checked By</div>
            <span class="fw-400 fs-12">Dr. Abhishek MBBS &#8226; {{singleNews?.date}}</span>
          </div>
        </div>
      </div>
      <div class="row justify-center q-mt-sm">
        <q-btn
          color="secondary"
          label="See More"
          no-caps
          class="fs-18 q-mt-md q-px-lg font-inter"/>
      </div>
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
      getAllBlogs: 'nursingHome/getAllBlogs',
      getAllNews: 'nursingHome/getAllNews'
    }),
    goTo (name) {
      this.$router.push({
        name
      })
    },
    async fetchAllBlogs () {
      try {
        const { data: { items }} = await this.getAllBlogs()
        this.blogs = items.slice(0,2)
      } catch (error) {
        this.$q.notify({
          message: "Something went wrong, please try again",
          color: "red",
          position: "top",
          icon: "warning",
        });
      }
    },
    async fetchAllNews () {
      try {
        const { data: { items }} = await this.getAllNews()
        this.news = items.slice(0,2)
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
    this.fetchAllNews()
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
.container {
  border-radius: 15px;
  background: #F6F6F6;
  height: 540px;
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
      width: 85vw;
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
</style>
