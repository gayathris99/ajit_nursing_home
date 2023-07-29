<template>
  <div class="bg-image no-padding no-margin">
    <div class="row justify-evenly items-center q-gutter-x-md no-padding no-margin">
      <img src="~assets/flowerbehindlady.svg" alt="">
      <div class="column q-mt-lg">
        <div class="fw-600 q-mt-sm title font-radley text-primary q-mt-md">Want to make an <br/> appointment easily? <br/>Contact us!</div>
        <div class="q-mt-md font-radley column q-gutter-y-sm q-pb-xl">
        <q-input v-model="fullName" dense placeholder="Full Name">
          <template v-slot:append>
            <q-icon name="person" size="24px" color="primary"/>
          </template>
        </q-input>
        <q-input v-model="contactNumber" dense placeholder="Contact Number">
          <template v-slot:append>
            <q-icon name="call" size="24px" color="primary"/>
          </template>
        </q-input>
        <q-input v-model="email" dense placeholder="Email ID" type="email">
          <template v-slot:append>
            <q-icon name="mail" size="24px" color="primary"/>
          </template>
        </q-input>
        <q-input v-model="date" placeholder="Date (dd/mm/yyyy)">
          <template v-slot:append>
            <q-icon name="calendar_month" size="24px" color="primary"/>
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
  }
}
</script>

<style lang="scss" scoped>
.bg-image {
  background-image: url('~assets/makeappointmentbg.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
