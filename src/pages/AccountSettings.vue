<template>
  account settings
</template>

<script>
export default {
  name: 'AccountSettings',
  created () {
    const userDetails = JSON.parse(localStorage.getItem('userObj'))
    if (!userDetails?.token) this.$router.push({ name: 'home' })
  }
}
</script>
