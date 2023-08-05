<template>
  <div>
    <div class="bg-image no-padding no-margin" v-if="isDesktop">
      <div class="row justify-evenly items-center q-gutter-x-md no-padding no-margin">
        <img src="~assets/flowerbehindlady.svg" alt="">
        <q-form>
          <div class="column q-mt-lg">
            <div class="fw-600 q-mt-sm title font-radley text-primary q-mt-md">Want to make an <br/> appointment easily? <br/>Contact us!</div>
            <div class="q-mt-md font-radley column q-gutter-y-sm q-pb-xl">
            <q-input class="fs-18" v-model="fullName" dense placeholder="Full Name *" required>
              <template v-slot:append>
                <q-icon name="person" size="24px" color="primary"/>
              </template>
            </q-input>
            <q-input class="fs-18" v-model="contactNumber" dense placeholder="Contact Number *" required>
              <template v-slot:append>
                <q-icon name="call" size="24px" color="primary"/>
              </template>
            </q-input>
            <q-input class="fs-18" v-model="email" dense placeholder="Email ID" type="email">
              <template v-slot:append>
                <q-icon name="mail" size="24px" color="primary"/>
              </template>
            </q-input>
            <q-input class="fs-18" v-model="appointmentReason" dense placeholder="Reason for appointment" autogrow>
              <template v-slot:append>
                <q-icon name="stethoscope" size="24px" color="primary"/>
              </template>
            </q-input>
            <q-input class="fs-18" v-model="date" placeholder="Date (dd/mm/yyyy) *" required  @focus="onDateInputClick">
              <template v-slot:append>
                <q-btn-dropdown icon="calendar_month" color="primary" dense flat ref="dateBtnDropdown">
                  <q-date minimal v-model="date" mask="DD/MM/YYYY" :options="dateOption"/>
                </q-btn-dropdown>
              </template>
            </q-input>
            <div class="row justify-center">
              <q-btn
              color="secondary"
              label="Make an appointment"
              type="submit"
              @click="createAppointment"
              no-caps
              dense
              rounded
              class="fs-20 q-mt-md btn-fixed-width font-overlock"/>
            </div>
            </div>
          </div>
        </q-form>
      </div>
    </div>
    <div v-else class="mobile-tab-design">
      <div class="row justify-center bg-image">
        <img src="~assets/flowerbehindlady.svg" alt="">
      </div>
      <q-form>
        <div class="column q-mt-lg q-px-lg justify-center">
          <div class="fw-600 q-mt-sm title font-radley text-primary q-mt-md text-center">Want to make an appointment easily? <br/>Contact us!</div>
          <div class="q-mt-md font-radley column q-gutter-y-sm q-pb-xl q-px-md">
          <q-input class="fs-18" v-model="fullName" dense placeholder="Full Name *" required>
            <template v-slot:append>
              <q-icon name="person" size="24px" color="primary"/>
            </template>
          </q-input>
          <q-input class="fs-18" v-model="contactNumber" dense placeholder="Contact Number *" required>
            <template v-slot:append>
              <q-icon name="call" size="24px" color="primary"/>
            </template>
          </q-input>
          <q-input class="fs-18" v-model="email" dense placeholder="Email ID" type="email">
            <template v-slot:append>
              <q-icon name="mail" size="24px" color="primary"/>
            </template>
          </q-input>
          <q-input class="fs-18" v-model="appointmentReason" dense placeholder="Reason for appointment" autogrow>
            <template v-slot:append>
              <q-icon name="stethoscope" size="24px" color="primary"/>
            </template>
          </q-input>
          <q-input class="fs-18" v-model="date" placeholder="Date (dd/mm/yyyy) *" required @focus="onDateInputClick">
            <template v-slot:append>
              <q-btn-dropdown icon="calendar_month" color="primary" dense flat ref="dateBtnDropdown">
                <q-date minimal v-model="date" mask="DD/MM/YYYY" :options="dateOption"/>
              </q-btn-dropdown>
            </template>
          </q-input>
          <div class="row justify-center">
            <q-btn
            color="secondary"
            label="Make an appointment"
            type="submit"
            @click="createAppointment"
            no-caps
            dense
            rounded
            class="fs-20 q-mt-lg btn-fixed-width font-overlock"/>
          </div>
          </div>
        </div>
      </q-form>
    </div>
    <q-dialog v-model="showPopup" rounded>
      <q-card>
        <q-card-section>
          <div class="row justify-end cursor-pointer">
            <q-icon name="close" v-close-popup size="sm"/>
          </div>
          <div class="q-mt-sm font-petrona q-pa-sm text-primary text-center">
            <div class="fs-18 fw-500 q-mb-md">
              We have received your details. Our team members will contact you shortly to confirm your appointment.
            </div>
            <i>
              "Good health and good sense are two of life’s greatest blessings."
            </i>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
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
  data () {
    return {
      fullName: '',
      contactNumber: '',
      email: '',
      appointmentReason: '',
      date: '',
      showPopup: false
    }
  },
  methods: {
    ...mapActions({
      makeAppointment: 'nursingHome/makeAppointment'
    }),
    async createAppointment (e) {
      e.preventDefault()
      if (!this.fullName && !this.contactNumber && !this.date) {
        this.$q.notify({
          message: "Please fill in all the fields marked with *",
          color: "red",
          position: "top",
          icon: "warning",
        });
      return
      }
      try {
        const payload = {
          fullName: this.fullName,
          phoneNumber: this.contactNumber,
          reasonForVisit: this.appointmentReason,
          // appointmentDate: this.date,
          appointmentDate: '2023-08-26',
          emailAddress: this.email
        }
        const result = await this.makeAppointment(payload)
        console.log(result)
      } catch (error) {
        this.$q.notify({
          message: "Something went wrong, please try again",
          color: "red",
          position: "top",
          icon: "warning",
        });
      }
    },
    onDateInputClick () {
      this.$refs.dateBtnDropdown.show()
    },
    dateOption (date) {
      const today = new Date().toLocaleDateString('en-ZA') //dd/mm/yyyy
      return date >= today
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
.btn-fixed-width {
  width: 250px;
   @media only screen and (max-width: 1060px) and (min-width:1024px){
    width: 220px;
   }
}
</style>
