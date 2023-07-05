<template>
  <div class="pr-tab">
    <div v-if="!checkNoData" class="pr-tab__condition">
      <div class="pr-card-title"> {{ $t('self_pr.skill_sheet') }}</div>
      <div v-if="!detail.is_public_skill" class="view-all-content">
        <span class="view-after-matching">{{ $t('all.view_after_matching') }}</span>
      </div>
      <div v-else>
        <div class="edit-cv-content edit-form-content" id="skill-sheet">
          <div v-for="(skill, key) in prData.skills" :key="key">
            <div class="pr-tab__layout">
              <div class="pr-tab__left">
                <div class="label"><span>{{ skill.name }}</span></div>
              </div>
              <div class="pr-tab__right bd-top slider-card">
                <div class="content-input pr-slider">
                  <div class="skill-slider">
                    <el-row class="d-flex">
                      <el-col>
                        <div class="skill-slider">
                          <el-slider
                              disabled
                              v-model="skill.level"
                              :step="1"
                              :max="5"
                              :min="1"
                              :marks="marks"
                          >
                          </el-slider>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pr-card-title"> {{ $t('self_pr.pr') }}</div>
      <div>
        <div class="pr-tab__layout-info">
          <div class="pr-tab__left mb-3">{{ $t('career.hobby_and_skills') }}</div>
          <div class="pr-tab__right">{{ prData.favorite_skill }}</div>
        </div>
        <div class="pr-tab__layout-info">
          <div class="pr-tab__left mb-3">{{ $t('career.utilizable_skills') }}</div>
          <div class="pr-tab__right">{{ prData.experience_knowledge }}</div>
        </div>
        <div class="pr-tab__layout-info">
          <div class="pr-tab__left mb-3">{{ $t('self_pr.title') }}</div>
          <div class="pr-tab__right">{{ prData.self_pr }}</div>
        </div>
      </div>
    </div>
    <div v-else class="no-data-container">
      <NoDataElement :text="$t('common.no_self_pr')" />
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import NoDataElement from '../element-ui/NoDataElement.vue'

export default {
  name: 'SelfPr',
  components: { NoDataElement },
  props: ['userId', 'tabIndex', 'detail'],
  data() {
    return {
      marks: {
        1: this.$t('self_pr.weak'),
        2: '',
        3: this.$t('self_pr.normal'),
        4: '',
        5: this.$t('self_pr.good')
      }
    }
  },
  computed: {
    prData() {
      const dataSkills = []
      if (this.detail.pr) {
        if (this.detail.pr.skills) {
          this.detail.pr.skills.forEach(skill => {
            skill.level = Number(skill.level)
            dataSkills.push(skill)
          })
        }
      }
      return {
        skills: dataSkills,
        experience_knowledge: _.get(this.detail.pr, 'experience_knowledge'),
        favorite_skill: _.get(this.detail.pr, 'favorite_skill'),
        self_pr: _.get(this.detail.pr, 'self_pr')
      }
    },
    checkNoData() {
      let check = false
      if (this.detail.pr) {
        if (this.detail.pr.skills) {
          this.detail.pr.skills.forEach((element) => {
            if (Number(element.level) !== 1) {
              check = true
            }
          })
        }
        if (this.detail.pr.favorite_skill || this.detail.pr.experience_knowledge || this.detail.pr.self_pr || check) {
          return false
        }
      }
      return true
    }
  }
}
</script>
