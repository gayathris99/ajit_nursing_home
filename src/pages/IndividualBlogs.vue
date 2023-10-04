<template>
  <div :class="isMobile ? 'q-pa-lg' : 'q-pa-xl'" class="blog-main-container">
    <div v-if="blogContent">
      <div class="title font-domine fw-500 text-primary">{{blogContent.title}}</div>
      <div class="q-mt-sm font-domine fw-500 fs-14" style="color:#646464;">Last updated on {{blogContent.date}}</div>
      <div class="row items-center justify-between font-domine  q-mt-xs"  style="color:#646464;">
        <div class="row items-center q-gutter-x-xs"><span><q-icon name="task_alt" size="xs"/></span><span class="font-domine fw-500 fs-14">Reviewed by Abhishek S Bane, MBBS</span></div>
        <div :class="isMobile ? 'q-mt-sm' : ''" class="fs-14 fw-700  cursor-pointer font-domine" @click="openSharePopup">SHARE THIS POST &nbsp;<span class="bg-icon q-pa-xs"><q-icon name="link"/></span></div>
      </div>
      <div class="image-container" :class="isDesktop ? 'q-mt-lg' : 'q-mt-md'">
        <img v-if="blogContent?.image?.meta?.download_url" :src="blogContent?.image?.meta?.download_url" alt="">
        <img v-else src="https://portfolio-platform.s3.amazonaws.com/media/anh/public/original_images/kelly-sikkema-IE8KfewAp-w-unsplash.jpg" alt="">
      </div>

      <!-- Desktop blog -->
      <div v-if="isDesktop" class="row q-gutter-x-sm q-mt-md">
        <div class="table-of-contents-wrapper col-md-2 q-mr-lg" v-if="tableOfContents.length">
          <q-card style="background-color:#FFDBD3" class="table-of-contents">
              <q-card-section>
                <div class="font-domine text-primary fs-16 q-my-xs fw-600">Table of contents</div>
                <div v-for="(title, key) in tableOfContents" :key="key"
                class="font-domine q-py-sm cursor-pointer toc-title"
                @click="onParseDocument(title)">
                  {{title.label}}
                </div>
              </q-card-section>
          </q-card>
        </div>
        <div class="blog-body font-domine text-primary fs-18" :class="{'col-md-9' : tableOfContents.length}" v-html="blogContent.body"></div>
      </div>


      <div v-if="!isDesktop && tableOfContents.length" class="q-mt-md non-desktop-toc">
        <q-card style="background-color:#FFDBD3">
          <q-card-section>
            <div class="font-domine text-primary fs-16 q-my-xs fw-600">Table of contents</div>
            <div v-for="(title, key) in tableOfContents" :key="key"
            class="font-domine q-py-sm cursor-pointer toc-title"
            @click="onParseDocument(title)">
              {{title.label}}
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="q-mt-md" v-if="!isDesktop">
        <div class="q-mt-md blog-body font-domine text-primary fs-18" v-html="blogContent.body"></div>
      </div>
      <!-- <div v-if="!isDesktop" class="bottom-container">&nbsp;</div> -->
      <div class="q-mt-xl" v-if="blogContentFAQ?.length">
        <div class="text-primary fw-600 fs-30 q-mb-sm">Frequently Asked Questions</div>
        <q-list  v-for="(faq, key) in blogContentFAQ" :key="key">
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
    <div v-if="!blogContent && !isLoading">
      <div class="column justify-center align-center items-center q-mt-md">
        <q-img src="~assets/noResultFound.svg" width="250px"></q-img>
        <div class="text-primary q-ml-md font-inter fs-16 fw-600 q-mt-md">No results found</div>
        <q-btn label="Go Home" color="primary" class="q-mt-md font-montserrat q-ml-md fw-700" @click="goTo('home')"></q-btn>
      </div>
    </div>
    <q-dialog v-model="sharePopup" class="share-popup">
     <q-card>
        <q-card-section class="q-pa-md font-inter">
          <div class="row justify-end cursor-pointer">
            <q-icon name="close" v-close-popup size="xs"/>
          </div>
          <div class="q-mt-md">
            <div class="text-primary fw-600 fs-18 font-inter q-my-sm">Share this post on:</div>
            <img src="~assets/whatsapp.png" alt="" width="40" class="cursor-pointer" @click="shareOnWhatsapp">
            <hr>
            <div class="text-primary fw-600 fs-18 font-inter q-my-sm">Copy link to clipboard</div>
            <div class="row items-center q-gutter-sm">
              <q-input readonly outlined v-model="blogLink"/>
              <q-icon name="content_copy" :size="isMobile ? 'xs': 'md'" color="primary" class="cursor-pointer" @click="copyLink"></q-icon>
            </div>
            <div v-if="showCopied" class="text-positive fs-12 fw-600 q-mt-sm">Copied</div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
  <q-page-sticky position="top" style="width: 100%" expand>
  <div v-if="showStickyHeader && !isDesktop && tableOfContents.length" style="width:100%">
    <q-expansion-item
      expand-separator
      v-model="isExpanded"
      label="Table of Contents"
      class="font-montserrat fw-700 fs-16 text-primary text-center"
    >
      <q-card>
        <q-card-section class="text-left">
          <div v-for="(title, key) in tableOfContents" :key="key"
          class="font-domine q-py-sm cursor-pointer toc-title"
          v-close-popup
          @click="onParseDocument(title)">
            {{title.label}}
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
  </q-page-sticky>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'IndividualBlogs',
  data () {
   return {
     blogContent: '',
     blogContentFAQ: '',
     sharePopup: false,
     blogLink: null,
     showCopied: false,
     isLoading: true,
     tableOfContents: [],
     showStickyHeader: false,
     isExpanded: false
   }
  },
  computed: {
    isMobile () {
      return this.$q.screen.lt.sm
    },
    isDesktop () {
      return this.$q.screen.gt.sm
    },
  },
  created () {
    if (!this.isDesktop) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  beforeUnmount () {
    if (!this.isDesktop) window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    blogContent: {
      immediate: true,
      deep: true,
      handler (newVal) {
        if (newVal.body) {
          setTimeout(this.fetchBlogTitles, 100)
        }
      }
    }
  },
  methods: {
    ...mapActions({
      getBlog: 'nursingHome/getBlog',
      getBlogFAQ: 'nursingHome/getBlogFAQ'
    }),
    handleScroll () {
      const card = document.getElementsByClassName('non-desktop-toc')[0]
      if (window.pageYOffset > card?.offsetTop + card?.offsetHeight) {
        this.showStickyHeader = true
        console.log(window.pageYOffset)
      } else {
        this.showStickyHeader = false
      }
    },
    copyLink () {
      navigator.clipboard.writeText(this.blogLink)
      this.showCopied = true
    },
    shareOnWhatsapp () {
      window.open(`https://api.whatsapp.com/send?text=${this.blogLink}`)
    },
    onParseDocument ({ label, value }) {
      if (!this.isDesktop) this.isExpanded = false
      const element = document.getElementById(value)
      const headerOffset = this.isDesktop ?  130 : this.isMobile ?  150 : 170;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    },
    fetchBlogTitles () {
      const titles = []
      document.querySelectorAll('h2')?.forEach(ele => {
        const modifiedTitle = ele.innerHTML.split(' ').join('-')
        titles.push({
          label: ele.innerHTML,
          value: modifiedTitle
        })
        ele.setAttribute('id', ele.innerHTML.split(' ').join('-'))
      })
      this.tableOfContents = titles
    },
    goTo (name) {
      this.$router.push({
        name
      })
    },
    goToBlog () {
      this.$router.push({
        name: 'individual-blog',
        params: {
          id: this.$route.params.id
        }
      })
    },
    openSharePopup () {
      this.showCopied = false
      this.sharePopup = true
    },
    async fetchBlog () {
      const blogId = this.$route.params.id
      try {
        this.isLoading = true
        this.$q.loading.show()
        const { data } = await this.getBlog({
          blogId
        })
        this.blogContent = data
      } catch (error) {
        this.$q.notify({
          message: "Something went wrong, please try again",
          color: "red",
          position: "top",
          icon: "warning",
        });
      }
      finally {
        this.isLoading = false
        this.$q.loading.hide()
      }
    },
    async fetchBlogFAQ () {
      const blogId = this.$route.params.id
      try {
        this.$q.loading.show()
        const { data } = await this.getBlogFAQ({
          blogId
        })
        if (data?.length) this.blogContentFAQ = data
      } catch (error) {
        this.$q.notify({
          message: "Something went wrong, please try again",
          color: "red",
          position: "top",
          icon: "warning",
        });
      }
      finally {
        this.$q.loading.hide()
      }
    }
  },
  mounted () {
    this.fetchBlog()
    this.fetchBlogFAQ()
    this.blogLink = window.location.href
  }
}
</script>


