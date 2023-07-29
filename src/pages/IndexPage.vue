<template>
  <q-page>
    <hero-section/>
    <hero-navbar/>
    <why-choseus/>
    <our-doctors/>
    <make-appointment/>
    <our-testimonials/>
  </q-page>
</template>

<script>
import HeroSection from 'src/components/HomePageComponents/HeroSection.vue'
import HeroNavbar from 'src/components/HomePageComponents/HeroNavbar.vue'
import WhyChoseus from 'src/components/HomePageComponents/WhyChoseus.vue'
import OurDoctors from 'src/components/HomePageComponents/OurDoctors.vue'
import MakeAppointment from 'src/components/HomePageComponents/MakeAppointment.vue'
import OurTestimonials from 'src/components/HomePageComponents/OurTestimonials.vue'
export default {
  name: 'IndexPage',
  components: {
    HeroSection,
    HeroNavbar,
    WhyChoseus,
    OurDoctors,
    MakeAppointment,
    OurTestimonials
  }
}
</script>


,
    TestiMonials
