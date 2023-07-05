<template>
  <div class="store-list">
    <div class="title">{{ $t('interview_calendar.store') }}</div>
    <div class="sub-title">{{ $t('interview_calendar.store_option') }}</div>
    <div class="checkbox-form">
      <div class="item">
        <label>
          <span :for="'store-all'" class="show-dot-text">{{ $t('interview_calendar.all') }}</span>
          <input :id="'store-all'" v-model="check" type="checkbox" @change="handleCheckAllChange">
          <span class="checkmark" :style="{'background': (check ? '#E739EB' : '#fff'), 'border': '1px solid #E739EB'}"/>
        </label>
      </div>
      <div v-for="(store, i) of listStores" :key="i" class="item">
        <label>
          <span :for="'store' + store.id" class="show-dot-text">{{ store.name }}</span>
          <input :id="'store' + store.id" v-model="storeIds" type="checkbox" :value="store.id" @change="handleCheckedCitiesChange">
          <span class="checkmark" :style="{'background': (storeIds.includes(store.id) ? store.hex_color : '#fff'), 'border': '1px solid '+ store.hex_color}"/>
        </label>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {
  SET_LIST_STORE_ACTIVES,
  GET_STORE_IDS
} from '../../store/store.const'
export default {
  name: 'SelectStoreElement',
  data() {
    return {
      storeIds: [],
      allStoreIds: [],
      check: true
    }
  },
  computed: {
    ...mapState({
      listStores: state => state.listStores,
      listStoreActives: state => state.listStoreActives
    }),
    checkAll() {
      return this.storeIds.length === this.allStoreIds.length
    }
  },
  watch: {
    storeIds: {
      handler() {
        this.$store.commit(GET_STORE_IDS, this.storeIds)
        this.$store.commit(SET_LIST_STORE_ACTIVES, this.storeIds)
      },
      deep: true
    },
    listStores: {
      handler() {
        const data = this.listStores.map(({ id }) => id)
        this.allStoreIds = data
        this.storeIds = data
      },
      deep: true
    }
  },
  methods: {
    changeToLink(link) {
      this.$emit('change')
      this.$router.push(link)
    },
    handleCheckAllChange(ev) {
      this.storeIds = this.check ? this.allStoreIds : []
    },
    handleCheckedCitiesChange() {
      this.check = (this.storeIds.length === this.allStoreIds.length)
    }
  }
}
</script>
