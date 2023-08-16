<template>
  <div :class="isMobile ? 'q-pa-sm' : 'q-pa-xl'">
    <div class="font-inter fs-16 fw-600 q-px-sm">
      <span class="text-grey cursor-pointer" @click="goTo('home')">Home / </span>
      <span class="text-primary cursor-pointer"  @click="goTo('faq')">FAQs</span>
    </div>
    <div class="font-roboto text-primary fw-700 q-mt-sm q-mb-lg q-px-sm" :class="isMobile ? 'fs-28': 'fs-40'">Frequently Asked Questions</div>
    <q-list  v-for="(faq, key) in faqs" :key="key">
      <q-expansion-item class="no-padding" >
        <template v-slot:header>
          <div class="font-roboto fw-700 fs-18 text-primary faq-question q-py-sm">
            {{faq.question}}
          </div>
        </template>
        <q-card>
          <q-card-section>
            <div class="font-inter fs-16 color-primary-two fw-400">
              {{faq.answer}}
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-separator />
    </q-list>
    <div class="q-mt-xl column items-center font-inter">
      <div class=" fw-600 text-primary fs-30">Still have a question?</div>
      <div class="fs-16 fw-400 text-primary">Our experienced doctors are here to help you with any of your queries </div>
      <q-btn
      style="background: #3363AC; color: white"
      label="Contact Us"
      rounded
      no-caps
      class="font-inter fs-16 q-mt-lg"
      @click="scrollToContact"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'FaqPage',
  data () {
    return {
      faqs: []
    }
  },
  mounted () {
    this.fetchFaqs()
  },
  methods: {
    ...mapActions({
      getFAQs: 'nursingHome/getFAQs'
    }),
    async fetchFaqs () {
    try {
        const { data } = await this.getFAQs()
        this.faqs = data
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
  computed: {
    isMobile () {
      return this.$q.screen.lt.sm
    }
  }
}
</script>

<style lang="scss" scoped>
.faq-question {
  width: 100%;
}
</style>
