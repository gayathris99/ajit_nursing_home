<template>
  <div class="">
    <div class="font-oxygen text-primary fs-16 fw-700 padding-left" :class="isMobile ? 'q-pt-md': 'q-pt-xl'">OUR DOCTORS</div>
    <div class="row justify-between font-radley items-center text-primary">
      <div class="fw-600 col-md-6 q-mt-sm title padding-left">Specialist obgyne, <br/> pediatricians team</div>
      <div class="description col-md-6 q-px-lg items-start">Has a team of the best specialist doctors in the field of obstetrics & gynaecology as well as paediatricians. In addition, we also have several other specialists.</div>
    </div>
  <Carousel :itemsToShow="isMobile ? 1.95 : 3.95" :wrapAround="true" :transition="500" class="q-mt-xl">
    <Slide v-for="slide in 10" :key="slide">
      <div class="column">
      <img src="~assets/doctor1.svg" alt="" width="230">
      <p>Dr. Gayathri</p>
      </div>
    </Slide>
    <template #addons>
      <Navigation />
      <!-- <Pagination /> -->
    </template>
  </Carousel>

  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
export default {
  name: 'OurDoctors',
  components: {
    Carousel,
    Slide,
    // Pagination,
    Navigation,
  },
  computed: {
    isMobile () {
      return this.$q.screen.lt.sm
    },
  },
  data () {
    return {
      slide:1
    }
  }
}
</script>

<style lang="scss" scoped>
.padding-left {
  padding-left: 48px;
  @media only screen and (max-width: 799px) and (min-width:0px)  {
    padding-left: 24px;
  }
}
.title {
  font-size: 36px;
   @media only screen and (max-width: 999px) and (min-width:500px) {
    font-size: 30px;
   }
  @media only screen and (max-width: 499px) and (min-width:0px) {
    font-size: 24px;
    }
}
.description {
  font-size: 20px;
  max-width: 600px;
   @media only screen and (max-width: 1099px) and (min-width:1000px) {
    font-size: 16px;
    max-width: 450px;
   }
  @media only screen and (max-width: 999px) and (min-width:800px) {
    font-size: 16px;
    max-width: 400px;
  }
  @media only screen and (max-width: 799px) and (min-width:0px) {
    max-width: none;
    font-size: 14px;
    padding-right: 24px;
    margin-top: 12px;
  }
}

.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: pink;
  color: black;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
