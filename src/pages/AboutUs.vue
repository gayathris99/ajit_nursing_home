<template>
  <div :class="isMobile ? 'q-pa-sm' : 'q-pa-xl'">
    <div class="font-inter fs-16 fw-600 q-px-sm">
      <span class="text-grey cursor-pointer" @click="goTo('home')">Home / </span>
      <span class="text-primary cursor-pointer"  @click="goTo('about-us')">About Us</span>
      <div class="grey-border  q-mt-md" :class="isMobile ? 'q-pa-sm': 'q-py-lg q-px-md'">
        <img src="~assets/hospitalImage.svg" alt="">
      </div>
      <div class="row justify-center q-mt-md font-inter fs-20 fw-400 text-grey">
        Ajit Nursing Home Raibag
      </div>

      <div class="q-mt-lg row items-center q-gutter-x-lg q-gutter-y-md padding-right padding-left" :class="isMobile ? 'justify-center': 'justify-evenly'">
        <div class="vision col-md-5 col-sm-5 col-xs-auto">
          <q-card
          style="background: radial-gradient(366.76% 156.07% at 4.50% 14.29%, #62A0FE 0%, #287AF6 100%)">
            <q-card-section class="text-white">
              <div class="row items-center q-gutter-x-md">
                <img src="~assets/vision.svg" width="40"/>
                <div class="font-inter fw-400 fs-20">Our Vision</div>
              </div>
              <div class="q-mt-md font-inter fw-400 fs-16">Our aim is the pursuit of excellence in providing the best maternal and neonatal care by setting higher standards for ourselves and striving constantly to achieve them.</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="mission col-md-5 col-sm-5 col-xs-auto">
          <q-card
          style="background: linear-gradient(309deg, #6BD6CA 0%, #1EC2B1 100%);">
            <q-card-section class="text-white">
              <div class="row items-center q-gutter-x-md">
                <img src="~assets/mission.svg" width="40"/>
                <div class="font-inter fw-400 fs-20">Our Mission</div>
              </div>
              <div class="q-mt-md font-inter fw-400 fs-16">To be the kind of leader in the space of women and health that India has not witnessed yet, by providing premier quality healthcare to women and children.</div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="font-inter text-primary fw-600 q-mt-lg q-pt-xl fs-30">OUR STORY</div>
      <div class="font-inter fw-400 fs-16 color-primary-two q-mt-md">
        <div>Located in Raibag, our hospital stands as a beacon of healthcare within the community. With its state-of-the-art facilities and compassionate staff, it has garnered a reputation for delivering exceptional medical services. The hospital's commitment to patient care is evident in every aspect of its operation, making it a trusted institution among locals.</div>
        <div class="q-mt-lg q-pt-md">Upon entering the hospital, one is greeted by a modern and welcoming environment, designed to alleviate anxiety and promote healing. The spacious and well-maintained waiting areas offer comfort to patients and their families. The hospital prides itself on maintaining a clean and hygienic atmosphere, adhering to the highest standards of sanitation.</div>
        <div class="q-mt-lg q-pt-md">A team of highly skilled and dedicated medical professionals staffs our hospital. From doctors and nurses to specialists and support staff, each member is committed to providing the best possible care. The medical staff is not only proficient in their respective fields but also compassionate and empathetic towards patients. They strive to listen attentively, address concerns, and ensure personalized treatment plans that cater to individual needs. In terms of medical services, our hospital offers General surgery and obstetrics gynaecology. the hospital has a diverse team of experts capable of handling various healthcare needs. The facility is equipped with cutting-edge medical technology and diagnostic equipment, enabling accurate diagnoses and effective treatments. In addition to medical care, our hospital focuses on holistic well-being. Our hospital also emphasizes health education and prevention, organizing regular workshops and outreach programs to promote wellness within the community.</div>
        <div class="q-mt-lg q-pt-md">Furthermore, our hospital maintains a strong network of collaborations with renowned medical institutions, facilitating knowledge exchange and ensuring access to the latest advancements in healthcare.</div>
        <div class="q-mt-lg q-py-md">Overall, our hospital has established itself as a pillar of medical excellence, combining advanced technology, compassionate care, and a patient-centric approach. It remains dedicated to improving the health and well-being of the community it serves, leaving a positive impact on countless lives.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
  computed: {
    isMobile () {
      return this.$q.screen.lt.sm
    }
  },
  methods: {
    goTo (name) {
      this.$router.push({
        name
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.grey-border {
  border: 1px solid #EEE;
  img {
    width: 100%;
    min-height: 220px;
    object-fit: cover;
  }
}
.q-card {
  @media only screen and (max-width: $breakpoint-sm-max) and (min-width: 600px){
   min-height: 250px;
   height: 250pxp;
  }
}
</style>
