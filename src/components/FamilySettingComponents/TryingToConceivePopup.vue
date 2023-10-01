<template>
  <q-card class="no-padding">
    <q-card-section>
      <div class="row items-center justify-end cursor-pointer q-pt-sm q-pr-sm" v-close-popup>
        <img src="~assets/closeIconSecondary.svg" width="24" alt="">
      </div>
      <div class="q-px-md q-pb-md q-pt-sm font-montserrat">
        <div class="fw-700 text-primary fs-18 q-mb-lg">Trying to conceive</div>
        <div class="q-mt-md fw-700 fs-16 text-primary">Email Subscriptions</div>
        <div class="border-bottom q-my-lg"></div>
         <q-checkbox v-model="isTryingToConceive" class="fs-16 fw-500 font-montserrat text-primary" label="My newsletter with personalized baby development info and expert tips." color="secondary"/>
        <div class="q-mt-lg fs-12 fw-700 text-grey">
          You can unsubscribe at any time. By continuing, you agree to our <span class="cursor-pointer text-underline" @click="goTo('terms')">Terms of Use</span> and <span class="cursor-pointer text-underline"  @click="goTo('privacy')">Privacy Policy</span>.
        </div>
        <div class="flex flex-center q-mt-lg">
          <q-btn
            class="q-my-sm save-btn font-montserrat"
            label="SAVE"
            color="secondary"
            size="sm"
            ></q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>


<script>
export default {
  name: 'TryingToConceivePopup',
  data () {
    return {
      isTryingToConceive: false
    }
  },
  methods: {
    goTo (name) {
      this.$router.push({
        name
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.border-bottom {
  border-bottom: 1px solid grey
}
.q-card {
  max-width: 450px;
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
