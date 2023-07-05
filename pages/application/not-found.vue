<template>
  <div class="application-detail main-job-container">
    <div class="application-detail__pc">
      <div class="breadcrumb-box item-pc">
        <span class="breadcrumb-previous" @click="$router.push('/')">{{ $t('my_page.top_page') }}</span>
        <img class="breadcrumb-arrow" src="../../assets/icons/breadcrumb-arrow.svg" />
        <span class="breadcrumb-previous" @click="$router.push('/application-list')">{{ $t('application.application_list') }}</span>
        <img class="breadcrumb-arrow" src="../../assets/icons/breadcrumb-arrow.svg" />
        <span class="breadcrumb-current">{{ $t('application.application_details') }}</span>
      </div>
      <div class="application-detail__body">
        <div class="item-sp">
          <div class="back d-flex cursor-pointer" @click="handleRouter('/application-list')">
            <img src="../../assets/icons/back.svg" alt="">
            <div class="text-bold">{{  $t('application.application_details')}}</div>
          </div>
        </div>
        <div>
          <div class="detail-delete">{{ $t('no_data.user_detail_delete') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ApplicationDetailNotFoundPage',
  methods: {
    handleRouter(route) {
      this.$router.push(route)
    }
  }
}
</script>
