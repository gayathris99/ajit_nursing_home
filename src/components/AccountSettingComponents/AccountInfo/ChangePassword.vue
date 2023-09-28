<template>
    <q-card class="popup no-padding">
      <q-card-section class="no-padding">
        <div class="row items-center justify-end cursor-pointer q-pt-sm q-pr-sm" v-close-popup>
          <img src="~assets/closeIconSecondary.svg" width="24" alt="">
        </div>
        <div class="q-px-md q-py-md">
          <div class="font-domine fw-500 text-primary fs-20">Change Password</div>
          <div class="font-montserrat q-mt-md">
            <q-form @submit.prevent.stop="onSave">
              <q-input
              label="Old Password"
              v-model="oldPassword"
              outlined
              color="secondary"
              class="q-mb-sm"
              :type="isOldPwd ? 'password' : 'text'"
              :rules="[val => !!val || 'Password is required',
                  val => val.length >= 8 || 'Password Length must be atleast 8 characters']">
                <template v-slot:append>
                  <q-icon
                    :name="isOldPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    color="secondary"
                    @click="isOldPwd = !isOldPwd"
                  />
                </template>
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
                  val => val.length >= 8 || 'Password Length must be atleast 8 characters']">
                <template v-slot:append>
                  <q-icon
                    :name="isNewPwd2 ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    color="secondary"
                    @click="isNewPwd2 = !isNewPwd2"
                  />
                </template>
              </q-input>
              <div class="row items-center justify-end fw-700 q-gutter-md">
                <q-btn flat dense label="cancel" color="secondary" class="fw-700" v-close-popup></q-btn>
                <q-btn flat dense label="save" color="secondary" class="fw-700" type="submit"></q-btn>
              </div>
            </q-form>
          </div>
        </div>
      </q-card-section>
    </q-card>
</template>

<script>
export default {
  name: 'ChangePassword',
  data () {
    return {
      oldPassword: '',
      isOldPwd: 'password',
      isNewPwd: 'password',
      isNewPwd2: 'password',
      newPassword2: '',
      newPassword: ''
    }
  },
  methods: {
    onSave (e) {
      e.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
.q-input {
  width: 380px;
  @media only screen and (max-width: $breakpoint-xs-max) {
   width: 280px;
  }
}
</style>
