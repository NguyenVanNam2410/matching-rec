<template>
  <div class="store wp-100">
    <div class="store-pc main-job-container max-width-1008">
      <div class="d-flex justify-between items-center">
        <div class="breadcrumb-box">
          <span class="breadcrumb-previous" @click="$router.push('/')">{{ $t('my_page.top_page') }}</span>
          <img class="breadcrumb-arrow" src="../assets/icons/breadcrumb-arrow.svg" />
          <span class="breadcrumb-current">{{ $t('my_page.store_management') }}</span>
        </div>
        <div class="store-add">
          <el-button type="danger" @click="$router.push('/register-store')" class="store-add__button" icon="el-icon-plus">{{
              $t('my_page.register_store')
            }}</el-button>
        </div>
      </div>
      <div v-if="!showMore" class="store-search">
        <div class="store-search__left">
          <div class="d-flex flex-col">
            <span class="store-search__description">{{ $t('career.store_name') }}</span>
            <el-input class="w-250" v-model="conditionText.store_name" :placeholder="$t('career.store_name')"></el-input>
          </div>
          <div class="d-flex flex-col">
            <span class="store-search__description">{{ $t('career.recruiter') }}</span>
            <el-input class="w-250" v-model="conditionText.recruiter_name" :placeholder="$t('career.recruiter')"></el-input>
          </div>
        </div>
        <div class="d-flex store-search__action pt-20">
          <div @click="showMore = true" class="d-flex items-center cursor-pointer text-blue-hover">
            <span class="show-more">{{ $t('condition.specify_detailed_conditions') }}</span>
            <img src="../assets/icons/show-more.svg" />
          </div>
          <el-button type="danger" @click="search" class="store-search__button">{{ $t('common.search') }}</el-button>
        </div>
      </div>
      <div v-if="showMore" class="store-search__advanced">
        <div class="advanced-first">
          <div class="d-flex flex-col">
            <span class="store-search__description">{{ $t('career.store_name') }}</span>
            <el-input class="w-250" v-model="conditionText.store_name" :placeholder="$t('career.store_name')"></el-input>
          </div>
          <div class="d-flex flex-col">
            <span class="store-search__description">{{ $t('career.recruiter') }}</span>
            <el-input class="w-250" v-model="conditionText.recruiter_name" :placeholder="$t('career.recruiter')"></el-input>
          </div>
          <div class="d-flex flex-col">
            <span class="store-search__description">{{ $t('condition.work_location') }}</span>
            <el-select multiple class="w-250" v-model="conditionArray.province_ids" :placeholder="$t('common.select')">
              <el-option v-for="item in listProvinces" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="advanced-second d-flex justify-between items-center">
          <div class="d-flex flex-col">
            <span class="store-search__description">{{ $t('condition.good_job') }}</span>
            <el-select multiple class="w-250" v-model="conditionArray.specialize_ids" :placeholder="$t('common.select')">
              <el-option v-for="item in listJobTypes" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="d-flex store-search__action pt-20">
            <div @click="showMore = false" class="d-flex items-center cursor-pointer text-blue-hover">
              <span class="show-more">{{ $t('condition.specify_detailed_conditions') }}</span>
              <img class="rotate-icon" src="../assets/icons/show-more.svg" />
            </div>
            <el-button type="danger" @click="search" class="store-search__button">{{ $t('common.search') }}</el-button>
          </div>
        </div>
      </div>
      <div class="store-pagination">
        <div class="d-flex paging-left">
          <span class="pagination-text">{{ $t('common.all') }}</span>
          <span class="number-record color-blue">{{ total }}</span><span class="number-record color-black">{{ $t('common.subject')}}</span>
          <span v-if="listStores.length" class="pagination-text-end">{{ countPage }}</span>
        </div>
        <PaginationElement v-if="listStores.length && total > 10" :currentPage="currentPage" :lastPage="lastPage" @change="changePage" />
      </div>
      <div v-if="listStores.length" class="store-table">
        <el-table :data="listStores" :row-class-name="tableRowClassName" header-cell-class-name="custom-header"
                  :border="true" style="width: 100%">
          <el-table-column type="index" :index="indexMethod" align="center" label="No." />
          <el-table-column :label="$t('career.store_overview')" :min-width="150">
            <template slot-scope="scope">
              <span class="store-detail__name cursor-pointer text-blue-hover" @click="$router.push(`/store-details/${scope.row.id}`)">{{ scope.row.name }}</span>
              <div class="d-flex flex-col">
                <div class="d-flex">
                  <span class="store-detail__description address-col">{{ $t('career.current_address') }}:</span>
                  <span class="store-detail__content show-dot-text">{{ scope.row.address }}</span>
                </div>
                <div class="d-flex">
                  <span class="store-detail__description">{{ $t('my_page.phone') }}:</span>
                  <span class="store-detail__content">{{ phoneFormat(scope.row.tel) }}</span>
                </div>
                <div class="d-flex">
                  <span class="store-detail__description ocupation-col">{{ $t('condition.good_job') }}:</span>
                  <span class="store-detail__content show-dot-text">{{ scope.row.specialize_ids }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('career.recruiter')" align="center" prop="recruiter_name"  class-name="store-detail__rec-name"/>
          <el-table-column :label="$t('my_page.job_list')" align="center" prop="jobList">
            <template slot-scope="scope">
              <span @click="$router.push(`/list-job?store_id=${scope.row.id}`)" class="view-list text-blue-hover">{{ $t('my_page.view_job_list') }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('my_page.register_job')" align="center" width="170">
            <template slot-scope="scope">
              <div class="d-flex justify-center">
                <el-button class="register-job-button" @click="$router.push(`/job/register?store_id=${scope.row.id}`)">{{ $t('my_page.register_a_job') }}</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="124">
            <template slot-scope="scope">
              <div class="d-flex justify-center g-4 button-action">
                <img class="el-button el-button--secondary" @click="$router.push(`edit-store/${scope.row.id}`)" src="../assets/icons/edit-icon.svg" />
                <img class="el-button el-button--secondary" @click="openDialogDelete(scope.row.id)" src="../assets/icons/delete-icon.svg" />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="store-nodata" v-else>
        <NoDataElement :text="searchText ? $t('common.no_data_search') : $t('common.no_data')" />
      </div>
      <div v-if="lastPage > 1" class="store-footer">
        <PaginationElement :currentPage="currentPage" :lastPage="lastPage" @change="changePage" />
      </div>
    </div>
    <div class="store-sp">
      <div class="store-sp__header">{{ $t('my_page.store_management') }}</div>
      <div class="store-sp__search justify-between">
        <el-button @click="dialogVisible = true" class="store-sp__button">
          <img src="../assets/icons/top-search.svg" />
          <span class="store-sp__text">{{ $t('condition.specify_detailed_conditions') }}</span>
        </el-button>
        <el-button type="danger" @click="$router.push('/register-store')" class="store-add__button" icon="el-icon-plus">
          {{ $t('my_page.register_store') }}
        </el-button>
      </div>
      <div class="d-flex px-16">
        <span class="pagination-text">{{ $t('common.all') }}</span>
        <span class="number-record color-blue">{{ total }}</span>
        <span class="number-record color-black">{{ $t('common.subject') }}</span>
        <span class="pagination-text-end">{{ showRecord }}</span>
      </div>
      <div v-if="listStores.length" class="store-sp__table">
        <div v-for="(item, index) in listStores" :class="index % 2 === 0 ? 'store-sp__item' : 'store-sp__item add-bg'"
             :key="index">
          <span class="text-blue-hover store-detail__name pb-4" @click="$router.push(`/store-details/${item.id}`)">{{ item.name }}</span>
          <div class="d-flex pb-4">
            <span class="store-detail__description">{{ $t('career.current_address') }}:</span>
            <span class="store-detail__content">{{ item.address.address }}</span>
          </div>
          <div class="d-flex pb-4">
            <span class="store-detail__description">{{ $t('my_page.phone') }}:</span>
            <span class="store-detail__content">{{ phoneFormat(item.tel) }}</span>
          </div>
          <div class="d-flex pb-4">
            <span class="store-detail__description w-space-no-wrap">{{ $t('condition.good_job') }}:</span>
            <span class="store-detail__content show-dot-text">{{ item.specialize_ids }}</span>
          </div>
          <div class="d-flex">
            <span class="store-detail__description">{{ $t('my_page.job_list') }}:</span>
            <span class="store-detail__content">{{ item.recruiter_name }}</span>
          </div>
          <div class="d-flex pt-14 store-sp__btns">
            <el-button @click="$router.push(`/job/register?store_id=${item.id}`)" type="danger" class="register-btn">{{ $t('my_page.register_a_job') }}</el-button>
            <el-button @click="$router.push(`/list-job?store_id=${item.id}`)"  class="view-btn">{{ $t('my_page.view_job_list') }}</el-button>
            <img @click="$router.push(`edit-store/${item.id}`)" class="ml-12" src="../assets/icons/edit-icon.svg" />
            <img @click="openDialogDelete(item.id)" class="ml-12" src="../assets/icons/delete-icon.svg" />
          </div>
        </div>
      </div>
      <div class="store-nodata" v-else>
        <NoDataElement :text="searchText ? $t('common.no_data_search') : $t('common.no_data')" />
      </div>
      <div v-if="lastPage > 1" class="store-footer">
        <PaginationElement :currentPage="currentPage" :lastPage="lastPage" @change="changePage" />
      </div>
    </div>

    <el-dialog :title="$t('condition.specify_detailed_conditions')" :visible.sync="dialogVisible" class="form-search-store">
      <div class="d-flex flex-col pb-24">
        <span class="text-sp">{{ $t('career.store_name') }}</span>
        <el-input v-model="conditionText.store_name" :placeholder="$t('career.store_name')"></el-input>
      </div>
      <div class="d-flex flex-col pb-24">
        <span class="text-sp">{{ $t('career.recruiter') }}</span>
        <el-input v-model="conditionText.recruiter_name" :placeholder="$t('career.recruiter')"></el-input>
      </div>
      <div class="d-flex flex-col pb-24">
        <span class="text-sp">{{ $t('condition.work_location') }}</span>
        <el-select multiple v-model="conditionArray.specialize_ids" placeholder="Select">
          <el-option v-for="item in listJobTypes" :key="item.id" :placeholder="$t('common.select')" :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="d-flex flex-col pb-24">
        <span class="text-sp">{{ $t('condition.good_job') }}</span>
        <el-select multiple v-model="conditionArray.province_ids" placeholder="Select">
          <el-option v-for="item in listProvinces" :key="item.id" :label="item.name" :placeholder="$t('common.select')"
                     :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="dialog-button">
        <el-button type="danger" class="dialog-search-btn" @click="search">{{ $t('common.search') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog class="popup-confirm" :visible.sync="dialogCancel" width="570px">
      <div class="image-confirm text-center">
        <img src="/assets/icon/Cancel.svg" alt="">
      </div>
      <div class="content-confirm text-center">
        {{ $t('confirm_modal.store_modal') }}
      </div>
      <div slot="footer" class="dialog-footer text-center">
        <el-button @click="dialogCancel = false" plain>{{ $t('confirm_modal.no') }}</el-button>
        <el-button type="danger" @click="deleteStore">{{ $t('confirm_modal.yes') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import PaginationElement from '../components/element-ui/PaginationElement.vue'
import NoDataElement from '../components/element-ui/NoDataElement.vue'
import {
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  INDEX_SET_ERROR,
  LIST_STORES,
  DELETE_STORE,
  MASTER_GET_DATA, INDEX_SET_TITLE_MENU
} from '../store/store.const'

export default {
  name: 'StoreManagement',
  components: { PaginationElement, NoDataElement },
  data() {
    return {
      per_page: 10,
      page: 1,
      currentPage: 1,
      lastPage: 1,
      total: '',
      showMore: false,
      currentStoreId: '',
      dialogVisible: false,
      dialogCancel: false,
      conditionText: {
        store_name: '',
        recruiter_name: ''
      },
      conditionArray: {
        province_ids: [],
        specialize_ids: []
      },
      listStores: [],
      listProvinces: [],
      listJobTypes: [],
      showRecord: '1～10件目を表示中',
      exampleStore: '虎ノ門店舗',
      searchText: false,
      modifyCondition: {}
    }
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, { title: this.$t('my_page.application_management'), subTitle: 'Store management' })
    this.getListStores()
    this.getProvinces()
    this.getJobTypes()
  },
  computed: {
    dataSearch() {
      const dataSearch = {
        per_page: this.per_page,
        page: this.page
      }
      let key = 0
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
    },
    countPage() {
      let countMaxMin = ''
      if (this.total < 10) {
        countMaxMin = this.$t('common.display_item', { min: 1, max: this.total })
      } else countMaxMin = this.$t('common.display_item', { min: this.currentPage > 1 ? `${this.currentPage - 1}1` : this.currentPage, max: this.listStores.length < 10 ? `${this.currentPage - 1}${this.listStores.length}` : this.currentPage * this.listStores.length })
      return countMaxMin
    }
  },
  methods: {
    indexMethod(index) {
      return this.currentPage > 1 ? `${index === 9 ? this.currentPage : this.currentPage - 1}${index === 9 ? 0 : index + 1}` : index + 1
    },
    postalCodeFormat(num) {
      if (num) {
        const format = num.toString().replace(/-/g, '')
        return format.toString().slice(0, 3) + '-' + format.toString().slice(3)
      }
      return ''
    },
    tableRowClassName({ rowIndex }) {
      return rowIndex % 2 !== 0 ? 'custom-bg' : ''
    },
    changePage(page) {
      this.currentPage = page
      if (this.conditionText.store_name || this.conditionText.recruiter_name || this.conditionArray.province_ids.length || this.conditionArray.specialize_ids.length) {
        this.search()
      } else this.getListStores()
    },
    async getListStores() {
      try {
        const params = `page=${this.currentPage}`
        await this.$store.commit(INDEX_SET_LOADING, true)
        const data = await this.$store.dispatch(LIST_STORES, params)
        const dataApi = data.data
        switch (data.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: data.messages
            })
            this.currentPage = dataApi.current_page
            this.lastPage = dataApi.total_page
            this.total = dataApi.total
            this.listStores = this.convertData(dataApi.data)
            if ((this.listStores.length === 0) && (this.currentPage > 1)) {
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
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
            break
        }
      } catch {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('content.EXC_001') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    convertData(data) {
      return data.map((item) => {
        return Object.keys(item).reduce((arr, key) => {
          switch (key) {
            case 'tel':
              item[key] = item[key].toString().replace(/-/g, '')
              break
            case 'specialize_ids':
              item[key] = item[key].length ? item[key].map(item => item.name).join('、') : ''
              break
            case 'address':
              item[key] = item[key].province ? `${item[key].postal_code ? `〒${this.postalCodeFormat(item[key].postal_code)}` : ''}  ${item[key].province || ''}${item[key].province_city || ''}${item[key].address || ''}${item[key].building || ''}` : ''
              break
            default:
              return item
          }
          return JSON.parse(JSON.stringify(item))
        }, {})
      })
    },
    phoneFormat(phone) {
      return phone ? phone.toString().slice(0, 3) + '-' + phone.toString().slice(3, 7) + '-' + phone.toString().slice(7, 12) : ''
    },
    getProvinces() {
      const dataResources = [
        'resources[m_provinces]={"model": "MProvince"}'
      ]
      this.$store.dispatch(MASTER_GET_DATA, dataResources).then(res => {
        this.listProvinces = res.data.m_provinces
      })
    },
    getJobTypes() {
      const dataResources = [
        'resources[m_job_types]={"model": "MJobType"}'
      ]
      this.$store.dispatch(MASTER_GET_DATA, dataResources).then(res => {
        this.listJobTypes = res.data.m_job_types
      })
    },
    openDialogDelete(id) {
      this.dialogCancel = true
      this.currentStoreId = id
    },
    async deleteStore() {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const data = await this.$store.dispatch(DELETE_STORE, this.currentStoreId)
        switch (data.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: data.messages
            })
            this.getListStores()
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
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
            break
        }
      } catch {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('content.EXC_001') })
      }
      this.dialogCancel = false
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    trimAllSpaces(val) {
      return val ? val.replace(/\s/g, '') : ''
    },
    async search() {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const data = await this.$store.dispatch(LIST_STORES, this.dataSearch)
        const dataApi = data.data
        switch (data.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: data.messages
            })
            this.currentPage = dataApi.current_page
            this.lastPage = dataApi.total_page
            this.total = dataApi.total
            this.listStores = this.convertData(dataApi.data)
            this.dialogVisible = false
            this.searchText = true
            this.showMore = false
            this.modifyCondition = _.cloneDeep(this.conditionText)
            if (this.conditionText.store_name.trim().length === 0) {
              this.conditionText.store_name = ''
            }
            if (this.conditionText.recruiter_name.trim().length === 0) {
              this.conditionText.recruiter_name = ''
            }
            this.conditionText.store_name = this.trimAllSpaces(this.conditionText.store_name)
            this.conditionText.recruiter_name = this.trimAllSpaces(this.conditionText.recruiter_name)
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
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
            break
        }
      } catch {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('content.EXC_001') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
