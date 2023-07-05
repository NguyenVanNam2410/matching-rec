<template>
  <div class="qualification-tab">
    <div v-if="detail.user_licenses_qualifications && detail.user_licenses_qualifications.length" class="qualification-tab__condition">
      <div class="qualification-tab__pc">
        <div class="qualification-tab__body" v-for="(item, index) in detail.user_licenses_qualifications" :key="index">
          <div class="qualification-tab__header">
            <h3>{{ dataNumber }}<span class="rounded-index">{{ index + 1 }}</span></h3>
          </div>
          <div class="qualification-tab__description">
            <div class="qualification-tab__col">
              <div class="qualification-tab__left">{{ $t('qualification.name') }}</div>
              <div class="qualification-tab__right">{{ item.name }}</div>
            </div>
            <div class="qualification-tab__col">
              <div class="qualification-tab__left">{{ $t('qualification.date') }}</div>
              <div class="qualification-tab__right">{{ item.new_issuance_date }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="qualification-tab__sp">
        <div class="qualification-tab__body" v-for="(item, index) in detail.user_licenses_qualifications" :key="index">
          <div class="qualification-tab__header">
            <h3>{{ dataNumber }}<span class="rounded-index">{{ index + 1 }}</span></h3>
          </div>
          <div class="qualification-tab__description">
            <div class="qualification-tab__col">
              <div class="qualification-tab__left">{{ $t('qualification.name') }}</div>
              <div class="qualification-tab__right">{{ item.name }}</div>
            </div>
            <div class="qualification-tab__col">
              <div class="qualification-tab__left">{{ $t('qualification.date') }}</div>
              <div class="qualification-tab__right">{{ item.new_issuance_date }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-data-container">
      <NoDataElement :text="$t('common.no_qualification')" />
    </div>
  </div>
</template>
<script>

import NoDataElement from '../element-ui/NoDataElement.vue'

export default {
  name: 'QualificationPage',
  components: { NoDataElement },
  props: ['userId', 'tabIndex', 'detail'],
  data() {
    return {
      dataNumber: '資格'
    }
  }
}
</script>
