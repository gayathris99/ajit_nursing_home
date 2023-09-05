<template>
  <div :class="isMobile ? 'q-pa-md' : 'q-pa-xl'">
    <div class="font-inter fs-16 fw-600 q-px-sm">
      <span class="text-grey cursor-pointer" @click="goTo('home')">Home / </span>
      <span class="text-grey cursor-pointer"  @click="goTo('blogs')">Blogs / </span>
      <span class="text-primary cursor-pointer" @click="goToBlog()">{{blogContent.title}}</span>
    </div>
    <div class="row justify-between items-center font-inter fw-600 q-mt-lg q-gutter-y-xs-md">
      <div class="title  text-primary col-md-10 col-sm-8 col-xs-12">{{blogContent.title}}</div>
      <div class="fs-16 color-primary-two cursor-pointer" @click="openSharePopup">Share this post &nbsp;<span class="bg-icon q-pa-xs"><q-icon name="link"/></span></div>
    </div>
    <div class="font-inter fs-14 fw-600 q-mt-sm">
      <span class="color-primary-two">Fact checked by: </span>
      <span class="fw-400">Dr. Abhishek MBBS &#8226; {{blogContent.date}}</span>
    </div>
    <div class="grey-border  q-mt-md" :class="isMobile ? 'q-pa-sm': 'q-py-lg q-px-md'">
      <q-img :src="blogContent?.image?.meta?.download_url"/>
    </div>
    <div class="q-mt-md blog-body font-inter text-primary fs-18" v-html="blogContent.body">
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
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'IndividualBlogs',
  data () {
   return {
     blogContent: '',
     sharePopup: false,
     blogLink: null,
     showCopied: false
   }
  },
  computed: {
    isMobile () {
      return this.$q.screen.lt.sm
    }
  },
  methods: {
    ...mapActions({
      getBlog: 'nursingHome/getBlog'
    }),
    copyLink () {
      navigator.clipboard.writeText(this.blogLink)
      this.showCopied = true
    },
    shareOnWhatsapp () {
      window.open(`https://api.whatsapp.com/send?text=${this.blogLink}`)
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
        this.$q.loading.hide()
      }
    }
  },
  mounted () {
    this.fetchBlog()
    this.blogLink = window.location.href
  }
}
</script>


<style lang="scss" scoped>
.banner-image {
  max-height: 600px;
  width: 50vw;
  object-fit: scale-down;
}
.bg-icon {
  border-radius: 56px;
  background: var(--light-grey, #F4F4F4);
}
.grey-border {
  border: 1px solid #EEE;
  .q-img {
    object-fit: cover;
  }
}
:deep(.blog-body) {
  a {
    color: blue;
    font-weight: bold;
  }

  h4, h3, h2, h1 {
    margin: 30px 0px !important;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
  }
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
</style>
