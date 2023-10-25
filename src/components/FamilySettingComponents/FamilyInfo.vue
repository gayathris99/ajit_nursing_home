<template>
  <div class="q-mt-lg font-montserrat">
    <div class="font-domine subtitle fw-500 text-primary">My Family</div>
    <q-checkbox v-model="isTryingToConceive" class="fs-16 q-mt-md fw-500 font-montserrat text-primary" label="Trying to conceive" color="secondary" @click="() => tryingToConceivePopup = true"/>
    <div class="q-mt-md fw-700 fs-18 text-primary">My pregnancy</div>
    <div v-for="pregnancy in existingPregnancies" :key="pregnancy.id">
      <div class="border-bottom q-my-lg"></div>
      <div class="row items-center justify-between">
        <div>
          <div class="fw-700 fs-16 text-primary">{{pregnancy.name || 'My pregnancy'}}</div>
          <div class="row items-center justify-between q-gutter-x-sm q-mt-sm">
            <q-icon name="event" size="sm" color="grey"></q-icon>
            <div class="text-grey fw-500 fs-16">{{displayDate(pregnancy.date)}}</div>
          </div>
        </div>
        <div>
          <q-icon name="edit" color="secondary" class="cursor-pointer" size="sm" @click="addFamily('pregnancy', pregnancy)"></q-icon>
        </div>
      </div>
    </div>
    <div class="border-bottom q-my-lg"></div>
    <div class="row items-center q-gutter-x-sm cursor-pointer" @click="addFamily('pregnancy', null)">
      <q-icon name="add" size="sm" color="secondary"></q-icon>
      <div class="fs-16 fw-700 text-secondary">Add Pregnancy</div>
    </div>
    <div class="border-bottom q-my-lg"></div>


    <div class="q-mt-xl fw-700 fs-18 text-primary">My children</div>
    <div v-for="children in exisitingChildren" :key="children.id">
      <div class="border-bottom q-my-lg"></div>
      <div class="row items-center justify-between">
        <div>
          <div style="color:#56584B;" class="row items-center q-gutter-x-sm q-mb-sm memorium" v-if="isMemorium(children)">
            <div>In memorium</div>
            <img src="~assets/memorium.png" alt="">
          </div>
          <div class="fw-700 fs-16 text-primary">{{children.name || 'My child'}}</div>
          <div class="row items-center justify-between q-gutter-x-sm q-mt-sm">
            <q-icon name="cake" size="sm" color="grey"></q-icon>
            <div class="text-grey fw-500 fs-16">{{displayDate(children.date)}}</div>
          </div>
        </div>
        <div>
          <q-icon name="edit" color="secondary" class="cursor-pointer" size="sm" @click="addFamily('child', children)"></q-icon>
        </div>
      </div>
    </div>
    <div class="border-bottom q-my-lg"></div>
    <div class="row items-center q-gutter-x-sm cursor-pointer" @click="addFamily('child', null)">
      <q-icon name="add" size="sm" color="secondary"></q-icon>
      <div class="fs-16 fw-700 text-secondary">Add a child</div>
    </div>
    <div class="border-bottom q-mt-lg q-mb-xl"></div>
  </div>
  <q-dialog persistent v-model="tryingToConceivePopup">
    <trying-to-conceive-popup/>
  </q-dialog>
  <q-dialog  v-model="showAddFamilyPopup">
    <add-family-popup
    :isFamilyTypeChild="isFamilyTypeChild"
    :isEditFamily="isEditFamily"
    :editFamilyValue="editFamilyValue"
    @closeFamilyPopup="closeFamilyPopup"
    @removeChildPopup="removeChildPopup"
    @showBabyBornPopup="showBabyBornPopup"
    @showExperiencePopup="showExperiencePopup"/>
  </q-dialog>
  <q-dialog v-model="isExperiencedLossPopup">
    <experienced-loss
    :editFamilyValue="editFamilyValue"
    @closeFamilyPopup="closeFamilyPopup"/>
  </q-dialog>
  <q-dialog v-model="showMessageAfterKeepLoss">
    <keep-loss-message/>
  </q-dialog>
  <q-dialog v-model="isRemoveChildPopup">
    <remove-child
    :editFamilyValue="editFamilyValue"
    @closeFamilyPopup="closeFamilyPopup"/>
  </q-dialog>
  <q-dialog v-model="isBabyBornPopup">
    <baby-born
    :editFamilyValue="editFamilyValue"
    @closeFamilyPopup="closeFamilyPopup"/>
  </q-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import TryingToConceivePopup from './TryingToConceivePopup.vue'
