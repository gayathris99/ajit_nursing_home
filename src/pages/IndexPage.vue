<template>
  <q-page>
    <hero-section
    @onScrollElement="onScrollElement"/>
    <!-- <hero-navbar
    @onScrollElement="onScrollElement"/> -->
    <why-choseus/>
    <blog-news/>
    <doctors-component/>
    <our-testimonials/>
    <make-appointment
    @onScrollElement="onScrollElement"/>
    <!-- <contact-us id="contact-us"/> -->
    <contact-details/>
  </q-page>
</template>

<script>
import HeroSection from 'src/components/HomePageComponents/HeroSection.vue'
// import HeroNavbar from 'src/components/HomePageComponents/HeroNavbar.vue'
import WhyChoseus from 'src/components/HomePageComponents/WhyChoseus.vue'
import DoctorsComponent from 'src/components/HomePageComponents/DoctorsComponent.vue'
import MakeAppointment from 'src/components/HomePageComponents/MakeAppointment.vue'
import OurTestimonials from 'src/components/HomePageComponents/OurTestimonials.vue'
import BlogNews from 'src/components/HomePageComponents/BlogNews.vue'
// import ContactUs from 'src/components/HomePageComponents/ContactUs.vue'
import ContactDetails from 'src/components/HomePageComponents/ContactDetails.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'IndexPage',
  components: {
    HeroSection,
    // HeroNavbar,
    WhyChoseus,
    DoctorsComponent,
    MakeAppointment,
    OurTestimonials,
    BlogNews,
    // ContactUs,
    ContactDetails
  },
  computed: {
    isMobile () {
      return this.$q.screen.lt.sm
    },
  },
  methods: {

    onScrollElement (el) {
      const elementPosition = document.getElementById(el).offsetTop;
      window.scrollTo({
        top: this.isMobile ? elementPosition + 480 : elementPosition - 120,
        behavior: "smooth",
      });
    }
  },
}
</script>
