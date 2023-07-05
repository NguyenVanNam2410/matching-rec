<template>
  <div class="favourite">
    <div class="favourite-content">
      <div class="breadcrumb">
        <span class="breadcrumb-previous cursor-pointer" @click="$router.push('/')">{{ $t('my_page.top_page') }}</span>
        <img class="breadcrumb-arrow" src="../assets/icons/breadcrumb-arrow.svg" />
        <span class="breadcrumb-current">{{ $t('favorite_job.sidebar_title') }}</span>
      </div>
      <div class="d-flex justify-between items-center">
        <div class="favourite-filter">
          <span class="pagination-text">{{ $t('page.search') }}</span>
          <span class="number-record">{{ total }}</span>
          <span class="pagination-text">{{ $t('common.subject') }}</span>
          <span v-if="total > 0" class="pagination-text pagination-text-total">{{ countPage }}</span>
        </div>
      </div>
      <div v-if="favouriteList.length" class="favourite-body">
        <div v-for="(item, index) in favouriteList" :key="index" :class="'favourite-item ' + (item.be_deleted ? 'favourite-disable' : '')" @click="!item.be_deleted ? $router.push(`/user-details/${item.id}`) : ''">
          <div class="favourite-item__left">
            <img class="basic-tab__avt" :src="(item.avatar || userExample)" alt="">
            <span class="favourite-last-login">{{ formatLastLogin(item.last_login_at) }}</span>
            <div class="favourite-remove link-text" @click.stop="removeConfirm(item.id)">
              <img class="hide-hover" src="../assets/icons/remove-favourite.svg" />
              <img class="show-hover" src="../assets/icons/remove-favourite-hover.svg" />
              <img class="show-focus" src="../assets/icons/remove-favourite-focus.svg" />
              <span>{{ $t('favorite_job.remove_favourite') }}</span>
            </div>
          </div>
          <div class="favourite-item__right">
            <div class="d-flex justify-between">
              <div class="d-flex">
                <span class="favourite-name">{{ `${item.first_name || ''} ${item.last_name || ''}` }}</span>
                <span class="favourite-age">{{ formatAge(item.age) }}</span>
                <span v-if="item.be_deleted" class="show-deleted">{{ $t('common.deleted') }}</span>
              </div>
              <div v-if="item.be_deleted">
                <el-button class="job-chat__button">
                  <img src="../assets/icons/top-message-disable.svg" />
                  <span class="favourite-text">{{ $t('my_page.chat') }}</span>
                </el-button>
              </div>
              <div v-else>
                <el-button class="job-chat__button" @click.stop="chatUser(item.id)">
                  <img class="hide-hover" src="../assets/icons/top-message.svg" />
                  <img class="show-focus" src="../assets/icons/top-message-focus.png" />
                  <span class="favourite-text">{{ $t('my_page.chat') }}</span>
                </el-button>
              </div>
            </div>
            <div class="show-sp">
              <span class="favourite-last-login">{{ formatLastLogin(item.last_login_at) }}</span>
            </div>
            <div class="d-flex user-info-icon">
              <div class="d-flex">
                <img src="../assets/icons/map_small.svg" />
                <span class="top-detail">{{ item.user_address }}</span>
              </div>
              <div class="d-flex">
                <img src="../assets/icons/phone_small.svg" />
                <span class="top-detail">{{ item.tel }}</span>
              </div>
              <div class="d-flex">
                <img src="../assets/icons/mail_small.svg" />
                <span class="top-detail">{{ item.email }}</span>
              </div>
            </div>
            <div class="favourite-table">
              <div class="favourite-col">
                <div class="favourite-first">{{ $t('desired_condition.position') }}</div>
                <div class="favourite-second">{{ item.job_types }}</div>
              </div>
              <div class="favourite-col">
                <div class="favourite-first">{{ $t('desired_condition.salary') }}</div>
                <div class="favourite-second">{{ item.salary }}</div>
              </div>
              <div class="favourite-col">
                <div class="favourite-first">{{ $t('desired_condition.experience') }}</div>
                <div class="favourite-second">{{ item.job_experiences }}</div>
              </div>
              <div class="favourite-col">
                <div class="favourite-first">{{ $t('desired_condition.location') }}</div>
                <div class="favourite-second">{{ item.address }}</div>
              </div>
              <div class="favourite-col">
                <div class="favourite-first">{{ $t('desired_condition.type') }}</div>
                <div class="favourite-second">{{ item.work_types }}</div>
              </div>
              <div class="favourite-col">
                <div class="favourite-first">{{ $t('desired_condition.features') }}</div>
                <div class="favourite-second">{{ item.job_features }}</div>
              </div>
            </div>
            <div class="show-sp">
              <div class="favourite-remove link-text" @click.stop="removeConfirm(item.id)">
                <img class="hide-hover" src="../assets/icons/remove-favourite.svg" />
                <img class="show-hover" src="../assets/icons/remove-favourite-hover.svg" />
                <img class="show-focus" src="../assets/icons/remove-favourite-focus.svg" />
                <span>{{ $t('favorite_job.remove_favourite') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="no-data-box">
        <NoDataElement :text="$t('common.no_data_favourite')" />
      </div>
      <div v-if="(favouriteList.length && total > 10)" class="favourite-pagination d-flex justify-end">
        <PaginationElement :current-page="currentPage" :last-page="lastPage" @change="changePage" />
      </div>
    </div>
    <el-dialog class="popup-confirm" :visible.sync="dialogCancel" width="570px">
      <div class="image-confirm text-center">
        <img src="/assets/icon/Cancel.svg" alt="">
      </div>
      <div class="content-confirm text-center">
        {{ $t('content.CON_REMOVE_USER') }}
      </div>
      <div slot="footer" class="dialog-footer text-center">
        <el-button @click="dialogCancel = false">{{ $t('confirm_modal.no') }}</el-button>
        <el-button type="danger" @click="remove(userActive)">{{ $t('confirm_modal.yes') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  INDEX_SET_ERROR,
  USER_FAVOURITE_LIST,
  USER_FAVOURITE,
  INDEX_SET_TITLE_MENU,
  JOB_ALL_STORE
} from '../store/store.const'
import NoDataElement from '../components/element-ui/NoDataElement.vue'
import PaginationElement from '../components/element-ui/PaginationElement.vue'

export default {
  name: 'IndexPage',
  components: { NoDataElement, PaginationElement },
  data() {
    return {
      userExample: require('../assets/images/user.png'),
      total: 0,
      favouriteList: [],
      listStores: [],
      currentPage: 1,
      lastPage: 1,
      dialogCancel: false,
      userActive: ''
    }
  },
  computed: {
    countPage() {
      let countMaxMin = ''
      if (this.total < 10) {
        countMaxMin = this.$t('common.display_item', { min: 1, max: this.total })
      } else countMaxMin = this.$t('common.display_item', { min: this.currentPage > 1 ? `${this.currentPage - 1}1` : this.currentPage, max: this.favouriteList.length < 10 ? `${this.currentPage - 1}${this.favouriteList.length}` : this.currentPage * this.favouriteList.length })
      return countMaxMin
    }
  },
  async created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, { title: this.$t('page.my_page'), subTitle: 'My page' })
    await this.getFavouriteList()
    await this.getAllStore()
  },
  methods: {
    async getAllStore() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const response = await this.$store.dispatch(JOB_ALL_STORE)
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
    postalCodeFormat(num) {
      if (num) {
        const format = num.toString().replace(/-/g, '')
        return format.toString().slice(0, 3) + '-' + format.toString().slice(3)
      }
      return ''
    },
    phoneFormat(phone) {
      return phone ? phone.toString().replace(/-/g, '') : ''
    },
    convertData(data) {
      return data.map((item) => {
        return Object.keys(item).reduce((arr, key) => {
          if (item[key]) {
            switch (key) {
              case 'job_types':
              case 'job_experiences':
              case 'work_types':
              case 'job_features':
                item[key] = item[key].map(k => k.name).join('、')
                break
              case 'user_address':
                item[key] = item[key].province_name ? `${item[key].postal_code ? `〒${this.postalCodeFormat(item[key].postal_code)}` : ''} ${item[key].province_name || ''}${item[key].province_city_name || ''}${item[key].address || ''}${item[key].building || ''}` : ''
                break
              case 'tel':
                item[key] = this.phoneFormat(item[key])
                break
              case 'address':
                item[key] = item[key].province_name
                break
              case 'salary':
                if (!item[key].salary_max && !item[key].salary_min) {
                  item[key] = ''
                } else if (!item[key].salary_min) {
                  item[key] = `～${item[key].salary_max}${item[key].salary_type}`
                } else if (!item[key].salary_max) {
                  item[key] = `${item[key].salary_min}～${item[key].salary_type}`
                } else item[key] = `${item[key].salary_min}～${item[key].salary_max}${item[key].salary_type}`
                break
              default:
                return item
            }
          }
          return JSON.parse(JSON.stringify(item))
        }, {})
      })
    },
    formatAge(age) {
      return age ? `(${age}歳)` : ''
    },
    formatLastLogin(time) {
      return `${this.$t('login.last_login')}: ${time || ''}`
    },
    async changePage(page) {
      this.currentPage = page
      await this.getFavouriteList()
    },
    async getFavouriteList() {
      try {
        const param = `?page=${this.currentPage}`
        await this.$store.commit(INDEX_SET_LOADING, true)
        const data = await this.$store.dispatch(USER_FAVOURITE_LIST, param)
        const dataApi = data.data
        switch (data.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: data.messages
            })
            this.lastPage = dataApi.total_page
            this.total = dataApi.total
            this.currentPage = dataApi.current_page
            this.favouriteList = this.convertData(dataApi.data)
            if ((this.listStores.length === 0) && (this.currentPage > 1)) {
              await this.changePage(this.lastPage)
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
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    removeConfirm(id) {
      this.userActive = id
      this.dialogCancel = true
    },
    chatUser(id) {
      if (!this.listStores.length) {
        this.$confirm(this.$t('content.CON_023'), {
          confirmButtonText: this.$t('confirm_modal.yes'),
          cancelButtonText: this.$t('confirm_modal.no'),
          type: 'warning'
        })
          .then(_ => {
            this.$router.push('/register-store')
          })
          .catch(_ => {})
      } else {
        this.$router.push(`/other/chat?user_id=${id}`)
      }
    },
    async remove(id) {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const dto = {
          user_id: id,
          action_type: 0
        }
        const data = await this.$store.dispatch(USER_FAVOURITE, dto)
        switch (data.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: data.messages
            })
            await this.getFavouriteList()
            this.dialogCancel = false
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
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
