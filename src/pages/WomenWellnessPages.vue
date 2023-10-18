<template>
  <div :class="isMobile ? 'q-pa-md' : 'q-pa-xl'" class="women-wellness-container q-mb-xl">
    <div class="font-inter fs-16 fw-600 q-px-sm">
      <span class="text-grey cursor-pointer" @click="goTo('home')">Home / </span>
      <span class="text-primary cursor-pointer">{{tabDetails?.title}}</span>
    </div>
    <div :class="isDesktop ? 'q-px-xl' : ''" class="column justify-center q-mb-xl">
      <div class="text-center font-domine q-mt-md text-primary fw-500" :class="isDesktop ? 'fs-30' : 'fs-24'">{{tabDetails?.title}}</div>
      <div class="intro-image row justify-center" :class="isDesktop ? 'q-mt-lg ' : 'q-mt-md'">
        <img  v-if="tabDetails?.image" :src="tabDetails?.image" alt="">
        <img v-else src="https://portfolio-platform.s3.amazonaws.com/media/anh/public/original_images/kelly-sikkema-IE8KfewAp-w-unsplash.jpg" alt="">
      </div>

      <!-- Tabs with blogs -->
      <div v-if="tabBlogs.length">
        <div class="q-mt-md" v-for="(tabBlog, key) in tabBlogs" :key="key">
          <div class="text-center line-design q-mt-xl">
            <img v-if="!isMobile" src="~assets/line-design-long.svg" alt="">
            <img v-else src="~assets/line-design-short.svg" alt="">
          </div>
          <div class="text-center font-domine text-primary fs-24 q-mt-lg">{{tabBlog.title}}</div>
          <div class="row items-center  q-gutter-y-lg q-gutter-x-xl q-mt-md" :class="isMobile ? 'justify-center' : 'justify-start'">
            <div class="blog-container cursor-pointer" v-for="(blog, id) in tabBlog.popularBlogsInside" :key="id" @click="goToBlog(blog)">
              <blog-component
              :blog="blog"/>
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
      </div>

      <!-- All Blogs -->
      <div class="text-center line-design q-my-lg">
          <img v-if="!isMobile" src="~assets/line-design-long.svg" alt="">
          <img v-else src="~assets/line-design-short.svg" alt="">
      </div>
      <div>
        <div class="row items-center q-gutter-y-lg q-gutter-x-xl q-pt-md q-mb-md " v-if="allBlogsData" :class="isMobile ? 'justify-center' : 'justify-start'">
          <div class="blog-container cursor-pointer" v-for="(blog, id) in allBlogsData" :key="id" @click="goToBlog(blog)">
            <blog-component
            :blog="blog"/>
          </div>
        </div>
        <!-- Faq type blog -->
        <div class="row items-center q-gutter-y-xl q-gutter-x-xl q-mb-md " :class="isMobile ? 'justify-center' : 'justify-start'">
          <div class="blog-container cursor-pointer" v-for="(blog, id) in faqBlogs" :key="id" @click="goToBlog(blog)">
            <blog-component
            :blog="blog"
            :isTypeFaqs="true"/>
          </div>
        </div>
      </div>

      <!-- Faq -->
      <div class="q-mt-xl" v-if="tabFaqs?.length">
        <div class="text-primary fw-600 fs-30 q-mb-sm">Frequently Asked Questions</div>
        <q-list  v-for="(faq, key) in tabFaqs" :key="key">
          <q-expansion-item class="no-padding" >
            <template v-slot:header>
              <div class="font-roboto fw-700 fs-18 text-primary font-inter faq-question q-py-sm">
                {{faq.question}}
              </div>
            </template>
            <q-card>
              <q-card-section>
                <div class="font-inter fs-16 color-primary-two fw-400">
                  {{faq.answer}}
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-separator />
        </q-list>
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
      tabBlogs: [],
      tabFaqs: [],
      faqBlogs: []
    }
  },
  watch: {
    getTabDetailsData: {
      immediate: true,
      deep: true,
      handler (newVal) {
        let { tabTitle } = this.$route.params
        tabTitle = tabTitle?.split('-').join(' ')
        this.tabDetails = null
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
      getTabBlogs: 'nursingHome/getTabBlogs',
      getTabFaq: 'nursingHome/getTabFaq',
      getFaqPages: 'nursingHome/getFaqPages',

    }),
    goToBlog (blog) {
      if (blog.tabType === 'OnlyFAQPagesInside') {
        this.$router.push({
          name: 'women-wellness-page',
          params: {
            tabTitle: blog.title.toLowerCase().split(' ').join('-')
          },
        })
      } else {
        this.$router.push({
          name: 'individual-blog',
          params: {
            id: blog.slug
          }
        })
      }
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
        this.$q.loading.show()
        this.tabBlogs = []
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
        } finally {
        this.$q.loading.hide()
      }
    },
    async fetchTabAllBlogs () {
      try {
        this.$q.loading.show()
        this.allBlogsData = []
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
        } finally {
          this.$q.loading.hide()
        }
    },
    async fetchTabFaq () {
      try {
        this.$q.loading.show()
        this.tabFaqs = []
        const { data } = await this.getTabFaq({
          tabId: this.tabDetails.id
        })
        this.tabFaqs = data
      } catch (error) {
          this.$q.notify({
            message: "Something went wrong, please try again",
            color: "red",
            position: "top",
            icon: "warning",
          });
        } finally {
          this.$q.loading.hide()
        }
    },
    async fetchFaqPages () {
        try {
        this.$q.loading.show()
        this.faqBlogs = []
        const { data } = await this.getFaqPages({
          tabId: this.tabDetails.id
        })
        this.faqBlogs = data
      } catch (error) {
          this.$q.notify({
            message: "Something went wrong, please try again",
            color: "red",
            position: "top",
            icon: "warning",
          });
        } finally {
          this.$q.loading.hide()
        }
    },
    checkTabType (tabType) {
      this.tabBlogs = []
      this.allBlogsData = []
      this.tabFaqs = []
      this.faqBlogs = []
      switch (tabType) {
        case 'OnlyBlogsInside': {
          this.fetchTabAllBlogs()
          break
        }
        case 'OnlyTabsInside': {
          this.fetchTabBlogs()
          break
        }
        case 'Tabs&BlogsInside': {
          this.fetchTabBlogs()
          this.fetchTabAllBlogs()
          break
        }
        case 'OnlyFAQPagesInside': {
          this.fetchFaqPages()
          break
        }
      }
      this.fetchTabFaq()
    }
  }
}
</script>


<style lang="scss" scoped>
.women-wellness-container {
  max-width: 1400px;
  height: auto;
  margin: auto;
}
.intro-image {
  // position: relative;
  img {
  width: 100%;
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
.faq-question {
  width: 100%;
}
</style>

