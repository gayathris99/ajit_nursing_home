<template>
  <q-header class="">
    <div style="background:#004953" class="text-center q-pa-sm font-montserrat fw-700">
      <div class="cursor-pointer" v-if="!isUserLoggedIn" :class="isMobile ? 'fs-14' : 'fs-16'" style="display:inline" @click="openUserPopup('signup')"><span class="text-underline">Join now</span> to personalize Ajit Nursing Home for your pregnancy <q-icon name="expand_more" :size="isMobile ? 'sm' : 'md'"></q-icon></div>
      <div class="cursor-pointer" v-else :class="isMobile ? 'fs-14' : 'fs-16'" style="display:inline">Hello {{userDetails.firstName}} &#128512;</div>
    </div>
    <div style="background:#F1B490" class="thin-line"></div>
    <div class="text-primary font-quicksand q-py-sm bg-header">
      <div class="row justify-between align-center items-center" :class="isDesktop ? 'q-px-xl' : 'q-px-md'">
        <div class="row items-center cursor-pointer">
          <q-icon name="menu" size="md" v-if="!isDesktop" class="text-primary cursor-pointer q-pr-sm" @click="openDrawer"/>
          <img src="~assets/Logo128.png" alt="Ajit nursing home logo" :width="isDesktop ? '55' : '45'" @click="goTo('home')">
          <div class="column fw-600 q-pl-md font-petrona" @click="goTo('home')">
            <div :class="isMobile ? 'fs-16 fw-700' : 'fs-24'">Ajit Nursing Home</div>
            <div :class="isMobile ? 'fs-14' : 'fs-16'">Healing Hands and Caring Hearts</div>
          </div>
        </div>
        <div class="row items-center q-gutter-md fs-16 fw-600" v-if="isDesktop">
          <q-btn-dropdown label="Hospital" no-caps class="fs-16 fw-600 font-montserrat" flat dense>
            <q-list class="fs-14 fw-600 font-montserrat text-primary column justify-center" style="width: 150px">
              <q-item clickable v-close-popup @click="goTo('about-us')">
                <q-item-section @click="goTo('about-us')">About Us</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section @click="goTo('our-doctors')">Our Doctors</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Facilities</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Gallery</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn-dropdown label="Women Wellness" no-caps class="fs-16 fw-600 font-montserrat" flat dense>
            <q-list class="fs-14 fw-600 font-montserrat text-primary column justify-center q-py-sm" style="width:auto">
              <span style="display:block;"  class="q-my-sm q-mx-md cursor-pointer menu-item" v-for="(menu, id) in womenWellnessMenu" :key="id" clickable v-close-popup @click="onWomenWellnessClick(menu)">
                {{menu.menuTitle}}
              </span>
                <!-- <q-item v-for="(menu, id) in womenWellnessMenu" :key="id" clickable v-close-popup class="no-padding" >
                  <q-item-section>{{menu.menuTitle}}</q-item-section>
                </q-item> -->
            </q-list>
          </q-btn-dropdown>
          <q-btn-dropdown label="Tools" no-caps class="fs-16 fw-600 font-montserrat" flat dense>
            <q-list class="fs-14 fw-600 font-montserrat text-primary column justify-center" style="width: 150px">
              <q-item clickable v-close-popup>
                <q-item-section>Ovulation Calculator</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Pregnancy Due Date Calculator</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn-dropdown label="Contact Us" @click="redirectToWhatsapp" no-caps class="fs-16 fw-600 font-montserrat" flat dense></q-btn-dropdown>
          <div class="fs-16 fw-600 font-montserrat cursor-pointer" v-if="!isUserLoggedIn">
            <span @click="openUserPopup('login')">LOGIN&nbsp;/&nbsp;</span>
            <span @click="openUserPopup('signup')">SIGNUP</span>
          </div>
          <div v-else>
            <q-btn-dropdown icon="account_circle" flat dense size="20px">
              <q-list class="fs-14 fw-600 font-montserrat text-primary column justify-center" style="width: auto">
                <q-item clickable v-close-popup @click="goTo('account-settings')">
                  <q-item-section>Account Settings</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="onLogout">
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </div>
      </div>
      <q-drawer v-if="!isDesktop"
      v-model="openMenu">
        <div class="row items-center q-gutter-sm bg-header q-pa-md" @click="goTo('home')">
          <img src="~assets/Logo128.png" alt="Ajit nursing home logo" width="45">
          <div class="column fw-600">
            <div class="fs-20">Ajit Nursing Home</div>
          </div>
        </div>
        <div class="column q-gutter-x-md q-mt-md fw-600 text-primary">
          <q-expansion-item
            class="fs-16"
            label="Hospital"
            group="somegroup"
            dense
            >
            <div class="q-py-sm q-px-md cursor-pointer fs-14" @click="goTo('about-us')">About Us</div>
            <div class="q-py-sm q-px-md cursor-pointer fs-14" @click="goTo('our-doctors')">Our Doctors</div>
            <div class="q-py-sm q-px-md cursor-pointer fs-14">Facilities</div>
            <div class="q-py-sm q-px-md cursor-pointer fs-14">Gallery</div>
          </q-expansion-item>
          <q-expansion-item
            class="fs-16"
            label="Women Wellness"
            group="somegroup"
            dense
            >
            <div v-for="(menu, id) in womenWellnessMenu" :key="id" class="q-py-sm q-px-md cursor-pointer fs-14" @click="onWomenWellnessClick(menu)">{{menu.menuTitle}}</div>
          </q-expansion-item>
          <q-expansion-item
            class="fs-16"
            label="Tools"
            group="somegroup"
            dense
            >
            <div class="q-py-sm q-px-md cursor-pointer fs-14">Ovulation Calculator</div>
            <div class="q-py-sm q-px-md cursor-pointer fs-14">Pregnancy Due Date Calculator</div>
          </q-expansion-item>
          <div class="cursor-pointer q-py-sm q-px-md fs-16" @click="redirectToWhatsapp">Contact Us</div>
          <div class="cursor-pointer q-py-sm q-px-md fs-16" v-if="!isUserLoggedIn" @click="openUserPopup('login')">Login</div>
          <div class="cursor-pointer q-py-sm q-px-md fs-16" v-if="!isUserLoggedIn" @click="openUserPopup('signup')">Signup</div>
          <div class="cursor-pointer q-py-sm q-px-md fs-16" v-if="isUserLoggedIn"  @click="goTo('account-settings')">Account Settings</div>
          <div class="cursor-pointer q-py-sm q-px-md fs-16" v-if="isUserLoggedIn" @click="onLogout">Logout</div>
        </div>
      </q-drawer>
    </div>
  </q-header>
  <!-- Login - popup -->
  <q-dialog v-model="loginPopup">
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
          <div class="fs-16 fw-500 cursor-pointer font-montserrat login-tagline q-mb-md">Forgot Password ?</div>
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
  </q-dialog>

  <!-- Signup - popup -->
  <q-dialog v-model="signupPopup">
    <q-card class="signup-popup no-padding">
      <q-card-section class="no-padding">
        <div class="close-btn cursor-pointer" @click="closeUserPopup('signup')">
          <img src="~assets/closeIconSecondary.svg" width="24" alt="">
        </div>
        <div class="signup-image">
          <img src="~assets/signuppopupImage.svg" alt="">
        </div>
        <q-form @submit.prevent.stop="onRegister">
        <div class="q-px-sm q-py-xs text-center column items-center justify-center">
          <div class="font-montserrat fw-700 fs-18 q-px-xs">Track your baby's development</div>
          <div class="sub-title fs-16 fw-500 text-center q-mt-xs q-px-xs font-montserrat">
            Get expert guidance from the world's #1 pregnancy and parenting resource, delivered via email, our apps, and website.
          </div>
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
  </q-dialog>

