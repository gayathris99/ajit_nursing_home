<template>
  <div class="q-mt-lg">
    <div class="font-domine subtitle fw-500 text-primary">Account Info</div>
    <div class="form-container font-montserrat fw-500 q-mt-md">
      <q-input v-model="firstName" outlined label="First Name" class="q-mb-lg"></q-input>
      <q-input v-model="lastName" outlined label="Last Name" class="q-mb-lg"></q-input>
      <q-input v-model="email" outlined label="Email address" class="q-mb-lg"></q-input>
      <div class="fw-700 fs-20 q-mb-xs">Password</div>
      <div class="fw-700 fs-20">* * * * * *</div>
      <div class="q-mt-sm text-primary fs-16 cursor-pointer change-password" @click="onChangePassword">Change password</div>
      <div class="flex flex-center q-mt-md">
      <q-btn
        class="q-mb-lg save-btn font-montserrat"
        label="SAVE"
        color="secondary"
        size="sm"
        ></q-btn>
      </div>
    </div>
    <q-dialog v-model="showChangePasswordPopup">
      <change-password
      @closePopup="closeChangePassword"/>
    </q-dialog>
  </div>
</template>

<script>
import ChangePassword from './ChangePassword.vue'
export default {
  name: 'AccountInfo',
  components: { ChangePassword },
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      showChangePasswordPopup: false
    }
  },
  methods: {
    onChangePassword () {
      this.showChangePasswordPopup = true
    },
    closeChangePassword () {
      this.showChangePasswordPopup = false
    }
  }
}
</script>

<style lang="scss" scoped>
.q-input {
  width: 100%;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 100%;
  }
}
.change-password:hover {
  text-decoration: underline;
}
.save-btn {
  width: 120px;
  height: 50px;
  font-weight: bolder;
  padding: 0px 12px;
  :deep(.q-btn__content) {
    font-size: 18px;
  }
}
</style>
