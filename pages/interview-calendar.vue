<template>
  <div class="interview-calendar-page">
    <div class="job-breadcrumb breadcrumb-header d-flex justify-between">
      <div class="d-flex items-center">
        <span class="breadcrumb-previous" @click="$router.push('/')">{{ $t('my_page.top_page') }}</span>
        <span class="breadcrumb-point d-flex items-center"><img src="/assets/icon/icon_next.svg" alt=""></span>
        <span class="breadcrumb-current">{{ $t('page.interview_calendar') }}</span>
      </div>
      <div v-if="$route.name === 'interview-calendar'" class="show-sp">
        <SelectStoreElement></SelectStoreElement>
      </div>
      <div class="interview-calendar-header">
        <div v-if="checkWeekNow" class="icon-prev disabled">
          <img src="/assets/icon/icon_next_disabled.svg" alt="">
        </div>
        <div v-else class="icon-prev" @click="changeDate(false)">
          <img src="/assets/icon/icon_next_blue.svg" alt="">
        </div>
        <div class="interview-time">
          <span>{{ showDateWeek }}</span>
        </div>
        <div v-if="listStoreActives.length" class="icon-next" @click="changeDate(true)">
          <img src="/assets/icon/icon_next_blue.svg" alt="">
        </div>
        <div v-else class="icon-next disabled">
          <img src="/assets/icon/icon_next_disabled.svg" alt="">
        </div>
      </div>
    </div>
    <div class="interview-content">
      <div class="interview-calendar-content">
        <table v-if="Object.keys(dataCalendar).length">
          <thead>
            <tr>
              <th class="form-first"></th>
              <th
                v-for="(date, index) in dataCalendar"
                :key="index"
                :class="['date-header status-header-date-' + date.status + ((date.dayStatus === 0) ? '' : ' cursor-pointer') ]"
                @click="changeStatusDay(date)"
              >
                <span class="show-pc">{{ index }}</span>
                <span class="show-sp">{{ showDateSp(index) }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(time, key) in listTime" :key="key">
              <td :class="['interview-table-time', time.slice(-2) === '00' ? 'bold-time' : '']">
                <div>{{ time }}</div>
              </td>
              <td v-for="(date, index) in dataCalendar" :key="index" :class="listStoreActives.length === 1 ? ['form-date status-date-' + date[time].status] : 'form-date'"
                  @click="clickDay(date, time)">
                <div v-if="listStoreActives.length">
                  <div class="user-name-div show-pc">
                    <div v-if="date[time].status === 4" class="d-flex">
                      <div v-for="(item, index) in date[time].application_users" :key="item.id" @click.stop="clickUser(item)">
                        <span v-if="index < 2" class="name cursor-pointer" :style="{background: item.hex_color}" >{{ item.text }}</span>
                      </div>
                      <span v-if="date[time].application_users.length > 2" class="other cursor-pointer" @click.stop="showDetailUser(index, date[time].application_users)">+{{ date[time].application_users.length - 2 }}</span>
                    </div>
                  </div>
                  <div class="user-name-div show-sp">
                    <div v-if="date[time].status === 4">
                      <span class="other" @click.stop="showDetailUser(index, date[time].application_users)">+{{ date[time].application_users.length }}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <el-dialog class="form-confirm" :visible.sync="dialogConfirm" width="570px">
      <div class="form-content">
        <img src="/assets/icon/icon_confirm.svg" alt="">
        <div class="confirm-content">{{ $t('interview_calendar.popup_confirm_content') }}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button plain @click="dialogConfirm = false">{{ $t('button.cancel') }}</el-button>
        <el-button type="danger" @click="update(1)">{{ $t('button.set') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog class="form-confirm" :visible.sync="dialogCancel" width="570px">
      <div class="form-content">
        <img src="/assets/icon/icon_confirm.svg" alt="">
        <div class="confirm-content">{{ $t('interview_calendar.popup_cancel_content') }}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button plain @click="dialogCancel = false">{{ $t('button.cancel') }}</el-button>
        <el-button type="danger" @click="update(0)">{{ $t('button.delete') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog class="form-confirm" :visible.sync="dialogConfirmDay" width="570px">
      <div class="form-content">
        <img src="/assets/icon/icon_confirm.svg" alt="">
        <div class="confirm-content">{{ (dayActive.dayStatus === 1) ? $t('content.CON_011') : $t('content.CON_012') }}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button plain @click="dialogConfirmDay = false">{{ $t('button.cancel') }}</el-button>
        <el-button type="danger" @click="updateDay">{{ $t('button.set') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog class="form-popup" :visible.sync="showPopupDetail" width="210px" :title="showDetail.date">
      <div v-for="(user, index) in showDetail.listUser" class="show-user-item" :key="index">
        <div class="show-user-detail cursor-pointer" :style="{ background: user.hex_color }" @click="clickUser(user)">{{ user.text }}</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import {
  GET_LIST_STORE,
  INDEX_SET_ERROR,
  INDEX_SET_LOADING, INDEX_SET_SUCCESS,
  INTERVIEW_SCHEDULE_DAY_UPDATE,
  INTERVIEW_SCHEDULE_LIST,
  INTERVIEW_SCHEDULE_UPDATE,
  JOB_ALL_STORE
} from '../store/store.const'
import SelectStoreElement from '../components/layout/SelectStoreElement'

export default {
  name: 'InterviewCalendarPage',
  components: { SelectStoreElement },
  data() {
    const date = new Date()
    const today = date.getDate()
    const currentDay = date.getDay()
    const newDate = date.setDate(today - (currentDay || 7))
    const getDayStartWeek = new Date(newDate)
    return {
      data: {},
      listDataDate: {},
      listDate: [],
      listTime: [],
      dataCalendar: {},
      dataCalendarSp: ['（日）', '（月）', '（火）', '（水）', '（木）', '（金）', '（土）'],
      dialogConfirmDay: false,
      dialogConfirm: false,
      dialogCancel: false,
      startDate: getDayStartWeek,
      dateActive: {},
      dayActive: {},
      storeId: '',
      listStores: [],
      showPopupDetail: false,
      showDetail: {
        date: '',
        listUser: []
      },
      listDateInWeek: {
        1: '日',
        2: '月',
        3: '火',
        4: '水',
        5: '木',
        6: '金',
        7: '土'
      }
    }
  },
  computed: {
    ...mapState({
      storeIds: state => state.interview_schedule.storeIds,
      listStoreActives: state => state.listStoreActives
    }),
    showDateWeek() {
      const endDate = new Date(this.startDate.valueOf())
      endDate.setDate(endDate.getDate() + 6)
      return this.showDate(this.startDate) + '～' + this.showDate(endDate)
    },
    checkWeekNow() {
      if (this.listStoreActives.length) {
        const startDate = new Date(this.startDate.valueOf())
        const date = new Date()
        return startDate <= date
      }
      return true
    },
    calendarDefault() {
      const calendar = {}
      const date = this.startDate
      const now = new Date().toISOString().split('T')[0]
      for (let i = 1; i <= 7; i++) {
        const endDate = new Date(date.valueOf())
        endDate.setDate(endDate.getDate() + (i - 1))
        const day = ('0' + endDate.toLocaleString('en', { month: 'numeric' })).slice(-2) + '月' + ('0' + endDate.toLocaleString('en', { day: 'numeric' })).slice(-2) + '日' + ' （' + this.listDateInWeek[i] + '）'
        const dataDate = this.getListTimeData()
        dataDate.dayStatus = 0
        dataDate.status = (i === 1 || i === 7) ? 3 : 1
        if (now === endDate.toISOString().split('T')[0]) {
          dataDate.status = 2
        }
        calendar[day] = dataDate
      }
      return calendar
    }
  },
  watch: {
    listStoreActives: {
      handler() {
        this.getListApplication()
      },
      deep: true
    }
  },
  async created() {
    this.getListDate()
    this.getListTime()
    await this.getAllStores()
    await this.getListApplication()
    await this.$store.commit(GET_LIST_STORE, this.listStores)
  },
  methods: {
    async getAllStores() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const response = await this.$store.dispatch(JOB_ALL_STORE)
      switch (response.status_code) {
        case 200:
          this.listStores = response.data
          if (this.listStores.length) {
            this.storeId = response.data[0].id
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
            text: response.messages
          })
          break
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    getListDate() {
      const data = {}
      this.listDate.forEach(date => {
        data[date] = { status: [1, 2, 3][Math.floor(Math.random() * 3)] }
      })
      this.listDataDate = data
    },
    showDate(value) {
      return `${value.toLocaleString('en', { year: 'numeric' })}年${value.toLocaleString('en', { month: 'numeric' })}月${value.toLocaleString('en', { day: 'numeric' })}日`
    },
    getListTimeData() {
      const data = {}
      this.listTime.forEach(time => {
        data[time] = {
          application_users: [],
          status: 1
        }
      })
      return data
    },
    getListTime() {
      const data = []
      for (let x = 9; x < 21; x++) {
        if (x < 10) {
          data.push('0' + x + ':00')
          data.push('0' + x + ':30')
        } else {
          data.push(x + ':00')
          data.push(x + ':30')
        }
      }
      data.push('21:00')
      this.listTime = data
    },
    changeDate(state) {
      const date = new Date(this.startDate.valueOf())
      date.setDate(date.getDate() + (state ? 7 : -7))
      this.startDate = date
      this.getListApplication()
    },
    checkStatusTime(value) {
      if (value.is_past) {
        return 1
      }
      if (value.is_good) {
        return 2
      }
      if (value.is_not_good) {
        return 3
      }
      return 4
    },
    async getListApplication() {
      if (this.storeIds.length) {
        await this.$store.commit(INDEX_SET_LOADING, true)
        let store_id_param = ''
        let key = 0
        this.storeIds.forEach(id => {
          store_id_param = store_id_param + '&store_ids[' + key + ']=' + id
          key++
        })
        const param = `start_date=${this.startDate.toISOString().split('T')[0]}${store_id_param}`
        const dataResponse = await this.$store.dispatch(INTERVIEW_SCHEDULE_LIST, param)
        const data = {}
        const now = new Date().toISOString().split('T')[0]
        switch (dataResponse.status_code) {
          case 200:
            dataResponse.data.forEach((date, index) => {
              const dataDate = {}
              let checkStatus = 0
              date.times.forEach(time => {
                const statusTime = this.checkStatusTime(time)
                dataDate[time.hours] = {
                  status: statusTime,
                  application_users: []
                }
                time.application_users.forEach(user => {
                  dataDate[time.hours].application_users.push({
                    text: user.name,
                    user_id: user.user_id,
                    applier_id: user.id,
                    hex_color: user.hex_color
                  })
                })
                if (statusTime === 2) {
                  checkStatus = 1
                }
                if ((statusTime === 3) && (checkStatus !== 1)) {
                  checkStatus = 2
                }
              })
              dataDate.date = date.date
              dataDate.dayStatus = checkStatus
              dataDate.status = (index === 0 || index === 6) ? 3 : 1
              if (now === date.date) {
                dataDate.status = 2
              }
              data[date.date_format] = dataDate
            })
            this.dataCalendar = data
            break
          case 422:
            for (const [key] of Object.entries(data.data)) {
              await this.$store.commit(INDEX_SET_ERROR, {
                show: true,
                text: data.data[key][0]
              })
            }
            break
          case 401:
            await this.$store.commit(INDEX_SET_ERROR, {
              show: true,
              text: dataResponse.messages
            })
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
      } else {
        this.dataCalendar = this.calendarDefault
      }
    },
    async update(state) {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataForm = {
        date: this.dateActive.date,
        hours: this.dateActive.time,
        store_id: this.listStoreActives[0],
        is_has_interview: state
      }
      const dataResponse = await this.$store.dispatch(INTERVIEW_SCHEDULE_UPDATE, dataForm)
      switch (dataResponse.status_code) {
        case 200:
          this.dialogConfirm = false
          this.dialogCancel = false
          await this.getListApplication()
          await this.$store.commit(INDEX_SET_SUCCESS, {
            show: true,
            text: dataResponse.messages
          })
          break
        case 401:
          await this.$store.commit(INDEX_SET_ERROR, {
            show: true,
            text: dataResponse.messages
          })
          this.$auth.logout()
          break
        case 422:
          for (const [key] of Object.entries(dataResponse.data)) {
            await this.$store.commit(INDEX_SET_ERROR, {
              show: true,
              text: dataResponse.data[key][0]
            })
          }
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
    async updateDay() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataForm = {
        date: this.dayActive.date,
        store_id: this.listStoreActives[0]
      }
      const dataResponse = await this.$store.dispatch(INTERVIEW_SCHEDULE_DAY_UPDATE, dataForm)
      switch (dataResponse.status_code) {
        case 200:
          this.dialogConfirmDay = false
          await this.getListApplication()
          await this.$store.commit(INDEX_SET_SUCCESS, {
            show: true,
            text: dataResponse.messages
          })
          break
        case 422:
          for (const [key] of Object.entries(dataResponse.data)) {
            await this.$store.commit(INDEX_SET_ERROR, {
              show: true,
              text: dataResponse.data[key][0]
            })
          }
          break
        case 401:
          await this.$store.commit(INDEX_SET_ERROR, {
            show: true,
            text: dataResponse.messages
          })
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
    changeStatus(date, time, storeId) {
      this.dateActive = { date: date.date, time, storeId }
      switch (date[time].status) {
        case 2:
          this.dialogConfirm = true
          break
        case 3:
          this.dialogCancel = true
          break
      }
    },
    changeStatusDay(date) {
      if (date.dayStatus !== 0 && (this.listStoreActives.length === 1)) {
        this.dayActive = date
        this.dialogConfirmDay = true
      }
    },
    showDateSp(value) {
      const data = value.split('（')
      return '（' + data[1]
    },
    clickDay(date, time) {
      if (this.listStoreActives.length === 1) {
        if (date[time].status !== 4) {
          this.changeStatus(date, time, this.listStoreActives[0])
        }
      }
    },
    clickUser(item) {
      this.$router.push('/application/' + item.applier_id)
    },
    showDetailUser(date, user) {
      this.showDetail = { date, listUser: user }
      this.showPopupDetail = true
    }
  }
}
</script>
