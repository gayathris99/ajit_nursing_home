<template>
  <div class="bg-image q-pa-lg">
     <div class="fs-36 font-orelega fw-500 text-primary">ABOUT US</div>
     <div class="row justify-center q-mt-md">
        <q-img src="~assets/hospitalImage.svg" alt=""/>
     </div>
     <div class="q-mt-md row font-overlock justify-evenly q-gutter-md items-center vision-mission">
      <div class="column items-center fs-20 fw-500">
        <q-img src="~assets/ourVision.svg" :width="isMobile ? '90px': '120px'"/>
        <div class="text-underline text-center fw-700">OUR VISION</div>
        <div class="q-mt-xs text-center" style="max-width: 300px">
          Our aim is the pursuit of excellence in providing the best maternal and neonatal care by setting higher standards for ourselves and striving constantly to achieve them.
        </div>
      </div>
      <div class="column items-center fs-20 fw-500">
        <q-img src="~assets/ourMission.svg" :width="isMobile ? '90px': '120px'"/>
        <div class="text-underline text-center fw-700">OUR MISSION</div>
        <div class="q-mt-xs text-center" style="max-width: 300px">
          To be the kind of leader in the space of women and health that India has not witnessed yet, by providing premier quality healthcare to women and children.
        </div>
      </div>
     </div>
     <div class="q-mt-lg font-overlock text-primary fw-700 fs-20">
      <div>
        Located in Raibag, our hospital stands as a beacon of healthcare within the community. With its state-of-the-art facilities and compassionate staff, it has garnered a reputation for delivering exceptional medical services. The hospital's commitment to patient care is evident in every aspect of its operation, making it a trusted institution among locals.
      </div>
      <div class="q-mt-lg">
        Upon entering the hospital, one is greeted by a modern and welcoming environment, designed to alleviate anxiety and promote healing. The spacious and well-maintained waiting areas offer comfort to patients and their families. The hospital prides itself on maintaining a clean and hygienic atmosphere, adhering to the highest standards of sanitation.
      </div>
      <div class="q-mt-lg">
        A team of highly skilled and dedicated medical professionals staffs our hospital. From doctors and nurses to specialists and support staff, each member is committed to providing the best possible care. The medical staff is not only proficient in their respective fields but also compassionate and empathetic towards patients. They strive to listen attentively, address concerns, and ensure personalized treatment plans that cater to individual needs.
      </div>
      <div class="q-mt-lg">
        In terms of medical services, our hospital offers General surgery and obstetrics gynaecology. the hospital has a diverse team of experts capable of handling various healthcare needs. The facility is equipped with cutting-edge medical technology and diagnostic equipment, enabling accurate diagnoses and effective treatments.
      </div>
      <div class="q-mt-lg">
        In addition to medical care, our hospital focuses on holistic well-being. Our hospital also emphasizes health education and prevention, organizing regular workshops and outreach programs to promote wellness within the community.
      </div>
      <div class="q-mt-lg">
        Furthermore, our hospital maintains a strong network of collaborations with renowned medical institutions, facilitating knowledge exchange and ensuring access to the latest advancements in healthcare.
      </div>
      <div class="q-mt-lg">
        Overall, our hospital has established itself as a pillar of medical excellence, combining advanced technology, compassionate care, and a patient-centric approach. It remains dedicated to improving the health and well-being of the community it serves, leaving a positive impact on countless lives.
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
  }
}
</script>
<style lang="scss" scoped>
.bg-image {
  background-image: url('~assets/layoutbackground.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
