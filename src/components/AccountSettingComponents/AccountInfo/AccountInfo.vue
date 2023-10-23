<template>
  <div class="q-mt-lg">
    <div class="font-domine subtitle fw-500 text-primary">Account Info</div>
    <div class="form-container font-montserrat fw-500 q-mt-md">
      <q-input v-model="fullName" outlined label="Full Name" class="q-mb-lg"></q-input>
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
        @click="onSave"
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
import { mapActions } from 'vuex'
import ChangePassword from './ChangePassword.vue'
export default {
  name: 'AccountInfo',
  components: { ChangePassword },
  data () {
    return {
      fullName: '',
      email: '',
      showChangePasswordPopup: false
    }
  },
  methods: {
    ...mapActions({
      updateUserDetails: 'nursingHome/updateUserDetails'
    }),
    onChangePassword () {
      this.showChangePasswordPopup = true
    },
    closeChangePassword () {
      this.showChangePasswordPopup = false
    },
    async onSave () {
      try {
        const accessToken = JSON.parse(localStorage.getItem('userObj'))?.token
        this.$q.loading.show()
        const { data } = await this.updateUserDetails({
          accessToken,
          payload: {
            firstName: this.fullName,
            email: this.email
          }
        })
        const userObj = {
          ...data,
          token: accessToken
        }
        localStorage.setItem('userObj', JSON.stringify(userObj));
        this.$q.notify({
          message: "Account Info Saved!",
          color: "green",
          position: "top"
        });
      } catch (error) {}
      finally {
        this.$q.loading.hide()
      }
    },
  },
  mounted () {
    this.$q.loading.show()
    const userObj = JSON.parse(localStorage.getItem('userObj'))
    this.fullName = userObj.firstName
    this.email = userObj.email
    this.$q.loading.hide()
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
