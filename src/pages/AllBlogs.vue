<template>
  <div :class="isMobile ? 'q-pa-md' : 'q-pa-lg'">
    <div class="font-inter fs-16 fw-600 q-px-sm">
      <span class="text-grey cursor-pointer" @click="goTo('home')">Home / </span>
      <span class="text-primary cursor-pointer"  @click="goTo('blogs')">Blogs</span>
      <div class="font-roboto text-primary fw-700 q-mt-sm q-mb-lg " :class="isMobile ? 'fs-28': 'fs-40'">{{selectedCategory}}</div>
      <div class="q-mt-md row justify-start q-gutter-x-sm">
        <div v-if="!isMobile" class="col-md-3 col-sm-3 categories">
          <div class="q-mb-sm">Blog Categories</div>
          <div v-for="(category, key) in categories" :key="key">
            <div class="q-py-md font-inter fs-14 cursor-pointer text-primary" @click="selectCategory(category)" :class="checkCategory(category) ? 'selected-category': ''">{{category.label}}</div>
          </div>
        </div>
        <div v-else class="col-xs-12 q-mb-md">
          <label class="fw-400">Choose categories</label>
          <q-select class="q-mt-sm" v-model="selectedCategory" map-options emit-value outlined :options="categories" />
        </div>
        <div class="col">
          <div class="first-blog text-primary cursor-pointer" @click="goToBlog(firstBlog[0]?.id)">
            <img :src="firstBlog[0]?.image?.meta?.download_url"/>
            <br>
            <div class="q-my-md category q-px-sm q-py-xs fs-12 fw-600">
              <div>{{firstBlog[0]?.tag}}</div>
            </div>
            <div class="fs-24 fw-600">{{firstBlog[0]?.title}}</div>
            <div class="q-mt-sm text-grey fs-14 fw-400 first-blog-intro">{{firstBlog[0]?.intro}}</div>
            <div class="font-inter fs-14 fw-600 q-mt-sm">
              <span class="color-primary-two">Fact checked by: </span>
              <span class="fw-400">Dr. Abhishek MBBS &#8226; {{firstBlog[0]?.date}}</span>
            </div>
            <div class="q-mt-md fw-400">Read More &nbsp; &#62;</div>
          </div>
          <div class="q-mt-md row justify-between q-gutter-x-sm q-gutter-y-md items-center other-blogs col-md-9 col-sm-9 col-xs-12">
            <div class="cursor-pointer" v-for="(blog, i) in blogs" :key="i" @click="goToBlog(blog?.id)">
              <img :src="blog?.image?.meta?.download_url"/>
              <br>
              <div class="q-my-md category q-px-sm q-py-xs fs-12 fw-600">
                <div>{{blog?.tag}}</div>
              </div>
              <div class="fs-24 fw-600 other-blog-title">{{blog?.title}}</div>
              <div class="q-mt-sm text-grey fs-14 fw-400 other-blog-intro">{{blog?.intro}}</div>
              <div class="font-inter fs-14 fw-600 q-mt-sm fact-checked">
                <span class="color-primary-two">Fact checked by: </span>
                <span class="fw-400">Dr. Abhishek MBBS &#8226; {{blog?.date}}</span>
              </div>
              <div class="q-mt-md fw-400" :class="isMobile ? 'q-mb-md' : ''">Read More &nbsp; &#62;</div>
            </div>
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
      this.$q.loading.show()
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
        const blogs = newVal === 'View All' ? JSON.parse(JSON.stringify(this.allBlogs)) : this.allBlogs.filter(blog => blog.tag === newVal)
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

.first-blog {
  img {
    width: 70vw;
    height: 400px;
    max-height: 600px;
    object-fit: cover;
    @media only screen and (max-width: 999px) and (min-width:600px) {
      height: 350px;
    }
    @media only screen and (max-width: 599px) and (min-width:0px) {
      width: 88vw;
      height: 200px;
    }
  }
}
.first-blog-intro {
  width: 65vw;
  @media only screen and (max-width: 599px) and (min-width:0px) {
  width: 88vw;
  }
}
.category {
  display: inline-block;
  border-radius: 2px;
  background: var(--light-grey, #F4F4F4);
}
.other-blogs {
  img {
    width: 34vw;
    height: 250px;
    @media only screen and (max-width: 940px) and (min-width:600px) {
      width: 32vw;
      height: 220px;
    }
    @media only screen and (max-width: 599px) and (min-width:0px) {
      width: 88vw;
      height: 200px;
    }
  }
}
.other-blog-intro, .fact-checked, .other-blog-title {
    width: 34vw;
    @media only screen and (max-width: 940px) and (min-width:600px) {
      width: 32vw;
    }
    @media only screen and (max-width: 599px) and (min-width:0px) {
      width: 88vw;
    }
}
</style>
