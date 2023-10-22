<template>
  <q-card class="font-domine login-popup">
      <div class="row items-center justify-end cursor-pointer q-pt-sm q-pr-sm" @click="closeUserPopup('login')">
        <img src="~assets/closeIcon.svg" width="24" alt="">
      </div>
      <q-form  @submit.prevent.stop="onLogin">
        <q-card-section class="q-px-lg q-py-xs text-primary ">
          <div class="fs-16 fw-500 cursor-pointer login-tagline font-montserrat" @click="openUserPopup('signup')">New to Ajit Nursing Home? Join now!</div>
          <div class="fs-30 q-my-sm text-black" style="font-weight:bolder">Please log in</div>
          <div class="column q-gutter-sm q-mb-md font-montserrat fw-500">
            <q-input
             color="black"
            label-color="primary"
            outlined
            v-model="whatsappNumber"
            label="Whatsapp Number:"
            :rules="[val => !!val || 'Whatsapp Number is required',
            val => val.match(/^[0-9]+$/) || 'Only numbers allowed',
            val => val.length === 10 || 'Incorrect Number']">
            </q-input>
            <q-input
            color="black"
            label-color="primary"
            :type="isPwd ? 'password' : 'text'"
            outlined v-model="password"
            label="Password:"
            :rules="[val => !!val || 'Password is required',
                    val => val.length >= 8 || 'Password Length must be atleast 8 characters']">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="fs-16 fw-500 cursor-pointer font-montserrat login-tagline q-mb-md" @click="this.$router.push({
            name: 'forgot-password'
          })">Forgot Password ?</div>
          <q-btn
          class="q-mb-lg login-btn font-montserrat"
          label="LOG IN"
          type="submit"
          color="secondary"
          size="md"
          ></q-btn>
        </q-card-section>
      </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'LoginPopup',
  data () {
    return {
      whatsappNumber: null,
      password: null,
      isPwd: true
    }
  },
  methods: {
    ...mapActions({
      loginUser: 'nursingHome/loginUser',
    }),
    closeUserPopup (value) {
      this.$emit('closeUserPopup', value)
    },
    openUserPopup (value) {
    this.$emit('openUserPopup', value)
    },
    async onLogin (e) {
      e.preventDefault()
      try {
        this.$q.loading.show()
        const { data } = await this.loginUser({
           username : this.whatsappNumber,
           password: this.password

        })
        this.$emit('closeUserPopup', 'login')
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
  },
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
}
.menu-item:hover {
  color: #BC3430;
}

.thin-line {
  padding: 2px;
}
</style>
