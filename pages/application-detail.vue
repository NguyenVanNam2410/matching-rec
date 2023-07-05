<template>
  <div class="application-detail">
    <div class="application-detail__pc">
      <div class="application-detail__breadcrumb item-pc">
        <span @click="$router.push('/')" class="breadcrumb-previous">{{ $t('my_page.top_page') }}</span>
        <img class="breadcrumb-arrow" src="../assets/icons/breadcrumb-arrow.svg" />
        <span class="breadcrumb-previous">{{ $t('application.application_list') }}</span>
        <img class="breadcrumb-arrow" src="../assets/icons/breadcrumb-arrow.svg" />
        <span class="breadcrumb-current">{{ $t('application.application_details') }}</span>
      </div>
      <div class="application-detail__body">
        <div class="item-sp">
          <div class="back d-flex cursor-pointer" @click="handleRouter('/application-list')">
            <img src="../assets/icons/back.svg" alt="">
            <div class="text-bold">{{  $t('job_list.create')}}</div>
          </div>
        </div>
        <div class="application-detail__header">{{ $t('application.application_title') }}</div>
        <div class="application-detail__table">
          <div class="application-detail__col">
            <div class="application-detail__left d-flex items-center">{{ $t('application.image') }}</div>
            <div class="application-detail__right bd-top d-flex">
              <img src="../assets/images/app-avatar.png" />

            </div>
          </div>
          <div class="application-detail__col">
            <div class="application-detail__left d-flex items-center">{{ $t('application.name') }}</div>
            <div class="application-detail__right name">{{ recruitmentType }}</div>
          </div>
          <div class="application-detail__col">
            <div class="application-detail__left d-flex items-center">{{ $t('application.birth') }}</div>
            <div class="application-detail__right">
              <div class="d-flex g-10">
                <div class="application-detail__right">{{ recruitmentType }}</div>
              </div>
            </div>
          </div>
          <div class="application-detail__col">
            <div class="application-detail__left d-flex items-center">{{ $t('application.age') }}</div>
            <div class="application-detail__right">{{ recruitmentType }}</div>
          </div>
          <div class="application-detail__col">
            <div class="application-detail__left d-flex items-center">{{ $t('application.sex') }}</div>
            <div class="application-detail__right">{{ recruitmentType }}</div>
          </div>
          <div class="application-detail__col">
            <div class="application-detail__left d-flex items-center">{{ $t('application.phone') }}</div>
            <div class="application-detail__right">{{ recruitmentType }}</div>
          </div>
          <div class="application-detail__col">
            <div class="application-detail__left d-flex items-center">{{ $t('application.email') }}</div>
            <div class="application-detail__right">{{ recruitmentType }}</div>
          </div>
          <div class="application-detail__col">
            <div class="application-detail__left d-flex items-center">{{ $t('application.address') }}</div>
            <div class="application-detail__right">{{ recruitmentType }}</div>
          </div>
          <div class="application-detail__header second">{{ $t('application.application_details') }}</div>
          <el-form
            ref="accountForm"
            :model="accountForm"
            :rules="accountRules"
            autocomplete="off"
            label-position="left"
          >
            <div class="application-detail__col">
              <div class="application-detail__left d-flex items-center">{{ $t('application.job_title') }}</div>
              <div class="application-detail__right">{{ recruitmentType }}</div>

            </div>
            <div class="application-detail__col">
              <div class="application-detail__left d-flex items-center">{{ $t('application.date') }}</div>
              <div class="application-detail__right">{{ recruitmentType }}</div>
            </div>
            <div class="application-detail__col">
              <div class="application-detail__left d-flex items-center">{{ $t('application.status') }}</div>
              <div class="application-detail__right">
                <el-select v-model="value" class="w-150" placeholder="Select">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="application-detail__col">
              <div class="application-detail__left d-flex items-center">{{ $t('application.interview_time') }}</div>
              <div class="application-detail__right">{{ recruitmentType }}</div>
            </div>
            <div class="application-detail__col">
              <div class="application-detail__left pt-24">{{ $t('application.memo') }}</div>
              <div class="application-detail__right">
                <el-input
                  type="textarea"
                  :rows="6"
                  v-model="businessContent"
                  :placeholder="$t('application.enter_memo')">
                </el-input>
                <div class="register-job__description">{{ $t('my_page.limit_characters') }}</div>
              </div>
            </div>
          </el-form>
          <div class="application-detail__button">
            <el-button>{{ $t('application.update') }}</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="application-detail__sp">
      <div class="d-flex items-center pl-8">
        <img src="../assets/icons/arrow-prev.svg" />
        <span class="application-detail__sp-header">{{ $t('my_page.job_details') }}</span>
      </div>
      <div class="application-detail__text">
        <span class="application-detail__banner">{{ $t('my_page.job_details_banner') }}</span>
        <span class="application-detail__name">{{ storeName }}</span>
      </div>
      <div class="application-detail__pickup">
        <div class="pickup-div">PICK UP POINT</div>
        <div class="pickup-event">{{ event }}</div>
      </div>
      <div class="application-detail__image">
        <img class="job-1" src="../assets/icons/job-list-1.svg" />
        <div class="list-right">
          <img class="job-2" src="../assets/icons/job-list-2.svg" />
          <img class="job-2" src="../assets/icons/job-list-2.svg" />
          <img class="job-2" src="../assets/icons/job-list-2.svg" />
        </div>
      </div>
      <div class="application-detail__header">{{ $t('job.application_requirement') }}</div>
      <div class="application-detail__table">
        <div class="application-detail__col">
          <div class="application-detail__left d-flex items-center">{{ $t('application.recruitment_type') }}</div>
          <div class="application-detail__right bd-top">{{ recruitmentType }}</div>
        </div>
        <div class="application-detail__col">
          <div class="application-detail__left d-flex items-center">{{ $t('application.description') }}</div>
          <div class="application-detail__right">{{ recruitmentType }}</div>
        </div>
        <div class="application-detail__col">
          <div class="application-detail__left d-flex items-center">{{ $t('application.status') }}</div>
          <div class="application-detail__right">
            <div class="d-flex g-10">
              <el-select v-model="value" class="w-150" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="application-detail__col">
          <div class="application-detail__left d-flex items-center">{{ $t('job.salary') }}</div>
          <div class="application-detail__right">{{ recruitmentType }}</div>
        </div>
        <div class="application-detail__col">
          <div class="application-detail__left d-flex items-center">{{ $t('application.working_hours') }}</div>
          <div class="application-detail__right">{{ recruitmentType }}</div>
        </div>
        <div class="application-detail__col">
          <div class="application-detail__left d-flex items-center">{{ $t('job.age') }}</div>
          <div class="application-detail__right">{{ recruitmentType }}</div>
        </div>
        <div class="application-detail__col">
          <div class="application-detail__left d-flex items-center">{{ $t('job.gender') }}</div>
          <div class="application-detail__right">{{ recruitmentType }}</div>
        </div>
        <div class="application-detail__col">
          <div class="application-detail__left d-flex items-center">{{ $t('job.experience') }}</div>
          <div class="application-detail__right">{{ recruitmentType }}</div>
        </div>
        <div class="application-detail__col">
          <div class="application-detail__left d-flex items-center">{{ $t('job.work_type') }}</div>
          <div class="application-detail__right">{{ recruitmentType }}</div>
        </div>
        </div>
        <div class="application-detail__col">
          <div class="application-detail__left d-flex items-center">{{ $t('job.station') }}</div>
          <div class="application-detail__right">{{ recruitmentType }}</div>
        </div>
        <div class="application-detail__col">
          <div class="application-detail__left d-flex items-center">{{ $t('job.welfare_treatment') }}</div>
          <div class="application-detail__right">{{ recruitmentType }}</div>
        </div>
        <div class="application-detail__col">
          <div class="application-detail__left pt-24">{{ $t('condition.feature') }}</div>
          <div class="application-detail__right">
            <div class="d-flex flex-col pb-16">
              <span class="condition-title">{{ $t('condition.recruitment_feature') }}</span>
              <span class="condition-content">{{ recruitmentType }}</span>
            </div>
            <div class="d-flex flex-col pb-16">
              <span class="condition-title">{{ $t('condition.company_feature') }}</span>
              <span class="condition-content">{{ recruitmentType }}</span>
            </div>
            <div class="d-flex flex-col">
              <span class="condition-title">{{ $t('condition.store_feature') }}</span>
              <span class="condition-content">{{ recruitmentType }}</span>
            </div>
          </div>
        </div>
        <div class="application-detail__button">
          <el-button>{{ $t('application.update') }}</el-button>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'JobList',
  data() {
    return {
      storeName: '虎ノ門店舗 (デモ美容室)',
      event: 'スタッフ向け、美容イベントを開催',
      recruitmentType: 'ヘア、ネイル・マツゲ、整体・カ'
    }
  },
  methods: {
    handleRouter(route) {
      this.$router.push(route)
    }
  }
}
</script>
