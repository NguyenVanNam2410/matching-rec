<template>
  <div class="user-content">
    <div class="user-view-name">
      <div class="d-flex">
        <span class="user-name">{{ `${item.first_name || ''} ${item.last_name || ''}` }}</span>
        <span class="user-age">{{ formatAge(item.age) }}</span>
      </div>
      <div class="button-detail" @click="$router.push(`/user-details/${item.id}`)">
        <span>{{ $t('common.detail') }}</span>
        <img src="/assets/icon/icon_arrow_blue.png" alt="">
      </div>
    </div>
    <div class="user-item-detail">
      <img src="/assets/icon/detail001.png" alt="">
      <div class="user-item-detail-content">
        <span class="bold">{{ $t('job.experience') }}：</span>
        <span v-if="!item.is_public_work_history" class="view-after-matching">{{ $t('all.view_after_matching') }}</span>
        <span v-else>{{ showExperience || '' }}</span>
      </div>
    </div>
    <div class="user-item-detail">
      <img src="/assets/icon/detail002.png" alt="">
      <div class="user-item-detail-content">
        <span class="bold">{{ $t('my_page.education_background') }}：</span>
        <span v-if="!item.is_public_learning_history" class="view-after-matching">{{ $t('all.view_after_matching') }}</span>
        <span v-else>{{ showText.learning ? showLearning : showLearnText.text }}</span>
        <span v-if="showLearnText.state && !showText.learning && item.is_public_learning_history" class="show-all" @click="showTextItem('learning')">{{ $t('common.view_all') }}</span>
      </div>
    </div>
    <div class="user-item-detail">
      <img src="/assets/icon/detail003.png" alt="">
      <div class="user-item-detail-content">
        <span class="bold">{{ $t('my_page.qualification') }}：</span>
        <span>{{ showText.qualification ? showQualification : showQualificationText.text }}</span>
        <span v-if="showQualificationText.state && !showText.qualification" class="show-all" @click="showTextItem('qualification')">{{ $t('common.view_all') }}</span>
      </div>
    </div>
    <div class="user-item-detail">
      <img src="/assets/icon/detail004.png" alt="">
      <div v-if="!item.is_public_skill">
        <span class="bold">{{ $t('self_pr.skill_sheet') }}：</span>
        <span class="view-after-matching">{{ $t('all.view_after_matching') }}</span>
      </div>
      <div v-else class="user-item-detail-content list-skills" ref="skill">
        <div v-for="(skill, index) in skills" :key="index" class="skill-item">
          <span class="skill-type">{{ skill.name }}</span>
          <el-slider
            disabled
            v-model="skill.level"
            :step="1"
            :max="5"
            :min="1"
            :marks="marks"
          />
        </div>
      </div>
    </div>
    <div class="user-item-detail">
      <img src="/assets/icon/detail005.png" alt="">
      <div class="user-item-detail-content">
        <span class="bold">{{ $t('my_page.motivation') }}：</span>
        <span>{{ showText.motivation ? (item.motivation || '') : showMotivationText.text }}</span>
        <span v-if="showMotivationText.state && !showText.motivation" class="show-all" @click="showTextItem('motivation')">{{ $t('common.view_all') }}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UserViewElement',
  props: ['item'],
  data() {
    return {
      marks: { 1: '', 2: '', 3: '', 4: '', 5: '' },
      skills: [],
      showLearnText: {
        text: '',
        state: false
      },
      showQualificationText: {
        text: '',
        state: false
      },
      showExperienceText: {
        text: '',
        state: false
      },
      showMotivationText: {
        text: '',
        state: false
      },
      showText: {
        learning: false,
        qualification: false,
        motivation: false,
        experience: false
      },
      maxText: 38,
      checkText: '',
      windowWidth: window.innerWidth
    }
  },
  computed: {
    showQualification() {
      if (Array.isArray(this.item.user_licenses_qualifications)) {
        const data = this.item.user_licenses_qualifications.map(value => {
          return value.name
        })
        return data.join('、')
      }
      return ''
    },
    showLearning() {
      if (this.item.user_learning_histories) {
        const data = this.item.user_learning_histories.map(value => {
          return value.name
        })
        return data.join('、')
      }
      return ''
    },
    showExperience() {
      if (this.item.job_experiences) {
        const data = this.item.job_experiences.map(value => {
          return value.name
        })
        return data.join('、')
      }
      return ''
    }
  },
  watch: {
    item: {
      handler() {
        this.checkSkills()
        this.showText = {
          learning: false,
          qualification: false,
          motivation: false,
          experience: false
        }
      },
      deep: true
    }
  },
  created() {
    this.checkSkills()
    const data = this.item.user_learning_histories ? this.item.user_learning_histories.map(value => {
      return value.name
    }) : []
    this.showLearnText = this.checkLengthText(data.join('、'))
    const data1 = Array.isArray(this.item.user_licenses_qualifications) ? this.item.user_licenses_qualifications.map(value => {
      return value.name
    }) : []
    this.showQualificationText = this.checkLengthText(data1.join('、'))
    if (this.item.job_experiences) {
      const data2 = this.item.job_experiences.map(value => {
        return value.name
      })
      this.showExperienceText = this.checkLengthText(data2.join('、'))
    }
    this.showMotivationText = this.checkLengthText(this.item.motivation || '')
  },
  methods: {
    formatAge(age) {
      return age ? (`(${age}` + this.$t('common.age') + `)`) : ''
    },
    formatLastLogin(time) {
      return `${this.$t('login.last_login')}: ${time || ''}`
    },
    checkSkills() {
      const data = []
      if (this.item.skills) {
        this.item.skills.forEach(skill => {
          data.push({
            level: Number(skill.level),
            type: skill.type,
            name: skill.name
          })
        })
      }
      this.skills = data
    },
    showTextItem(key) {
      this.showText[key] = true
      this.checkSkills()
    },
    checkLengthText(value) {
      let state = false
      let text = ''
      let length = 0
      const stringData = value.split('')
      for (const index in stringData) {
        const data = /^[一-龥]+$/.test(stringData[index])
        if (data) {
          length += 18
        } else if (stringData[index] === '、') {
          length += 18
        } else {
          length += 10
        }
        text += stringData[index]
        if (length >= (this.windowWidth * 2 - 84)) {
          state = true
          return { state, text: text + '...' }
        }
      }
      return { state, text }
    }
  }
}
</script>
