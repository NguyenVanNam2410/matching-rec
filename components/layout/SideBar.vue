<template>
  <div class="sidebar-element">
    <el-menu
      :default-active="activeIndex"
      :collapse-transition="false"
      :collapse="isCollapse"
      class="sidebar sidebar-pc"
      @select="selectMenu"
    >
      <el-menu-item index="1" @click="changeToLink('/')">
        <span class="sidebar-label">{{ $t('my_page.top_page') }}</span>
      </el-menu-item>
      <el-menu-item index="2" @click="changeToLink('/list-job')">
        <span class="sidebar-label">{{ $t('my_page.job_list') }}</span>
      </el-menu-item>
      <el-menu-item index="3" @click="changeToLink('/store-management')">
        <span class="sidebar-label">{{ $t('my_page.store_management') }}</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <span class="sidebar-label">{{ $t('my_page.application_management') }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1" @click="changeToLink('/application-list')">
            <span class="sidebar-label">{{ $t('my_page.application_list') }}</span>
          </el-menu-item>
          <el-menu-item index="4-2" @click="changeToLink('/interview-calendar')">
            <span class="sidebar-label">{{ $t('my_page.interview_calendar') }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <span class="sidebar-label">{{ $t('page.my_page') }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1" @click="changeToLink('/basic-information')">
            <span class="sidebar-label">{{ $t('my_page.basic_information') }}</span>
          </el-menu-item>
          <el-menu-item index="5-2" @click="changeToLink('/change-password')">
            <span class="sidebar-label">{{ $t('login.change_password') }}</span>
          </el-menu-item>
          <el-menu-item index="5-3" @click="changeToLink('/favourite-users')">
            <span class="sidebar-label">{{ $t('favorite_job.sidebar_title') }}</span>
          </el-menu-item>
          <el-menu-item index="5-4" @click="changeToLink('/notification-settings')">
            <span class="sidebar-label">{{ $t('my_page.notification_settings') }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="6" class="show-sp" @click="changeToLink('/logout')">
        <span class="sidebar-label">{{ $t('login.logout') }}</span>
      </el-menu-item>
      <div v-if="$route.name === 'interview-calendar'" class="show-pc">
        <SelectStoreElement></SelectStoreElement>
      </div>
    </el-menu>
  </div>
</template>
<script>
import moment from 'moment'
import { mapState } from 'vuex'
import {
  SET_LIST_STORE_ACTIVES,
  GET_STORE_IDS,
  INDEX_SET_LOADING,
  INDEX_SET_SIDEBAR_IS_COLLAPSE
} from '../../store/store.const'
import { SIDE_BAR_INDEX } from '../../constants/store'
import SelectStoreElement from './SelectStoreElement'
moment.locale('ja')
const otherPaths = 'other'
const sideBar = [
  {
    index: '1',
    name: 'index'
  },
  {
    index: '1',
    name: 'user-details-details'
  },
  {
    index: '2',
    name: 'list-job'
  },
  {
    index: '2',
    name: 'job-register'
  },
  {
    index: '2',
    name: 'job-slug'
  },
  {
    index: '2',
    name: 'job-edit-slug'
  },
  {
    index: '3',
    name: 'store-management'
  },
  {
    index: '3',
    name: 'register-store'
  },
  {
    index: '3',
    name: 'edit-store-edit'
  },
  {
    index: '3',
    name: 'store-details-details'
  },
  {
    index: '4-1',
    name: 'application-list'
  },
  {
    index: '4-1',
    name: 'application-detail'
  },
  {
    index: '4-1',
    name: 'application-slug'
  },
  {
    index: '4-2',
    name: 'interview-calendar'
  },
  {
    index: '5-1',
    name: 'basic-information'
  },
  {
    index: '5-1',
    name: 'edit-basic-information'
  },
  {
    index: '5-2',
    name: 'change-password'
  },
  {
    index: '5-3',
    name: 'favourite-users'
  },
  {
    index: '5-4',
    name: 'notification-settings'
  }
]
export default {
  name: 'SideBar',
  components: { SelectStoreElement },
  data() {
    return {
      isCollapse: false,
      checkAll: true,
      activeIndex: '',
      storeIds: [],
      allStoreIds: []
    }
  },
  computed: {
    ...mapState({
      stateMenu: state => state.stateMenu,
      listStores: state => state.listStores,
      listStoreActives: state => state.listStoreActives
    })
  },
  watch: {
    $route(to) {
      if (to.name && to.name.includes(otherPaths)) {
        this.activeIndex = ''
        this.$cookies.remove(SIDE_BAR_INDEX)
      } else {
        const sideBarItem = sideBar.find(item => item.name === this.$route.name)
        this.activeIndex = sideBarItem ? sideBarItem.index : ''
      }
    },
    stateMenu() {
      if (this.$route.name && this.$route.name.includes(otherPaths)) {
        this.activeIndex = ''
        this.$cookies.remove(SIDE_BAR_INDEX)
      } else {
        const sideBarItem = sideBar.find(item => item.name === this.$route.name)
        this.activeIndex = sideBarItem ? sideBarItem.index : ''
      }
    },
    storeIds: {
      handler() {
        this.$store.commit(GET_STORE_IDS, this.storeIds)
        this.$store.commit(SET_LIST_STORE_ACTIVES, this.storeIds)
      },
      deep: true
    },
    listStores: {
      handler() {
        this.allStoreIds = this.listStores.map(({ id }) => id)
        this.storeIds = this.allStoreIds
      },
      deep: true
    }
  },
  mounted() {
    const sideBarItem = sideBar.find(item => item.name === this.$route.name)
    if (sideBarItem) {
      this.$cookies.set(SIDE_BAR_INDEX, sideBarItem.index)
      this.activeIndex = sideBarItem.index
    }
  },
  methods: {
    selectMenu(key) {
      this.activeIndex = key.toString()
      this.$cookies.set(SIDE_BAR_INDEX, key.toString())
    },
    setCollapse() {
      if (this.isCollapse === true) {
        this.isCollapse = false
        this.$store.commit(INDEX_SET_SIDEBAR_IS_COLLAPSE, false)
      } else {
        this.isCollapse = true
        this.$store.commit(INDEX_SET_SIDEBAR_IS_COLLAPSE, true)
      }
    },
    async logout() {
      this.$store.commit(INDEX_SET_LOADING, true)
      this.$store.commit(INDEX_SET_SIDEBAR_IS_COLLAPSE, false)
      await this.$auth.logout()
      this.$store.commit(INDEX_SET_LOADING, false)
    },
    changeToLink(link) {
      this.$emit('change')
      this.$router.push(link)
    },
    handleCheckAllChange(val) {
      this.storeIds = val ? this.allStoreIds : []
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.allStoreIds.length
    }
  }
}
</script>
