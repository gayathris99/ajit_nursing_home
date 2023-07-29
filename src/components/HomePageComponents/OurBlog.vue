<template>
  <div>
    <div class="font-oxygen text-primary fs-16 fw-700 padding-left" :class="isMobile ? 'q-pt-md': 'q-pt-xl'">OUR BLOGS</div>
    <div class="padding-left font-radley text-primary">
      <div class="fw-600 q-mt-sm title">See the latest <br/> news we present</div>
    </div>
    <div class="row q-mt-md q-pb-xl items-center q-gutter-lg q-px-md" :class="isMobile ? 'justify-center' : 'justify-evenly'">
      <template v-for="(blog, key) in blogs" :key="key">
        <q-card rounded class="cursor-pointer">
          <q-card-section class="no-padding no-margin">
            <div>
              <img src="~assets/blog1.svg" alt="">
            </div>
            <div class="q-pa-md font-overpass">
              <div class="text-uppercase text-bold text-primary">{{ blog.category }}</div>
              <div class="q-mt-md fs-20 blog-title text-primary">{{ blog.title }}</div>
              <div class="fs-12" style="color:#646464">Medically reviewed by Abhishek, MBBS</div>
            </div>
          </q-card-section>
        </q-card>
      </template>
    </div>
    <div class="row justify-center">
      <q-btn
      no-caps
      rounded
      class="fs-20 q-mb-xl font-overlock text-bold"
      style="background: #21222B; color: white"
      label="See More"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OurBlog',
  computed: {
    isMobile () {
      return this.$q.screen.lt.sm
    },
  },
  data () {
    return {
      blogs: [
        {
          category: 'PREGNANCY',
          title: 'The First Two Weeks of Pregnancy',
          reviewed: 'Medically reviewed by Abhishek, MBBS',
          img: '~assets/blog1.svg'
        },
        {
          category: 'PARENTING',
          title: 'Deciding Whether or Not to Work Until next time',
          reviewed: 'Fact checked by Shrimanth MBBS,MS - General Surgery',
          img: '~assets/blog2.svg'
        },
        {
          category: 'Weeks and Trimesters',
          title: 'A Partner\'s Guide to the First Trimester',
          reviewed: 'Fact checked by Abhishek, MBBS',
          img: '~assets/blog3.svg'
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.q-card {
  width: 350px;
  height: 350px;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   @media only screen and (max-width: $breakpoint-xs-max) {
    width: 280px;
    // height: 240px;
   }
}
.q-btn {
  width: 220px
}
img {
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 175px; //static
  object-fit: cover;
  transition: transform .4s;
}

.blog-title {
  height: 75px;
}
.q-card:hover {
  transform: scale(1.05);
}
</style>
