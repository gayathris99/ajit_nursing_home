<template>
  <q-card class="no-padding">
    <div class="row items-center justify-end cursor-pointer q-pt-sm q-pr-sm" v-close-popup>
      <img src="~assets/closeIconSecondary.svg" width="24" alt="">
    </div>
    <q-card-section class="font-montserrat text-primary q-px-lg">
      <div class="text-primary fs-18 fw-700">Keep child in your profile</div>
      <div class="fw-500 q-mt-md text-primary fs-14">
        Your email subscriptions associated with this child (other than your Community emails) have been canceled.
      </div>
      <div class="fw-500 q-mt-lg text-primary fs-14">
        To manage your Email and Whatsapp subscriptions, visit Email/Whatsapp Subscriptions.
      </div>
      <div class="border-bottom q-my-md"></div>
      <div class="fw-500 q-my-lg text-primary fs-14">
        It's normal to feel shock, grief, guilt, anger, depression and vulnerability after the loss of a child or pregnancy. Please know that you're not alone.
      </div>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.q-card {
  max-width: 450px;
}
.border-bottom {
  border-bottom: 1px solid grey
}
</style>
