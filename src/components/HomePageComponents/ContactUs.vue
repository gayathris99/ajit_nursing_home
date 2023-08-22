<template>
  <div>
    <div class="bg-image no-padding no-margin">
      <div class="row items-center justify-between q-pb-md">
        <div class="col-md-6 col-sm-6 col-xs-12">
          <div class="q-pa-md padding-left">
            <div class="font-inter text-primary fw-600" :class="isMobile ? 'q-pt-md fs-20': 'q-pt-lg fs-24'">QUESTION ?</div>
            <div class="font-oxygen fw-500 text-primary fs-18 q-mt-md">
              Have any questions regarding pregnancy, gynaecology, health or wellness? Ask our experienced doctors through Whatsapp and get quick answers.
            </div>
            <q-btn
            color="secondary"
            label="Ask a question"
            @click="redirectToWhatsapp"
            no-caps
            class="fs-18 q-mt-lg font-inter"/>
          </div>
        </div>
        <div class="col-md-6 col-sm-6 col-xs-12">
          <div class="q-pa-md padding-left">
            <div class="font-inter text-primary fw-600" :class="isMobile ? 'q-pt-md fs-20': 'q-pt-lg fs-24'">APPOINTMENT ?</div>
            <div class="font-oxygen fw-500 text-primary fs-18 q-mt-md">
              Book an appointment with our doctors and get the best consultation, care and solutions.
            </div>
            <q-btn
            color="secondary"
            label="Make an Appointment"
            @click="this.$router.push({ name: 'appointment' })"
            no-caps
            class="fs-18 q-mt-lg font-inter"/>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="showPopup" rounded>
      <q-card>
        <q-card-section>
          <div class="row justify-end cursor-pointer">
            <q-icon name="close" v-close-popup size="sm"/>
          </div>
          <div class="q-mt-sm font-petrona q-pa-sm text-primary text-center">
            <div class="fs-18 fw-500 q-mb-md">
              Hi {{fullName}}, we have received your details for your appointment on <b>{{date}}</b>. Our team members will contact you shortly to confirm your appointment.
            </div>
            <i>
              "Good health and good sense are two of life’s greatest blessings."
            </i>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div class="bg-greyish">
      <div class="font-oxygen text-primary">
        <div class="fw-400 padding-left q-pt-md title">Contact us</div>
      </div>
      <div class="row justify-evenly items-center font-inter text-primary q-mt-lg q-pb-xl" :class="isDesktop ? '' : 'q-gutter-xl'" >
        <!-- Contact -->
        <div class="col-md-4 col-sm-4 col-xs-6">
          <div class="column items-center">
            <q-icon name="call" size="sm"/>
            <div class="fs-20 fw-600">Reach out to us</div>
            <div class="fs-16 q-mt-sm">
              <a href="tel:08046808371">080 4680 8371</a>
            </div>
            <div class="fs-16">
              <a href="tel:8951197936">+91 89511 97936</a>
            </div>
          </div>
        </div>

        <!-- Location -->
        <div class="col-md-4 col-sm-4 col-xs-6">
          <div class="column items-center">
            <q-icon name="location_on" size="sm"/>
              <div class="fs-20 fw-600">Location</div>
              <div class="location text-center">
                <a href="https://goo.gl/maps/C1FRWzovnftC26i17" target="_blank">
                #640 Ajit Nursing Home, Dr.Bane Hospital Road, Raibag, Landmark: Beside HP Petrol Bunk, Raibag
                </a>
              </div>
          </div>
        </div>

        <!-- Timings -->
        <div class="col-md-4 col-sm-4 col-xs-6">
          <div class="column items-center">
            <q-icon name="schedule" size="sm"/>
            <div class="fs-20 fw-600">Timings (open 24/7)</div>
            <div class="fs-16 q-mt-sm text-center">
              <div>Mon-Sun</div>
              <div>12:00AM - 11:59PM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ContactUs',
  computed: {
    isMobile () {
      return this.$q.screen.lt.sm
    },
    isTablet () {
      return this.$q.screen.gt.xs && this.$q.screen.lt.md
    },
    isDesktop () {
      return this.$q.screen.gt.sm
    }
  },
  watch: {
    showPopup: {
      handler (newVal, oldVal) {
        if (oldVal && !newVal) {
          this.fullName = ''
          this.email = ''
          this.date = ''
          this.contactNumber = ''
          this.reasonForVisit = ''
        }
      }
    }
  },
  data () {
    return {
      fullName: '',
      contactNumber: '',
      email: '',
      appointmentReason: '',
      date: '',
      showPopup: false,
      makingAppointment: false
    }
  },
  methods: {
    ...mapActions({
      makeAppointment: 'nursingHome/makeAppointment'
    }),
    async createAppointment (e) {
      e.preventDefault()
      if (!this.fullName.length || !this.contactNumber.length || !this.date.length) {
        this.$q.notify({
          message: "Please fill in all the fields marked with *",
          color: "red",
          position: "top",
          icon: "warning",
        });
      return
      } else {
        try {
          this.makingAppointment = true
          const payload = {
            fullName: this.fullName,
            phoneNumber: this.contactNumber,
            reasonForVisit: this.appointmentReason,
            // appointmentDate: this.date,
            appointmentDate: '2023-08-26',
            emailAddress: this.email
          }
          const { data: { message }} = await this.makeAppointment(payload)
          if (message) this.showPopup = true
        } catch (error) {
          this.$q.notify({
            message: "Something went wrong, please try again",
            color: "red",
            position: "top",
            icon: "warning",
          });
        } finally {
          this.makingAppointment = false
        }
      }
    },
    onDateInputClick () {
      this.$refs.dateBtnDropdown.show()
    },
    dateOption (date) {
      const today = new Date().toLocaleDateString('en-ZA') //dd/mm/yyyy
      return date >= today
    },
    redirectToWhatsapp () {
      window.open('https://wa.me/919448420369', '_blank')
    }
  },
}
</script>

<style lang="scss" scoped>
.bg-image {
  background-image: url('~assets/makeappointmentbg.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
:deep(.q-btn-dropdown__arrow) {
  display: none;
}
.mobile-tab-design {
.q-img {
  max-height: 600px;
}
}
.desktop-section {
  img {
    height: 590px;
  }
}
.btn-fixed-width {
  width: 250px;
   @media only screen and (max-width: 1060px) and (min-width:1024px){
    width: 220px;
   }
}
a {
  text-decoration: none;
  color: inherit;
}
.padding-right {
  padding-right: 48px;
  @media only screen and (max-width: 799px) and (min-width:0px)  {
    padding-right: 24px;
  }
}
</style>
