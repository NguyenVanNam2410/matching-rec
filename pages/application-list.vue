<template>
  <div class="application wp-100">
    <div class="application-pc main-job-container max-width-1008">
      <div class="breadcrumb-box d-flex">
        <span @click="$router.push('/')" class="breadcrumb-previous cursor-pointer">{{ $t('my_page.top_page') }}</span>
        <img class="breadcrumb-arrow" src="../assets/icons/breadcrumb-arrow.svg" />
        <span class="breadcrumb-current">{{ $t('my_page.application_list') }}</span>
      </div>
      <div v-if="!showMore" class="application-search search-first">
        <div class="application-search__left">
          <div class="d-flex flex-col">
            <span class="application-search__description">{{ $t('my_page.applicant_name') }}</span>
            <el-input class="w-220 resize-width" v-model="conditionText.user_name" :placeholder="$t('my_page.applicant_name')"></el-input>
          </div>
          <div class="d-flex flex-col">
            <span class="application-search__description">{{ $t('my_page.applicant_furi') }}</span>
            <el-input class="w-220 resize-width" v-model="conditionText.user_furi_name" :placeholder="$t('my_page.applicant_furi')"></el-input>
          </div>
        </div>
        <div class="d-flex application-search__action pt-20">
          <div @click="showMore = true" class="text-blue-hover d-flex items-center cursor-pointer">
            <span class="show-more">{{ $t('condition.specify_detailed_conditions') }}</span>
            <img src="../assets/icons/show-more.svg" />
          </div>
          <el-button type="danger" class="application-search__button" @click="searchData">{{ $t('common.search') }}</el-button>
        </div>
      </div>
      <div v-if="showMore" class="application-search__advanced">
        <div class="advanced-first">
          <div class="d-flex flex-col">
            <span class="application-search__description">{{ $t('my_page.applicant_name') }}</span>
            <el-input class="w-220 resize-1250 resize-width" v-model="conditionText.user_name" :placeholder="$t('my_page.applicant_name')">
            </el-input>
          </div>
          <div class="d-flex flex-col">
            <span class="application-search__description">{{ $t('my_page.applicant_furi') }}</span>
            <el-input class="w-220 resize-1250 resize-width" v-model="conditionText.user_furi_name" :placeholder="$t('my_page.applicant_furi')">
            </el-input>
          </div>
          <div class="d-flex flex-col">
            <span class="application-search__description">{{ $t('schedule.application_date') }}</span>
            <div class="d-flex items-center">
              <el-date-picker class="resize-1250 resize-width" v-model="conditionText.created_at_from" type="date" :placeholder="$t('common.select')">
              </el-date-picker>
              <span class="application-from">～</span>
              <el-date-picker class="resize-1250 resize-width" v-model="conditionText.created_at_to" type="date" :placeholder="$t('common.select')">
              </el-date-picker>
            </div>
          </div>
        </div>
        <div class="advanced-second d-flex">
          <div class="d-flex flex-col">
            <span class="application-search__description">{{ $t('my_page.status') }}</span>
            <el-select class="w-220 resize-1250 resize-width" v-model="conditionText.interview_status_id" :placeholder="$t('common.select')" clearable>
              <el-option v-for="item in listStatus" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="d-flex flex-col">
            <span class="application-search__description">{{ $t('my_page.job_title') }}</span>
            <el-input class="w-340 resize-1250 resize-width" v-model="conditionText.job_name"
              :placeholder="$t('my_page.job_title')" />
          </div>
          <div class="d-flex items-center application-search__action pt-20">
            <div @click="showMore = false" class="text-blue-hover d-flex items-center cursor-pointer">
              <span class="show-more">{{ $t('condition.specify_detailed_conditions') }}</span>
              <img class="rotate-icon" src="../assets/icons/show-more.svg" />
            </div>
            <el-button type="danger" class="application-search__button" @click="searchData">{{ $t('common.search') }}</el-button>
          </div>
        </div>
      </div>
      <div class="application-pagination">
        <div class="d-flex total-page">
          <span class="pagination-text">{{ $t('common.all') }}</span>
          <span class="number-record color-blue">{{ total }}</span>
          <span class="number-record color-black">{{ $t('common.subject') }}</span>
          <span v-if="listApplications.length" class="pagination-text-end">{{ showRecord }}</span>
        </div>
        <div v-if="lastPage > 1">
          <PaginationElement :currentPage="currentPage" :lastPage="lastPage" @change="changePage" />
        </div>
      </div>
      <div v-if="listApplications.length" class="application-table">
        <el-table :data="listApplications" :row-class-name="tableRowClassName" header-cell-class-name="custom-header"
                  :border="true" style="width: 100%">
          <el-table-column class-name="bold-column" type="index" align="center" label="No." :index="indexMethod" />
          <el-table-column align="center" width="54">
            <template slot-scope="scope">
              <div v-if="!scope.row.be_read" class="unread-button">{{ $t('my_page.unread') }}</div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('schedule.application_date')" prop="date">
            <template slot-scope="scope">
              <span class="date-column">
                {{ scope.row.created_at }}
              </span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('my_page.applicant')">
            <template slot-scope="scope">
              <div class="d-flex items-center application-info cursor-pointer" @click="$router.push('/user-details/' + scope.row.user.id + '?application=' + scope.row.id)">
                <img :src="scope.row.user.avatar_banner ? scope.row.user.avatar_banner : avatarDefault" />
                <div>
                  <span class="text-blue-hover application-name">{{ (scope.row.user.first_name || '') + ' ' + (scope.row.user.last_name || '') }}</span>
                  <span v-if="scope.row.user.age" class="application-age">({{ scope.row.user.age + $t('common.age') }})</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('my_page.job_title')" prop="title" :min-width="160">
            <template slot-scope="scope">
              <span class="application-name text-blue-hover" @click="$router.push('/job/' + scope.row.job.id)">
                {{ scope.row.job.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('my_page.status')" align="center" width="108">
            <template slot-scope="scope">
              <div :class="'status-button status' + scope.row.interview.id">
                {{ scope.row.interview.name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('my_page.operation')" width="98">
            <template slot-scope="scope">
              <div class="text-blue-hover cursor-pointer text-focus column-action" @click="$router.push('/application/' + scope.row.id)">{{ $t('home.view_job_detail') }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="lastPage > 1" class="application-footer">
        <PaginationElement :currentPage="currentPage" :lastPage="lastPage" @change="changePage" />
      </div>
      <div v-if="listApplications.length === 0" class="no-data">
        <div v-if="checkNoData()">
          <NoDataElement :text="$t('no_data.application_list')"></NoDataElement>
        </div>
        <div v-else>
          <NoDataElement :text="$t('common.no_data_search')"></NoDataElement>
        </div>
      </div>
    </div>
    <div class="application-sp">
      <div class="application-sp__header d-flex items-center" @click="$router.push('/')">
        <img src="../assets/icons/breadcrumb-arrow-black.svg" />
        <span>{{ $t('my_page.application_list') }}</span>
      </div>
      <div class="application-sp__search">
        <el-button @click="dialogVisible = true" class="application-sp__button">
          <img src="../assets/icons/top-search.svg" />
          <span class="application-sp__text">{{ $t('condition.specify_detailed_conditions') }}</span>
        </el-button>
      </div>
      <div class="d-flex px-16">
        <span class="pagination-text">{{ $t('common.all') }}</span>
        <span class="number-record color-blue">{{ total }}</span>
        <span class="number-record color-black">{{ $t('common.subject') }}</span>
        <span v-if="listApplications.length" class="pagination-text-end" >{{ showRecord }}</span>
      </div>
      <div v-if="listApplications.length">
        <div class="application-sp__table">
          <div v-for="(item, index) in listApplications" :class="['application-sp__item', { 'custom-bg': !item.be_read }]" :key="index" @click="$router.push('/application/' + item.id)">
            <div class="pb-4">
              <div class="d-flex pb-8 justify-between">
                <div class="application-sp__info cursor-pointer">
                  <img :src="item.user.avatar_banner || avatarDefault" />
                  <span class="text-blue-hover application-sp__name" @click.stop="$router.push('/user-details/' + item.user.id  + '?application=' + item.id)">{{ item.user.first_name + ' ' + item.user.last_name }}<span class="application-sp__age">({{ item.user.age + $t('common.age') }})</span></span>
                  <div v-if="!item.be_read" class="unread-button">{{ $t('my_page.unread') }}</div>
                </div>
                <div :class="'application-sp__status status' + item.interview.id">
                  {{ item.interview.name }}
                </div>
              </div>
              <div class="d-flex pb-12">
                <span class="application-info__head">{{ $t('my_page.job_offer') }}:</span>
                <span class="text-blue-hover application-info__title text-focus" @click.stop="$router.push('/job/' + item.job.id)">{{ item.job.name }}</span>
              </div>
              <div class="d-flex">
                <span class="application-info__head">{{ $t('schedule.application_date') }}:</span>
                <span class="application-info__date">{{ item.created_at }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="lastPage > 1" class="application-footer">
          <PaginationElement :currentPage="currentPage" :lastPage="lastPage" @change="changePage" />
        </div>
      </div>
      <div v-if="listApplications.length === 0" class="no-data">
        <div v-if="checkNoData()">
          <NoDataElement :text="$t('no_data.application_list')"></NoDataElement>
        </div>
        <div v-else>
          <NoDataElement :text="$t('common.no_data_search')"></NoDataElement>
        </div>
      </div>
    </div>

    <el-dialog :title="$t('condition.specify_detailed_conditions')" :visible.sync="dialogVisible">
      <div class="d-flex flex-col pb-24">
        <span class="text-sp">{{ $t('career.career_name') }}</span>
        <el-input v-model="conditionText.user_name" :placeholder="$t('career.career_name')"></el-input>
      </div>
      <div class="d-flex flex-col pb-24">
        <span class="text-sp">{{ $t('career.recruiter_sp') }}</span>
        <el-input v-model="conditionText.user_furi_name" :placeholder="$t('career.recruiter_sp')"></el-input>
      </div>
      <div class="d-flex flex-col pb-24">
        <span class="text-sp">{{ $t('application.date_sp') }}</span>
        <div class="d-flex items-center">
          <el-date-picker v-model="conditionText.created_at_from" type="date" :placeholder="$t('common.select')">
          </el-date-picker>
          <span class="application-from">～</span>
          <el-date-picker v-model="conditionText.created_at_to" type="date" :placeholder="$t('common.select')">
          </el-date-picker>
        </div>
      </div>
      <div class="d-flex flex-col pb-24">
        <span class="text-sp">{{ $t('application.status') }}</span>
        <el-select v-model="conditionText.interview_status_id" :placeholder="$t('application.status')">
          <el-option v-for="item in listStatus" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="d-flex flex-col pb-24">
        <span class="text-sp">{{ $t('application.job_title') }}</span>
        <el-input class="w-340 resize-1250 resize-width" v-model="conditionText.job_name"
                  :placeholder="$t('application.job_title')" />
      </div>
      <div class="dialog-button">
        <el-button class="dialog-search-btn" type="danger" @click="searchData">{{ $t('common.search') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import _ from 'lodash'
import PaginationElement from '../components/element-ui/PaginationElement.vue'
import NoDataElement from '../components/element-ui/NoDataElement.vue'
import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  APPLICATION_LIST, MASTER_GET_DATA, INDEX_SET_TITLE_MENU
} from '../store/store.const'

export default {
  name: 'ApplicationList',
  components: { PaginationElement, NoDataElement },
  data() {
    return {
      currentPage: 1,
      lastPage: 1,
      showMore: false,
      dialogVisible: false,
      prefectureOptions: [],
      options: [
        {
          label: '1',
          value: 1
        },
        {
          label: '2',
          value: 2
        }
      ],
      options2: [
        {
          label: '1',
          value: 1
        },
        {
          label: '2',
          value: 2
        }
      ],
      listApplications: [],
      conditionText: {
        user_name: '',
        user_furi_name: '',
        created_at_from: '',
        created_at_to: '',
        interview_status_id: '',
        job_name: ''
      },
      per_page: 10,
      total: 0,
      listStatus: [],
      avatarDefault: require(`~/assets/icons/avatar-header.svg`),
      clonedDataSearch: {
        per_page: 10,
        page: 1
      }
    }
  },
  computed: {
    showRecord() {
      return this.$t('common.display_item', {
        min: this.per_page * (this.currentPage - 1) + 1,
        max: (this.total > (this.per_page * this.currentPage)) ? (this.per_page * this.currentPage) : this.total
      })
    },
    dataSearch() {
      const dataSearch = {
        per_page: this.per_page,
        page: this.currentPage
      }
      let key = 0
      let dataCondition = ''
      for (const index in this.conditionText) {
        if (this.conditionText[index]) {
          dataCondition = this.conditionText[index]
          if (['created_at_from', 'created_at_to'].includes(index)) {
            const year = this.conditionText[index].toLocaleString('default', { year: 'numeric' })
            const month = this.conditionText[index].toLocaleString('default', { month: '2-digit' })
            const day = this.conditionText[index].toLocaleString('default', { day: '2-digit' })
            dataCondition = year + '-' + month + '-' + day
          }
          dataSearch[`filters[${key}][key]`] = index
          dataSearch[`filters[${key}][data]`] = dataCondition
          key++
        }
      }
      return dataSearch
    }
  },
  async created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, { title: this.$t('my_page.application_management'), subTitle: 'Application management' })
    await this.getMasterData()
    await this.getListApplication()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      return !row.be_read ? 'custom-bg' : ''
    },
    handleRouter(route) {
      this.$router.push(route)
    },
    changePage(page) {
      this.currentPage = page
      this.getListApplication()
    },
    indexMethod(index) {
      return index + 1 + this.per_page * (this.currentPage - 1)
    },
    convertData() {
      for (const index in this.conditionText) {
        if (this.conditionText[index]) {
          if (['user_name', 'user_furi_name', 'job_name'].includes(index)) {
            this.conditionText[index] = this.conditionText[index].trim()
          }
        }
      }
    },
    async searchData() {
      this.convertData()
      await this.changePage(1)
      this.showMore = false
      this.dialogVisible = false
    },
    async getMasterData() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataResources = [
        'resources[m_interviews_status]={"model": "MInterviewStatus"}'
      ]
      const dataMasterData = await this.$store.dispatch(MASTER_GET_DATA, dataResources.join('&'))
      if (dataMasterData.status_code === 200) {
        this.listStatus = dataMasterData.data.m_interviews_status
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async getListApplication() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataResponse = await this.$store.dispatch(APPLICATION_LIST, this.dataSearch)
      switch (dataResponse.status_code) {
        case 200:
          this.listApplications = dataResponse.data.data
          this.lastPage = dataResponse.data.total_page
          this.total = dataResponse.data.total
          if ((this.listApplications.length === 0) && (this.currentPage > 1)) {
            this.changePage(this.lastPage)
          }
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
            text: dataResponse.messages
          })
          break
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    checkNoData() {
      return _.isEqual(this.dataSearch, this.clonedDataSearch)
    }
  }
}
</script>
