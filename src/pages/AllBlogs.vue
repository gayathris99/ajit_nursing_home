<template>
  <div :class="isMobile ? 'q-pa-md' : 'q-pa-xl'">
    <div class="font-inter fs-16 fw-600 q-px-sm">
      <span class="text-grey cursor-pointer" @click="goTo('home')">Home / </span>
      <span class="text-primary cursor-pointer"  @click="goTo('blogs')">Blogs</span>
      <div class="font-roboto text-primary fw-700 q-mt-sm q-mb-lg " :class="isMobile ? 'fs-28': 'fs-40'">All blogs</div>
      <div class="q-mt-md row justify-start items-center">
        <div v-if="!isMobile" class="col-md-4 col-sm-4 categories">
          <div class="q-mb-sm">Blog Categories</div>
          <div v-for="(category, key) in categories" :key="key">
            <div class="q-py-md font-inter fs-14 cursor-pointer text-primary" @click="selectCategory(category)" :class="checkCategory(category) ? 'selected-category': ''">{{category.label}}</div>
          </div>
        </div>
        <div v-else class="col-xs-12">
          <label class="fw-400">Choose categories</label>
          <q-select class="q-mt-sm" v-model="selectedCategory" map-options emit-value outlined :options="categories" />
        </div>
        <div>
          <div class="first-blog">
            <q-img :src="blogs[0]?.image?.meta?.download_url"></q-img>
            <div>{{firstBlog.title}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AllBlogs',
  computed: {
    isMobile () {
      return this.$q.screen.lt.sm
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
    selectCategory (category) {
      this.selectedCategory = category.value
    },
    checkCategory (category) {
      return category.label === this.selectedCategory
    },
    async fetchAllBlogs () {
      try {
        const { data: { items }} = await this.getAllBlogs()
        if (!items.length) this.isNoBlogs = true
        const category = []
        this.allBlogs = JSON.parse(JSON.stringify(items))
        items.forEach(item => {
          if (!category.includes(item.tag)) {
            this.categories.push({
              label: item.tag, value: item.tag
            })
            category.push(item.tag)
          }
        })
        this.firstBlog = items.splice(0,1)
        this.blogs = items
        console.log(this.firstBlog)
      } catch (error) {
        this.$q.notify({
          message: "Something went wrong, please try again",
          color: "red",
          position: "top",
          icon: "warning",
        });
      }
    },
  },
  mounted () {
    this.fetchAllBlogs()
  },
  data () {
    return {
      blogs: [],
      allBlogs: [],
      firstBlog: [],
      selectedCategory: 'View All',
      categories: [
        {
          label: 'View All',
          value: 'View All'
        }
      ],
      isNoBlogs: false
    }
  },
  watch: {
    selectedCategory: {
      handler (newVal) {
        const blogs = this.allBlogs.filter(blog => blog.tag === newVal)
        if (blogs.length) {
          this.firstBlog = blogs.splice(0,1)
          this.blogs = blogs
        } else this.isNoBlogs = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.selected-category {
  background: #FAFAFA;
  padding: 10px;
  padding-left: 0px !important;
  max-width: 200px;
  color: #3363AC !important;
  font-family: Roboto;
  font-size: 14.222px;
  font-style: normal;
  font-weight: 600;
}
</style>
