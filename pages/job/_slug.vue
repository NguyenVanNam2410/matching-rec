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
        <div class="job-list__text">
          <span class="job-list__banner">{{ job.name }}</span>
          <span class="job-list__name">
            {{ job.store_name }}
            <span v-if="job.company_name">({{ job.company_name }})</span>
          </span>
        </div>
        <div v-if="job.pick_up_point" class="job-list__pickup">
          <div class="pickup-div">PICK UP POINT</div>
          <div class="pickup-event">{{ job.pick_up_point || '' }}</div>
        </div>
        <div class="job-list__body">
          <div v-if="job.banner_image" class="job-list__image">
            <el-image
              class="job-1"
              :src="job.banner_image"
              :preview-src-list="[job.banner_image]">
            </el-image>
            <div class="list-right">
              <div v-for="(image, index) in job.detail_images" :key="index">
                <el-image
                  class="job-2"
                  :src="image.url"
                  :preview-src-list="[image.url]">
                </el-image>
              </div>
            </div>
          </div>
          <div class="job-list__header">{{ $t('job.application_requirement') }}</div>
          <div class="job-list__table">
            <div v-if="showDataArray(job.job_types, 'name')" class="job-list__col">
              <div class="job-list__left d-flex">{{ $t('favorite_job.recruitment_type') }}</div>
              <div class="job-list__right">{{ showDataArray(job.job_types, 'name') }}</div>
            </div>
            <div v-if="job.description" class="job-list__col">
              <div class="job-list__left d-flex">{{ $t('favorite_job.description') }}</div>
              <div class="job-list__right show-textarea">{{ job.description }}</div>
            </div>
            <div v-if="showDataArray(job.work_types, 'name')" class="job-list__col">
              <div class="job-list__left d-flex">{{ $t('favorite_job.status') }}</div>
              <div class="job-list__right">
                <div class="d-flex g-10">
                  <div v-for="(item, index) in job.work_types" :key="index" class="job-status">{{ item.name }}</div>
                </div>
              </div>
            </div>
            <div v-if="showSalary" class="job-list__col">
              <div class="job-list__left d-flex">{{ $t('job.salary') }}</div>
              <div class="job-list__right">{{ showSalary }}
                <div class="show-textarea">{{ job.salary ? job.salary.description : '' }}</div>
              </div>
            </div>
            <div v-if="showDataArray(job.working_days, 'name')" class="job-list__col">
              <div class="job-list__left d-flex">{{ $t('job.work_day') }}</div>
              <div class="job-list__right">{{ showDataArray(job.working_days, 'name') }}</div>
            </div>
            <div v-if="showDate" class="job-list__col">
              <div class="job-list__left d-flex">{{ $t('favorite_job.working_hours') }}</div>
              <div class="job-list__right">
                {{ showDate }}
                <div class="show-textarea">{{ job.shifts || '' }}</div>
              </div>
            </div>
            <div v-if="showAge" class="job-list__col">
              <div class="job-list__left d-flex">{{ $t('job.age') }}</div>
              <div class="job-list__right">{{ showAge }}</div>
            </div>
            <div v-if="showDataArray(job.genders, 'name')" class="job-list__col">
              <div class="job-list__left d-flex">{{ $t('job.gender') }}</div>
              <div class="job-list__right">{{ showDataArray(job.genders, 'name') }}</div>
            </div>
            <div v-if="showDataArray(job.experience_types, 'name')" class="job-list__col">
              <div class="job-list__left d-flex">{{ $t('job.experience') }}</div>
              <div class="job-list__right">{{ showDataArray(job.experience_types, 'name') }}</div>
            </div>
            <div v-if="showAddress" class="job-list__col">
              <div class="job-list__left d-flex">{{ $t('job.work_type') }}</div>
              <div class="job-list__right d-flex flex-col">
                <span>{{ showAddress }}</span>
                <a v-if="job.address" :href="'http://maps.google.com/?q=' + showAddress" class="show-button-google-map link-text" target="_blank">
                  <img class="hide-hover" src="../../assets/icons/destination.svg" />
                  <img class="show-hover" src="../../assets/icons/destination-hover.svg" />
                  <img class="show-focus" src="../../assets/icons/destination-focus.svg" />
                  <span class="open-map">{{ $t('schedule.open_google_map') }}</span>
                </a>
              </div>
            </div>
            <div v-if="job.stations">
              <div v-if="job.stations.length" class="job-list__col">
                <div class="job-list__left d-flex">{{ $t('job.station') }}</div>
                <div class="job-list__right">
                  <div v-for="(station, index) in job.stations" :key="index">
                    {{ station.province_name + station.railway_name + station.station_name }}
                  </div>
                </div>
              </div>
            </div>
            <div v-if="job.welfare_treatment_description" class="job-list__col">
              <div class="job-list__left d-flex">{{ $t('job.welfare_treatment') }}</div>
              <div class="job-list__right show-textarea">{{ job.welfare_treatment_description || '' }}</div>
            </div>
            <div v-if="job.feature_types">
              <div v-if="job.feature_types.length" class="job-list__col">
                <div class="job-list__left">{{ $t('condition.feature') }}</div>
                <div class="job-list__right">
                  <div v-for="feature in job.feature_types" :key="feature.category_id" class="d-flex flex-col pb-16">
                    <span class="condition-title">{{ feature.category_name }}</span>
                    <span class="condition-content">{{ feature.features }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="job-list__button">
              <el-button type="danger" @click="$router.push('/job/edit/' + job.id)">{{ $t('my_page.edit') }}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="job-list__sp">
      <div class="d-flex">
        <img src="../../assets/icons/prev_mobile.svg" />
        <span @click="$router.push('/list-job')" class="job-list__sp-header">{{ $t('my_page.job_details') }}</span>
      </div>
      <div>
        <div class="job-list__text">
          <span class="job-list__banner">{{ job.name }}</span>
          <span class="job-list__name">{{ job.store_name }}
        <span v-if="job.company_name">({{ job.company_name }})</span>
      </span>
        </div>
        <div v-if="job.pick_up_point" class="job-list__pickup">
          <div class="pickup-div">PICK UP POINT</div>
          <div class="pickup-event">{{ job.pick_up_point || '' }}</div>
        </div>
        <div v-if="job.banner_image" class="job-list__image">
          <el-image
            class="job-1"
            :src="job.banner_image"
            :preview-src-list="[job.banner_image]">
          </el-image>
          <div class="list-right">
            <div v-for="(image, index) in job.detail_images" :key="index">
              <el-image
                class="job-2"
                :src="image.url"
                :preview-src-list="[image.url]">
              </el-image>
            </div>
          </div>
        </div>
        <div class="job-list__header">{{ $t('job.application_requirement') }}</div>
        <div class="job-list__table">
          <div v-if="showDataArray(job.job_types, 'name')" class="job-list__col">
            <div class="job-list__left d-flex">{{ $t('favorite_job.recruitment_type') }}</div>
            <div class="job-list__right">{{ showDataArray(job.job_types, 'name') }}</div>
          </div>
          <div v-if="job.description" class="job-list__col">
            <div class="job-list__left d-flex">{{ $t('favorite_job.description') }}</div>
            <div class="job-list__right show-textarea">{{ job.description }}</div>
          </div>
          <div v-if="showDataArray(job.work_types, 'name')" class="job-list__col">
            <div class="job-list__left d-flex">{{ $t('favorite_job.status') }}</div>
            <div class="job-list__right">
              <div v-if="job.work_types" class="d-flex g-10 job-list__table_work_type">
                <div v-for="(work_type, key_work) in job.work_types" :key="key_work" class="job-status">{{ work_type.name }}</div>
              </div>
            </div>
          </div>
          <div v-if="showSalary" class="job-list__col">
            <div class="job-list__left d-flex">{{ $t('job.salary') }}</div>
            <div class="job-list__right">{{ showSalary }}
              <div class="show-textarea">{{ job.salary ? job.salary.description : '' }}</div>
            </div>
          </div>
          <div v-if="showDate" class="job-list__col">
            <div class="job-list__left d-flex">{{ $t('favorite_job.working_hours') }}</div>
            <div class="job-list__right">{{ showDate }}
              <div class="show-textarea">{{ job.shifts || '' }}</div>
            </div>
          </div>
          <div v-if="showAge" class="job-list__col">
            <div class="job-list__left d-flex">{{ $t('job.age') }}</div>
            <div class="job-list__right">{{ showAge }}</div>
          </div>
          <div v-if="showDataArray(job.genders, 'name')" class="job-list__col">
            <div class="job-list__left d-flex">{{ $t('job.gender') }}</div>
            <div class="job-list__right">{{ showDataArray(job.genders, 'name') }}</div>
          </div>
          <div v-if="showDataArray(job.experience_types, 'name')" class="job-list__col">
            <div class="job-list__left d-flex">{{ $t('job.experience') }}</div>
            <div class="job-list__right">{{ showDataArray(job.experience_types, 'name') }}</div>
          </div>
          <div v-if="showAddress" class="job-list__col">
            <div class="job-list__left d-flex">{{ $t('job.work_type') }}</div>
            <div class="job-list__right d-flex flex-col">
              <span>{{ showAddress }}</span>
              <a v-if="job.address" :href="'https://www.google.com/maps/place/' + showAddress" class="text-blue-hover show-button-google-map d-flex" target="_blank">
                <img class="hide-hover" src="../../assets/icons/destination.svg" />
                <img class="show-hover" src="../../assets/icons/destination-hover.svg" />
                <img class="show-focus" src="../../assets/icons/destination-focus.svg" />
                <span class="open-map">{{ $t('schedule.open_google_map') }}</span>
              </a>
            </div>
          </div>
          <div v-if="job.stations">
            <div v-if="job.stations.length" class="job-list__col">
              <div class="job-list__left d-flex">{{ $t('job.station') }}</div>
              <div class="job-list__right">
                <div v-for="(station, index) in job.stations" :key="index">
                  {{ station.province_name + station.railway_name + station.station_name }}
                </div>
              </div>
            </div>
          </div>
          <div v-if="job.welfare_treatment_description" class="job-list__col">
            <div class="job-list__left d-flex">{{ $t('job.welfare_treatment') }}</div>
            <div class="job-list__right show-textarea">{{ job.welfare_treatment_description || '' }}</div>
          </div>
          <div v-if="job.feature_types">
            <div v-if="job.feature_types.length" class="job-list__col">
              <div class="job-list__left">{{ $t('condition.feature') }}</div>
              <div class="job-list__right">
                <div v-for="feature in job.feature_types" :key="feature.category_id" class="d-flex flex-col pb-16">
                  <span class="condition-title">{{ feature.category_name }}</span>
                  <span class="condition-content">{{ feature.features }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="job-list__button">
            <el-button type="danger" @click="$router.push('/job/edit/' + job.id)">{{ $t('my_page.edit') }}</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  JOB_DETAIL_JOB
} from '@/store/store.const'

export default {
  name: 'DetailJobPage',
  data() {
    return {
      job: {},
      jobDelete: false
    }
  },
  computed: {
    showDate() {
      if (this.job.work_time === undefined) {
        return ''
      }
      if (this.job.work_time.start && this.job.work_time.end) {
        return this.job.work_time.start + '〜' + this.job.work_time.end
      }
      return ''
    },
    showSalary() {
      if (this.job.salary === undefined) {
        return ''
      }
      if (this.job.salary.min && this.job.salary.max) {
        return this.job.salary.min + '〜' + this.job.salary.max + this.job.salary.type_name
      }
      return ''
    },
    showAge() {
      if (this.job.age === undefined || (this.job.age.min == null && this.job.age.max == null)) {
        return ''
      }
      if (this.job.age.min && this.job.age.max) {
        return (this.job.age.min ?? '') + '〜' + (this.job.age.max ?? '') + this.$t('common.age')
      }
      return ''
    },
    showAddress() {
      if (this.job.address === undefined) {
        return ''
      }
      return (this.job.address.postal_code ? ('〒' + this.job.address.postal_code) : '') + (this.job.address.province_name || '') + (this.job.address.province_city_name || '') + (this.job.address.address || '') + (this.job.address.building || '')
    }
  },
  async created() {
    await this.getDetailJob()
  },
  methods: {
    async getDetailJob() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const id = this.$route.params.slug
      const response = await this.$store.dispatch(JOB_DETAIL_JOB, id)
      switch (response.status_code) {
        case 200:
          this.job = response.data
          break
        case 400:
          await this.$router.push('/job/not-found')
          break
        case 404:
          await this.$router.push('/404-not-found')
          break
        case 401:
          await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.token_expired') })
          this.$auth.logout()
          break
        case 500:
          await this.$store.commit(INDEX_SET_ERROR, {
            show: true,
            text: this.$t('content.EXC_001')
          })
          break
        default:
          await this.$store.commit(INDEX_SET_ERROR, {
            show: true,
            text: response.messages
          })
          break
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    showDataArray(value, key) {
      if (value) {
        const resultValue = []
        value.forEach(item => {
          if (key && item) {
            resultValue.push(item[key])
          } else {
            resultValue.push(item)
          }
        })
        return resultValue.join('、')
      }
      return ''
    }
  }
}
</script>
