<template>
  <div class="career-tab">
    <div v-if="!detail.is_public_work_history" class="no-data-container">
      <span class="view-after-matching">{{ $t('all.view_after_matching') }}</span>
    </div>
    <div v-else-if="detail.user_work_histories && detail.user_work_histories.length" class="career-tab__condition">
      <div class="career-tab__body" v-for="(item, index) in detail.user_work_histories" :key="index">
        <div class="career-tab__header">
          <h3>{{ dataNumber }}<span class="rounded-index">{{ index + 1 }}</span></h3>
        </div>
        <div class="career-tab__description">
          <div class="career-tab__col">
            <div class="career-tab__left">{{ $t('career.store_name') }}</div>
            <div class="career-tab__right">{{ item.store_name }}</div>
          </div>
          <div class="career-tab__col">
            <div class="career-tab__left">{{ $t('career.company_name1') }}</div>
            <div class="career-tab__right">{{ item.company_name }}</div>
          </div>
          <div class="career-tab__col">
            <div class="career-tab__left">{{ $t('career.period_start') }}</div>
            <div class="career-tab__right">{{ item.work_time }}</div>
          </div>
          <div class="career-tab__col">
            <div class="career-tab__left">{{ $t('career.occupation') }}</div>
            <div class="career-tab__right">{{ item.work_type }}</div>
          </div>
          <div class="career-tab__col">
            <div class="career-tab__left">{{ $t('career.position_offices') }}</div>
            <div class="career-tab__right"> {{ detailPosition }}</div>
          </div>
          <div class="career-tab__col">
            <div class="career-tab__left">{{ $t('career.status') }}</div>
            <div class="career-tab__right">{{ item.job_type }}</div>
          </div>
          <div class="career-tab__col">
            <div class="career-tab__left">{{ $t('career.business_content') }}</div>
            <div class="career-tab__right">{{ item.business_content }}</div>
          </div>
          <div class="career-tab__col">
            <div class="career-tab__left">{{ $t('career.experience') }}</div>
            <div class="career-tab__right">{{ item.experience_accumulation }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-data-container">
      <NoDataElement :text="$t('common.no_job_career')" />
    </div>
  </div>
</template>
<script>

import NoDataElement from '../element-ui/NoDataElement.vue'

export default {
  name: 'JobCareer',
  props: ['userId', 'tabIndex', 'detail'],
  components: { NoDataElement },
  computed: {
    detailPosition() {
      const workHistories = this.detail.user_work_histories
      const positions = workHistories.map(item => item.positionOffices)
      const postionName = positions[0].map(item => item.name).join(', ')
      return postionName
    }
  },
  data() {
    return {
      dataNumber: '職務経歴'
    }
  }
}
</script>
