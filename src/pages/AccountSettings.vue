<template>
  <div :class="isMobile ? 'q-pa-lg' : 'q-pa-xl'" class="main-container">
    <div class="">
      <div class="title font-domine fw-500 text-primary">Account Settings</div>
      <div class="scroll-container">
        <div class="q-mt-md tab-container font-montserrat" style="width: max-content">
          <div
          class="tab-item cursor-pointer fw-600"
          v-for="(tab, id) in tabDetails"
          :key="id"
          :class="{'tab-active' : tab.value === selectedTab}"
          @click="selectTab(tab)">
            &nbsp;{{tab.label}}&nbsp;
          </div>
        </div>
      </div>
      <div class="q-mt-md">
        <account-info v-if="selectedTab === 'accountInfo'"/>
      </div>
    </div>
  </div>
</template>

<script>
import AccountInfo from 'src/components/AccountSettingComponents/AccountInfo/AccountInfo.vue'
export default {
  name: 'AccountSettings',
  components: { AccountInfo },
  data () {
    return {
      userDetails: null,
      selectedTab: 'accountInfo',
      tabDetails: [
        { label: 'Account Info', value: 'accountInfo' },
        { label: 'Family Info', value: 'familyInfo' },
        { label: 'Whatsapp Subscription', value: 'whatsappSubscription' },
        { label: 'Email Subscription', value: 'emailSubscription' },
      ]
    }
  },
  methods: {
    selectTab (tab) {
      this.selectedTab = tab.value
    }
  },
  created () {
    const userDetails = JSON.parse(localStorage.getItem('userObj'))
    if (!userDetails?.token) this.$router.push({ name: 'home' })
    else this.userDetails = userDetails
  },
  computed: {
    isMobile () {
      return this.$q.screen.lt.sm
    },
    isDesktop () {
      return this.$q.screen.gt.sm
    },
  },
}
</script>

<style lang="scss" scoped>
.main-container {
  max-width: 800px;
  height: auto;
  margin: auto;
}
.tab-container {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  border-bottom: 1px solid grey
}
.scroll-container{
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  :deep(.q-scrollarea__thumb) {
    display: none;
  }
}
::-webkit-scrollbar {
   display: none;
}
.tab-item {
  color: grey;
  padding: 10px;
}
.tab-item:hover {
  background: #f7f7f6;
}
.tab-active {
  color: green;
  font-weight: 700;
  border-bottom: 1px solid green
}
</style>
