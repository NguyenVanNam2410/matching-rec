<template>
  <div class="job-list main-job-container">
    <div class="job-list__pc">
      <div class="breadcrumb-box d-flex">
        <span class="breadcrumb-previous" @click="$router.push('/')">{{ $t('my_page.top_page') }}</span>
        <img class="breadcrumb-arrow" src="../../assets/icons/breadcrumb-arrow.svg" />
        <span class="breadcrumb-previous" @click="$router.push('/list-job')">{{ $t('my_page.job_list') }}</span>
        <img class="breadcrumb-arrow" src="../../assets/icons/breadcrumb-arrow.svg" />
        <span class="breadcrumb-current">{{ $t('my_page.job_details') }}</span>
      </div>
      <div>
        <div class="detail-delete">{{ $t('no_data.job_detail_delete') }}</div>
      </div>
    </div>
    <div class="job-list__sp">
      <div class="d-flex pl-8">
        <img src="../../assets/icons/arrow-prev.svg" />
        <span @click="$router.push('/list-job')" class="job-list__sp-header">{{ $t('my_page.job_details') }}</span>
      </div>
      <div>
        <div class="detail-delete">{{ $t('no_data.job_detail_delete') }}</div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'DetailJobNotFoundPage'
}
</script>
