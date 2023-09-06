<template>
  <div>
    <div class="row items-center align-center">
      <div class="col-md-6 col-sm-12 col-xs-12 appointment-container" :class="isMobile ? 'q-pa-md' : 'q-px-lg q-py-xl'">
        <div class="font-oxygen fs-36 fw-700 text-primary q-mb-lg">Want to book an appointment ?</div>
        <div class="text-center appt-img">
          <img src="~assets/AppointmentIllustration.svg"/>
        </div>
        <div class="row justify-center q-mt-md">
          <practo:abs_widget widget="c1652e7290313b78"></practo:abs_widget>
        </div>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12 table-container" :class="isMobile ? 'q-pa-md' : 'q-px-lg q-py-xl'">
        <div class="font-oxygen fs-36 fw-700 text-primary">Open Hours</div>
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
        </table>
      </div>
    </div>
    <!-- <q-dialog v-model="practoModel">
      <q-card>
      <iframe src="https://www.practo.com/health/widgets/c1652e7290313b78/doctors?practice_id=null" style=" border-width:0 " width="800" height="600" frameborder="0" scrolling="no"></iframe>
    </q-card>
    </q-dialog>
    <embed data="https://www.practo.com/health/widgets/c1652e7290313b78/doctors?practice_id=null"
    width="400"
    height="300"
    type="text/html"/>
    <a href="https://www.practo.com/health/widgets/c1652e7290313b78/doctors?practice_id=null">https://www.practo.com/health/widgets/c1652e7290313b78/doctors?practice_id=null</a> -->
  </div>
</template>

<script>
export default {
  name: 'AppointmentPage',
  data () {
    return {
      practoModel: true,
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
        },
        {
          day: 'Sunday',
          morning: '10:00 AM to <br/> 1:00 PM',
          afternoon: ' 3:00 PM to <br/> 5:00 PM',
          evening: '5:30 PM to <br/> 7:00 PM'
        },
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
table, th, td {
  border: 2px solid #EEE;;
  border-collapse: collapse;
}
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
  background: #3363AC;
  color: #FFF;
}
.appt-img {
  img {
    width: auto;
    @media only screen and (max-width: $breakpoint-xs-max) {
      width: 300px;
    }
  }
}
</style>