import AddFamilyPopup from './AddFamilyPopup.vue'
import ExperiencedLoss from './ExperiencedLoss.vue'
import KeepLossMessage from './KeepLossMessage.vue'
import RemoveChild from './RemoveChild.vue'
import BabyBorn from './BabyBorn.vue'
export default {
  name: 'FamilyInfo',
  components: { TryingToConceivePopup, AddFamilyPopup, ExperiencedLoss, KeepLossMessage, RemoveChild, BabyBorn },
  data () {
    return {
      isTryingToConceive: false,
      tryingToConceivePopup: false,
      showAddFamilyPopup: false,
      isFamilyTypeChild: false,
      existingPregnancies: [],
      exisitingChildren: [],
      isEditFamily: false,
      editFamilyValue: null,
      isExperiencedLossPopup: false,
      showMessageAfterKeepLoss: false,
      isRemoveChildPopup: false,
      isBabyBornPopup: false,
      monthList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  },
  mounted () {
    this.fetchFamilyInfo()
  },
  methods: {
    ...mapActions({
      getFamilyInfo: 'nursingHome/getFamilyInfo'
    }),
    closeFamilyPopup (lossType) {
      this.showAddFamilyPopup = false
      if (this.isExperiencedLossPopup) {
        this.isExperiencedLossPopup = false
        if(lossType?.lossType === 'keep') this.showMessageAfterKeepLoss = true
      }
      if (this.isBabyBornPopup) this.isBabyBornPopup = false
      if (this.isRemoveChildPopup) {
        this.isRemoveChildPopup = false
      }
      this.fetchFamilyInfo()
      this.$q.notify({
        message: "Your updates are saved!",
        color: "green",
        position: "top",
        classes: 'font-montserrat fw-700'
      });
    },
    showExperiencePopup (value) {
      this.showAddFamilyPopup = false
      this.isExperiencedLossPopup = true
      this.editFamilyValue = value
    },
    showBabyBornPopup (value) {
      this.showAddFamilyPopup = false
      this.editFamilyValue = value
      this.isBabyBornPopup = true
    },
    removeChildPopup (value) {
      this.showAddFamilyPopup = false
      this.editFamilyValue = value
      this.isRemoveChildPopup = true
    },
    isMemorium (child) {
      return child.status === 'EXPERIENCED_LOSS'
    },
    displayDate (value) {
      const splitDate = value.split('-')
      const month = this.monthList[splitDate[1]-1]
      return `${month} ${splitDate[0]} ${splitDate[2]}`
    },
    addFamily (type, value) {
      if (type === 'child') {
        this.isFamilyTypeChild = true
      } else {
        this.isFamilyTypeChild = false
      }
      if (value) {
        this.isEditFamily = true
        this.editFamilyValue = value
      } else {
        this.isEditFamily = false
        this.editFamilyValue = null
      }
      this.showAddFamilyPopup = true
    },
    async fetchFamilyInfo () {
      try {
        this.$q.loading.show()
        this.existingPregnancies = []
        this.exisitingChildren = []
        const { data } = await this.getFamilyInfo({
          accessToken: JSON.parse(localStorage.getItem('userObj'))?.token
        })
        data?.forEach(value => {
          if (value?.status === 'BORN' || value?.status === 'EXPERIENCED_LOSS') this.exisitingChildren.push(value)
          else if (value?.status === 'DUE_YET') this.existingPregnancies.push(value)
        })
      } catch (error) {}
      finally {
        this.$q.loading.hide()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.border-bottom {
  border-bottom: 1px solid grey
}
.memorium {
  img {
    width: 15px;
  }
}
</style>
