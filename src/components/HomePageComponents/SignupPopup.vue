<template>
  <q-card class="signup-popup no-padding">
    <q-card-section class="no-padding">
      <div class="close-btn cursor-pointer" @click="closeUserPopup('signup')">
        <img src="~assets/closeIconSecondary.svg" width="24" alt="">
      </div>
      <div class="signup-image">
        <img src="~assets/signuppopupImage.svg" alt="">
      </div>
      <div class="column items-center justify-center q-px-xs q-py-xs">
        <div class="font-montserrat fw-700 fs-18 q-px-xs">Track your baby's development</div>
        <div class="sub-title fs-16 fw-500 text-center q-mt-xs q-px-xs font-montserrat">
          Get expert guidance from the world's #1 pregnancy and parenting resource, delivered via email, our apps, and website.
        </div>
      </div>
      <!-- Form to check if user exists -->
      <div v-if="!enableOtpVerification">
        <q-form v-if="!isVerfied && !userExists" @submit.prevent.stop="onVerifyUser">
          <div class="column items-center justify-center q-px-xs q-py-xs">
            <q-input
            color="black"
            id="phone"
            class="font-montserrat fw-500 q-mb-sm q-px-sm"
            label-color="primary"
            outlined
            v-model="whatsappNumber"
            :rules="[val => !!val || 'Whatsapp Number is required',
                    val => val.match(/^[0-9]+$/) || 'Only numbers allowed',
                    val => val.length === 10 || 'Incorrect Number']"
            label="Whatsapp Number:">
            </q-input>
            <q-btn
            label="SEND OTP"
            class="font-montserrat sendotp-btn"
            color="secondary"
            type="submit"
            ></q-btn>
            <div class="font-montserrat sub-title q-px-sm fs-12" style="color:#56584B; margin-bottom:20px">By registering, you confirm that you are 16 years of age or older, and you agree to our <span class="cursor-pointer text-underline" @click="goToNewTab('terms')">Terms of Use</span> & <span class="cursor-pointer text-underline" @click="goToNewTab('privacy')">Privacy Policy</span>. We use your information to send you emails, product samples, and promotions, and may share your information with partners as described <span class="cursor-pointer text-underline" @click="goToNewTab('privacy')">here</span>. We use your health information to make our site even more helpful.</div>
          </div>
        </q-form>
        <div v-if="!isVerfied && userExists">
          <div class="column items-center justify-center q-px-xs q-py-xs ">
            <div class="fs-14 fw-500 text-center q-mt-xs q-px-xs font-montserrat text-red">
              <div>An user already exists with the number {{this.whatsappNumber}}.</div>
              <div class="text-underline cursor-pointer q-mt-sm" @click="signupAgain">Try with another number.</div>
            </div>
          </div>
          <div class="fs-16 fw-500 q-px-lg q-mt-md cursor-pointer text-primary text-underline login-tagline font-montserrat"  @click="openUserPopup('login')">Already a member? Login</div>
          <div class="fs-16 fw-500 q-px-lg q-mt-sm cursor-pointer text-primary text-underline login-tagline font-montserrat q-my-md">Forgot Password?</div>
          <div class="column items-center justify-center q-mb-md">
            <div class="font-montserrat sub-title q-px-lg fs-12 text-justify" style="color:#56584B; margin-bottom:30px">By registering, you confirm that you are 16 years of age or older, and you agree to our <span class="cursor-pointer text-underline" @click="goToNewTab('terms')">Terms of Use</span> & <span class="cursor-pointer text-underline" @click="goToNewTab('privacy')">Privacy Policy</span>. We use your information to send you emails, product samples, and promotions, and may share your information with partners as described <span class="cursor-pointer text-underline" @click="goToNewTab('privacy')">here</span>. We use your health information to make our site even more helpful.</div>
          </div>
        </div>
      </div>


      <!-- Form to add OTP -->
      <div v-if="enableOtpVerification">
        <q-form @submit.prevent.stop="onVerifyOtp">
          <div  class="column items-center justify-center q-px-sm q-py-sm">
            <q-input
            color="black"
            id="phone"
            readonly
            class="font-montserrat fw-500 q-mb-sm q-px-sm"
            label-color="primary"
            outlined
            v-model="whatsappNumber"
            :rules="[val => !!val || 'Whatsapp Number is required',
                    val => val.match(/^[0-9]+$/) || 'Only numbers allowed',
                    val => val.length === 10 || 'Incorrect Number']"
            label="Whatsapp Number:">
            </q-input>
            <q-input
            color="black"
            class="font-montserrat fw-500 q-mb-xs q-px-sm"
            label-color="primary"
            outlined
            v-model="otp"
            :rules="[val => !!val || 'OTP is required',
                    val => val.match(/^[0-9]+$/) || 'Only numbers allowed',
                    val => val.length === 4 || 'Enter only 4 digits']"
            label="One Time Password (OTP):">
            </q-input>
            <div class="fs-14 font-montserrat q-px-md q-pb-xs q-mb-sm text-center" style="max-width: 420px" v-if="showErrorMessageForOtp">
              <div class="text-red">The entered number and OTP do not match.</div>
              <div class="text-red text-center">Please try again.</div>
            </div>
            <div class="fs-14 font-montserrat q-px-md q-pb-xs q-mb-sm">
              <div :class="{'cursor-pointer text-bold text-primary' : !showCountDown, 'text-grey text-bold': showCountDown}" @click="resendOtp">Resend OTP <span v-if="showCountDown">in {{minutes}} : {{seconds}}</span></div>
            </div>
            <q-btn
            label="VERIFY OTP"
            class="font-montserrat sendotp-btn"
            color="secondary"
            type="submit"
            ></q-btn>
            <div class="font-montserrat sub-title q-px-sm fs-12" style="color:#56584B; margin-bottom:20px">By registering, you confirm that you are 16 years of age or older, and you agree to our <span class="cursor-pointer text-underline" @click="goToNewTab('terms')">Terms of Use</span> & <span class="cursor-pointer text-underline" @click="goToNewTab('privacy')">Privacy Policy</span>. We use your information to send you emails, product samples, and promotions, and may share your information with partners as described <span class="cursor-pointer text-underline" @click="goToNewTab('privacy')">here</span>. We use your health information to make our site even more helpful.</div>
          </div>
        </q-form>
      </div>
      <!-- Form for regsitration -->
      <q-form @submit.prevent.stop="onRegister" v-if="isVerfied">
      <div class="q-px-sm q-py-xs text-center column items-center justify-center">
        <q-input
        color="black"
        id="phone"
        class="font-montserrat fw-500 q-mb-sm q-px-sm"
        label-color="primary"
        outlined
        readonly
        v-model="whatsappNumber"
        :rules="[val => !!val || 'Whatsapp Number is required',
                val => val.match(/^[0-9]+$/) || 'Only numbers allowed',
                val => val.length === 10 || 'Incorrect Number']"
        label="Whatsapp Number:">
        </q-input>
        <q-input
        color="black"
        outlined
        v-model="userName"
        label="Name:"
        class="font-montserrat fw-500 q-mb-sm q-px-sm"
        label-color="primary"
        :rules="[val => !!val || 'Name is required']">
        </q-input>
        <q-input
        color="black"
        label-color="primary"
        class="font-montserrat fw-500 q-mb-sm q-px-sm"
        :type="isPwd ? 'password' : 'text'"
        outlined
        v-model="password"
        label="Password:"
        :rules="[val => !!val || 'Password is required',
                val => val.length >= 8 || 'Password Length must be atleast 8 characters']">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              color="secondary"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-input
        color="black"
        label-color="primary"
        class="font-montserrat fw-500 q-px-sm"
        outlined
        :error="showDueDateError"
        @focus="onDateInputClick"
        v-model="dueDate"
        label="Due date:">
          <template v-slot:append>
            <q-icon name="cancel" @click.stop.prevent="dueDate = null" class="cursor-pointer" v-if="dueDate" />
            <div @click="onDateInputClick">
              <q-btn-dropdown icon="calendar_month" color="secondary" dense flat ref="dateBtnDropdown" >
                <q-date minimal color="secondary" v-model="dueDate" mask="DD/MM/YYYY" :options="dateOption"/>
              </q-btn-dropdown>
            </div>
          </template>
        </q-input>
      </div>
      <div class="fs-12 font-montserrat q-px-md q-pb-xs q-mb-sm" style="text-align:left;">
        <span style="color:#56584B">Don't know your due date? </span>
        <span class="text-primary login-tagline cursor-pointer fw-500">Calculate my due date</span>
        <div class="fs-14 q-mt-md text-red" v-if="showDueDateError">Enter due date if applicable or click on trying to conceive</div>
      </div>
      <div class="q-px-sm">
        <q-checkbox v-model="isConceive" class="fs-16 fw-500 font-montserrat" label="Trying to Conceive?" color="secondary"/>
        <hr class="q-my-md q-mx-sm">
      </div>
      <div class="column items-center justify-center">
        <q-btn
        label="JOIN NOW"
        class="font-montserrat signup-btn"
        color="secondary"
        type="submit"
        ></q-btn>
        <div class="font-montserrat sub-title q-px-sm fs-12" style="color:#56584B; margin-bottom:20px">By registering, you confirm that you are 16 years of age or older, and you agree to our <span class="cursor-pointer text-underline" @click="goToNewTab('terms')">Terms of Use</span> & <span class="cursor-pointer text-underline" @click="goToNewTab('privacy')">Privacy Policy</span>. We use your information to send you emails, product samples, and promotions, and may share your information with partners as described <span class="cursor-pointer text-underline" @click="goToNewTab('privacy')">here</span>. We use your health information to make our site even more helpful.</div>
        <div class="text-primary font-montserrat fs-12 fw-500 cursor-pointer login-tagline" @click="openUserPopup('login')" style="margin-bottom: 28px">Already a member? Log in</div>
      </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SignupPopup.vue',
  data () {
    return {
      userName: '',
      whatsappNumber: null,
      otp: null,
      password: null,
      dueDate: null,
      showDueDateError: false,
      isConceive: false,
      isPwd: true,
      isVerfied: false,
      userExists: false,
      enableOtpVerification: false,
      countDownTime: '',
      timerCount: 0,
      minutes: '',
      seconds: '',
      showCountDown: false,
      showErrorMessageForOtp: false
    }
  },
  watch: {
    dueDate: {
      immediate: true,
      deep: true,
      handler (newVal) {
        if (newVal) this.showDueDateError = false
      }
    },
    isConceive: {
      immediate: true,
      deep: true,
      handler (newVal) {
        if (newVal) this.showDueDateError = false
      }
    },
    otp: {
      handler (newVal) {
        if (newVal) this.showErrorMessageForOtp = false
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
      registerUser: 'nursingHome/registerUser',
      verifyUser: 'nursingHome/verifyUser',
      verifyOtp: 'nursingHome/verifyOtp'
    }),
    closeUserPopup (value) {
      this.$emit('closeUserPopup', value)
    },
    openUserPopup (value) {
      this.$emit('openUserPopup', value)
    },
    onDateInputClick () {
      this.$refs.dateBtnDropdown.show()
    },
    goToNewTab (path) {
      let route = this.$router.resolve({name: path});
      window.open(route.href, '_blank');
    },
    dateOption (date) {
      const fiveYearsAgo = this.subtractYears(new Date(), 5).toLocaleDateString('en-ZA') //dd/mm/yyyy
      return date >= fiveYearsAgo
    },
    subtractYears(date, years) {
      date.setFullYear(date.getFullYear() - years);
      return date;
    },
    signupAgain () {
      this.whatsappNumber = ''
      this.isVerfied = false
      this.userExists = false
    },
    resendOtp () {
      if (this.showCountDown)  return
      else {
        window.open('https://wa.me/15550368606?text=Send message to verify', '_blank')
        this.enableOtpVerification = true
        this.timerCount = 300
      }
    },
    async onRegister (e) {
      e.preventDefault()
      try {
        if (!this.dueDate && !this.isConceive) {
          this.showDueDateError = true
          return
        } else this.showDueDateError = false
        this.$q.loading.show()
        const splitDueDate = this.dueDate.split('/')
        const dueDate = `${splitDueDate[2]}-${splitDueDate[1]}-${splitDueDate[0]}`
        const { data } = await this.registerUser({
           username : this.whatsappNumber ,
           password : this.password ,
           password2 : this.password ,
           firstName : this.userName ,
          //  lastName : this.userName,
           otp: this.otp,
           dueDate,
           isTryingToConceive: this.isConceive
        })
        this.$emit('closeUserPopup', 'signup')
        this.$emit('fetchUserDetails', data)
      } catch (error) {
        this.$q.notify({
          message: "Something went wrong, please try again",
          color: "red",
          position: "top",
          icon: "warning",
        });
      } finally {
        this.$q.loading.hide()
      }
    },
    async onVerifyUser (e) {
      e.preventDefault()
      try {
        this.$q.loading.show()
        const { data } = await this.verifyUser({
          username:this.whatsappNumber
        })
        if (data) {
          if (!data.exists) {
            window.open('https://wa.me/15550368606?text=Send message to verify', '_blank')
            this.enableOtpVerification = true
            this.timerCount = 300
          } else {
            this.userExists = true
          }
        }
      } catch (error) {
        this.$q.notify({
          message: "Something went wrong, please try again",
          color: "red",
          position: "top",
          icon: "warning",
        });
      } finally {
        this.$q.loading.hide()
      }
    },
    async onVerifyOtp (e) {
      e.preventDefault()
      try {
        this.$q.loading.show()
        const { data } = await this.verifyOtp({
          username: this.whatsappNumber,
          otp: this.otp
        })
        if (data) {
          if (data.status.toLowerCase() === 'verified') {
            this.isVerfied = true
            this.userExists = false
            this.enableOtpVerification = false
            this.showErrorMessageForOtp = false
          }
        }
      }  catch (error) {
        console.log(error)
        if (error?.response?.data?.status?.toLowerCase() === 'failed') {
          this.showErrorMessageForOtp = true
        }
        // this.$q.notify({
        //   message: "Something went wrong, please try again",
        //   color: "red",
        //   position: "top",
        //   icon: "warning",
        // });
      } finally {
        this.$q.loading.hide()
      }
    },
  }
}
</script>



