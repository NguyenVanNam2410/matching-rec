<template>
  <div class="header">
    <div class="header-pc">
      <div class="d-flex justify-between">
        <div class="header-logo">
          <img class="vamps-logo cursor-pointer" src="../../assets/icons/logo.svg" @click="$router.push('/')"/>
        </div>
        <div class="header-container">
          <div class="header-content cursor-pointer" @click="$router.push('/other/notification-history')">
            <div class="relative">
              <img src="../../assets/icons/bell-header.svg" />
              <div v-if="notification !== 0" class="header-content__noti">{{ notificationsCount || notification }}</div>
            </div>
            <span class="header-content__text">{{ $t('header.notification') }}</span>
          </div>
          <div class="header-content cursor-pointer" @click="handleChat">
            <div class="relative">
              <img src="../../assets/icons/message-header.svg" />
              <div v-if="chat !== 0" class="header-content__noti">{{ chat }}</div>
            </div>
            <span class="header-content__text">{{ $t('my_page.chat') }}</span>
          </div>
          <el-dropdown trigger="click">
            <div class="header-dropdown">
              <img src="../../assets/icons/avatar-header.svg" />
              <img class="caret" src="../../assets/icons/caret-header.svg" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div class="header-dropdown" @click="logout">
                  <img src="../../assets/icons/logout-header.svg" />
                  <span>{{ $t('login.logout') }}</span>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="header-sp show-content-header-sp">
      <div class="d-flex items-center" @click="$router.push('/')">
        <img class="logo" src="../../assets/icons/logo.svg" />
      </div>
      <div v-show="!checkShowViewSp" class="header-right d-flex items-center">
        <div class="header-item" @click="$router.push('/other/notification-history')">
          <div class="relative">
            <img src="../../assets/icons/bell-header-black.svg" />
            <div v-if="notification" class="count-item"></div>
          </div>
          <span>{{ $t('header.notification') }}</span>
        </div>
        <div class="header-item" @click="$router.push('/other/chat')">
          <div class="relative">
            <img src="../../assets/icons/message-header-black.svg" />
            <div v-if="chat" class="count-item"></div>
          </div>
          <span>{{ $t('my_page.chat') }}</span>
        </div>
        <div class="header-item" @click="showMenu = true">
          <img src="../../assets/icons/menu-header-sp.svg" />
          <span>{{ $t('common.menu') }}</span>
        </div>
      </div>
      <div v-show="checkShowViewSp">
          <div class="show-view" @click="changeState">
            <img src="/assets/icon/icon_show_view_list.svg" />
          </div>
        </div>
    </div>
    <div class="header-sp show-header-sp"></div>
    <div v-show="checkShowViewSp">
      <div class="footer-show-view show-sp">
        <div class="footer-content">
          <div class="item-menu item-home" @click="$router.push('/')">
            <img v-if="checkActive('index')" src="/assets/icon/icon_menu_home_active.svg" alt="">
            <img v-else src="/assets/icon/icon_menu_home.svg" alt="">
            <span :class="checkActive('index') ? 'span-active' : ''">{{ $t('page.home') }}</span>
          </div>
          <div class="item-menu item-notification" @click="$router.push('/other/notification-history')">
            <div v-if="notificationsCount || notification" class="count-item"></div>
            <img v-if="checkActive('notification')" src="/assets/icon/icon_menu_notification_active.svg" alt="">
            <img v-else src="/assets/icon/icon_menu_notification.svg" alt="">
            <span :class="checkActive('notification') ? 'span-active' : ''">{{ $t('header.notification') }}</span>
          </div>
          <div class="item-menu item-chat" @click="handleChat">
            <div v-if="chat" class="count-item"></div>
            <img v-if="checkActive('chat')" src="/assets/icon/icon_menu_chat_active.svg" alt="">
            <img v-else src="/assets/icon/icon_menu_chat.svg" alt="">
            <span :class="checkActive('chat') ? 'span-active' : ''">{{ $t('my_page.chat') }}</span>
          </div>
          <div class="item-menu item-menu" @click="showMenu = true">
            <img v-if="checkActive('menu')" src="/assets/icon/icon_menu_menu.svg" alt="">
            <img v-else src="/assets/icon/icon_menu_menu.svg" alt="">
            <span :class="checkActive('menu') ? 'span-active' : ''">{{ $t('common.menu') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!checkShowBanner">
      <BannerElement :banner="titleMenu.title ? titleMenu.title : $t('header.top')" :title="titleMenu.subTitle ? titleMenu.subTitle : ''" />
    </div>
    <div class="show-draw">
      <el-drawer
        :visible.sync="showMenu"
        direction="rtl"
        size="75%">
        <div class="close-button" @click="showMenu = false">
          <button aria-label="close drawer" type="button" class="el-drawer__close-btn">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <SideBar @change="showMenu = false"/>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  INDEX_SET_ERROR,
  COUNT_NOTIFY,
  INDEX_SET_TITLE_MENU,
  JOB_ALL_STORE,
  SET_SHOW_VIEW_SP, GET_COUNT_CHAT
} from '../../store/store.const'
import BannerElement from './BannerElement'
import SideBar from './SideBar'

export default {
  name: 'HeaderCommon',
  components: { BannerElement, SideBar },
  data() {
    return {
      listStores: [],
      notification: '',
      chat: 0,
      showMenu: false,
      isCollapse: false,
      activeIndex: ''
    }
  },
  computed: {
    ...mapState({
      notificationsCount: state => state.notificationsCount,
      titleMenu: state => state.titleMenu,
      stateMenu: state => state.stateMenu,
      showViewSp: state => state.showViewSp
    }),
    checkShowViewSp() {
      return ((this.$route.path === '/') && this.showViewSp)
    },
    checkShowBanner() {
      return ['/other/inquiry', '/other/chat', '/other/company-profile', '/other/faq', '/other/privacy-policy', '/other/terms-of-service', '/interview-calendar', '/404-not-found'].includes(this.$route.path)
    }
  },
  async created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, { title: this.$t('header.top'), subTitle: 'home' })
    try {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const res = await this.$store.dispatch(COUNT_NOTIFY)
      const count = res.data.count
      switch (res.status_code) {
        case 200:
          this.$store.commit(INDEX_SET_SUCCESS, {
            show: true,
            text: res.messages
          })
          count > 99 ? this.notification = '99+' : this.notification = count
          break
        default:
          this.$store.commit(INDEX_SET_ERROR, { show: true, text: res.messages })
          break
      }
    } catch {
      await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
    }
    await this.$store.commit(INDEX_SET_LOADING, false)
    await this.getAllStore()
    await this.getCountChat()
  },
  methods: {
    async logout() {
      await this.$router.push('/logout')
    },
    changeState() {
      this.$store.commit(SET_SHOW_VIEW_SP, false)
    },
    handleChat() {
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
        this.$router.push('/other/chat')
      }
    },
    checkActive(key) {
      return this.$route.name === key
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
    async getCountChat() {
      const response = await this.$store.dispatch(GET_COUNT_CHAT)
      switch (response.status_code) {
        case 200:
          this.chat = response.data.total_unread
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
