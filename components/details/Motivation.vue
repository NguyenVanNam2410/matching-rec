<template>
  <div class="motivation-tab">
    <div v-if="motivationData.motivation || motivationData.noteworthy" class="motivation-tab__condition">
      <div class="motivation-tab__layout">
        <div class="motivation-tab__left">{{ $t('motivation.title') }}</div>
        <div class="motivation-tab__right">{{ motivationData.motivation }}</div>
      </div>
      <div class="motivation-tab__layout">
        <div class="motivation-tab__left">{{ $t('motivation.other_noteworthy_things') }}</div>
        <div class="motivation-tab__right">{{ motivationData.noteworthy }}</div>
      </div>
    </div>
    <div v-else class="no-data-container">
      <NoDataElement :text="$t('common.no_motivation')" />
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import NoDataElement from '../element-ui/NoDataElement.vue'

export default {
  name: 'MotivationPage',
  components: { NoDataElement },
  props: ['userId', 'tabIndex', 'detail'],
  computed: {
    motivationData() {
      const data = {
        motivation: _.get(this.detail.motivation, 'motivation'),
        noteworthy: _.get(this.detail.motivation, 'noteworthy')
      }
      return data
    }
  }
}
</script>
