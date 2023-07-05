<template>
  <footer v-if="!showMessageSP" class="footer">
    <div class="footer-container footer-pc">
      <div class="footer-left">
        Copyright©2022 VAMPS Hair Design. All Rights Reserved
      </div>
      <div class="footer-right">
        <div class="footer-content">
          <span @click="$router.push('/other/company-profile')">{{ $t('footer.company') }}</span>
        </div>
        <div class="footer-content">
          <span @click="$router.push('/other/faq')">{{ $t('footer.faq') }}</span>
        </div>
        <div class="footer-content">
          <span @click="$router.push('/other/terms-of-service')">{{ $t('footer.terms') }}</span>
        </div>
        <div class="footer-content">
          <span @click="$router.push('/other/privacy-policy')">{{ $t('footer.privacy') }}</span>
        </div>
        <div class="footer-content">
          <span @click="$router.push('/other/inquiry')">{{ $t('footer.inquiry') }}</span>
        </div>
      </div>
    </div>
    <div v-show="!checkShowViewSp" class="footer-container footer-sp">
      <div class="footer-left">
        Copyright©2022 VAMPS Hair Design. All Rights Reserved
      </div>
      <div class="footer-right">
        <div class="footer-content">
          <span @click="$router.push('/other/company-profile')">{{ $t('footer.company') }}</span>
        </div>
        <div class="footer-content length-text">
          <span @click="$router.push('/other/privacy-policy')">{{ $t('footer.privacy') }}</span>
        </div>
        <div class="footer-content">
          <span @click="$router.push('/other/inquiry')">{{ $t('footer.inquiry') }}</span>
        </div>
        <div class="footer-content">
          <span @click="$router.push('/other/faq')">{{ $t('footer.faq') }}</span>
        </div>
        <div class="footer-content">
          <span @click="$router.push('/other/terms-of-service')">{{ $t('footer.terms') }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FooterCommon',
  computed: {
    ...mapState({
      showViewSp: state => state.showViewSp,
      showMessageSP: state => state.showMessageSP
    }),
    checkShowViewSp() {
      return !!(this.$route.name === 'index' && this.showViewSp)
    }
  }
}
</script>
