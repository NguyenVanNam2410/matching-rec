<template>
  <div>
  </div>
</template>

<script>
import {
  INDEX_SET_LOADING,
  INDEX_SET_SIDEBAR_IS_COLLAPSE
} from '../store/store.const'
import { SIDE_BAR_INDEX } from '../constants/store'
export default {
  name: 'LogoutPage',
  async created() {
    await this.logout()
  },
  methods: {
    async logout() {
      this.$store.commit(INDEX_SET_LOADING, true)
      this.$store.commit(INDEX_SET_SIDEBAR_IS_COLLAPSE, false)
      this.$cookies.remove(SIDE_BAR_INDEX)
      await this.$auth.logout()
      await this.$router.push('/login')
      this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
