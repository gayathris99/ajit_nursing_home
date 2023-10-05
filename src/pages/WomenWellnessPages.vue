<template>
  <div :class="isMobile ? 'q-pa-md' : 'q-pa-xl'">
    <div class="font-inter fs-16 fw-600 q-px-sm">
      <span class="text-grey cursor-pointer" @click="goTo('home')">Home / </span>
      <span class="text-primary cursor-pointer">{{tabDetails?.title}}</span>
    </div>
    <div :class="isDesktop ? 'q-px-md' : ''">
      <div class="text-center font-domine q-mt-md text-primary fw-500" :class="isDesktop ? 'fs-30' : 'fs-24'">{{tabDetails?.title}}</div>
      <div class="intro-image row justify-center" :class="isDesktop ? 'q-mt-lg ' : 'q-mt-md'">
        <img  v-if="tabDetails?.image" :src="tabDetails?.image" alt="">
        <img v-else src="https://portfolio-platform.s3.amazonaws.com/media/anh/public/original_images/kelly-sikkema-IE8KfewAp-w-unsplash.jpg" alt="">
      </div>

      <!-- Tabs with blogs -->
      <div class="q-mt-md" v-for="(tabBlog, key) in tabBlogs" :key="key">
        <div class="text-center line-design q-mt-xl">
           <img v-if="!isMobile" src="~assets/line-design-long.svg" alt="">
           <img v-else src="~assets/line-design-short.svg" alt="">
        </div>
        <div class="text-center font-domine text-primary fs-24 q-mt-lg">{{tabBlog.title}}</div>
        <div class="row items-center  q-gutter-x-lg q-gutter-y-md q-mt-md" :class="!isDesktop ? 'justify-center' : 'justify-evenly'">
          <div class="col-md-2 col-sm-4 col-xs-10 blog-container cursor-pointer" v-for="(blog, id) in tabBlog.popularBlogsInside" :key="id" @click="goToBlog(blog.id)">
            <blog-component
            :blog="blog"/>
            <!-- <img  v-if="blog.image" :src="blog.image" alt="">
            <img v-else src="https://portfolio-platform.s3.amazonaws.com/media/anh/public/original_images/kelly-sikkema-IE8KfewAp-w-unsplash.jpg" alt="">
            <div class="blog-title">
              <div class="font-montserrat fw-700">{{blog.title}}</div>
              <div class="font-montserrat fw-500 fs-12" style="color: #56584B;">Reviewed by Dr. Abhishek MBBS</div>
            </div> -->
          </div>
        </div>
        <div class="row justify-center font-montserrat q-mt-xl">
          <q-btn
          label="Show more"
          class="fw-700"
          icon-right="expand_more"
          outline
          color="secondary"
          @click="onShowMore(tabBlog)"
          ></q-btn>
        </div>
      </div>

      <!-- All Blogs -->
      <div class="row items-center q-mt-xl q-gutter-x-lg q-gutter-y-md" :class="!isDesktop ? 'justify-center' : 'justify-evenly'">
        <div class="text-center line-design q-my-lg">
           <img v-if="!isMobile" src="~assets/line-design-long.svg" alt="">
           <img v-else src="~assets/line-design-short.svg" alt="">
        </div>
        <div class="col-md-2 col-sm-4 col-xs-10 blog-container cursor-pointer" v-for="(blog, id) in allBlogsData" :key="id" @click="goToBlog(blog.id)">
          <blog-component
          :blog="blog"/>
          <!-- <img  v-if="blog.image" :src="blog.image" alt="">
          <img v-else src="https://portfolio-platform.s3.amazonaws.com/media/anh/public/original_images/kelly-sikkema-IE8KfewAp-w-unsplash.jpg" alt="">
          <div class="blog-title">
            <div class="font-montserrat fw-700">{{blog.title}}</div>
            <div class="font-montserrat fw-500 fs-12" style="color: #56584B;">Reviewed by Dr. Abhishek MBBS</div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogComponent from 'src/components/WomenWellnessComponents/BlogComponent.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'WomenWellnessPages',
  components: { BlogComponent },
  computed: {
    ...mapGetters({
      getTabDetailsData: 'nursingHome/getTabDetailsData'
    }),
    isMobile () {
      return this.$q.screen.lt.sm
    },
    isDesktop () {
      return this.$q.screen.gt.sm
    }
  },
  data () {
    return {
      tabDetails: null,
      allBlogsData: [],
      tabBlogs: []
    }
  },
  watch: {
    getTabDetailsData: {
      immediate: true,
      deep: true,
      handler (newVal) {
        let { tabTitle } = this.$route.params
        tabTitle = tabTitle?.split('-').join(' ')
        const tabDetails = newVal?.filter(tab => tab.title.toLowerCase() === tabTitle.toLowerCase())
        this.tabDetails = tabDetails[0]
      }
    },
    '$route.params': {
      immediate: true,
      deep: true,
      handler (newVal) {
        let { tabTitle } = this.$route.params
        tabTitle = tabTitle?.split('-').join(' ')
        const tabDetails = this.getTabDetailsData?.filter(tab => tab.title.toLowerCase() === tabTitle.toLowerCase())
        this.tabDetails = tabDetails[0]
      }
    },
    tabDetails: {
      immediate: true,
      deep: true,
      handler (newVal) {
        if (newVal) {
          this.checkTabType(newVal.tabType)
        }
      }
    }
  },
  methods: {
    ...mapActions({
      getTabAllBlogs: 'nursingHome/getTabAllBlogs',
      getTabBlogs: 'nursingHome/getTabBlogs'
    }),
    goToBlog (id) {
      this.$router.push({
        name: 'individual-blog',
        params: {
          id
        }
      })
    },
    onShowMore (tabBlog) {
      const getTabDetailsData = this.getTabDetailsData?.filter(tab => tab.title.toLowerCase() === tabBlog.title.toLowerCase())
      if (getTabDetailsData.length) {
        this.$router.push({
          name: 'women-wellness-page',
          params: {
            tabTitle: getTabDetailsData[0]?.title?.toLowerCase()?.split(' ')?.join('-')
          },
        })
      }
    },
    async fetchTabBlogs () {
      try {
        const { data } = await this.getTabBlogs({
          tabId: this.tabDetails.id
        })
        this.tabBlogs = data
      } catch (error) {
          this.$q.notify({
            message: "Something went wrong, please try again",
            color: "red",
            position: "top",
            icon: "warning",
          });
        }
    },
    async fetchTabAllBlogs () {
      try {
        const { data } = await this.getTabAllBlogs({
          tabId: this.tabDetails.id
        })
        this.allBlogsData = data
      } catch (error) {
          this.$q.notify({
            message: "Something went wrong, please try again",
            color: "red",
            position: "top",
            icon: "warning",
          });
        }
    },
    checkTabType (tabType) {
      switch (tabType) {
        case 'OnlyBlogsInside': {
          this.fetchTabAllBlogs()
        }
        case 'OnlyTabsInside': {
          this.fetchTabBlogs()
        }
        case 'Tabs&BlogsInside': {
          this.fetchTabBlogs()
          this.fetchTabAllBlogs()
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.intro-image {
  // position: relative;
  img {
  width: 90%;
  height: 470px;
  object-fit: cover;
  @media only screen and (max-width: $breakpoint-sm-max) {
    height: 300px;
    width: 100%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    height: 200px;
    width: 100%;
  }
  }
  // .text-container {
  //   background: rgba(0, 73, 83, 0.60);
  //   color: white;
  //   position: absolute;
  //   bottom: 0px;
  //   left: 5%;
  //   padding: 16px;
  //   width: 1180.3px;
  // }
}
.line-design {
  img {
    width: 100%;
    height: 10px;
  }
}
.blog-container {
  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
}
.blog-title {
  height: 70px;
}
</style>