</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'HeaderComponent',
  data () {
    return {
      openMenu: false,
      loginPopup: false,
      signupPopup: false,
      isPwd: 'password',
      userName: '',
      whatsappNumber: '',
      password: '',
      dueDate: null,
      isConceive: false,
      womenWellnessMenu: [
        {
          menuTitle: 'OBGYN Introduction'
        },
        {
          menuTitle: 'Planning a pregnancy'
        },
        {
          menuTitle: 'Being Pregnant/Giving Birth'
        },
        {
          menuTitle: 'Labor & Delivery'
        },
        {
          menuTitle: 'After Pregnancy'
        },
        {
          menuTitle: 'Abortion Care'
        },
        {
          menuTitle: 'Fertility'
        },
        {
          menuTitle: 'Baby'
        },
        {
          menuTitle: 'Life as a parent'
        },
        {
          menuTitle: 'Gynaecology'
        },
        {
          menuTitle: 'Getting Pregnant'
        }
      ],
      isUserLoggedIn: false,
      userDetails: null,
      showDueDateError: false
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
    }
  },
  methods: {
    ...mapActions({
      registerUser: 'nursingHome/registerUser',
      loginUser: 'nursingHome/loginUser',
      logoutUser: 'nursingHome/logoutUser',
      getUserDetails: 'nursingHome/getUserDetails'

    }),
    redirectToWhatsapp () {
      window.open('https://wa.me/919448420369', '_blank')
    },
    onWomenWellnessClick ({ menuTitle }) {
      const getTabDetailsData = this.getTabDetailsData?.filter(tab => tab.title.toLowerCase() === menuTitle.toLowerCase())
      if (getTabDetailsData.length) {
        this.$router.push({
          name: 'women-wellness-page',
          params: {
            tabTitle: getTabDetailsData[0]?.title?.toLowerCase()?.split(' ')?.join('-')
          },
        })
      }
    },
    dateOption (date) {
      const fiveYearsAgo = this.subtractYears(new Date(), 5).toLocaleDateString('en-ZA') //dd/mm/yyyy
      return date >= fiveYearsAgo
    },
    subtractYears(date, years) {
      date.setFullYear(date.getFullYear() - years);
      return date;
    },
    onDateInputClick () {
      this.$refs.dateBtnDropdown.show()
    },
    openDrawer () {
      this.openMenu = true
    },
    openUserPopup (action) {
      this.whatsappNumber = ''
      this.password = ''
      this.dueDate = null,
      this.isConceive = false
      if (!this.isDesktop) this.openMenu = false
      if (action === 'login') {
        this.signupPopup = false
        this.loginPopup = true
      } else {
        this.loginPopup = false
        this.signupPopup = true
      }
    },
    closeUserPopup (action) {
      this.whatsappNumber = ''
      this.password = ''
      this.dueDate = null,
      this.isConceive = false
      if (action === 'login') {
        this.loginPopup = false
      } else {
        this.signupPopup = false
      }
    },
    comingSoon () {
      this.$q.notify({
        message: "We are working on it, Stay tuned! :)",
        color: "green",
        position: "top"
      });
    },
    goTo (route) {
      this.$router.push({
        name: route
      })
    },
    goToNewTab (path) {
      let route = this.$router.resolve({name: path});
      window.open(route.href, '_blank');
    },
    async onLogin (e) {
      e.preventDefault()
      try {
        this.$q.loading.show()
        const { data } = await this.loginUser({
           username : this.whatsappNumber,
           password: this.password

        })
        await this.fetchUserDetails(data)
        this.loginPopup = false
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
           dueDate,
           isTryingToConceive: this.isConceive
        })
        this.signupPopup = false
        await this.fetchUserDetails(data)
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
    async onLogout () {
      try {
        const result = await this.logoutUser({
          accessToken: this.userDetails.token
        })
        this.userDetails = {}
        this.isUserLoggedIn = false
        localStorage.removeItem('userObj')
        if (this.$route.name.includes('account-settings')) this.goTo('home')
      } catch (error) {
        this.$q.notify({
          message: "Something went wrong, please try again",
          color: "red",
          position: "top",
          icon: "warning",
        });
      }
    },
    async fetchUserDetails (tokenData) {
      try {
        const { data } = await this.getUserDetails({
          accessToken: tokenData.token
        })
        const userObj = {
          ...data,
          token: tokenData.token
        }
        localStorage.setItem('userObj', JSON.stringify(userObj));
        this.isUserLoggedIn = true
        this.userDetails = userObj
      } catch (error) {
        this.$q.notify({
          message: "Something went wrong, please try again",
          color: "red",
          position: "top",
          icon: "warning",
        });
      }
    }
  },
  computed: {
    ...mapGetters({
      getTabDetailsData: 'nursingHome/getTabDetailsData'
    }),
    isMobile () {
      return this.$q.screen.lt.sm
    },
    isTablet () {
      return this.$q.screen.gt.xs && this.$q.screen.lt.md
    },
    isDesktop () {
      return this.$q.screen.gt.sm
    },
    isHomePage () {
      return this.$route.name === 'home'
    }
  },
  mounted () {
    const userDetails = JSON.parse(localStorage.getItem('userObj'))
    if (userDetails) {
      this.isUserLoggedIn = true
      this.userDetails = userDetails
    }
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
}
.menu-item:hover {
  color: #BC3430;
}

.thin-line {
  padding: 2px;
}
</style>
