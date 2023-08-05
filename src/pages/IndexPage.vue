<template>
  <q-page>
    <hero-section
    @onScrollElement="onScrollElement"/>
    <hero-navbar/>
    <why-choseus/>
    <our-doctors/>
    <make-appointment
    @onScrollElement="onScrollElement"/>
    <our-testimonials/>
    <our-blog/>
    <contact-us id="contact-us"/>
  </q-page>
</template>

<script>
import HeroSection from 'src/components/HomePageComponents/HeroSection.vue'
import HeroNavbar from 'src/components/HomePageComponents/HeroNavbar.vue'
import WhyChoseus from 'src/components/HomePageComponents/WhyChoseus.vue'
import OurDoctors from 'src/components/HomePageComponents/OurDoctors.vue'
import MakeAppointment from 'src/components/HomePageComponents/MakeAppointment.vue'
import OurTestimonials from 'src/components/HomePageComponents/OurTestimonials.vue'
import OurBlog from 'src/components/HomePageComponents/OurBlog.vue'
import ContactUs from 'src/components/HomePageComponents/ContactUs.vue'
export default {
  name: 'IndexPage',
  components: {
    HeroSection,
    HeroNavbar,
    WhyChoseus,
    OurDoctors,
    MakeAppointment,
    OurTestimonials,
    OurBlog,
    ContactUs
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
  }
}
</script>


,
    TestiMonials
