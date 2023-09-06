<template>
  <div>
    <div class="row items-center align-center">
      <div class="col-md-6 col-sm-12 col-xs-12 appointment-container" :class="isMobile ? 'q-pa-md' : 'q-px-lg q-py-xl'">
        <div class="font-oxygen fs-36 fw-700 text-primary">Want to book an appointment ?</div>
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
</style>
