<template>
  <div class="bg-image">
   <div class="font-oxygen text-primary fs-16 fw-700 padding-left" :class="isMobile ? 'q-pt-md': 'q-pt-xl'">TESTIMONIALS</div>
   <div class="padding-left font-radley text-primary">
    <div class="fw-600 q-mt-sm title">See what our <br/> patients say!</div>
   </div>
    <div class="row q-mt-md q-pb-xl items-center q-gutter-md" :class="isMobile ? 'justify-center' : 'justify-evenly'">
      <template v-for="(review, key) in reviews" :key="key">
        <q-card rounded class="q-pa-sm">
          <q-card-section>
            <div class="font-radley fs-20 text-primary"><q-icon name="format_quote"></q-icon>{{ review.title }}</div>
            <div class="font-roboto-slab q-mt-md text-primary" style="min-height: 70px">{{ review.description }}</div>
            <div class="q-mt-lg row items-center q-gutter-x-md">
              <div class="row items-center">
                <template v-for="(rating, index) in review.rating" :key="index">
                  <q-icon name="grade" size="sm" color="warning"/>
                </template>
                <div class="text-primary fs-18 font-roboto-slab q-pl-sm q-mb-sm"> - {{ review.clientName }}</div>
              </div>
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
import { mapActions } from 'vuex'
export default {
  name: 'OurTestimonials',
  computed: {
    isMobile () {
      return this.$q.screen.lt.sm
    },
  },
  methods: {
    ...mapActions({
      getReviews: 'nursingHome/getReviews'
    }),
    async callReviews () {
      try {
        const { data } = await this.getReviews()
        this.reviews = data.slice(0,2)
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
    this.callReviews()
  },
  data () {
    return {
      // reviews: [
      //   {
      //     title: 'Very Satisfying',
      //     description: 'pregnancy check-up and delivery experience, from the early weeks of pregnancy until delivery was very well served”',
      //     name: 'Sunita J',
      //     rating: 5
      //   },
      //   {
      //     title: 'Satisfied experience',
      //     description: 'pregnancy check-up and delivery experience, from the early weeks of pregnancy until delivery was very well served” ',
      //     name: 'Ramachandra Rao',
      //     rating: 5
      //   },
      // ]
      reviews: []
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-image {
  background-image: url('~assets/testimonialsbg.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  max-height: 800px;
}
.q-card {
  width: 350px;
  height: 220px;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   @media only screen and (max-width: $breakpoint-xs-max) {
    width: 280px;
    height: 240px;
   }
}
.q-btn {
  width: 220px
}
.q-icon {
  transform: scaleX(-1);
  margin-top: -12px;
}
</style>
