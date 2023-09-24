<template>
  <div>
    <div class="font-inter text-primary fs-24 fw-600 text-center q-mb-md q-mt-lg">BLOGS</div>
    <div class="scroll-container q-px-md">
      <div class="tab-container">
        <div v-for="(tab, id) in tabTitles" :key="id"  class="q-pa-sm" @click="onTabClick(tab)">
          <div class="tag-category font-montserrat fs-18 fw-700 cursor-pointer" :class="tab.isActive ? 'tag-category-active' : ''">{{tab.title}}</div>
        </div>
      </div>
      <q-scroll-area style="height: 500px" v-if="isDesktop || isTablet">
        <div v-if="tabSelected" class="row q-my-md q-gutter-x-xs justify-start q-gutter-x-lg q-gutter-y-lg no-wrap q-px-md">
          <div v-for="(blog, key) in blogs" :key="key" @click="goToBlog(blog.id)" class="col-md-3 col-sm-5 col-xs-6">
            <q-card class="blog-container cursor-pointer">
              <img v-if="blog.image" :src="blog.image"/>
              <img v-else src="https://portfolio-platform.s3.amazonaws.com/media/anh/public/original_images/kelly-sikkema-IE8KfewAp-w-unsplash.jpg"/>
              <div class="details-container q-pa-md q-mt-sm font-montserrat">
                <div class="text-primary fs-14 fw-700" style="letter-spacing: 2px;">{{blog.tabTitle}}</div>
                <div class="title-intro">
                  <div class="fs-20 fw-700 q-mt-sm font-domine ellipsis-3-lines blog-title" style="color:#004953">{{blog.title}}</div>
                  <div class="ellipsis-2-lines text-grey q-mt-sm">{{blog.intro}}</div>
                </div>
                <div class="q-mt-xs text-primary fw-500">Fact Checked by <br/> Dr. Abhishek MBBS &#8226; {{ getDate(blog.lastPublishedAt) }}</div>
              </div>
            </q-card>
          </div>
        </div>
       </q-scroll-area>
       <div v-else>
        <div v-if="tabSelected" class="row q-my-md q-gutter-x-xs justify-center q-gutter-y-lg">
          <div v-for="(blog, key) in blogs.slice(0,3)" :key="key" @click="goToBlog(blog.id)" class="col-md-3 col-sm-5 col-xs-11">
            <q-card class="blog-container cursor-pointer">
              <img v-if="blog.image" :src="blog.image"/>
              <img v-else src="https://portfolio-platform.s3.amazonaws.com/media/anh/public/original_images/kelly-sikkema-IE8KfewAp-w-unsplash.jpg"/>
              <div class="details-container q-pa-md q-mt-sm font-montserrat">
                <div class="text-primary fs-14 fw-700" style="letter-spacing: 2px;">{{blog.tabTitle}}</div>
                <div class="title-intro">
                  <div class="fs-20 fw-700 q-mt-sm font-domine ellipsis-3-lines blog-title" style="color:#004953">{{blog.title}}</div>
                  <div class="ellipsis-2-lines text-grey">{{blog.intro}}</div>
                </div>
                <div class="q-mt-xs text-primary fw-500">Fact Checked by <br/> Dr. Abhishek MBBS &#8226; {{ getDate(blog.lastPublishedAt) }}</div>
              </div>
            </q-card>
          </div>
        </div>
       </div>
       <div class="row justify-center q-mt-sm q-mb-lg">
        <q-btn
        label="SEE MORE"
        style="background: #004953; color: white"
        class="font-montserrat q-px-md fw-700 fs-16"
        @click="onGoToTabBlogsPage()"
        ></q-btn>
       </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
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
    }
  },
  watch: {
    tabSelected: {
      immediate: true,
      deep: true,
      handler (newVal) {
        const tabTitle = this.tabTitles?.filter(tab => tab.isActive)[0]?.title.toUpperCase()
        this.blogs = []
        const selectTab = this.originalBlogsData?.filter(tab => tab.id === newVal)
        selectTab[0]?.popularBlogsInside?.forEach(blog => {
          this.blogs.push({ ...blog, tabTitle })
        })
        // this.blogs = this.blogs.slice(0,)
      }
    }
  },
  methods: {
    ...mapActions({
      getAllTabs: 'nursingHome/getAllTabs'
    }),
    ...mapMutations({
      setAllTabsData: 'nursingHome/setAllTabsData'
    }),
    onGoToTabBlogsPage () {
      const tabTitle = this.titleSelected?.toLowerCase()?.split(' ')?.join('-')
      this.$router.push({
        name: 'tab-blogs',
        params: {
          tabTitle,
          tabId: this.tabSelected
        }
      })
    },
    onTabClick ({ id, title }) {
      this.tabTitles?.forEach(tab => {
        if (tab.id === id) tab.isActive = true
        else tab.isActive = false
      })
      this.tabSelected = id
      this.titleSelected = title
    },
    goTo (name) {
      this.$router.push({
        name
      })
    },
    getDate (value) {
      const newValue = new Date(value)
      const monthValue = (newValue.getMonth() + 1) < 10 ? `0${newValue.getMonth() + 1}` : newValue.getMonth() + 1
      return `${newValue.getDate()}-${monthValue}-${newValue.getFullYear()}`
    },
    async fetchAllBlogs () {
      try {
        const { data } = await this.getAllTabs()
        this.setAllTabsData(data)
        this.originalBlogsData = JSON.parse(JSON.stringify(data))
        this.originalBlogsData?.forEach((tab, id) => {
          const isActive = id === 0 ? true : false
          if (id === 0) {
            this.tabSelected = tab.id
            this.titleSelected = tab.title
          }
          this.tabTitles.push({ ...tab, isActive})
        })
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
      blogs: [],
      news: [],
      originalBlogsData: [],
      tabTitles: [],
      tabSelected: null,
      titleSelected: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-container {
  display: flex;
  overflow: auto;
  white-space: nowrap;
}
.tag-category {
  padding: 12px 16px;
  border-radius: 9px;
  border-bottom-left-radius: 0;
  border: solid 1px #d3d3d3;
  color: #004953;
  background-color: white;
}
.tag-category-active {
  background:#004953;
  color: white;
}
.scroll-container{
  :deep(.q-scrollarea__thumb) {
    display: none;
  }
}
::-webkit-scrollbar {
   display: none;
}
.blog-container{
  border: 1px solid #eee;
  border-right: 0;
  box-shadow: 6px 5px 0 rgba(10,56,63,.05);

  img {
    transition: transform .5s ease;
    height: 200px;
    object-fit: cover;
  }
}
.blog-container:hover img {
  transform: scale(0.99);
}
.title-intro {
  height: 120px;
}
</style>
