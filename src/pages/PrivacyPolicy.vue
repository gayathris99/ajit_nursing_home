<template>
  <div :class="isMobile ? 'q-pa-md' : 'q-pa-xl'">
    <div class="font-inter fs-16 fw-600 ">
      <span class="text-grey cursor-pointer" @click="goTo('home')">Home / </span>
      <span class="text-primary cursor-pointer"  @click="goTo('privacy')">Privacy Policy</span>
    </div>
    <div class="font-roboto text-primary fw-700 q-mt-sm q-mb-lg " :class="isMobile ? 'fs-28': 'fs-40'">Privacy Policy</div>
    <div class="font-inter fs-14 fw-400 color-primary-two q-mt-lg">
      <div>At Ajit Nursing Home, we value your privacy and are committed to safeguarding your personal information. This privacy policy outlines how we collect, use, disclose, and protect your personal data when you access and use our clinic's services. By utilizing our services, you consent to the practices described in this policy.</div>
      <div class="q-my-md">
        <div class="q-py-sm">
          <div class="q-py-xs fw-600 fs-16 text-primary">1. Information Collection:</div>
          <div class="q-py-sm">We may collect personal information from you when you visit our clinic, register as a patient, or use our website. This information may include but is not limited to your name, contact details, date of birth, medical history, insurance information, and other relevant data necessary for providing healthcare services.</div>
        </div>
        <div class="q-py-sm">
          <div class="q-py-xs fw-600 fs-16 text-primary">2. Use of Information:</div>
          <div class="q-py-sm">We use your personal information for the following purposes:</div>
          <div class="q-py-xs"> &#x2022; Providing healthcare services, including medical consultations, treatments, and follow-ups.</div>
          <div class="q-py-xs"> &#x2022; Processing payments and insurance claims.</div>
          <div class="q-py-xs"> &#x2022; Communicating with you regarding appointments, test results, and other relevant healthcare information.</div>
          <div class="q-py-xs"> &#x2022; Sending you newsletters, updates, or promotional materials with your consent.</div>
          <div class="q-py-xs"> &#x2022; Conducting internal research and analysis to improve our services.</div>
        </div>
        <div class="q-py-sm">
          <div class="q-py-xs fw-600 fs-16 text-primary">3. Data Security:</div>
          <div class="q-py-sm">We implement strict security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Access to your data is limited to authorized personnel only, and all electronic data is stored on secure servers with encryption protocols.</div>
        </div>
        <div class="q-py-sm">
          <div class="q-py-xs fw-600 fs-16 text-primary">4. Disclosure of Information:</div>
          <div class="q-py-sm">We may disclose your personal information in the following circumstances:</div>
          <div class="q-py-xs"> &#x2022; To our healthcare professionals and staff involved in your care.</div>
          <div class="q-py-xs"> &#x2022; To third-party service providers who assist us in delivering healthcare services (e.g., laboratories, billing companies) under strict confidentiality agreements.</div>
          <div class="q-py-xs"> &#x2022; To comply with applicable laws, regulations, or legal proceedings.</div>
          <div class="q-py-xs"> &#x2022; In emergencies where your health and safety are at risk.</div>
        </div>
        <div class="q-py-sm">
          <div class="q-py-xs fw-600 fs-16 text-primary">5. Third-Party Links:</div>
          <div class="q-py-sm">Our website may contain links to third-party websites for your convenience. Please note that we have no control over these external sites, and their privacy practices may differ from ours. We encourage you to review the privacy policies of any third-party sites before providing any personal information.</div>
        </div>
        <div class="q-py-sm">
          <div class="q-py-xs fw-600 fs-16 text-primary">6. Cookies and Analytics:</div>
          <div class="q-py-sm">We may use cookies or similar technologies on our website to enhance user experience and gather anonymous data for analytical purposes. You can choose to disable cookies through your browser settings, but this may affect certain functionalities of our website.</div>
        </div>
        <div class="q-py-sm">
          <div class="q-py-xs fw-600 fs-16 text-primary">7. Children's Privacy:</div>
          <div class="q-py-sm">Our services are not intended for individuals under the age of 18. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately, and we will take appropriate steps to delete such data.</div>
        </div>
        <div class="q-py-sm">
          <div class="q-py-xs fw-600 fs-16 text-primary">8. Changes to Privacy Policy:</div>
          <div class="q-py-sm">We may update this privacy policy from time to time to reflect changes in legal or regulatory requirements or our practices. The updated version will be posted on our website, and we encourage you to review it periodically.</div>
        </div>
      </div>
      <div class="q-mb-md">If you have any questions, concerns, or requests related to your personal information or this privacy policy, please contact our clinic administration. We are dedicated to addressing your inquiries and ensuring the security and privacy of your data.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  methods: {
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
  },
}
</script>
