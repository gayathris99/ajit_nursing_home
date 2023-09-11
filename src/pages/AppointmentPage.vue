<template>
  <div>
    <div class="row items-center align-center">
      <div class="col-md-6 col-sm-12 col-xs-12 appointment-container" :class="isMobile ? 'q-pa-md' : 'q-px-lg q-py-xl'">
        <div class="font-oxygen fs-36 fw-700 text-primary q-mb-lg">Want to book an appointment ?</div>
        <div class="text-center appt-img">
          <img src="~assets/AppointmentIllustration.png"/>
        </div>
        <div class="column items-center justify-center q-gutter-x-sm q-gutter-y-md q-mt-sm font-montserrat">
          <!-- <div class="fw-700 fs-18 text-primary q-mr-md">Book via Practo</div> -->
          <!-- <div v-if="!isMobile">
            <practo:abs_widget widget="c1652e7290313b78"></practo:abs_widget>
          </div> -->
          <q-btn
          style="background: #3363AC; color: white; width: 310px;"
          label="BOOK APPOINTMENT ON WHATSAPP"
          no-caps
          class="font-montserrat fs-18"
          :size="isDesktop ? 'lg' : 'md'"
          @click="bookWhatsappAppointment"
          />
          <q-btn
          style="background: #3363AC; color: white; width: 310px;"
          label="BOOK APPOINTMENT ON PRACTO"
          no-caps
          class="font-montserrat fs-18"
          :size="isDesktop ? 'lg' : 'md'"
          @click="goToPracto"
          />
        </div>
        <!-- <div class="row justify-center fw-700">
          <q-btn
          label="Book AppointmenT"
          class="font-montserrat q-mt-lg"
          color="secondary"
          @click="bookWhatsappAppointment()"/>
        </div> -->
        <!-- <div class="row justify-center q-mt-md" v-if="!isMobile">
          <practo:abs_widget widget="c1652e7290313b78"></practo:abs_widget>
        </div> -->
        <!-- <div v-else class="row justify-center q-mt-md">
          <q-btn
          style="background: #3363AC; color: white"
          label="Book Appointment"
          rounded
          no-caps
          class="font-inter fs-18"
          :size="isDesktop ? 'lg' : 'md'"
          @click="goToPracto"
          />
        </div> -->
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12 table-container" :class="isMobile ? 'q-pa-md' : 'q-px-lg q-py-xl'">
        <div class="font-oxygen fs-36 fw-700 text-primary">OPD functioning <br/> Days & time</div>
        <table class="font-inter q-mt-md">
          <tr>
            <th class="q-pa-sm">Day</th>
            <th class="q-pa-sm">Morning</th>
            <th class="q-pa-sm">Afternoon</th>
            <th class="q-pa-sm">Evening</th>
          </tr>
          <tr v-for="(row, id) in tableData" :key="id">
            <td class="day-column q-pa-xs">{{row.day}}</td>
            <td class="q-pa-sm text-primary" v-html="row.morning"></td>
            <td class="q-pa-sm text-primary" v-html="row.afternoon"></td>
            <td class="q-pa-sm text-primary" v-html="row.evening"></td>
          </tr>
          <tr>
            <td class="day-column q-pa-xs">Sunday</td>
            <td class="q-pa-md text-primary">HOLIDAY</td>
            <td class="q-pa-md text-primary">HOLIDAY</td>
            <td class="q-pa-md text-primary">HOLIDAY</td>
          </tr>
        </table>
        <ul class="text-primary q-mt-lg font-oxygen fs-18 fw-700">
          <li class="q-pb-sm">Please call and confirm appointment date & time for USG</li>
          <li>24x7 Emergency Support</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppointmentPage',
  data () {
    return {
      tableData: [
        {
          day: 'Monday',
          morning: '10:00 AM to <br/> 1:00 PM',
          afternoon: ' 3:00 PM to <br/> 5:00 PM',
          evening: '5:30 PM to <br/> 7:00 PM'
        },
        {
          day: 'Tuesday',
          morning: '10:00 AM to <br/> 1:00 PM',
          afternoon: ' 3:00 PM to <br/> 5:00 PM',
          evening: '5:30 PM to <br/> 7:00 PM'
        },
        {
          day: 'Wednesday',
          morning: '10:00 AM to <br/> 1:00 PM',
          afternoon: ' 3:00 PM to <br/> 5:00 PM',
          evening: '5:30 PM to <br/> 7:00 PM'
        },
        {
          day: 'Thursday',
          morning: '10:00 AM to <br/> 1:00 PM',
          afternoon: ' 3:00 PM to <br/> 5:00 PM',
          evening: '5:30 PM to <br/> 7:00 PM'
        },
        {
          day: 'Friday',
          morning: '10:00 AM to <br/> 1:00 PM',
          afternoon: ' 3:00 PM to <br/> 5:00 PM',
          evening: '5:30 PM to <br/> 7:00 PM'
        },
        {
          day: 'Saturday',
          morning: '10:00 AM to <br/> 1:00 PM',
          afternoon: ' 3:00 PM to <br/> 5:00 PM',
          evening: '5:30 PM to <br/> 7:00 PM'
        }
      ]
    }
  },
  computed: {
    isMobile () {
      return this.$q.screen.lt.sm
    },
  },
  mounted () {
    const scripts = [
      'https://www.practo.com/bundles/practopractoapp/js/abs_widget_helper.js'
    ];
    scripts.forEach(script => {
      let tag = document.createElement("script");
      tag.setAttribute("src", script);
      document.head.appendChild(tag);
    });
  },
  methods: {
    goToPracto () {
      window.open('https://www.practo.com/raibag/clinic/ajit-nursing-home-belgaum', '_blank');
    },
    bookWhatsappAppointment () {
      window.open('https://wa.me/919448420369/?text=Hello, I want to book an appointment', '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  background: #EBF5F7;
  min-height: 100vh;
  @media only screen and (max-width: $breakpoint-sm-max) {
   min-height: auto;
  }
}
.appointment-container {
  min-height: 100vh;
  @media only screen and (max-width: $breakpoint-sm-max) {
   min-height: auto;
  }
}
// td {
//   border: 2px solid #0946A3;;
//   border-collapse: collapse;
//   td:first-child {
//     border: 2px solid #fff;
//     border-collapse: collapse;
//   }
// }
table {
  width: 90%;
  @media only screen and (max-width: $breakpoint-xs-max) {
   width: auto;
  }
}
td {
  text-align: center;
  font-weight: 400;
}
th, .day-column {
  background: #0946A3;
  color: #FFF;
}
table, th {
  border: 2px solid #0946A3;
  border-collapse: collapse;
}
table, td {
  border: 2px solid #0946A3;
  border-collapse: collapse;
}
.appt-img {
  img {
    width: auto;
    @media only screen and (max-width: $breakpoint-xs-max) {
      width: 310px;
      height: 250px;
      object-fit: cover;
    }
  }
}
// :deep(.practo_link) {
//   display: none;
// }
.q-btn {
  font-weight: 700;
}
</style>
