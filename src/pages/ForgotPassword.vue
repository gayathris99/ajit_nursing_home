<template>
  <div :class="isMobile ? 'q-pa-lg' : 'q-pa-xl'" class="main-container">
    <div class="">
      <div class="title font-domine fw-500 text-primary">Forgot Password</div>
      <div class="font-montserrat q-my-md fs-16">Change your password by verifying your number via Whatsapp authentication</div>
      <div class="font-montserrat fw-500 q-mt-lg">
      <q-form @submit.prevent.stop="submitFormMethod">
        <div class="text-red fs-14 q-my-sm" v-if="showWrongWhatsappNumber">No user registered with the below Whatsapp number. Please enter the registered Whatsapp number</div>
        <div class="text-red fs-14 q-my-sm" v-if="showErrorMessage">Incorrect OTP entered. Please enter the correct credentials</div>
        <q-input
        v-model="whatsappNumber"
        outlined label="Whatsapp Number:"
        :rules="[val => !!val || 'Whatsapp Number is required',
          val => val.match(/^[0-9]+$/) || 'Only numbers allowed',
          val => val.length === 10 || 'Incorrect Number']"
        class="q-mb-md"></q-input>
        <div v-if="isOTPSent">
          <q-input
          class="font-montserrat fw-500 q-mb-md"
          label-color="primary"
          outlined
          v-model="otp"
          :rules="[val => !!val || 'OTP is required',
                  val => val.match(/^[0-9]+$/) || 'Only numbers allowed',
                  val => val.length === 4 || 'Enter only 4 digits']"
          label="One Time Password (OTP):">
          </q-input>
          <q-input
          label="New Password"
          v-model="newPassword"
          outlined
          color="secondary"
          class="q-mb-sm"
          :type="isNewPwd ? 'password' : 'text'"
          :rules="[val => !!val || 'Password is required',
              val => val.length >= 8 || 'Password Length must be atleast 8 characters']">
            <template v-slot:append>
              <q-icon
                :name="isNewPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                color="secondary"
                @click="isNewPwd = !isNewPwd"
              />
            </template>
          </q-input>
          <q-input
          label="Re-enter Password"
          v-model="newPassword2"
          outlined
          color="secondary"
          class="q-mb-sm"
          :type="isNewPwd2 ? 'password' : 'text'"
          :rules="[val => !!val || 'Password is required',
              val => val.length >= 8 || 'Password Length must be atleast 8 characters',
              val => val === newPassword || 'Password doesnt match']">
            <template v-slot:append>
              <q-icon
                :name="isNewPwd2 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                color="secondary"
                @click="isNewPwd2 = !isNewPwd2"
              />
            </template>
          </q-input>
          <div class="fs-14 font-montserrat q-pb-xs q-mb-sm">
            <div :class="{'cursor-pointer text-bold text-primary' : !showCountDown, 'text-grey text-bold': showCountDown}" @click="resendOtp">Resend OTP <span v-if="showCountDown">in {{minutes}} : {{seconds}}</span></div>
          </div>
          <q-btn
          class="q-mb-lg save-btn font-montserrat"
          label="SAVE"
          type="submit"
          color="secondary"
          size="sm"
          ></q-btn>
        </div>
        <q-btn
        v-if="!isOTPSent"
        class="q-mb-lg save-btn font-montserrat"
        label="SEND OTP"
        type="submit"
        color="secondary"
        size="sm"
        ></q-btn>
      </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'ForgotPassword',
  data () {
    return {
      whatsappNumber: '',
      isOTPSent: false,
      showWrongWhatsappNumber: false,
      otp: '',
      newPassword: '',
      isNewPwd: 'password',
      newPassword2: '',
      isNewPwd2: 'password',
      showCountDown: false,
      minutes: '',
      seconds: '',
      timerCount: 0,
    }
  },
  computed: {
    isMobile () {
      return this.$q.screen.lt.sm
    },
    credValues () {
      const { otp, newPassword, newPassword2 } = this
      return {
        otp,
        newPassword,
        newPassword2
      }
    }
  },
  watch: {
    whatsappNumber: {
      immediate: true,
      deep: true,
      handler (newVal) {
        if (this.showWrongWhatsappNumber) this.showWrongWhatsappNumber = false
      }
    },
    credValues: {
      immediate: true,
      deep: true,
      handler (newVal) {
        if (this.showErrorMessage) this.showErrorMessage = false
      }
    },
    timerCount: {
      immediate: true,
      deep: true,
      handler (newVal) {
        if (newVal > 0) {
            setTimeout(() => {
              this.showCountDown = true
              this.timerCount--
              this.minutes = parseInt(this.timerCount/60)
              this.seconds =  this.timerCount%60 < 10 ? `0${this.timerCount%60}` : this.timerCount%60
          }, 1000);
        } else {
          this.showCountDown = false
        }
      }
    }
  },
  methods: {
    ...mapActions({
      logoutUser: 'nursingHome/logoutUser',
      verifyUser: 'nursingHome/verifyUser',
      forgotPassword: 'nursingHome/forgotPassword'
    }),
    ...mapMutations({
      setCheckUserLoggedIn: 'nursingHome/setCheckUserLoggedIn',
      setOpenLoginPopup: 'nursingHome/setOpenLoginPopup'
    }),
    resendOtp () {
      if (this.showCountDown)  return
      else {
        window.open('https://wa.me/15550368606?text=Send message to verify', '_blank')
        this.timerCount = 300
      }
    },
    submitFormMethod (e) {
      e.preventDefault()
      if (!this.isOTPSent) {
        this.onVerifyUser()
      } else {
        this.onForgotPassword()
      }
    },
    async onForgotPassword () {
      try {
        this.$q.loading.show()
        const { data } = await this.forgotPassword({
          username: this.whatsappNumber,
          password: this.newPassword,
          password2: this.newPassword2,
          otp: this.otp
        })
        if (data.status === 'SUCCESS') {
          this.setCheckUserLoggedIn('success')
          this.setOpenLoginPopup('Y')
          this.$router.push({
            name: 'home'
          })
        }
      } catch (error) {
        const { response: { data }} = error
        if (data.status === 'FAILED') {
          this.showErrorMessage = true
        }
      }
      finally {
        this.$q.loading.hide()
      }
    },
    async onVerifyUser () {
      try {
        this.$q.loading.show()
        const { data } = await this.verifyUser({
          username:this.whatsappNumber
        })
        if (data.exists) {
          this.isOTPSent = true
          window.open('https://wa.me/15550368606?text=Send message to verify', '_blank')
          this.timerCount = 300
        } else {
          this.showWrongWhatsappNumber = true
          this.isOTPSent = false
        }
      } catch (error) {}
      finally {
        this.$q.loading.hide()
      }
    }
  },
  async mounted () {
    const accessToken = JSON.parse(localStorage.getItem('userObj'))
    if (accessToken) {
      const result = await this.logoutUser({
        accessToken: accessToken
      })
    }
    this.setCheckUserLoggedIn('removeUser')
    localStorage.removeItem('userObj')
  }
}
</script>
<style lang="scss" scoped>
.main-container {
  max-width: 800px;
  height: auto;
  margin: auto;
}
.save-btn {
  width: 160px;
  height: 50px;
  font-weight: bolder;
  padding: 0px 12px;
  :deep(.q-btn__content) {
    font-size: 18px;
  }
}
</style>
