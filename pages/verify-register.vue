<template>
  <div>
  </div>
</template>

<script>
import { AUTH_CHECK_REGISTER } from '@/store/store.const'

export default {
  name: 'VerifyRegister',
  layout: 'none',
  middleware: 'guest',
  auth: false,
  async created() {
    this.token = this.$route.query.token
    if (this.token == null || this.token === '') {
      await this.$router.push('/')
    } else {
      const data = await this.$store.dispatch(AUTH_CHECK_REGISTER, {
        token: this.token
      })
      let token = ''
      switch (data.status_code) {
        case 200:
          token = data.data.type_token + ' ' + data.data.access_token
          this.$cookies.set('auth._token.local', encodeURIComponent(token))
          await this.$auth.fetchUser()
          this.$router.go('/')
          break
        case 500:
          this.$router.push('/')
          break
        default:
          this.$router.push('/')
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
