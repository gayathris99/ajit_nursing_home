<template>
  <div :class="isMobile ? 'q-pa-md' : 'q-pa-xl'">
    <div class="font-inter fs-16 fw-600 q-px-sm">
      <span class="text-grey cursor-pointer" @click="goTo('home')">Home / </span>
      <span class="text-primary cursor-pointer">{{unEditedTitle}}</span>
    </div>
    <div :class="isDesktop ? 'q-px-md' : ''">
      <div class="text-center font-domine q-mt-md text-primary fw-500" :class="isDesktop ? 'fs-30' : 'fs-24'">{{unEditedTitle}}</div>
      <div class="intro-image row justify-center" :class="isDesktop ? 'q-mt-lg ' : 'q-mt-md'">
        <img :src="introImage" alt="">
        <!-- <div class="text-container font-inter fs-16">{{imageQuotation}}</div> -->
      </div>
      <div class="q-mt-md" v-for="(tabBlog, key) in tabBlogData" :key="key">
        <div class="text-center line-design q-mt-xl">
           <img v-if="!isMobile" src="~assets/line-design-long.svg" alt="">
           <img v-else src="~assets/line-design-short.svg" alt="">
        </div>
        <div class="text-center font-domine text-primary fs-24 q-mt-lg">{{tabBlog.title}}</div>
        <div class="row items-center  q-gutter-x-lg q-gutter-y-md q-mt-md" :class="!isDesktop ? 'justify-center' : 'justify-evenly'">
          <div class="col-md-2 col-sm-4 col-xs-10 blog-container cursor-pointer" v-for="(blog, id) in tabBlog.popularBlogsInside" :key="id" @click="goToBlog(blog)">
            <img  v-if="blog.image" :src="blog.image" alt="">
            <img v-else src="https://portfolio-platform.s3.amazonaws.com/media/anh/public/original_images/kelly-sikkema-IE8KfewAp-w-unsplash.jpg" alt="">
            <div class="blog-title">
              <div class="font-montserrat fw-700">{{blog.title}}</div>
              <div class="font-montserrat fw-500 fs-12" style="color: #56584B;">Reviewed by Dr. Abhishek MBBS</div>
            </div>
          </div>
        </div>
        <div class="row justify-center font-montserrat q-mt-md">
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
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PopularTabBlogs',
  data () {
    return {
      tabId: null,
      tabTitle: null,
      unEditedTitle: '',
      introImage: null,
      imageQuotation: null,
      tabBlogData: []
    }
  },
  computed: {
    ...mapGetters({
      getAllTabsData: 'nursingHome/getAllTabsData'
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
      getTabBlogs: 'nursingHome/getTabBlogs',
      getTabIntro: 'nursingHome/getTabIntro'
    }),
    async fetchTabIntro () {
      this.$q.loading.show()
      if (!this.getAllTabsData.length) {
        try {
          const { data } = await this.getTabIntro({
            tabId: this.tabId
          })
          this.imageQuotation = data?.quotation
          this.introImage = data?.image
          this.unEditedTitle = data?.title
        } catch (error) {
          this.$q.notify({
            message: "Something went wrong, please try again",
            color: "red",
            position: "top",
            icon: "warning",
          });
        }
      }
      else {
        const selectedTab = this.getAllTabsData?.filter(tab => tab.id === Number(this.tabId))
        if (selectedTab.length) {
          this.introImage = selectedTab[0]?.image
          this.imageQuotation = selectedTab[0]?.quotation
          this.unEditedTitle = selectedTab[0]?.title
        }
      }
      this.fetchTabBlogs()
      this.$q.loading.hide()
    },
    async fetchTabBlogs () {
      try {
        const { data } = await this.getTabBlogs({
          tabId: this.tabId
        })
        this.tabBlogData = data
      } catch (error) {
          this.$q.notify({
            message: "Something went wrong, please try again",
            color: "red",
            position: "top",
            icon: "warning",
          });
        }
    },
    goTo (name) {
      this.$router.push({
        name
      })
    },
    goToBlog (blog) {
      this.$router.push({
        name: 'individual-blog',
        params: {
          id: blog.slug
        }
      })
    },
    onShowMore (tabBlog) {
    const { tabTitle } = this.$route.params
     const subTabTitle = tabBlog?.title?.toLowerCase()?.split(' ')?.join('-')
      this.$router.push({
        name: 'tab-all-blogs',
        params: {
          mainTabTitle: tabTitle,
          subTabTitle,
          tabId: tabBlog.id
        }
      })
    }
  },
  created () {
    const { tabId, tabTitle } = this.$route.params
    this.tabId = tabId
    this.tabTitle = tabTitle
    this.fetchTabIntro()
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
