<template>
  <div class="q-mt-lg">
    <div class="font-domine subtitle fw-500 text-primary">Whatsapp Subscriptions</div>
    <div class="q-my-md font-montserrat text-primary fs-16 fw-500">You can manage your whatsapp subscriptions here. To unsubscribe from whatsapp messages, uncheck the box next to it and save your changes below.</div>
    <q-checkbox v-model="selectAll" class="fs-16 fw-500 font-montserrat text-primary" label="Select All" color="secondary"/>
    <div class="border-bottom q-my-lg"></div>
    <div class="font-montserrat text-primary">

      <div class="fw-700 fs-20 q-mb-sm">Trying to conceive</div>
      <q-checkbox v-model="isTryingToConceive" class="fs-16 fw-500 font-montserrat text-primary" label="Getting Pregnant Highlights" color="secondary"/>
      <div class="fs-12 q-ml-sm fw-600 q-mt-xs" style="color: grey">Our best expert insights and freshest parent-to-parent conversations picked just for you.</div>
      <div class="border-bottom q-my-lg"></div>

      <div class="fw-700 fs-20 q-mb-sm">My Pregnancy</div>
      <q-checkbox v-model="pregnancyWeek" class="fs-16 fw-500 font-montserrat text-primary" label="My Pregnancy This Week" color="secondary"/>
      <div class="fs-12 q-ml-sm fw-600 q-mt-xs" style="color: grey">Keep up with your baby's development with personalized weekly newsletters.</div>
      <q-checkbox v-model="pregnancyHighlights" class=" q-mt-sm fs-16 fw-500 font-montserrat text-primary" label="Pregnancy Highlights" color="secondary"/>
      <div class="fs-12 q-ml-sm fw-600 q-mt-xs" style="color: grey">Our best expert insights and freshest parent-to-parent conversations picked just for you.</div>
      <div class="border-bottom q-my-lg"></div>
      <div class="flex flex-center q-mt-md">
        <q-btn
          class="q-mb-lg save-btn font-montserrat"
          label="SAVE"
          color="secondary"
          size="sm"
          @click="onUpdateSubscriptions"
          ></q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'WhatsappSubscription',
  data () {
    return {
      selectAll: false,
      isTryingToConceive: false,
      pregnancyWeek: false,
      pregnancyHighlights: false
    }
  },
  watch: {
    selectAll: {
      handler (newVal) {
        if (newVal) {
          this.isTryingToConceive = true
          this.pregnancyWeek = true
          this.pregnancyHighlights = true
        } else {
          this.isTryingToConceive = false
          this.pregnancyWeek = false
          this.pregnancyHighlights = false
        }
      }
    },
    allValues: {
      immediate: true,
      deep: true,
      handler (newVal) {
        const { isTryingToConceive, pregnancyWeek, pregnancyHighlights } = newVal
        if (isTryingToConceive && pregnancyWeek && pregnancyHighlights) this.selectAll = true
      }
    }
  },
  methods: {
    ...mapActions({
      getSubscriptions: 'nursingHome/getSubscriptions',
      updateSubscriptions: 'nursingHome/updateSubscriptions'
    }),
    async fetchSubscriptions () {
      try {
        this.$q.loading.show()
        const accessToken = JSON.parse(localStorage.getItem('userObj'))?.token
        const { data } = await this.getSubscriptions({
          subscriptionType: 'whatsapp',
          accessToken
        })
        this.isTryingToConceive = data.gettingPregnantHighlights
        this.pregnancyWeek = data.myPregnancyThisWeek
        this.pregnancyHighlights = data.pregnancyHighlights
      } catch (error) {}
      finally {
        this.$q.loading.hide()
      }
    },
    async onUpdateSubscriptions () {
      try {
        this.$q.loading.show()
        const accessToken = JSON.parse(localStorage.getItem('userObj'))?.token
        const { data } = await this.updateSubscriptions({
          subscriptionType: 'whatsapp',
          accessToken,
          payload: {
            isActive: true,
            gettingPregnantHighlights: this.isTryingToConceive,
            myPregnancyThisWeek: this.pregnancyWeek,
            pregnancyHighlights: this.pregnancyHighlights
          }
        })
        this.isTryingToConceive = data.gettingPregnantHighlights
        this.pregnancyWeek = data.myPregnancyThisWeek
        this.pregnancyHighlights = data.pregnancyHighlights
        this.$q.notify({
          message: "Your subscriptions are updated",
          color: "green",
          position: "top"
      });
      } catch (error) {}
      finally {
        this.$q.loading.hide()
      }
    }
  },
  mounted () {
    this.fetchSubscriptions()
  },
  computed: {
    allValues () {
      const { isTryingToConceive, pregnancyWeek, pregnancyHighlights } = this
      return {
        isTryingToConceive,
        pregnancyWeek,
        pregnancyHighlights
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.border-bottom {
  border-bottom: 1px solid grey
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
