<template>
  <div class="top">
    <div :class="showViewSp ? 'show-view-sp' : 'd-none'" ref="indexPage">
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('my_page.latest_job_seekers')" name="new">
          <div class="show-search-content">
            <div v-if="listNewView.length" class="top-body">
              <div v-if="showImageSp" class="item-sp item-view-sp">
                <div class="user-view-element">
                  <div v-if="listNewView[0].avatar_details">
                    <div v-if="listNewView[0].avatar_details.length" class="show-image-slide">
                      <VueSlickCarousel v-bind="settingSp">
                        <img :src="listNewView[0].avatar || userExample" alt="">
                        <img v-for="(detail, index) in listNewView[0].avatar_details" :key="index" :src="detail.url" alt="">
                      </VueSlickCarousel>
                    </div>
                    <div v-else class="show-image-slide">
                      <img :src="listNewView[0].avatar || userExample" alt="">
                    </div>
                  </div>
                  <div v-else class="show-image-slide">
                    <img :src="listNewView[0].avatar || userExample" alt="">
                  </div>
                  <div v-touch:swipe.left="() => { checkGetViewNew(listNewView[0].id) }" v-touch:swipe.right="() => { checkClickLikeView({ id: listNewView[0].id, status: listNewView[0].is_favorite }, 'new') }">
                    <UserViewElement :item="listNewView[0]" @postLike="clickLike"/>
                  </div>
                </div>
              </div>
              <div class="button-action">
                <div class="button-next button-item" @click="getViewNew(listNewView[0].id)">
                  <img src="/assets/icon/icon_next_user.svg" alt="">
                  <span>{{ this.$t('common.skip') }}</span>
                </div>
                <div class="button-like button-item" @click="clickLikeView({ id: listNewView[0].id, status: listNewView[0].is_favorite }, 'new')">
                  <img src="/assets/icon/icon_heart_black.svg" alt="">
                  <span>{{ this.$t('home.job_favorite') }}</span>
                </div>
              </div>
            </div>
            <div v-else class="no-data-box">
              <NoDataElement :text="$t('common.no_data_search')" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('my_page.recommended_job_seekers')" name="suggest">
          <div class="show-search-content">
            <div v-if="listRecommendView.length" class="top-body">
              <div v-if="showImageSp" class="item-sp item-view-sp">
                <div class="user-view-element">
                  <div v-if="listRecommendView[0].avatar_details">
                    <div v-if="listRecommendView[0].avatar_details.length" class="show-image-slide">
                      <VueSlickCarousel v-bind="settingSp">
                        <img :src="listRecommendView[0].avatar || userExample" alt="">
                        <img v-for="(detail, index) in listRecommendView[0].avatar_details" :key="index" :src="detail.url" alt="">
                      </VueSlickCarousel>
                    </div>
                    <div v-else class="show-image-slide">
                      <img :src="listRecommendView[0].avatar || userExample" alt="">
                    </div>
                  </div>
                  <div v-else class="show-image-slide">
                    <img :src="listRecommendView[0].avatar || userExample" alt="">
                  </div>
                  <div v-touch:swipe.left="() => { checkGetViewSuggested(listRecommendView[0].id) }" v-touch:swipe.right="() => { checkClickLikeView({ id: listRecommendView[0].id, status: listRecommendView[0].is_favorite }, 'suggest') }">
                    <UserViewElement :item="listRecommendView[0]" @postLike="clickLike"/>
                  </div>
                </div>
              </div>
              <div class="button-action">
                <div class="button-next button-item" @click="getViewSuggested(listRecommendView[0].id)">
                  <img src="/assets/icon/icon_next_user.svg" alt="">
                  <span>{{ this.$t('common.skip') }}</span>
                </div>
                <div class="button-like button-item" @click="clickLikeView({ id: listRecommendView[0].id, status: listRecommendView[0].is_favorite }, 'suggest')">
                  <img src="/assets/icon/icon_heart_black.svg" alt="">
                  <span>{{ this.$t('home.job_favorite') }}</span>
                </div>
              </div>
            </div>
            <div v-else class="no-data-box">
              <NoDataElement :text="$t('common.no_data_search')" />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div :class="showViewSp ? 'hide-view-sp' : ''">
      <div class="top-search search-pc" v-if="!showMore">
        <div class="top-left">
          <div class="d-flex flex-col">
            <span class="top-content">{{ $t('desired_condition.location') }}</span>
            <el-select multiple class="w-220 resize-width" v-model="province_id" :placeholder="$t('common.select')">
              <el-option v-for="item in listProvinces" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="d-flex flex-col">
            <span class="top-content">{{ $t('desired_condition.type') }}</span>
            <el-select multiple class="w-220 resize-width" v-model="work_type_ids" :placeholder="$t('common.select')">
              <el-option v-for="item in listWorkTypes" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="top-right">
          <div @click="showMore = true" class="filter-container link-text">
            <span class="show-more">{{ $t('condition.specify_detailed_conditions') }}</span>
            <img class="hide-hover" src="../assets/icons/show-more.svg" />
            <img class="show-hover" src="../assets/icons/show-more-hover.svg" />
            <img class="show-focus" src="../assets/icons/show-more-focus.svg" />
          </div>
          <el-button @click="search" type="danger" class="ml-12">{{ $t('common.search') }}</el-button>
        </div>
      </div>
      <div class="top-search_advanced search-pc" v-if="showMore">
        <div class="advanced-layout pb-16">
          <div class="d-flex flex-col">
            <span class="top-content">{{ $t('desired_condition.location') }}</span>
            <el-select multiple class="w-220 resize-width" v-model="province_id" :placeholder="$t('common.select')">
              <el-option v-for="item in listProvinces" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="d-flex flex-col">
            <span class="top-content">{{ $t('desired_condition.type') }}</span>
            <el-select multiple class="w-220 resize-width" v-model="work_type_ids" :placeholder="$t('common.select')">
              <el-option v-for="item in listWorkTypes" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="d-flex flex-col">
            <span class="top-content">{{ $t('desired_condition.position') }}</span>
            <el-select multiple class="w-220 resize-width" v-model="job_type_ids" :placeholder="$t('common.select')">
              <el-option v-for="item in listJobTypes" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="d-flex flex-col">
            <span class="top-content">{{ $t('desired_condition.experience') }}</span>
            <el-select multiple class="w-220 resize-width" v-model="job_experience_ids" :placeholder="$t('common.select')">
              <el-option v-for="item in listJobExperience" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="advanced-layout">
          <div class="d-flex flex-col">
            <span class="top-content">{{ $t('my_page.age') }}</span>
            <el-select class="w-220 resize-width" v-model="age" :placeholder="$t('common.select')">
              <el-option v-for="item in listAge" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="d-flex flex-col">
            <span class="top-content">{{ $t('desired_condition.salary') }}</span>
            <div class="salary-filter">
              <el-select class="w-120 resize-width" v-model="salary_type_id" :placeholder="$t('common.select')">
                <el-option v-for="item in listSalaryTypes" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
              <el-input
                type="text"
                min="0"
                class="w-90 resize-width"
                oninput="this.value=this.value.replace(/[^0-9]/g,'')"
                pattern="[0-9]*"
                inputmode="numeric"
                v-model="salary_min"
                placeholder="1000"
              />
              <span>～</span>
              <el-input
                type="text"
                min="0"
                class="w-90 resize-width"
                oninput="this.value=this.value.replace(/[^0-9]/g,'')"
                pattern="[0-9]*"
                inputmode="numeric"
                v-model="salary_max"
                placeholder="1500"
              />
            </div>
          </div>
          <div class="top-right">
            <div class="filter-container link-text" @click="showMore = false">
              <span class="show-more">{{ $t('condition.specify_detailed_conditions') }}</span>
              <img class="rotate-img hide-hover" src="../assets/icons/show-more.svg" />
              <img class="rotate-img show-hover" src="../assets/icons/show-more-hover.svg" />
              <img class="rotate-img show-focus" src="../assets/icons/show-more-focus.svg" />
            </div>
            <el-button @click="search" type="danger" class="ml-12">{{ $t('common.search') }}</el-button>
          </div>
        </div>
      </div>
      <div class="search-sp">
        <el-button v-if="!currentSearching && showListNew" @click="dialogVisible = true" class="button-search-sp">
          <img src="/assets/icon/icon_search_button.svg" />
          <span class="button-search-text">{{ $t('condition.specify_detailed_conditions') }}</span>
        </el-button>
        <el-button v-else @click="dialogVisible = true" class="button-search-sp btn-search-black">
          <img src="/assets/icon/icon_search_button.svg" />
          <span class="button-search-text">{{ $t('condition.specify_detailed_conditions') }}</span>
        </el-button>
        <div v-if="!currentSearching && showListNew" class="button-show-view" @click="changeStateView(true)">
          <img src="../assets/icons/top-view-sp.svg" alt="">
        </div>
      </div>
      <div v-if="!currentSearching && showListNew" class="top-header top-header-new">
        <div class="top-header__text">{{ $t('my_page.latest_job_seekers') }}</div>
        <div class="d-flex items-center cursor-pointer link-text" @click="get10New">
          <img class="hide-hover" src="../assets/icons/filter-arrow.png" />
          <img class="show-hover" src="../assets/icons/filter-arrow-hover.png" />
          <img class="show-focus" src="../assets/icons/filter-arrow-focus.png" />
          <span>{{ $t('my_page.see_all_job_seekers') }}</span>
        </div>
      </div>
      <div v-if="!currentSearching && showListNew" class="top-body">
        <div v-if="listNew.length" class="list-new show-slide">
          <div v-for="(item, index) in listNew" :key="index">
            <ItemApplicationElement :list-stores="listStores" :item="item" @postLike="clickLike" />
          </div>
          <div class="item-sp" v-if="listNew.length">
            <VueSlickCarousel v-bind="settings">
              <div class="" v-for="(item, index) in listNew" :key="index">
                <UserItemElement :list-stores="listStores" :item="item" @postLike="clickLike" />
              </div>
            </VueSlickCarousel>
          </div>
        </div>
        <div class="no-data-list" v-else>
          <NoDataElement :text="$t('common.no_new_job')" />
        </div>
      </div>
      <div v-if="!currentSearching && showListSuggested" class="top-header">
        <div class="top-header__text">{{ $t('my_page.recommended_job_seekers') }}</div>
        <div class="d-flex items-center cursor-pointer link-text" @click="get10Suggested">
          <img class="hide-hover" src="../assets/icons/filter-arrow.png" />
          <img class="show-hover" src="../assets/icons/filter-arrow-hover.png" />
          <img class="show-focus" src="../assets/icons/filter-arrow-focus.png" />
          <span>{{ $t('my_page.see_all_job_seekers') }}</span>
        </div>
      </div>
      <div v-if="!currentSearching && showListSuggested" class="top-body recommended-jobs">
        <div class="list-suggested show-slide" v-if="listSuggested.length">
          <div v-for="(item, index) in listSuggested" :key="index">
            <ItemApplicationElement :list-stores="listStores" :item="item" @postLike="clickLike" />
          </div>
          <div class="item-sp" v-if="listSuggested.length">
            <VueSlickCarousel v-bind="settings">
              <div v-for="(item, index) in listSuggested" :key="index">
                <UserItemElement :list-stores="listStores" :item="item" @postLike="clickLike" />
              </div>
            </VueSlickCarousel>
          </div>
        </div>
        <div class="no-data-list" v-else>
          <NoDataElement :text="$t('common.no_recommended_job')" />
        </div>
      </div>
      <div class="show-search-content" v-if="currentSearching">
        <div class="d-flex align-item-center">
          <div class="searching-header">
            <span class="pagination-text">{{ $t('page.search') }}</span>
            <span class="number-record">{{ total }}</span>
            <span class="pagination-text">{{ $t('common.subject') }}</span>
            <span v-if="listSearch.length" class="pagination-text-end">{{ countPageSearch }}</span>
          </div>
          <div class="button-show-view search-sp" @click="changeStateView(true)">
            <img src="../assets/icons/top-view.svg" alt="">
          </div>
        </div>
        <div class="top-body" v-if="listSearch.length">
          <div v-for="(item, index) in listSearch" :key="index">
            <ItemApplicationElement :list-stores="listStores" :item="item" @postLike="clickLike" />
          </div>
          <div class="item-sp" v-if="listSearch.length">
            <div v-for="(item, index) in listSearch" :key="index">
              <UserItemElement :list-stores="listStores" :item="item" @postLike="clickLike" />
            </div>
          </div>
        </div>
        <div class="no-data-box" v-else>
          <NoDataElement :text="$t('common.no_data_search')" />
        </div>
        <div v-if="listSearch.length && total > 10" class="top-pagination d-flex justify-end">
          <PaginationElement @change="changePage" :currentPage="currentPage" :lastPage="lastPage" />
        </div>
      </div>
      <div class="show-search-content" v-if="showList10New">
        <div class="d-flex align-item-center">
          <div class="searching-header">
            <span class="pagination-text">{{ $t('page.search') }}</span>
            <span class="number-record color-blue">{{ total }}</span>
            <span class="number-record color-black">{{ $t('common.subject') }}</span>
            <span v-if="list10New.length" class="pagination-text-end">{{ countPageListNew }}</span>
          </div>
          <div class="button-show-view search-sp" @click="changeStateView(true)">
            <img src="../assets/icons/top-view.svg" alt="">
          </div>
        </div>
        <div class="top-body" v-if="list10New.length">
          <div v-for="(item, index) in list10New" :key="index">
            <ItemApplicationElement :list-stores="listStores" :item="item" @postLike="clickLike" />
          </div>
          <div class="item-sp" v-if="list10New.length">
            <div v-for="(item, index) in list10New" :key="index">
              <UserItemElement :list-stores="listStores" :item="item" @postLike="clickLike" />
            </div>
          </div>
        </div>
        <div class="no-data-box" v-else>
          <NoDataElement :text="$t('common.no_data_search')" />
        </div>
        <div v-if="list10New.length && total > 10" class="top-pagination d-flex justify-end">
          <PaginationElement @change="changePageList10New" :currentPage="currentPage" :lastPage="lastPage" />
        </div>
      </div>
      <div class="show-search-content" v-if="showList10Suggested">
        <div class="searching-header">
          <span class="pagination-text">{{ $t('page.search') }}</span>
          <span class="number-record">{{ total + $t('common.subject') }}</span>
          <span v-if="list10Suggested.length" class="pagination-text-end">{{ countPageListSuggested }}</span>
        </div>
        <div class="top-body" v-if="list10Suggested.length">
          <div v-for="(item, index) in list10Suggested" :key="index">
            <ItemApplicationElement :list-stores="listStores" :item="item" @postLike="clickLike" />
          </div>
          <div class="item-sp" v-if="list10Suggested.length">
            <div v-for="(item, index) in list10Suggested" :key="index">
              <UserItemElement :list-stores="listStores" :item="item" @postLike="clickLike" />
            </div>
          </div>
        </div>
        <div class="no-data-box" v-else>
          <NoDataElement :text="$t('common.no_data_search')" />
        </div>
        <div v-if="list10Suggested.length && total > 10" class="top-pagination d-flex justify-end">
          <PaginationElement @change="changePageList10Suggested" :currentPage="currentPage" :lastPage="lastPage" />
        </div>
      </div>
    </div>
    <el-dialog :title="$t('condition.specify_detailed_conditions')" :visible.sync="dialogVisible">
      <div class="d-flex flex-col pb-24">
        <span class="text-sp">{{ $t('desired_condition.location') }}</span>
        <el-select multiple v-model="province_id" :placeholder="$t('common.select')">
          <el-option v-for="item in listProvinces" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="d-flex flex-col pb-24">
        <span class="text-sp">{{ $t('desired_condition.type') }}</span>
        <el-select multiple v-model="job_type_ids" :placeholder="$t('common.select')">
          <el-option v-for="item in listJobTypes" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="d-flex flex-col pb-24">
        <span class="text-sp">{{ $t('desired_condition.position') }}</span>
        <el-select multiple v-model="work_type_ids" :placeholder="$t('common.select')">
          <el-option v-for="item in listWorkTypes" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="d-flex flex-col pb-24">
        <span class="text-sp">{{ $t('desired_condition.experience') }}</span>
        <el-select multiple v-model="job_experience_ids" :placeholder="$t('common.select')">
          <el-option v-for="item in listJobExperience" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="d-flex flex-col pb-24">
        <span class="text-sp">{{ $t('my_page.age') }}</span>
        <el-select v-model="age" :placeholder="$t('common.select')">
          <el-option v-for="item in listAge" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="d-flex flex-col">
        <span class="text-sp">{{ $t('desired_condition.salary') }}</span>
        <div class="d-flex items-center justify-between g-12">
          <el-select class="w-120" v-model="salary_type_id" :placeholder="$t('common.select')">
            <el-option v-for="item in listSalaryTypes" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          <el-input
            type="text"
            min="0"
            class="w-90 resize-width"
            oninput="this.value=this.value.replace(/[^0-9]/g,'')"
            pattern="[0-9]*"
            inputmode="numeric"
            v-model="salary_min"
            placeholder="1000"
          />
          <span>～</span>
          <el-input
            type="text"
            min="0"
            class="w-90 resize-width"
            oninput="this.value=this.value.replace(/[^0-9]/g,'')"
            pattern="[0-9]*"
            inputmode="numeric"
            v-model="salary_max"
            placeholder="1500"
          />
        </div>
        <div class="dialog-button">
          <el-button type="danger" @click="search">{{ $t('common.search') }}</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  INDEX_SET_ERROR,
  LIST_USER_NEW,
  LIST_USER_SUGGESTED,
  USER_FILTER,
  MASTER_GET_DATA,
  USER_FAVOURITE,
  SET_SHOW_VIEW_SP,
  USER_LIST_VIEW_NEW,
  USER_LIST_VIEW_SUGGEST, INDEX_SET_TITLE_MENU, JOB_ALL_STORE
} from '../store/store.const'
import ItemApplicationElement from '../components/home/ItemApplicationElement.vue'
import UserViewElement from '../components/home/UserViewElement.vue'
import NoDataElement from '../components/element-ui/NoDataElement.vue'
import PaginationElement from '../components/element-ui/PaginationElement.vue'
import UserItemElement from '../components/element-ui/UserItemElement.vue'

