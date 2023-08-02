<template>
  <div class="bg-image no-padding no-margin">
    <div class="row justify-evenly items-center q-gutter-x-md no-padding no-margin">
      <img src="~assets/flowerbehindlady.svg" alt="">
      <div class="column q-mt-lg">
        <div class="fw-600 q-mt-sm title font-radley text-primary q-mt-md">Want to make an <br/> appointment easily? <br/>Contact us!</div>
        <div class="q-mt-md font-radley column q-gutter-y-sm q-pb-xl">
        <q-input class="fs-18" v-model="fullName" dense placeholder="Full Name">
          <template v-slot:append>
            <q-icon name="person" size="24px" color="primary"/>
          </template>
        </q-input>
        <q-input class="fs-18" v-model="contactNumber" dense placeholder="Contact Number">
          <template v-slot:append>
            <q-icon name="call" size="24px" color="primary"/>
          </template>
        </q-input>
        <q-input class="fs-18" v-model="email" dense placeholder="Email ID" type="email">
          <template v-slot:append>
            <q-icon name="mail" size="24px" color="primary"/>
          </template>
        </q-input>
        <q-input class="fs-18" v-model="date" placeholder="Date (dd/mm/yyyy)" @focus="onDateInputClick">
          <template v-slot:append>
            <q-btn-dropdown icon="calendar_month" color="primary" dense flat ref="dateBtnDropdown">
              <q-date minimal v-model="date" mask="DD/MM/YYYY" :options="dateOption"/>
            </q-btn-dropdown>
          </template>
        </q-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactUs',
  data () {
    return {
      fullName: '',
      contactNumber: '',
      email: '',
      date: ''
    }
  },
  methods: {
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
</style>