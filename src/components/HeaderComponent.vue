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
          <!-- Hospital -->
          <q-btn-dropdown label="Hospital" v-model="hospitalMenu" no-caps class="fs-16 fw-600 font-montserrat" flat dense >
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

          <!-- Women wellness -->
          <q-btn-dropdown label="Women Wellness" v-model="womenWellnessOptions" no-caps class="fs-16 fw-600 font-montserrat" flat dense >
            <q-list class="fs-14 fw-600 font-montserrat text-primary column justify-center q-py-sm" style="width:auto">
              <span style="display:block;"  class="q-my-sm q-mx-md cursor-pointer menu-item" v-for="(menu, id) in womenWellnessMenu" :key="id" clickable v-close-popup @click="onWomenWellnessClick(menu)">
                {{menu.menuTitle}}
              </span>
            </q-list>
          </q-btn-dropdown>

          <!-- Tools -->
          <q-btn-dropdown label="Tools"  v-model="toolsMenu" no-caps class="fs-16 fw-600 font-montserrat"  flat dense>
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
    <login-popup
    @closeUserPopup="closeUserPopup"
    @openUserPopup="openUserPopup"
    @fetchUserDetails="fetchUserDetails"/>
  </q-dialog>

  <!-- Signup - popup -->
  <q-dialog v-model="signupPopup">
    <signup-popup
    @closeUserPopup="closeUserPopup"
    @openUserPopup="openUserPopup"
    @fetchUserDetails="fetchUserDetails"/>
  </q-dialog>

</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import LoginPopup from './HomePageComponents/LoginPopup.vue'
import SignupPopup from './HomePageComponents/SignupPopup.vue'

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
      showDueDateError: false,
      hospitalMenu: false,
      hospitalMenuOver: false,
      hospitalListOver: false,
      womenWellnessOptions: false,
      womenWellnessOptionsOver: false,
      womenWellnessOptionsListOver: false,
      toolsMenu: false,
      signupUserPopup: false
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
    getCheckUserLoggedIn: {
      async handler (newVal) {
        if (newVal === 'success') {
          this.userDetails = {}
          this.isUserLoggedIn = false
          this.$router.push({
            name: 'home'
          })
        } else if (newVal === 'failure') {
          this.userDetails = {}
          this.isUserLoggedIn = false
          this.$router.push({
            name: 'home'
          })
        }
      }
    },
    $route: {
      immediate: true,
      deep: true,
      handler (newVal) {
        if (this.getOpenLoginPopup === 'Y' && newVal.name === 'home') {
          this.loginPopup = true
          this.setOpenLoginPopup(false)
        }
        // if (newVal === 'Y' && this.$route.name === 'home') {
        // }
      }
    }
    // getOpenLoginPopup: {
    //   immediate: true,
    //   deep: true,
    //   handler (newVal) {
    //     if (newVal === 'Y' && this.$route.name === 'home') {
    //       this.loginPopup = true
    //       this.setOpenLoginPopup(false)
    //     }
    //   }
    // }
  },
  methods: {
    ...mapActions({
      logoutUser: 'nursingHome/logoutUser',
      getUserDetails: 'nursingHome/getUserDetails'
    }),
    ...mapMutations({
      setOpenLoginPopup: 'nursingHome/setOpenLoginPopup',
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
    openDrawer () {
      this.openMenu = true
    },
    openUserPopup (action) {
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
      getTabDetailsData: 'nursingHome/getTabDetailsData',
      getCheckUserLoggedIn: 'nursingHome/getCheckUserLoggedIn',
      getOpenLoginPopup: 'nursingHome/getOpenLoginPopup'
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
  },
  components: {
    LoginPopup,
    SignupPopup
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