<style lang="scss" scoped>
.bg-header {
  background-image: linear-gradient(to right, #C2E2E1 , #CFECE8, #DEEFEE);
}
.text-underline {
  text-decoration: underline;
}
:deep(.q-btn-dropdown__arrow) {
  display: none;
}
.login-tagline:hover {
  text-decoration: underline;
}

.q-card {
  border-radius: 10px;
}
.login-btn {
  width: 140px;
  height: 50px;
  font-weight: bolder;
  padding: 0px 16px;
  :deep(.q-btn__content) {
    font-size: 16px;
  }
}
.login-popup {
  .q-input {
    width: 400px;
    @media only screen and (max-width: $breakpoint-sm-max) {
      width: auto;
    }
  }
}
.signup-popup {
  position: relative;
  .close-btn {
    position:absolute;
    top:5px;
    right:5px;
  }
  .signup-image {
    img {
      width: 100%;
    }
  }
  .sub-title {
    max-width: 410px;
    text-align: center;
    margin-bottom: 20px;
  }
  .q-input {
    width: 100%;
  }
  .signup-btn {
    width: 150px;
    margin-bottom: 20px;
    margin-top: 10px;
    height: 50px;
    font-size: 16px;
    font-weight: bolder;
    padding: 0px 16px;
    :deep(.q-btn__content) {
      font-size: 16px;
    }
  }
  .sendotp-btn {
    width: 150px;
    margin-bottom: 20px;
    margin-top: 5px;
    height: 50px;
    font-size: 16px;
    font-weight: bolder;
    padding: 0px 16px;
    :deep(.q-btn__content) {
      font-size: 16px;
    }
  }
}
.menu-item:hover {
  color: #BC3430;
}

.thin-line {
  padding: 2px;
}
.sub-title {
  margin-bottom: 10px !important;
}
</style>
