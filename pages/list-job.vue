<template>
  <div class="list-job">
    <div class="create d-flex justify-between items-center">
      <div class="breadcrumb">
        <span @click="$router.push('/')" class="breadcrumb-previous cursor-pointer">{{ $t('my_page.top_page') }}</span>
        <img class="breadcrumb-arrow" src="../assets/icons/breadcrumb-arrow.svg" />
        <span class="breadcrumb-current">{{ $t('my_page.job_list') }}</span>
      </div>
      <div class="store-add item-pc">
        <el-button class="store-add__button" type="danger" icon="el-icon-plus" @click="handleCreateJob">{{
            $t('job_list.create')
          }}
        </el-button>
      </div>
    </div>
    <div v-if="!showMore" class="list-job-search search-pc">
      <div class="list-job-left">
        <div class="d-flex flex-col">
          <span class="list-job-content">{{ $t('job_list.job_title') }}</span>
          <el-input
            v-model="conditionText.job_name"
            class="input_search input-keyword w-220 resize-width"
            :placeholder="$t('job_list.job_title')"
            name="job_name"
            type="text"
            tabindex="2"
          />
        </div>
        <div class="d-flex flex-col">
          <span class="list-job-content">{{ $t('job_list.store_name') }}</span>
          <el-input
            v-model="conditionText.store_name"
            class="input_search input-keyword w-220 resize-width"
            :placeholder="$t('job_list.store_name')"
            name="store_name"
            type="text"
            tabindex="2"
          />
        </div>
      </div>
      <div class="list-job-right">
        <div class="filter-container link-text" @click="showMore = true">
          <span class="show-more">{{ $t('condition.specify_detailed_conditions') }}</span>
          <img class="hide-hover" src="../assets/icons/show-more.svg" />
          <img class="show-hover" src="../assets/icons/show-more-hover.svg" />
          <img class="show-focus" src="../assets/icons/show-more-focus.svg" />
        </div>
        <el-button class="ml-12" type="danger" @click="searchData">{{ $t('common.search') }}</el-button>
      </div>
    </div>
    <div v-else class="list-job-search_advanced search-pc">
      <div class="advanced-layout items-end pb-16">
        <div class="d-flex flex-col">
          <span class="list-job-content">{{ $t('job_list.job_title') }}</span>
          <el-input
            v-model="conditionText.job_name"
            class="input-keyword w-220 resize-width"
            :placeholder="$t('job_list.job_title')"
            name="job_name"
            type="text"
            tabindex="2"
          />
        </div>
        <div class="d-flex flex-col pt-6">
          <span class="list-job-content">{{ $t('job_list.store_name') }}</span>
          <el-input
            v-model="conditionText.store_name"
            class="input-keyword w-220 resize-width"
            :placeholder="$t('job_list.store_name')"
            name="store_name"
            type="text"
            tabindex="2"
          />
        </div>
        <div class="d-flex flex-col pt-6">
          <span class="list-job-content">{{ $t('job_list.place') }}</span>
          <el-select v-model="condition.province_id" class="w-220 resize-width" :placeholder="$t('job_list.enter_place')" clearable>
            <el-option v-for="item in listProvinces" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="d-flex flex-col pt-6">
          <span class="list-job-content">{{ $t('job_list.em_status') }}</span>
          <el-select v-model="condition.work_type_ids" class="w-220 resize-width" :placeholder="$t('job_list.enter_place')" clearable>
            <el-option v-for="item in listWorkTypes" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="advanced-layout items-end pb-16">
        <div class="d-flex flex-col">
          <span class="list-job-content">{{ $t('job_list.recruitment_type') }}</span>
          <el-select v-model="condition.job_type_ids" class="w-220 resize-width" :placeholder="$t('job_list.enter_place')" clearable>
            <el-option v-for="item in listJobTypes" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="d-flex flex-col pt-6">
          <span class="list-job-content">{{ $t('job_list.status') }}</span>
          <el-select v-model="conditionText.job_status_id" class="w-220 resize-width" :placeholder="$t('job_list.enter_place')" clearable>
            <el-option v-for="item in listJobStatus" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="d-flex flex-col pt-6">
          <span class="list-job-content">{{ $t('job_list.age') }}</span>
          <div class="salary-filter">
            <el-input v-model="conditionText.age_min" placeholder="20" class="w-90 resize-width" maxlength="3" oninput="this.value=this.value.replace(/[^0-9]/g,'');"></el-input>
            <span>～</span>
            <el-input v-model="conditionText.age_max" placeholder="25" class="w-90 resize-width" maxlength="3" oninput="this.value=this.value.replace(/[^0-9]/g,'');"></el-input>
          </div>
        </div>
        <div class="d-flex flex-col pt-6">
          <span class="list-job-content">{{ $t('job_list.work experience') }}</span>
          <el-select v-model="condition.experience_ids" class="w-220 resize-width" :placeholder="$t('job_list.enter_place')" clearable>
            <el-option v-for="item in listExperiences" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="advanced-layout items-end">
        <div class="d-flex flex-col pt-6">
          <span class="list-job-content">{{ $t('job_list.salary') }}</span>
          <div class="salary-filter">
            <el-select v-model="conditionText.salary_type_id" class="w-120 resize-width" :placeholder="$t('job_list.enter_place')" clearable>
              <el-option v-for="item in listSalaryTypes" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
            <el-input v-model="conditionText.salary_min" class="w-90 resize-width" placeholder="1000" maxlength="8" oninput="this.value=this.value.replace(/[^0-9]/g,'');"></el-input>
            <span>～</span>
            <el-input v-model="conditionText.salary_max" class="w-90 resize-width" placeholder="1500" maxlength="8" oninput="this.value=this.value.replace(/[^0-9]/g,'');"></el-input>
          </div>
        </div>
        <div class="d-flex flex-col pt-6">
          <span class="list-job-content">{{ $t('job_list.sex') }}</span>
          <div class="salary-filter">
            <el-checkbox-group class="d-flex checkbox-salary" v-model="conditionArray.gender_ids">
              <div v-for="(gender, index) in listGenders" :key="index">
                <el-checkbox :label="gender.id">{{ gender.name }}</el-checkbox>
              </div>
            </el-checkbox-group>
          </div>
        </div>
        <div class="list-job-right">
          <div class="filter-container link-text" @click="showMore = false">
            <span class="show-more">{{ $t('condition.specify_detailed_conditions') }}</span>
            <img class="rotate-img hide-hover" src="../assets/icons/show-more.svg" />
            <img class="rotate-img show-hover" src="../assets/icons/show-more-hover.svg" />
            <img class="rotate-img show-focus" src="../assets/icons/show-more-focus.svg" />
          </div>
          <el-button class="ml-12" type="danger" @click="searchData">{{ $t('common.search') }}</el-button>
        </div>
      </div>
    </div>
    <div class="search-sp">
      <div class="list-job_button">
        <el-button class="list-job_button_sp mb-12" @click="dialogVisible = true">
          <img src="../assets/icons/top-search.svg" />
          <span class="button-search-text">{{ $t('condition.specify_detailed_conditions') }}</span>
        </el-button>
        <el-button class="list-job_button_sp" type="danger" @click="handleCreateJob">
          <img src="../assets/icons/search_add.svg" alt="" />
          <span class="button-search-text search_add">{{ $t('job_list.create') }}</span>
        </el-button>
      </div>
    </div>
    <div class="list-job-header">
      <div class="d-flex form-text-all">
        <span>{{ $t('common.search_list_job') }}</span>
        <span class="total-record">{{ total }}</span>
        <span>{{ $t('common.subject') }}</span>
        <span class="list-job-total" v-if="total > 0">{{ $t('common.display_item', { min: per_page * (page - 1) + 1, max: (total > (per_page * page)) ? (per_page * page) : total } ) }}</span>
      </div>
      <div v-if="sort_by === 'desc'" class="last-update d-flex items-center cursor-pointer" @click="changeSort('asc')">
        <button class="el-button">
          <img src="../assets/icons/latest-update-down.svg" />
          <span>{{ $t('job_list.sort_by_desc') }}</span>
        </button>
      </div>
      <div v-else class="last-update d-flex items-center cursor-pointer" @click="changeSort('desc')">
        <button class="el-button">
          <img src="../assets/icons/latest-update.svg" />
          <span>{{ $t('job_list.sort_by_asc') }}</span>
        </button>
      </div>
    </div>
    <div class="list-job-body">
      <div v-for="(job, index) in listJobs" :key="index" class="job-box" @click="$router.push('/job/' + job.id)">
        <div class="item-pc box-name d-flex justify-between">
          <div class="store-name-div">
            <p class="store-name">{{ job.store_name }}
              <span v-if="job.company_name">({{ job.company_name }})</span>
            </p>
            <p class="store-content">{{ job.name }}</p>
          </div>
          <div>
            <div :class="'job-status job-status-' + job.job_status.id">
              {{ job.job_status.name }}
            </div>
          </div>
        </div>
        <hr class="item-pc">
        <div class="list-job-item item-pc">
          <div class="d-flex flex-col">
            <img class="job-img" width="100%" height="100%" :src="job.banner_image || jobDefault" />
          </div>
          <div class="list-job-item__right">
            <div class="list-job-table">
              <div class="list-job-col">
                <div class="list-job-first">{{ $t('job_list.place') }}</div>
                <div :class="['list-job-second']">
                  {{ showAddress(job) }}
                </div>
              </div>
              <div class="list-job-col">
                <div class="list-job-first">{{ $t('job_list.salary') }}</div>
                <div class="list-job-second">
                {{ showSalary(job) }}
                </div>
              </div>
              <div class="list-job-col">
                <div class="list-job-first">{{ $t('job_list.work_hours') }}</div>
                <div class="list-job-second">
                {{ showTime(job) }}
                </div>
              </div>
              <div class="list-job-col">
                <div class="list-job-first">{{ $t('job_list.job_type') }}</div>
                <div class="list-job-second">
                  {{ showJobType(job) }}
                </div>
              </div>
              <div class="list-job-col">
                <div class="list-job-first">{{ $t('job_list.description') }}</div>
                <div class="list-job-second last-item" v-html="job.description">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="last-update-at show-pc">
          <span>{{ $t('job.updated_at') }}{{ job.updated_at }}</span>
        </div>
        <div class="list-job-item item-sp">
          <div class="job-title-box">
            <img width="100%" height="100%" class="job-img" :src="job.banner_image || jobDefault" />
            <div class="box-name">
              <div>
                <span class="store-name">{{ job.store_name }}</span> <br>
                <span class="store-content">{{ job.name }}
                  <span v-if="job.company_name">({{ job.company_name }})</span>
                </span>
              </div>
              <span class="list-job-last-login">{{ $t('job.updated_at') + job.updated_at }}</span>
            </div>
          </div>
          <div class="list-job-item__right">
            <div class="list-job-table">
              <div class="list-job-table">
                <div class="list-job-col">
                  <div class="list-job-first">{{ $t('job_list.place') }}</div>
                  <div :class="['list-job-second']">
                    {{ showAddress(job) }}
                  </div>
                </div>
                <div class="list-job-col">
                  <div class="list-job-first">{{ $t('job_list.salary') }}</div>
                  <div class="list-job-second">
                    {{ showSalary(job) }}
                  </div>
                </div>
                <div class="list-job-col">
                  <div class="list-job-first">{{ $t('job_list.work_hours') }}</div>
                  <div class="list-job-second">
                    {{ showTime(job) }}
                  </div>
                </div>
                <div class="list-job-col">
                  <div class="list-job-first">{{ $t('job_list.job_type') }}</div>
                  <div class="list-job-second">
                    {{ showJobType(job) }}
                  </div>
                </div>
                <div class="list-job-col">
                  <div class="list-job-first">{{ $t('job_list.description') }}</div>
                  <div class="list-job-second last-item" v-html="job.description">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="item-pc">
        <div class="emp-status d-flex justify-between">
          <div class="work-type">
            <span v-for="(work_type, key_work) in job.work_types" :key="key_work" class="work-type-item">
              {{ work_type.name }}
            </span>
          </div>
          <div class="item-pc btn-group d-flex">
            <el-button class="btn-remove" type="secondary" @click.stop="job.is_deleted ? $router.push('/job/' + job.id) :confirmDeleteJob(job.id)">
              <img src="../assets/icons/remove.svg" />
              <span>{{ $t('common.delete') }}</span>
            </el-button>
            <el-button class="btn-edit d-flex" type="danger" @click.stop="$router.push('/job/edit/' + job.id)">
              <img src="../assets/icons/edit.svg" />
              <span>
                {{ $t('my_page.edit')}}
              </span>
            </el-button>
          </div>
        </div>
        <hr class="item-sp">
        <div class="item-sp form-button">
          <div class="d-flex justify-between">
            <div :class="'job-status job-status-' + job.job_status.id">
              {{ job.job_status.name }}
            </div>
            <div class="btn-group d-flex">
              <el-button class="btn-remove" type="secondary" @click.stop="job.is_deleted ? $router.push('/job/' + job.id) :confirmDeleteJob(job.id)">
                <img src="../assets/icons/remove.svg" />
                <span>{{ $t('common.delete') }}</span>
              </el-button>
              <el-button class="btn-edit d-flex" type="danger" @click.stop="$router.push('/job/edit/' + job.id)">
                <img src="../assets/icons/edit.svg" />
                <span>
                  {{ $t('my_page.edit')}}
                </span>
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="lastPage > 1">
        <PaginationElement :current-page="page" :last-page="lastPage" @change="changePage" />
      </div>
    </div>
    <div v-if="listJobs.length === 0">
      <div v-if="dataSearch['filters[0][key]']" class="no-data">
        <NoDataElement :text="$t('no_data.job_list_search')"></NoDataElement>
      </div>
      <div v-else class="no-data">
        <NoDataElement :text="$t('no_data.job_list')"></NoDataElement>
      </div>
    </div>
    <el-dialog :title="$t('condition.specify_detailed_conditions')" :visible.sync="dialogVisible">
      <div class="d-flex flex-col pb-24">
        <span class="list-job-content">{{ $t('job_list.job_title') }}</span>
        <el-input
          v-model="conditionText.job_name"
          class="input-keyword w-220 resize-width"
          :placeholder="$t('job_list.job_title')"
          name="job_name"
          type="text"
          tabindex="2"
        />
      </div>
      <div class="d-flex flex-col pb-24">
        <span class="list-job-content">{{ $t('job_list.store_name') }}</span>
        <el-input
          v-model="conditionText.store_name"
          class="input-keyword w-220 resize-width"
          :placeholder="$t('job_list.store_name')"
          name="store_name"
          type="text"
          tabindex="2"
        />
      </div>
      <div class="d-flex flex-col pb-24">
        <span class="list-job-content">{{ $t('job_list.place') }}</span>
        <el-select v-model="condition.province_id" class="w-220 resize-width" :placeholder="$t('job_list.enter_place')">
          <el-option v-for="item in listProvinces" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="d-flex flex-col pb-24">
        <span class="list-job-content">{{ $t('job_list.em_status') }}</span>
        <el-select v-model="condition.work_type_ids" class="w-220 resize-width" :placeholder="$t('job_list.enter_place')">
          <el-option v-for="item in listWorkTypes" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="d-flex flex-col pb-24">
        <span class="list-job-content">{{ $t('job_list.recruitment_type') }}</span>
        <el-select v-model="condition.job_type_ids" class="w-220 resize-width" :placeholder="$t('job_list.enter_place')">
          <el-option v-for="item in listJobTypes" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="d-flex flex-col pb-24">
        <span class="list-job-content">{{ $t('job_list.status') }}</span>
        <el-select v-model="conditionText.job_status_id" class="w-220 resize-width" :placeholder="$t('job_list.enter_place')">
          <el-option v-for="item in listJobStatus" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="d-flex flex-col pb-24">
        <span class="list-job-content">{{ $t('job_list.age') }}</span>
        <div class="salary-filter">
          <el-input v-model="conditionText.age_min" class="w-90 resize-width" placeholder="20" maxlength="3" oninput="this.value=this.value.replace(/[^0-9]/g,'');"></el-input>
          <span>～</span>
          <el-input v-model="conditionText.age_max" class="w-90 resize-width" placeholder="25" maxlength="3" oninput="this.value=this.value.replace(/[^0-9]/g,'');"></el-input>
        </div>
      </div>
      <div class="d-flex flex-col pb-24">
        <span class="list-job-content">{{ $t('job_list.work experience') }}</span>
        <el-select v-model="condition.experience_ids" class="w-220 resize-width" :placeholder="$t('job_list.enter_place')">
          <el-option v-for="item in listExperiences" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="d-flex flex-col pb-24">
        <span class="list-job-content">{{ $t('job_list.salary') }}</span>
        <div class="salary-filter">
          <el-select v-model="conditionText.salary_type_id" class="w-120 resize-width" :placeholder="$t('job_list.enter_place')">
            <el-option v-for="item in listSalaryTypes" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          <el-input v-model="conditionText.salary_min" class="w-90 resize-width" placeholder="1000" maxlength="8" oninput="this.value=this.value.replace(/[^0-9]/g,'');"></el-input>
          <span>～</span>
          <el-input v-model="conditionText.salary_max" class="w-90 resize-width" placeholder="1500" maxlength="8" oninput="this.value=this.value.replace(/[^0-9]/g,'');"></el-input>
        </div>
      </div>
      <div class="d-flex flex-col">
        <span class="list-job-content">{{ $t('job_list.sex') }}</span>
        <div class="salary-filter">
          <el-checkbox-group class="d-flex checkbox-salary" v-model="conditionArray.gender_ids">
            <div v-for="(gender, index) in listGenders" :key="index">
              <el-checkbox :label="gender.id">{{ gender.name }}</el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
      </div>
      <div class="dialog-button">
        <el-button type="danger" @click="searchData">{{ $t('common.search') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog class="popup-confirm" :visible.sync="dialogCancel" width="570px">
      <div class="image-confirm text-center">
        <img src="/assets/icon/Cancel.svg" alt="">
      </div>
      <div class="content-confirm text-center">
        {{ $t('content.CON_003') }}
      </div>
      <div slot="footer" class="dialog-footer text-center">
        <el-button @click="dialogCancel = false" plain>{{ $t('confirm_modal.no') }}</el-button>
        <el-button type="danger" @click="deleteJob">{{ $t('confirm_modal.yes') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  JOB_DELETE_JOB,
  JOB_LIST_JOB,
  MASTER_GET_DATA,
  JOB_ALL_STORE,
  INDEX_SET_TITLE_MENU
} from '../store/store.const'
import NoDataElement from '../components/element-ui/NoDataElement'
import PaginationElement from '../components/element-ui/PaginationElement'

export default {
  name: 'IndexPage',
  components: { PaginationElement, NoDataElement },
  data() {
    return {
      check: [],
      total: 0,
      per_page: 10,
      page: 1,
      lastPage: 1,
      settings: {
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      },
      showMore: false,
      dialogCancel: false,
      dialogVisible: false,
      listJobs: [],
      listStores: [],
      listSortBy: [
        { id: 'desc', name: this.$t('job_list.sort_by_desc') },
        { id: 'asc', name: this.$t('job_list.sort_by_asc') }
      ],
      jobDefault: require('../assets/images/job_default.png'),
      listProvinces: [],
      listWorkTypes: [],
      listJobTypes: [],
      listExperiences: [],
      listSalaryTypes: [],
      listJobStatus: '',
      listGenders: [],
      sort_by: 'desc',
      conditionText: {
        job_name: '',
        store_name: '',
        age_min: '',
        age_max: '',
        salary_min: '',
        salary_max: '',
        job_status_id: '',
        salary_type_id: ''
      },
      condition: {
        province_id: '',
        province_city_id: '',
        work_type_ids: '',
        job_type_ids: '',
        experience_ids: ''
      },
      conditionArray: {
        gender_ids: []
      },
      jobActive: ''
    }
  },
  async created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, { title: this.$t('my_page.job_list'), subTitle: 'Job list' })
    await this.getMasterData()
    await this.getListJob()
    await this.getAllStore()
    if (!this.listStores.length) {
      this.$confirm(this.$t('content.CON_020'), {
        confirmButtonText: this.$t('confirm_modal.yes'),
        cancelButtonText: this.$t('confirm_modal.no'),
        type: 'warning'
      })
        .then(_ => {
          this.$router.push('/register-store')
        })
        .catch(_ => {})
    }
  },
  computed: {
    dataSearch() {
      const dataSearch = {
        per_page: this.per_page,
        page: this.page,
        'orders[0][key]': 'updated_at',
        'orders[0][dir]': this.sort_by
      }
      let key = 0
      for (const query in this.$route.query) {
        if (query === 'store_id') {
          dataSearch[`filters[${key}][key]`] = query
          dataSearch[`filters[${key}][data]`] = this.$route.query[query]
          key++
        }
      }
      for (const index in this.condition) {
        if (this.condition[index]) {
          dataSearch[`filters[${key}][key]`] = index
          dataSearch[`filters[${key}][data]`] = this.condition[index]
          key++
        }
      }
      for (const index in this.conditionArray) {
        if (this.conditionArray[index].length) {
          dataSearch[`filters[${key}][key]`] = index
          dataSearch[`filters[${key}][data]`] = this.conditionArray[index].join(',')
          key++
        }
      }
      for (const index in this.conditionText) {
        if (this.conditionText[index]) {
          dataSearch[`filters[${key}][key]`] = index
          dataSearch[`filters[${key}][data]`] = this.conditionText[index]
          key++
        }
      }
      return dataSearch
    }
  },
  methods: {
    changePage(value) {
      this.page = value
      this.getListJob()
    },
    async searchData() {
      await this.changePage(1)
      this.showMore = false
      this.dialogVisible = false
    },
    showAddress(job) {
      return (job.address.province_name || '') + (job.address.province_city_name || '')
    },
    showSalary(job) {
      if (job.salary.min && job.salary.max) {
        return job.salary.min + '～' + job.salary.max + job.salary.type
      }
      return ''
    },
    showTime(job) {
      if (job.work_time.start && job.work_time.end) {
        return job.work_time.start + '～' + job.work_time.end
      }
      return ''
    },
    showJobType(job) {
      const data = job.job_types.map(type => {
        return type.name
      })
      return data.join('、')
    },
    async getMasterData() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataResources = [
        'resources[m_work_types]={"model": "MWorkType"}',
        'resources[m_provinces]={"model": "MProvince"}',
        'resources[m_job_statuses]={"model": "MJobStatus"}',
        'resources[m_job_types]={"model": "MJobType"}',
        'resources[m_job_experiences]={"model": "MJobExperience"}',
        'resources[m_genders]={"model": "Gender"}',
        'resources[m_salary_types]={}'
      ]
      const dataMasterData = await this.$store.dispatch(MASTER_GET_DATA, dataResources.join('&'))
      if (dataMasterData.status_code === 200) {
        this.listProvinces = dataMasterData.data.m_provinces
        this.listWorkTypes = dataMasterData.data.m_work_types
        this.listJobStatus = dataMasterData.data.m_job_statuses
        this.listJobTypes = dataMasterData.data.m_job_types
        this.listExperiences = dataMasterData.data.m_job_experiences
        this.listSalaryTypes = dataMasterData.data.m_salary_types
        this.listGenders = dataMasterData.data.m_genders
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async getListJob() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataResponse = await this.$store.dispatch(JOB_LIST_JOB, this.dataSearch)
      this.conditionText.job_name = this.conditionText.job_name.trim()
      this.conditionText.store_name = this.conditionText.store_name.trim()
      switch (dataResponse.status_code) {
        case 200:
          this.listJobs = dataResponse.data.data
          this.lastPage = dataResponse.data.total_page
          this.total = dataResponse.data.total
          if ((this.listJobs.length === 0) && (this.currentPage > 1)) {
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
    async getAllStore() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const response = await this.$store.dispatch(JOB_ALL_STORE, this.dataSearch)

      switch (response.status_code) {
        case 200:
          this.listStores = response.data
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
    confirmDeleteJob(id) {
      this.dialogCancel = true
      this.jobActive = id
    },
    async deleteJob() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataResponse = await this.$store.dispatch(JOB_DELETE_JOB, this.jobActive)
      switch (dataResponse.status_code) {
        case 200:
          this.$store.commit(INDEX_SET_SUCCESS, {
            show: true,
            text: dataResponse.messages
          })
          await this.getListJob()
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
      this.dialogCancel = false
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async changeSort(sort) {
      this.sort_by = sort
      await this.getListJob()
    },
    handleCreateJob() {
      if (!this.listStores.length) {
        this.$confirm(this.$t('content.CON_020'), {
          confirmButtonText: this.$t('confirm_modal.yes'),
          cancelButtonText: this.$t('confirm_modal.no'),
          type: 'warning'
        })
          .then(_ => {
            this.$router.push('/register-store')
          })
          .catch(_ => {})
      } else {
        this.$router.push('/job/register')
      }
    }
  }
}
</script>
