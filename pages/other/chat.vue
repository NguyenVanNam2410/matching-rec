<template>
  <div class="chat">
    <div class="chat-pc">
      <div class="d-flex justify-between items-center chat-header">
        <div class="chat-breadcrumb breadcrumb">
          <span class="breadcrumb-previous cursor-pointer" @click="$router.push('/')">{{ $t('my_page.top_page') }}</span>
          <img class="breadcrumb-arrow" src="../../assets/icons/breadcrumb-arrow.svg" />
          <span class="breadcrumb-current">{{ $t('chat.job_list') }}</span>
        </div>
        <div class="chat-option">
          <el-checkbox v-model="allStoresCheckbox" :label="$t('chat.all_stores')" size="large" @change="changeCheckBox" />
          <div class="d-flex items-center">
            <span class="chat-option__selection">{{ $t('chat.store_selection') }}：</span>
            <el-popover
              v-model="showStoreSelect"
              placement="bottom"
              width="160"
              trigger="click">
              <el-button slot="reference" class="show-select">
                <div class="show-data-select">
                  <span v-if="currentStore">{{ storeListActive[currentStore] }}</span>
                  <span v-else class="placeholder">{{ $t('chat.store_selection') }}</span>
                  <img :class="'show-store-img ' + (showStoreSelect ? 'dropdown-active' : 'dropdown-not')" src="../../assets/icons/dropdown-caret.svg" />
                </div>
              </el-button>
              <div class="list-store">
                <div v-for="item in allStores" :key="item.id" class="show-store" @click="changeStoreData(item.id)">
                  <span>{{ item.name }}</span>
                </div>
              </div>
            </el-popover>
          </div>
        </div>
      </div>
      <div class="chat-table">
        <div class="chat-sidebar">
          <div class="chat-search">
            <el-input v-model="search" :placeholder="$t('common.search')">
              <i slot="prefix" class="search-prefix">
                <img src="../../assets/icons/search-icon.svg" />
              </i>
            </el-input>
          </div>
          <div class="chat-conversation">
            <div
              v-for="(item, index) in listChat"
              :key="index"
              :ref="'scroll' + index"
              class="conversation-content"
              @click="showCurrentChat(item.user_id, item.store_id, item.first_name, item.last_name, index)"
            >
              <div
                v-if="checkSearch(`${item.first_name || ''}${item.last_name || ''}`)"
                :class="['chat-col cursor-pointer', { 'color-tab': item.be_read === 0 }, { 'chat-active': currentIndex === index }]"
              >
                <div class="chat-information">
                  <img v-if="item.avatar" class="chat-avatar" width="32px" height="32px" :src="item.avatar" />
                  <div v-else class="chat-avatar" :style="{ 'background': item.color }">{{ formatFirstName(item.first_name) }}</div>
                  <div class="d-flex flex-col">
                    <div class="d-flex justify-between chat-user-header">
                      <span class="chat-name">{{ `${item.first_name || ''} ${item.last_name || ''}` }}</span>
                      <div class="d-flex flex-col">
                        <span class="chat-date">{{ item.send_time }}</span>
                        <img v-if="item.be_read === 0" class="new-chat" width="12px" height="12px" src="../../assets/icons/new-message.svg" />
                      </div>
                    </div>
                    <span class="chat-preview">{{ item.content }}</span>
                    <div class="d-flex items-center">
                      <span v-if="allStoresCheckbox" class="chat-store__title">{{ $t('chat.store') }}</span>
                      <span v-if="allStoresCheckbox" class="chat-store__name">{{ `: ${item.store_name || storeName}` }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="showMessage" class="chat-content">
          <div class="chat-content__table">
            <div ref="scrollListMessage" class="chat-content__bottom">
              <div v-for="(message, index) in listMessages" :key="index" class="chat-content_column">
                <div v-if="message.is_date_now" class="show-date">
                  <div class="chat-content__date">{{ message.date_show }}</div>
                </div>
                <div v-else-if="message.is_from_user === 0" class="chat-right">
                  <div class="d-flex flex-col">
                    <span class="chat-left__mess2" v-html="formatMessage(message.content)"></span>
                    <span v-if="message.show_date" class="chat-user__time text-right">{{ message.send_time }}</span>
                  </div>
                </div>
                <div v-else class="chat-left">
                  <img v-if="message.avatar" class="chat-left__avatar chat-avatar" :src="message.avatar" />
                  <div v-else class="chat-avatar" :style="{ 'background': message.color }">{{ formatFirstName(message.first_name) }}</div>
                  <div class="chat-left__layout">
                    <span class="chat-left__user">{{ formatName(message.first_name, message.last_name) }}</span>
                    <span class="chat-left__mess1" v-html="formatMessage(message.content)"></span>
                    <span v-if="message.show_date" class="chat-user__time">{{ message.send_time  }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="isDeleteUser">
              <div class="user-delete">{{ $t('no_data.user_chat_delete') }}</div>
            </div>
            <div v-else class="chat-content__action">
              <el-form
                ref="chatForm"
                :model="chatForm"
                :rules="chatRules"
                autocomplete="off"
                @submit.native.prevent
              >
                <el-form-item prop="message" :error="(error.key === 'message') ? error.value : ''">
                  <el-input
                    v-model="chatForm.message"
                    :placeholder="$t('my_page.enter_message')"
                    name="message"
                    type="textarea"
                    autosize
                    tabindex="2"
                    maxlength="1000"
                    @focus="resetValidate('message')"
                    @keypress.enter.native="checkSendMessage"
                  >
                  </el-input>
                  <div class="send-message" @click="sendMessage">
                    <span>{{ $t('my_page.send') }}</span>
                    <img src="../../assets/icons/send-message.svg" />
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-sp">
      <div v-if="!showMessageSP" class="chat-sp__menu">
        <div class="chat-sp__header">{{ $t('chat.job_list') }}</div>
        <div class="d-flex items-center chat-sp__search">
          <span class="chat-sp__mode">{{ $t('chat.store_mode_switching') }}:</span>
          <el-select v-model="currentStore" class="w-160" :placeholder="$t('chat.store_selection')" @change="changeStore">
            <el-option v-for="item in allStores" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="chat-sp__input">
          <el-input v-model="search" :placeholder="$t('common.search')">
            <i slot="prefix" class="search-prefix">
              <img src="../../assets/icons/search-icon.svg" />
            </i>
          </el-input>
        </div>
        <div class="chat-sp__content">
          <div
            v-for="(item, index) in listChat"
            :key="index"
            @click="showDetailSp(item.user_id, item.store_id, item.first_name, item.last_name, index)"
          >
          <div
            v-if="checkSearch(`${item.first_name || ''}${item.last_name || ''}`)"
            :class="['chat-col cursor-pointer', { 'chat-active': currentIndex === index }, { 'color-tab': item.be_read === 0 }]"
          >
              <div class="chat-information">
                <img width="32px" height="32px" :src="item.avatar || exampleImage" />
                <div class="d-flex flex-col">
                  <span class="chat-name">{{ `${item.first_name || ''}${item.last_name || ''}` }}</span>
                  <span class="chat-preview">{{ item.content }}</span>
                </div>
              </div>
              <div class="d-flex flex-col">
                <span class="chat-date">{{ item.send_time }}</span>
                <div class="d-flex justify-end mt-10">
                  <img v-if="item.be_read === 0" class="new-chat" width="12px" height="12px" src="../../assets/icons/new-message.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showMessageSP" class="chat-sp__message">
        <div class="d-flex items-center ml-18">
          <img src="../../assets/icons/prev_mobile.svg" @click="closeChat()"/>
          <span class="chat-sp__message-text">{{ userName }}</span>
        </div>
        <div class="chat-sp__container">
          <div ref="scrollListMessageMobile" class="chat-content__bottom">
            <div v-for="(message, index) in listMessages" :key="index" class="chat-content_column">
                <div v-if="message.is_date_now" class="show-date">
                  <div class="chat-content__date">{{ message.date_show }}</div>
                </div>
                <div v-else-if="message.is_from_user === 0" class="chat-right">
                  <div class="d-flex flex-col">
                    <span class="chat-sp__mess2" v-html="formatMessage(message.content)"></span>
                    <span v-if="message.show_date" class="text-right chat-sp__time">{{ message.send_time }}</span>
                  </div>
                </div>
                <div v-else class="chat-left">
                  <img class="chat-left__avatar" :src="message.avatar || exampleImage" />
                  <div class="chat-sp__left">
                    <span class="chat-sp__user">{{ formatName(message.first_name, message.last_name) }}</span>
                    <span class="chat-sp__mess1" v-html="formatMessage(message.content)"></span>
                    <span v-if="message.show_date" class="chat-sp__time">{{ message.send_time  }}</span>
                  </div>
                </div>
            </div>
          </div>
          <div v-if="isDeleteUser">
            <div class="user-delete">{{ $t('no_data.user_chat_delete') }}</div>
          </div>
          <div v-else class="chat-content__action">
            <el-form
              ref="chatFormSp"
              :model="chatForm"
              :rules="chatRules"
              autocomplete="off"
              @submit.native.prevent
            >
              <el-form-item prop="message" :error="(error.key === 'message') ? error.value : ''">
                <el-input
                  v-model="chatForm.message"
                  :placeholder="$t('my_page.enter_message')"
                  name="message"
                  type="textarea"
                  autosize
                  tabindex="2"
                  maxlength="1000"
                  @focus="resetValidate('message')"
                  @keypress.enter.native="checkSendMessage"
                >
                </el-input>
                <div class="send-message" @click="sendMessage">
                  <span>{{ $t('my_page.send') }}</span>
                  <img src="../../assets/icons/send-message.svg" />
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import str from 'lodash'
import { mapState } from 'vuex'
import {
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  INDEX_SET_ERROR,
  CHAT_GET_ALL_STORES_NAME,
  CHAT_GET_LIST_CHAT_BY_STORE,
  CHAT_GET_DETAIL_CHAT,
  CHAT_CREATE_CHAT,
  USER_DETAIL,
  SET_SHOW_MESSAGE_SP
} from '../../store/store.const'

export default {
  name: 'ChatPage',
  data() {
    const validFormLength = (rule, value, callback) => {
      if (value && value.length > 1000) {
        callback(new Error(this.$t('validation.area_length_2', { _field_: this.$t('chat.message') })))
      } else {
        callback()
      }
    }
    return {
      allStores: [],
      currentStore: '',
      currentUser: '',
      listChat: [],
      listMessages: [],
      userDetails: [],
      userId: '',
      userName: '',
      chatRules: {
        message: [
          { validator: validFormLength, trigger: 'blur' }
        ]
      },
      exampleImage: require('../../assets/icons/user-chat.svg'),
      chatForm: {
        message: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      search: '',
      showMessage: false,
      currentIndex: '',
      currentIndexId: '',
      allStoresCheckbox: !this.$route.query.user_id,
      storeListChatStatus: false,
      storeListChat: '',
      listChatEmpty: [],
      listColors: [
        '#AB4CF5',
        '#E83434',
        '#11D35F',
        '#F017C0',
        '#F9B126',
        '#266EF9'
      ],
      isDeleteUser: false,
      showStoreSelect: false,
      storeListActive: {}
    }
  },
  computed: {
    ...mapState({
      showMessageSP: state => state.showMessageSP
    }),
    storeName() {
      const item = this.allStores.find(i => i.id === this.currentStore)
      return item ? item.name : ''
    }
  },
  async created() {
    await this.$store.commit(INDEX_SET_LOADING, true)
    const userId = this.$route.query.user_id
    this.userId = userId
    if (userId) {
      await this.getUserDetail()
    }
    await this.getAllStoresName()
    const storeId = this.$route.query.store_id
    if (storeId) {
      if (this.storeListActive[storeId]) {
        this.showStoreSelect = Number(storeId)
        await this.changeStoreData(storeId)
      } else {
        await this.checkStore(storeId)
      }
    }
    this.$store.commit(SET_SHOW_MESSAGE_SP, false)
    await this.$store.commit(INDEX_SET_LOADING, false)
  },
  methods: {
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.chatForm.fields.find((f) => f.prop === ref).clearValidate()
      this.chatForm.errors[ref] = ''
    },
    checkSearch(name) {
      if (this.search) {
        return name.includes(this.search)
      }
      return true
    },
    formatFirstName(name) {
      return name ? name.toString().slice(0, 1) : ''
    },
    scrollToElement() {
      const messageDisplayMobile = this.$refs.scrollListMessageMobile
      const messageDisplay = this.$refs.scrollListMessage
      const index = this.currentIndex !== '' ? this.$refs['scroll' + this.currentIndex][0] : this.$refs['scroll' + 0][0]
      if (messageDisplay) {
        messageDisplay.scrollTop = messageDisplay.scrollHeight
      }
      if (messageDisplayMobile) {
        messageDisplayMobile.scrollTop = messageDisplayMobile.scrollHeight
      }
      if (index) {
        index.scrollIntoView({ behavior: 'smooth' })
      }
    },
    scrollToElementDetail() {
      const messageDisplayMobile = this.$refs.scrollListMessageMobile
      const messageDisplay = this.$refs.scrollListMessage
      if (messageDisplay) {
        messageDisplay.scrollTop = messageDisplay.scrollHeight
      }
      if (messageDisplayMobile) {
        messageDisplayMobile.scrollTop = messageDisplayMobile.scrollHeight
      }
    },
    async changeCheckBox() {
      const userId = this.$route.query.user_id
      if (this.allStoresCheckbox) {
        this.showStoreSelect = true
        this.currentStore = ''
        this.showMessage = false
        this.currentIndex = ''
        userId ? await this.getStoreChatForUser() : await this.getStoreDetailChat()
        this.scrollToElement()
      } else {
        this.currentStore = this.allStores[0].id
        await this.getStoreDetailChat()
      }
    },
    async getStoreChatForUser() {
      const userId = this.$route.query.user_id
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const param = `/${this.currentStore}`
        const res = await this.$store.dispatch(CHAT_GET_LIST_CHAT_BY_STORE, param)
        const dataApi = res.data
        if (res.status_code === 200) {
          const listChatModifyData = []
          dataApi.forEach((item) => {
            const number = item.user_id % this.listColors.length
            item.color = this.listColors[number]
            listChatModifyData.push(item)
          })
          this.listChat = listChatModifyData
          const item = this.listChat.find((item, index) => {
            this.currentIndexId = index
            return item.user_id === +userId
          })
          const clonedListChat = []
          if (item) {
            this.allStores.filter(i => i.id !== item.store_id).forEach(k => {
              clonedListChat.push({
                ...item,
                user_id: item.user_id,
                content: item.store_id === k.id ? item.content : '',
                store_id: k.id,
                store_name: k.name
              })
            })
          } else {
            this.allStores.forEach((k) => {
              const number = this.userDetails.id % this.listColors.length
              clonedListChat.push({
                ...this.userDetails,
                user_id: this.userDetails.id,
                color: this.listColors[number],
                content: '',
                store_id: k.id,
                store_name: k.name
              })
            })
          }
          this.storeListChatStatus = true
          this.currentIndex = ''
          this.showMessage = false
          this.listChatEmpty = clonedListChat
          this.listChat = clonedListChat.concat(this.listChat)
        } else if (res.status_code === 401) {
          await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.token_expired') })
          this.$auth.logout()
        } else this.$store.commit(INDEX_SET_ERROR, { show: true, text: res.messages })
      } catch (err) {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async getAllStoresName() {
      try {
        const data = await this.$store.dispatch(CHAT_GET_ALL_STORES_NAME)
        switch (data.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: data.messages
            })
            this.allStores = data.data
            this.storeListActive = {}
            this.allStores.forEach(store => {
              this.storeListActive[store.id] = store.name
            })
            this.currentStore = !this.allStoresCheckbox ? data.data[0].id : ''
            break
          default:
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
            break
        }
      } catch {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
      await this.getStoreDetailChat()
      this.showStoreSelect = true
    },
    async refreshStores() {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const param = `/${this.currentStore}`
        const res = await this.$store.dispatch(CHAT_GET_LIST_CHAT_BY_STORE, param)
        const dataApi = res.data
        if (res.status_code === 200) {
          const listChatModifyData = []
          dataApi.forEach((item) => {
            const number = item.user_id % this.listColors.length
            item.color = this.listColors[number]
            listChatModifyData.push(item)
          })
          if (this.$route.query.user_id) {
            const index = this.listChatEmpty.findIndex(item => item.store_id === this.storeListChat)
            const itemFilter = listChatModifyData.find(item => item.store_id === this.storeListChat && item.user_id === this.currentUser)
            if (itemFilter) {
              this.listChatEmpty[index].content = itemFilter.content
              this.listChat = this.listChatEmpty.concat(listChatModifyData)
              this.currentIndex = index
            } else {
              this.listChat = this.listChatEmpty.concat(listChatModifyData)
              this.currentIndex = 0
            }
          } else {
            this.listChat = this.listChatEmpty.concat(listChatModifyData)
            this.currentIndex = 0
          }
          this.$nextTick(() => {
            this.scrollToElement()
          })
        } else if (res.status_code === 401) {
          await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.token_expired') })
          this.$auth.logout()
        } else this.$store.commit(INDEX_SET_ERROR, { show: true, text: res.messages })
      } catch (err) {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async getStoreDetailChat() {
      const userId = this.$route.query.user_id
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const param = `/${this.currentStore}`
        const res = await this.$store.dispatch(CHAT_GET_LIST_CHAT_BY_STORE, param)
        const dataApi = res.data
        if (res.status_code === 200) {
          const listChatModifyData = []
          dataApi.forEach((item) => {
            const number = item.user_id % this.listColors.length
            item.color = this.listColors[number]
            listChatModifyData.push(item)
          })
          this.listChat = str.cloneDeep(listChatModifyData)
          const item = this.listChat.find((item, index) => {
            if (userId) {
              this.currentIndex = index
            }
            return item.user_id === +userId
          })
          if (userId && !item) {
            const number = userId % this.listColors.length
            this.listChat.unshift({
              user_id: userId,
              store_id: this.currentStore,
              first_name: this.userDetails.first_name,
              last_name: this.userDetails.last_name,
              avatar: this.userDetails.avatar,
              color: this.listColors[number],
              be_read: 1
            })
            this.currentIndex = 0
            this.showMessage = true
            await this.showCurrentChat(userId, this.currentStore, this.userDetails.first_name, this.userDetails.last_name, 0)
          } else if (item) {
            this.$nextTick(() => {
              this.scrollToElement()
            })
            await this.showCurrentChat(userId, this.currentStore, this.userDetails.first_name, this.userDetails.last_name, this.currentIndex)
          }
        } else if (res.status_code === 401) {
          await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.token_expired') })
          this.$auth.logout()
        } else this.$store.commit(INDEX_SET_ERROR, { show: true, text: res.messages })
      } catch {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async checkStore(id) {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const param = `/${id}`
        const res = await this.$store.dispatch(CHAT_GET_LIST_CHAT_BY_STORE, param)
        if (res.status_code === 401) {
          await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.token_expired') })
          this.$auth.logout()
        } else this.$store.commit(INDEX_SET_ERROR, { show: true, text: res.messages })
      } catch {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async getStoreDetailChatNoLoading() {
      const userId = this.$route.query.user_id
      try {
        const param = `/${this.currentStore}`
        const res = await this.$store.dispatch(CHAT_GET_LIST_CHAT_BY_STORE, param)
        const dataApi = res.data
        if (res.status_code === 200) {
          const listChatModifyData = []
          dataApi.forEach((item) => {
            const number = item.user_id % this.listColors.length
            item.color = this.listColors[number]
            listChatModifyData.push(item)
          })
          this.listChat = str.cloneDeep(listChatModifyData)
          const item = this.listChat.find((item, index) => {
            if (userId) {
              this.currentIndex = index
            }
            return item.user_id === +userId
          })
          if (userId && !item) {
            const number = userId % this.listColors.length
            this.listChat.unshift({
              user_id: userId,
              store_id: this.currentStore,
              first_name: this.userDetails.first_name,
              last_name: this.userDetails.last_name,
              avatar: this.userDetails.avatar,
              color: this.listColors[number],
              be_read: 1
            })
            this.currentIndex = 0
            this.showMessage = true
            await this.showCurrentChat(userId, this.currentStore, this.userDetails.first_name, this.userDetails.last_name, 0)
          } else if (item) {
            this.$nextTick(() => {
              this.scrollToElement()
            })
            await this.showCurrentChat(userId, this.currentStore, this.userDetails.first_name, this.userDetails.last_name, this.currentIndex)
          }
        } else if (res.status_code === 401) {
          await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.token_expired') })
          this.$auth.logout()
        } else this.$store.commit(INDEX_SET_ERROR, { show: true, text: res.messages })
      } catch {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
      this.scrollToElement()
    },
    async getUserDetail() {
      try {
        const data = await this.$store.dispatch(USER_DETAIL, this.userId)
        switch (data.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: data.messages
            })
            this.userDetails = data.data
            break
          case 401:
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.token_expired') })
            this.$auth.logout()
            break
          default:
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
            break
        }
      } catch {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
    },
    formatName(firstName, lastName) {
      return `${firstName} ${lastName}`
    },
    async showDetailSp(userId, storeId, firstName, lastName, index) {
      await this.showCurrentChat(userId, storeId, firstName, lastName, index)
      await this.$store.commit(SET_SHOW_MESSAGE_SP, true)
      this.scrollToElement()
    },
    async showCurrentChat(userId, storeId, firstName, lastName, index) {
      this.storeListChat = storeId
      this.listChat[index].be_read = 1
      this.currentIndex = index
      this.currentIndexId = index
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const dataResponse = await this.$store.dispatch(CHAT_GET_DETAIL_CHAT, {
          store: storeId,
          user: userId
        })
        this.userName = `${firstName || ''}${lastName || ''}`
        this.currentUser = userId
        const dataMessages = []
        let check = ''
        let user = ''
        let message = {}
        switch (dataResponse.status_code) {
          case 200:
            for (const y in dataResponse.data.data) {
              dataMessages.push({ is_date_now: true, date_show: y })
              for (let i = 0; i <= dataResponse.data.data[y].length - 1; i++) {
                message = dataResponse.data.data[y][i]
                message.color = this.listChat[index].color
                check = dataResponse.data.data[y][i].initial_time
                user = dataResponse.data.data[y][i].is_from_user
                if (i < dataResponse.data.data[y].length - 1) {
                  message.show_date = false
                  if (user !== dataResponse.data.data[y][i + 1].is_from_user) {
                    message.show_date = true
                  }
                  if (check !== dataResponse.data.data[y][i + 1].initial_time) {
                    message.show_date = false
                  }
                } else {
                  message.show_date = true
                }
                dataMessages.push(message)
              }
            }
            this.isDeleteUser = dataResponse.data.is_delete_user
            this.listMessages = dataMessages
            this.showMessage = true
            break
          case 401:
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.token_expired') })
            this.$auth.logout()
            break
          default:
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: dataResponse.messages })
            break
        }
      } catch {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
      this.scrollToElement()
    },
    async closeChat() {
      await this.$store.commit(SET_SHOW_MESSAGE_SP, false)
    },
    formatDate(date) {
      return date ? date.replace(/年|月/g, '-') : ''
    },
    sendMessage() {
      this.error = { key: null, value: '' }
      this.$refs.chatForm.validate(async valid => {
        if (valid && this.chatForm.message !== '' && str.trim(this.chatForm.message) !== '') {
          try {
            const message = {
              user_id: this.currentUser,
              content: this.chatForm.message,
              store_id: this.storeListChatStatus || this.allStoresCheckbox ? this.storeListChat : this.currentStore
            }
            const res = await this.$store.dispatch(CHAT_CREATE_CHAT, message)
            switch (res.status_code) {
              case 200:
                this.chatForm.message = ''
                if (this.listMessages.length) {
                  this.listMessages[this.listMessages.length - 1].show_date = false
                  const now = new Date()
                  const dateSent = new Date(this.formatDate(this.listMessages[this.listMessages.length - 1].initial_time).replace(/日/g, ''))
                  now.setHours(0, 0, 0, 0)
                  dateSent.setHours(0, 0, 0, 0)
                  if (now > dateSent) {
                    this.listMessages.push({
                      is_date_now: true,
                      date_show: this.$t('chat.current')
                    })
                  }
                }
                this.listMessages.push({ ...res.data, show_date: true })
                await this.getStoreDetailChatNoLoading()
                this.isDeleteUser = false
                this.scrollToElement()
                break
              case 400:
                this.isDeleteUser = true
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
                break
            }
          } catch (err) {
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('content.EXC_001') })
          }
          await this.$store.commit(INDEX_SET_LOADING, false)
        }
      })
    },
    async changeStore(store) {
      if (!this.$route.query.user_id) {
        this.currentIndex = ''
      }
      this.currentStore = store
      this.showMessage = false
      await this.$store.commit(SET_SHOW_MESSAGE_SP, false)
      this.allStoresCheckbox = false
      await this.getStoreDetailChat()
    },
    formatMessage(value) {
      return value.replace(/\n/g, '<br/>')
    },
    checkSendMessage(event) {
      if (event.key === 'Enter') {
        if (!event.shiftKey) {
          event.preventDefault()
          this.sendMessage()
        }
      }
    },
    async changeStoreData(item) {
      this.showStoreSelect = false
      await this.changeStore(item)
    }
  }
}
</script>
