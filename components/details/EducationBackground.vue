<template>
  <div class="education-tab">
    <div v-if="!detail.is_public_learning_history" class="no-data-container">
      <span class="view-after-matching">{{ $t('all.view_after_matching') }}</span>
    </div>
    <div v-else-if="detail.user_learning_histories && detail.user_learning_histories.length" class="education-condition">
      <div class="education-tab__body" v-for="(item, index) in detail.user_learning_histories" :key="index">
        <div class="education-tab__header">
          <h3>{{ dataNumber }}<span class="rounded-index">{{ index + 1 }}</span></h3>
        </div>
        <div class="education-tab__description">
          <div class="education-tab__col">
            <div class="education-tab__left">{{ $t('education.name') }}</div>
            <div class="education-tab__right">{{ item.school_name }}</div>
          </div>
          <div class="education-tab__col">
            <div class="education-tab__left">{{ $t('education.date') }}</div>
            <div class="education-tab__right">{{ item.time_start_end }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-data-container">
      <NoDataElement :text="$t('common.no_education')" />
    </div>
  </div>
</template>
<script>

import NoDataElement from '../element-ui/NoDataElement.vue'

export default {
  name: 'EducationBackground',
  components: { NoDataElement },
  props: ['userId', 'tabIndex', 'detail'],
  data() {
    return {
      dataNumber: '学歴'
    }
  }
}
</script>
