<template>
  <div class="q-pa-md font-oxygen text-primary">
    <div class="q-mt-xl  q-mb-md">{{blogContent.tag}}</div>
    <div class="fs-20">{{blogContent.title}}</div>
    <div class="row justify-center">
      <q-img :src="blogContent?.image?.meta?.download_url" class="banner-image"></q-img>
    </div>
    <div class="q-mt-xl" v-html="blogContent.body">
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'IndividualBlogs',
  data () {
   return {
     blogContent: ''
   }
  },
  methods: {
    ...mapActions({
      getBlog: 'nursingHome/getBlog'
    }),
    async fetchBlog () {
      const blogId = this.$route.params.id
      try {
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
    }
  },
  mounted () {
    this.fetchBlog()
  }
}
</script>


<style lang="scss" scoped>
.banner-image {
  max-height: 600px;
  width: 50vw;
  object-fit: scale-down;
}
</style>
