<template>
  <div :class="isMobile ? 'q-pa-md' : 'q-pa-xl'">
    <div class="q-pa-md">
      <div class="font-inter fs-16 fw-600 q-px-sm">
        <span class="text-grey cursor-pointer" @click="goTo('home')">Home / </span>
        <span class="text-primary cursor-pointer">{{unEditedTitle}}</span>
      </div>
      <div class="text-center font-domine q-mt-sm text-primary fw-500" :class="isDesktop ? 'fs-30' : 'fs-24'">{{unEditedTitle}}</div>
      <div class="q-mt-lg intro-image row justify-center">
        <img :src="introImage" alt="">
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
  img {
  width: 90%;
  height: 500px;
  object-fit: cover;
  }
}
</style>
