<template>
  <div :class="isMobile ? 'q-pa-md' : 'q-pa-xl'">
    blogs
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
    }
  },
  methods: {
    ...mapActions({
      getTabBlogs: 'nursingHome/getTabBlogs',
      getTabIntro: 'nursingHome/getTabIntro'
    }),
    async fetchTabIntro () {
      if (!this.getAllTabsData.length) {
        try {
          const { data } = await this.getTabIntro({
            tabId: this.tabId
          })
          this.imageQuotation = data?.quotation
          this.introImage = data?.image
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
        }
      }
      this.fetchTabBlogs()
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