<style lang="scss" scoped>
.bg-icon {
  border-radius: 56px;
  background: var(--light-grey, #F4F4F4);
}
.non-desktop-toc {
  position: relative;
}
.toc-title:hover {
  text-decoration: underline;
}
.table-of-contents-wrapper {
  position: relative;
}
.table-of-contents {
  position: sticky;
  top: 150px;
}
  :deep(.q-scrollarea__thumb) {
    display: none;
  }
::-webkit-scrollbar {
   display: none;
}
:deep(.blog-body) {
  a {
    color: $secondary;
    font-weight: bold;
  }

  h4, h3, h2, h1 {
    margin-top: 40px !important;
    margin-bottom: 15px !important;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
    line-height: 40px !important;
    @media only screen and (max-width: $breakpoint-xs-max) {
      font-size: 26px;
    }
  }
  ul {
  list-style-type: square;
}
}
.faq-question {
  width: 100%;
}
.q-dialog {
  width: 300px;
}
.q-input {
  width: 300px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 220px;
  }
}
.blog-main-container {
  max-width: 1100px;
  height: auto;
  margin: auto;
  // width: 50%;
}
.image-container {
  img {
    width: 100%;
    object-fit: cover;
    max-height: 450px;
    box-shadow: 6px 5px 0 rgba(10,56,63,.1);
  }
}
.table-of-content {
  position: fixed;
}
.sticky-header {
  position: fixed;
  width: 100%;
  @media only screen and (max-width: $breakpoint-sm-max) {
   top: 120px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
   top: 100px;
  }
}
.q-expansion-item {
  background: #edfbfc;
}
</style>
