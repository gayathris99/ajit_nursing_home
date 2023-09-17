<template>
  <div :class="isMobile ? 'q-pa-md' : 'q-pa-xl'">
    <div class="font-inter fs-16 fw-600">
      <span class="text-grey cursor-pointer" @click="goTo('home')">Home / </span>
      <span class="text-primary cursor-pointer"  @click="goTo('terms')">Terms & Conditions</span>
    </div>
    <div class="font-roboto text-primary fw-700 q-mt-sm q-mb-lg" :class="isMobile ? 'fs-28': 'fs-40'">Terms & Conditions</div>
    <div class="font-inter fs-14 fw-400 color-primary-two q-mt-lg">
      <div>
        Please read the following terms and conditions carefully before using the services of our maternity hospital clinic. By accessing our clinic and utilizing our services, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms, please refrain from using our services.
      </div>
      <div class="q-my-md">
        <div v-for="(term, key) in terms" :key="key" class="q-py-sm">
          <div class="q-py-xs fw-600 fs-16 text-primary">{{term.title}}</div>
          <div class="q-py-sm">{{term.description}}</div>
        </div>
      </div>
      <div class="q-mb-md">By continuing to use our maternity hospital clinic's services, you acknowledge that you have read, understood, and agreed to these terms and conditions. If you have any questions or concerns, please feel free to contact our clinic administration for clarification.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TermsAndCondition',
  computed: {
    isMobile () {
      return this.$q.screen.lt.sm
    }
  },
  data () {
    return {
      terms: [
        {
          title: '1. Scope of Services:',
          description: 'Our maternity hospital clinic provides medical services related to pregnancy, childbirth, and postnatal care. Our experienced medical professionals aim to offer exceptional care and support to expectant mothers during this special journey.'
        },
        {
          title: '2. Appointments and Consultations:',
          description: 'We encourage all patients to schedule appointments in advance to ensure timely and appropriate care. Walk-in consultations are also available, but appointments will be given priority. Consultations are subject to the availability of our healthcare providers.'
        },
        {
          title: '3. Medical Records and Privacy:',
          description: 'We maintain strict confidentiality of all patient medical records and information, following applicable laws and regulations. Your personal and medical data will be used only for the purpose of providing healthcare services and will not be shared with unauthorized individuals or entities.'
        },
        {
          title: '4. Fees and Payments:',
          description: 'Our clinic\'s services are subject to fees, which will be disclosed during the consultation or at the time of admission. Payment for services can be made through various methods, as specified by the clinic. It is your responsibility to settle all bills promptly.'
        },
        {
          title: '5. Insurance Coverage:',
          description: 'We accept patients with valid insurance coverage. However, it is your responsibility to verify whether our clinic is within your insurance network and to comply with any pre-authorization requirements.'
        },
        {
          title: '6. Visitor Policy:',
          description: 'For the safety and comfort of all patients, we have a visitor policy in place. Please adhere to the guidelines provided by our staff regarding the number of visitors allowed, visiting hours, and any other specific restrictions.'
        },
        {
          title: '7. Cancellation and Rescheduling:',
          description: 'If you need to cancel or reschedule your appointment, kindly inform our clinic at least 24 hours in advance. Failure to do so may result in charges or impact your future appointments.'
        },
        {
          title: '8. Medical Decisions:',
          description: 'Our healthcare professionals will make medical decisions based on their clinical expertise and your specific condition. We encourage open communication and trust between patients and our medical team during the course of treatment.'
        },
        {
          title: '9. Patient Responsibilities:',
          description: 'As a patient, you are responsible for providing accurate and complete information about your medical history and current health status. Please follow the prescribed treatment plan and attend follow-up appointments as advised.'
        },
        {
          title: '10. Limitation of Liability:',
          description: 'While we strive to provide the highest quality care, our clinic shall not be held liable for any unforeseen complications or consequences arising from medical treatments or decisions. We encourage you to discuss any concerns with our healthcare providers.'
        },
        {
          title: '11. Governing Law and Jurisdiction:',
          description: 'These terms and conditions shall be governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising from the use of our clinic\'s services shall be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].'
        },
        {
          title: '12. Changes to Terms and Conditions:',
          description: 'We reserve the right to update or modify these terms and conditions at any time. The updated version will be posted on our website or provided upon request.'
        },
      ]
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
