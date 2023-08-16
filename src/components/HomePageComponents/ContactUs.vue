<template>
  <div>
    <div class="bg-image no-padding no-margin" v-if="isDesktop">
      <div class="row justify-evenly items-center q-gutter-x-md no-padding no-margin desktop-section">
        <q-form>
          <div class="column q-mt-lg">
          <div class="font-inter text-primary fs-16 fw-600" :class="isMobile ? 'q-pt-md': 'q-pt-xl'">Contact Us</div>
          <div class="font-oxygen text-primary">
            <div class="fw-400 q-mt-sm title">Want to book an <br/> appointment ? Contact us!</div>
          </div>
          <div class="q-mt-md font-oxygen column q-gutter-y-sm q-pb-xl">
            <!-- Full Name -->
            <label class="text-primary font-inter fw-400">Full Name <span style="color: red">*</span></label>
            <q-input class="fs-16" v-model="fullName" dense required outlined/>

            <!-- Contact Number & Email -->
            <div class="row justify-between q-mt-lg">
              <div>
                <label class="text-primary font-inter fw-400">Contact Number <span style="color: red">*</span></label>
                <q-input class="fs-16" v-model="contactNumber" dense required outlined style="min-width: 260px"/>
              </div>
              <div>
                <label class="text-primary font-inter fw-400">Email</label>
                <q-input class="fs-16" v-model="email" dense  type="email" outlined style="min-width: 260px"/>
              </div>
            </div>

            <!-- Appointment Reason -->
            <label class="text-primary font-inter fw-400 q-mt-lg">Appointment Reason</label>
            <q-input class="fs-16" v-model="appointmentReason" dense placeholder="Type your message..." type="textarea" outlined/>

            <!-- Date -->
            <label class="text-primary font-inter fw-400 q-mt-lg">Date (DD/MM/YYY) <span style="color: red">*</span></label>
            <q-input class="fs-16" v-model="date" required outlined @focus="onDateInputClick">
              <template v-slot:append>
                <q-btn-dropdown icon="calendar_month" color="primary" dense flat ref="dateBtnDropdown">
                  <q-date minimal v-model="date" mask="DD/MM/YYYY" :options="dateOption"/>
                </q-btn-dropdown>
              </template>
            </q-input>
            <q-btn
            color="secondary"
            label="Submit"
            type="submit"
            @click="createAppointment"
            :loading="makingAppointment"
            no-caps
            dense
            class="fs-16 fw-400 q-mt-md btn-fixed-width font-inter">
              <template v-slot:loading>
                <q-spinner class="on-right" />
                Submit
              </template>
            </q-btn>
          </div>
          </div>
        </q-form>
        <img src="~assets/flowerbehindlady.svg" alt="" class="desktop-image">
      </div>
    </div>
    <div v-else class="mobile-tab-design">
      <div class="row justify-center bg-image">
        <img src="~assets/flowerbehindlady.svg" alt="">
      </div>
      <q-form>
        <div class="column q-mt-lg q-px-lg justify-center">
          <div class="font-inter text-primary fs-16 fw-600 " :class="isMobile ? 'q-pt-md': 'q-pt-xl'">Contact Us</div>
          <div class="font-oxygen text-primary">
            <div class="fw-400 q-mt-sm title">Want to book an <br/> appointment ? Contact us!</div>
          </div>
          <div class="q-mt-md font-oxygen column q-gutter-y-sm q-pb-xl q-px-md">
          <!-- Full Name -->
          <label class="font-inter fw-400 text-primary">Full Name <span style="color: red">*</span></label>
          <q-input class="fs-16" v-model="fullName" dense required outlined/>

          <!-- Contact Number -->
          <label class="font-inter fw-400 q-mt-lg text-primary">Contact Number <span style="color: red">*</span></label>
          <q-input class="fs-16" v-model="contactNumber" dense  required outlined/>

          <!-- Email -->
          <label class="font-inter fw-400 q-mt-lg text-primary">Email</label>
          <q-input class="fs-16" v-model="email" dense  type="email" outlined/>

          <!-- Appointment Reason -->
          <label class="font-inter fw-400 text-primary q-mt-lg">Appointment Reason</label>
          <q-input class="fs-16" v-model="appointmentReason" dense placeholder="Type your message..." type="textarea" outlined/>

          <label class="font-inter fw-400 text-primary q-mt-lg">Date (DD/MM/YYYY)</label>
          <q-input class="fs-16" v-model="date" placeholder="Date (dd/mm/yyyy) *" required @focus="onDateInputClick" outlined>
            <template v-slot:append>
              <q-btn-dropdown icon="calendar_month" color="primary" dense flat ref="dateBtnDropdown">
                <q-date minimal v-model="date" mask="DD/MM/YYYY" :options="dateOption"/>
              </q-btn-dropdown>
            </template>
          </q-input>
          <q-btn
          color="secondary"
          label="Submit"
          type="submit"
          @click="createAppointment"
          :loading="makingAppointment"
          no-caps
          dense
          class="fs-16 fw-400 q-mt-lg btn-fixed-width font-inter">
            <template v-slot:loading>
              <q-spinner class="on-right" />
              Submit
            </template>
          </q-btn>
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
      <!-- <div class=" padding-left padding-right row justify-between align-start items-start text-primary font-petrona q-pb-lg q-gutter-lg q-px-md q-pt-md">
        <div>
          <div class="row items-center q-gutter-x-sm">
            <q-icon name="call" size="sm"/>
            <div class="fs-20 fw-500">REACH US AT</div>
          </div>
          <div class="fs-16 q-mt-sm">
            <a href="tel:08046808371">080 4680 8371</a><br/>
            <a href="tel:8951197936">89511 97936</a>
          </div>
        </div>
        <div>
          <div>
            <div class="row items-center  q-gutter-x-sm">
              <q-icon name="location_on" size="sm"/>
              <div class="fs-20 fw-500">LOCATION</div>
            </div>
          </div>
          <div class="fs-16 q-mt-sm" style="max-width: 220px">
            <a href="https://goo.gl/maps/C1FRWzovnftC26i17">
            #640 Ajit Nursing Home, Dr.Bane Hospital Road, Raibag, Landmark: Beside HP Petrol Bunk, Raibag
            </a>
          </div>
        </div>
        <div>
          <div class="row items-center q-gutter-x-sm">
            <q-icon name="schedule" size="sm"/>
            <div class="fs-20 fw-500">HOURS (Open 24/7)</div>
          </div>
          <div class="fs-16 q-mt-sm">
            <div>Mon-Sun</div>
            <div>12:00AM - 11:59PM</div>
          </div>
        </div>
      </div> -->
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
  width: 90px;
}
a {
  color: inherit;
}
.location {
  max-width: 250px;
  a {
    text-decoration: none;
  }
}
.padding-right {
  padding-right: 48px;
  @media only screen and (max-width: 799px) and (min-width:0px)  {
    padding-right: 24px;
  }
}
.desktop-image {
   @media only screen and (max-width: 1082px) and (min-width:1024px) {
    width: 400px;
   }
}
</style>