export default {
  name: 'IndexPage',
  components: { NoDataElement, PaginationElement, ItemApplicationElement, UserItemElement, UserViewElement },
  data() {
    return {
      activeName: 'new',
      settings: {
        'arrows': true,
        'dots': false,
        'focusOnSelect': true,
        'infinite': true,
        'speed': 500,
        'slidesToShow': 1,
        'slidesToScroll': 1,
        'touchThreshold': 5
      },
      listAge: [],
      listNew: [],
      listSuggested: [],
      listProvinces: [],
      listSalaryTypes: [],
      listWorkTypes: [],
      listJobExperience: [],
      listJobTypes: [],
      job_type_ids: [],
      salary_type_id: 1,
      work_type_ids: [],
      job_experience_ids: [],
      listSearch: [],
      province_id: [],
      list10New: [],
      list10Suggested: [],
      salary_min: '',
      salary_max: '',
      age: '',
      showMore: false,
      dialogVisible: false,
      currentSearching: false,
      showList10New: false,
      showList10Suggested: false,
      showListNew: true,
      showListSuggested: true,
      showRecord: '1～10件目を表示中',
      total: 0,
      currentPage: 1,
      lastPage: 1,
      listNewView: [],
      listRecommendView: [],
      listStores: [],
      userExample: require('../assets/images/user.png'),
      settingSp: {
        'arrows': false,
        'dots': true,
        'focusOnSelect': true,
        'infinite': true,
        'speed': 500,
        'slidesToShow': 1,
        'slidesToScroll': 1,
        'touchThreshold': 5
      },
      showImageSp: true
    }
  },
  async created() {
    this.$store.commit(SET_SHOW_VIEW_SP, true)
    this.$store.commit(INDEX_SET_TITLE_MENU, { title: 'ホーム', subTitle: 'Home' })
    await this.getListNew()
    await this.getListSuggested()
    await this.getMasterData()
    await this.getViewNew()
    await this.getAllStore()
  },
  computed: {
    ...mapState({
      showViewSp: state => state.showViewSp
    }),
    countPageListNew() {
      let countMaxMin = ''
      if (this.total < 10) {
        countMaxMin = this.$t('common.display_item', { min: 1, max: this.total })
      } else countMaxMin = this.$t('common.display_item', { min: this.currentPage > 1 ? `${this.currentPage - 1}1` : this.currentPage, max: this.list10New.length < 10 ? `${this.currentPage - 1}${this.list10New.length}` : this.currentPage * this.list10New.length })
      return countMaxMin
    },
    countPageListSuggested() {
      let countMaxMin = ''
      if (this.total < 10) {
        countMaxMin = this.$t('common.display_item', { min: 1, max: this.total })
      } else countMaxMin = this.$t('common.display_item', { min: this.currentPage > 1 ? `${this.currentPage - 1}1` : this.currentPage, max: this.list10Suggested.length < 10 ? `${this.currentPage - 1}${this.list10Suggested.length}` : this.currentPage * this.list10Suggested.length })
      return countMaxMin
    },
    countPageSearch() {
      let countMaxMin = ''
      if (this.total < 10) {
        countMaxMin = this.$t('common.display_item', { min: 1, max: this.total })
      } else countMaxMin = this.$t('common.display_item', { min: this.currentPage > 1 ? `${this.currentPage - 1}1` : this.currentPage, max: this.listSearch.length < 10 ? `${this.currentPage - 1}${this.listSearch.length}` : this.currentPage * this.listSearch.length })
      return countMaxMin
    }
  },
  watch: {
    activeName() {
      this.changeTabView()
      this.scrollToTop()
    },
    showViewSp(value) {
      if (!value) {
        this.getListNew()
        this.getListSuggested()
      }
    }
  },
  methods: {
    changeStateView(state) {
      this.$store.commit(SET_SHOW_VIEW_SP, state)
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
    changeTabView() {
      if (this.activeName === 'new') {
        this.getViewNew()
      }
      if (this.activeName === 'suggest') {
        this.getViewSuggested()
      }
    },
    async checkGetViewNew(id) {
      this.showImageSp = false
      await this.getViewNew(id)
      this.showImageSp = true
    },
    async getViewNew(id) {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        let dataResources = `?mode=1`
        if (id) {
          dataResources += ('&user_id=' + id)
        }
        const data = await this.$store.dispatch(USER_LIST_VIEW_NEW, dataResources)
        switch (data.status_code) {
          case 200:
            this.listNewView = data.data
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
      } catch (e) {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async checkGetViewSuggested(id) {
      this.showImageSp = false
      await this.getViewSuggested(id)
      this.showImageSp = true
    },
    async getViewSuggested(id) {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        let dataResources = `?mode=1`
        if (id) {
          dataResources += ('&user_id=' + id)
        }
        const data = await this.$store.dispatch(USER_LIST_VIEW_SUGGEST, dataResources)
        switch (data.status_code) {
          case 200:
            this.listRecommendView = data.data
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
    async get10New() {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const dataResources = `per_page=10`
        const data = await this.$store.dispatch(USER_FILTER, dataResources)
        const dataApi = data.data
        switch (data.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: data.messages
            })
            this.list10New = this.convertData(dataApi.data)
            this.total = dataApi.total
            this.lastPage = dataApi.total_page
            this.currentPage = dataApi.current_page
            this.showList10New = true
            this.showList10Suggested = false
            this.currentSearching = false
            this.showListNew = false
            this.showListSuggested = false
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
      } catch (e) {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async get10Suggested() {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const dataResources = `filters[0][data]=recommend_users&filters[0][key]=list_type`
        const data = await this.$store.dispatch(USER_FILTER, dataResources)
        const dataApi = data.data
        switch (data.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: data.messages
            })
            this.list10Suggested = this.convertData(data.data.data)
            this.showList10Suggested = true
            this.showList10New = false
            this.total = dataApi.total
            this.lastPage = dataApi.total_page
            this.currentPage = dataApi.current_page
            this.currentSearching = false
            this.showListNew = false
            this.showListSuggested = false
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
    async changePageList10New(page) {
      this.currentPage = page
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const dataResources = `page=${this.currentPage}`
        const data = await this.$store.dispatch(USER_FILTER, dataResources)
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
            this.list10New = this.convertData(dataApi.data)
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
    async changePageList10Suggested(page) {
      this.currentPage = page
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const dataResources = `page=${this.currentPage}`
        const data = await this.$store.dispatch(USER_FILTER, dataResources)
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
            this.list10Suggested = this.convertData(dataApi.data)
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
    async changePage(page) {
      this.currentPage = page
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const dataResources = `${this.work_type_ids.length ? `filters[0][key]=work_type_ids&filters[0][data]=[${this.work_type_ids}]` : ''}${this.job_type_ids.length ? `&filters[1][key]=job_type_ids&filters[1][data]=[${this.job_type_ids}]` : ''}${this.job_experience_ids.length ? `&filters[2][key]=job_experience_ids&filters[2][data]=[${this.job_experience_ids}]` : ''}${this.age ? `&filters[3][key]=age&filters[3][data]=${this.age}` : ''}${(this.salary_type_id && (this.salary_min || this.salary_max)) ? `&filters[4][key]=salary_type_id&filters[4][data]=${this.salary_type_id}` : ''}${this.salary_min ? `&filters[5][key]=salary_min&filters[5][data]=${this.salary_min}` : ''}${this.salary_max ? `&filters[6][key]=salary_max&filters[6][data]=${this.salary_max}` : ''}${this.province_id.length ? `&filters[7][key]=province_id&filters[7][data]=[${this.province_id}]` : ''}&page=${this.currentPage}`
        const data = await this.$store.dispatch(USER_FILTER, dataResources)
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
            this.listSearch = this.convertData(dataApi.data)
            this.currentSearching = true
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
    async getListNew() {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const data = await this.$store.dispatch(LIST_USER_NEW)
        switch (data.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: data.messages
            })
            this.listNew = this.convertData(data.data)
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
    async getListSuggested() {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const data = await this.$store.dispatch(LIST_USER_SUGGESTED)
        switch (data.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: data.messages
            })
            this.listSuggested = this.convertData(data.data)
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
    async clickLike(data) {
      await this.postFavourite(data.id, data.status)
    },
    async checkClickLikeView(data, state) {
      this.showImageSp = false
      await this.clickLikeView(data, state)
      this.showImageSp = true
    },
    async clickLikeView(data, state) {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const dto = {
          user_id: data.id,
          action_type: data.status ? 0 : 1
        }
        const dataRes = await this.$store.dispatch(USER_FAVOURITE, dto)
        switch (dataRes.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: dataRes.messages
            })
            if (state === 'new') {
              await this.getViewNew(data.id)
            } else {
              await this.getViewSuggested(data.id)
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
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: dataRes.messages })
            break
        }
      } catch {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async postFavourite(id, status) {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const dto = {
          user_id: id,
          action_type: status ? 0 : 1
        }
        const data = await this.$store.dispatch(USER_FAVOURITE, dto)
        switch (data.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: data.messages
            })
            await this.getListNew()
            this.getListSuggested()
            if (this.currentSearching && this.currentPage === 1) {
              this.search()
            } else if (this.currentSearching && this.currentPage !== 1) {
              this.changePage(this.currentPage)
            } else if (this.showList10New && this.currentPage === 1) {
              this.get10New()
            } else if (this.showList10New && this.currentPage !== 1) {
              this.changePageList10New(this.currentPage)
            } else if (this.showList10Suggested && this.currentPage === 1) {
              this.get10Suggested()
            } else if (this.showList10Suggested && this.currentPage !== 1) {
              this.changePageList10Suggested(this.currentPage)
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
    async getMasterData() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataResources = [
        'resources[m_work_types]={"model": "MWorkType"}',
        'resources[m_provinces]={"model": "MProvince"}',
        'resources[m_job_types]={"model": "MJobType"}',
        'resources[m_job_experiences]={"model": "MJobExperience"}',
        'resources[m_job_types]={"model": "MJobType"}',
        'resources[m_salary_types]={}',
        'resources[age]={}'
      ]
      const dataMasterData = await this.$store.dispatch(MASTER_GET_DATA, dataResources.join('&'))
      if (dataMasterData.status_code === 200) {
        this.listProvinces = dataMasterData.data.m_provinces
        this.listWorkTypes = dataMasterData.data.m_work_types
        this.listJobExperience = dataMasterData.data.m_job_experiences
        this.listJobTypes = dataMasterData.data.m_job_types
        this.listAge = dataMasterData.data.age
        this.listSalaryTypes = dataMasterData.data.m_salary_types
        this.listGenders = dataMasterData.data.m_genders
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async search() {
      try {
        const body = document.getElementsByTagName('BODY')[0]
        await this.$store.commit(INDEX_SET_LOADING, true)
        const dataResources = `${this.work_type_ids.length ? `filters[0][key]=work_type_ids&filters[0][data]=[${this.work_type_ids}]` : ''}${this.job_type_ids.length ? `&filters[1][key]=job_type_ids&filters[1][data]=[${this.job_type_ids}]` : ''}${this.job_experience_ids.length ? `&filters[2][key]=job_experience_ids&filters[2][data]=[${this.job_experience_ids}]` : ''}${this.age ? `&filters[3][key]=age&filters[3][data]=${this.age}` : ''}${(this.salary_type_id && (this.salary_min || this.salary_max)) ? `&filters[4][key]=salary_type_id&filters[4][data]=${this.salary_type_id}` : ''}${this.salary_min ? `&filters[5][key]=salary_min&filters[5][data]=${this.salary_min}` : ''}${this.salary_max ? `&filters[6][key]=salary_max&filters[6][data]=${this.salary_max}` : ''}${this.province_id.length ? `&filters[7][key]=province_id&filters[7][data]=[${this.province_id}]` : ''}`
        const data = await this.$store.dispatch(USER_FILTER, dataResources)
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
            this.listSearch = this.convertData(dataApi.data)
            this.showMore = false
            this.currentSearching = true
            this.dialogVisible = false
            this.showList10New = false
            this.showList10Suggested = false
            body.style.overflow = 'auto'
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
    },
    scrollToTop() {
      window.scrollTo(0, 0)
    }
  }
}
</script>
