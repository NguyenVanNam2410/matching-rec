<template>
  <div class="job">
    <div class="job-pc">
      <div class="d-flex justify-between">
        <div class="job-breadcrumb">
          <span class="breadcrumb-previous" @click="$router.push('/')">{{ $t('my_page.top_page') }}</span>
          <img class="breadcrumb-arrow" src="../../assets/icons/breadcrumb-arrow.svg" />
          <span class="breadcrumb-current">{{ $t('my_page.job_seeker_details') }}</span>
        </div>
        <div class="job-chat">
          <el-button v-if="!detail.is_favorite" class="job-chat__button__favorite relative" type="secondary" @click="postFavourite(detail.id, detail.is_favorite)">
            <img class="img-btn" src="../../assets/icons/favorite.svg" />
            <span class="pl-25">{{ $t('home.job_favorite') }}</span>
          </el-button>
          <el-button v-else class="job-chat__button__favorite not-favourite relative" type="secondary" @click="postFavourite(detail.id, detail.is_favorite)">
            <img class="img-btn" src="../../assets/icons/top-heart-white.svg" />
            <span class="pl-25">{{ $t('home.job_favorite') }}</span>
          </el-button>
          <el-button class="job-chat__button" type="danger" @click="chatUser(param)" :disabled="userDelete">
            <img src="../../assets/icons/detail-message.svg" />
            <span class="job-text">{{ $t('my_page.chat') }}</span>
          </el-button>
        </div>
      </div>
      <div v-if="userDelete" class="job-tabs">
        <div class="user-detail-delete">{{ $t('no_data.user_detail_delete') }}</div>
      </div>
      <div v-else class="job-tabs">
        <el-tabs type="card" v-model="tabIndex" @tab-click="getInfo">
          <el-tab-pane v-for="(Item, index) in tabsData" :label="Item.label" :key="String(index)">
            <component :tabIndex="tabIndex" :detail="detail" :userId="param" :is="Item.component"></component>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="job-sp">
      <div class="d-flex justify-between items-center job-spacing">
        <div @click="$router.push('/')" class="d-flex items-center cursor-pointer">
          <img src="../../assets/icons/prev_mobile.svg" />
          <span class="breadcrumb-current">{{ $t('my_page.job_seeker_details') }}</span>
        </div>
        <div class="job-chat">
          <el-button class="job-chat__button" type="danger" @click="chatUser(param)">
            <img src="../../assets/icons/ellipse_mobile.svg" />
            <span class="job-text">{{ $t('my_page.chat') }}</span>
          </el-button>
        </div>
      </div>
      <div class="job-tabs">
        <el-tabs type="card" v-model="tabIndex" @tab-click="getInfo">
          <el-tab-pane v-for="(Item, index) in tabsData" :key="String(index)">
            <span slot="label">
              <img :src="Item.icon" />
            </span>
            <component :tabIndex="tabIndex" :detail="detail" :userId="param" :is="Item.component"></component>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import {
  APPLICATION_USER,
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  USER_DETAIL,
  INDEX_SET_TITLE_MENU,
  JOB_ALL_STORE,
  USER_FAVOURITE
} from '../../store/store.const'
import BasicInformation from '@/components/details/BasicInformation.vue'
import EducationBackground from '@/components/details/EducationBackground.vue'
import JobCareer from '@/components/details/JobCareer.vue'
import Motivation from '@/components/details/Motivation.vue'
import Qualification from '@/components/details/Qualification.vue'
import SelfPr from '@/components/details/SelfPr.vue'

export default {
  name: 'JobDetail',
  asyncData({ params }) {
    const param = params.details
    return { param }
  },
  components: { BasicInformation, JobCareer, SelfPr, EducationBackground, Qualification, Motivation },
  data() {
    return {
      userId: this.$route.params.details,
      tabsData: [
        {
          label: this.$t('my_page.basic_information'),
          icon: require('../../assets/icons/tab-1.svg'),
          component: BasicInformation
        },
        {
          label: this.$t('my_page.job_career'),
          icon: require('../../assets/icons/tab-2.svg'),
          component: JobCareer
        },
        {
          label: this.$t('my_page.self_pr'),
          icon: require('../../assets/icons/tab-3.svg'),
          component: SelfPr
        },
        {
          label: this.$t('my_page.education_background'),
          icon: require('../../assets/icons/tab-4.svg'),
          component: EducationBackground
        },
        {
          label: this.$t('my_page.qualification'),
          icon: require('../../assets/icons/tab-5.svg'),
          component: Qualification
        },
        {
          label: this.$t('my_page.motivation'),
          icon: require('../../assets/icons/tab-6.svg'),
          component: Motivation
        }
      ],
      tabIndex: '0',
      detail: [],
      userDelete: true,
      listStores: []
    }
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, { title: this.$t('application.application_title'), subTitle: 'Job Seeker Information' })
    this.getInfo()
    this.getAllStore()
  },
  methods: {
    async getInfo() {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        let data = {}
        if (this.$route.query.application) {
          data = await this.$store.dispatch(APPLICATION_USER, this.$route.query.application)
        } else {
          data = await this.$store.dispatch(USER_DETAIL, this.userId)
        }
        switch (data.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: data.messages
            })
            this.detail = data.data
            this.userDelete = false
            break
          case 400:
            this.userDelete = true
            break
          case 404:
            await this.$router.push('/404-not-found')
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
    async postFavourite(id, status) {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const dto = {
          user_id: id,
          action_type: Number(!status)
        }
        const data = await this.$store.dispatch(USER_FAVOURITE, dto)
        switch (data.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: data.messages
            })
            await this.getInfo()
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
    }
  }
}
</script>
