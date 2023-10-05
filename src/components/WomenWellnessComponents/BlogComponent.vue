<template>
  <div>
    <q-card class="blog-container cursor-pointer" v-if="blog">
      <div class="image-container">
        <img v-if="blog.image" :src="blog.image"/>
        <img v-else src="~assets/DefaultBlog.png"/>
        <div class="text-primary image-category fs-14 fw-700 font-monstserrat" style="letter-spacing: 2px;">{{blog.tabTitle}}</div>
      </div>
      <div class="details-container q-px-md q-pb-md q-mt-md font-montserrat">
        <div class="title-intro">
          <div class="fs-18 fw-700 q-mt-sm font-domine ellipsis-3-lines blog-title" style="color:#004953">{{blog.title}}</div>
        </div>
        <div class="q-mt-xs text-primary fw-500">Fact Checked by <br/> Dr. Abhishek MBBS &#8226; {{ getDate(blog.lastPublishedAt) }}</div>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'BlogComponent',
  props: {
    blog: {
      default: {}
    }
  },
  methods: {
    getDate (value) {
      const newValue = new Date(value)
      const monthValue = (newValue.getMonth() + 1) < 10 ? `0${newValue.getMonth() + 1}` : newValue.getMonth() + 1
      return `${newValue.getDate()}-${monthValue}-${newValue.getFullYear()}`
    },
  }
}
</script>

<style lang="scss" scoped>
.blog-container{
  border: 1px solid #eee;
  border-right: 0;
  box-shadow: 6px 5px 0 rgba(10,56,63,.05);
  width: 250px;

  img {
    width: 100%;
    transition: transform .5s ease;
    height: 150px;
    object-fit: cover;
  }
}
.title-intro {
  height: 90px;
}
</style>
