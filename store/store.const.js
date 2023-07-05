// index
export const INDEX_SET_SUCCESS = 'setNotifySuccess'
export const INDEX_SET_ERROR = 'setNotifyError'
export const INDEX_SET_WARNING = 'setNotifyWarning'
export const INDEX_SET_LOADING = 'setLoading'
export const INDEX_SET_TITLE_MENU = 'setTitleMenu'
export const UPLOAD_IMAGE = 'uploadFile'
export const MASTER_GET_DATA = 'getMasterData'
export const INDEX_SET_SIDEBAR_IS_COLLAPSE = 'setSideBarCollapse'
export const GET_ZIP_CODE = 'getZipCode'
export const SET_STATE_MENU = 'setStateMenu'
export const SET_NOTIFICATIONS = 'setNotificationsCount'
export const SET_SHOW_VIEW_SP = 'setShowViewSp'
export const GET_LIST_STORE = 'getListStores'
export const SET_LIST_STORE_ACTIVES = 'setListStoreActives'
export const SET_SHOW_MESSAGE_SP = 'setShowMessageSP'
export const GET_COUNT_CHAT = 'getCountChat'
export const SET_PREVIOUS_URL = 'setPreviousUrl'
export const SET_BACK_LOGIN = 'setBackLogin'

// stores
export const GET_STORE_DETAIL = 'store/getStoreDetail'
export const EDIT_STORE = 'store/editStore'
export const CREATE_STORES = 'store/createStore'
export const LIST_STORES = 'store/getListStores'
export const DELETE_STORE = 'store/deleteStore'

// category
export const CATEGORY_OUT_STANDING = 'category/getOutStanding'
export const CATEGORY_GET_DETAIL = 'category/getDetail'
export const CATEGORY_GET_LIST_PRODUCT = 'category/getListProduct'
export const CATEGORY_SEARCH = 'category/categorySearch'

// user
export const USER_FAVOURITE_LIST = 'user/getFavouriteList'
export const USER_FAVOURITE = 'user/favouriteStatus'
export const LIST_USER_NEW = 'user/list5NewUsers'
export const LIST_USER_SUGGESTED = 'user/list5SuggestedUsers'
export const USER_FILTER = 'user/usersFilter'
export const USER_LIST_VIEW_NEW = 'user/listNewUsers'
export const USER_LIST_VIEW_SUGGEST = 'user/listSuggestedUsers'
export const USER_PROFILE = 'user/getProfile'
export const USER_UPDATE_PROFILE = 'user/updateProfile'
export const USER_DETAIL = 'user/userDetail'
export const USER_UPLOAD_AVATAR = 'user/uploadAvatar'
export const USER_FORGOT_PASS = 'authentication/forgotPass'
export const CHANGE_PASS = 'authentication/changePass'
export const AUTH_CHECK_TOKEN = 'authentication/checkToken'
export const AUTH_RESET_PASS = 'authentication/resetPass'
export const AUTH_CHECK_REGISTER = 'authentication/checkRegisterToken'

// authentication
export const AUTH_REGISTER = 'authentication/register'

// product
export const PRODUCT_DETAIL = 'product/detail'
export const PRODUCT_COMMENT = 'product/comment'
export const PRODUCT_COMMENT_IMAGE = 'product/commentImage'
export const PRODUCT_FAVORITE_LIST = 'product/favoriteList'
export const PRODUCT_OLD_LIST = 'product/oldList'
export const PRODUCT_FAVORITE = 'product/like'
export const PRODUCT_RELATED = 'product/related'
export const PRODUCT_DAILY_LIST = 'product/getProductDaily'
export const PRODUCT_LAST_SEEN = 'product/getProductLastSeen'
export const PRODUCT_SEARCH = 'product/productSearch'

// cart
export const CART_ADD_CART = 'cart/addCard'
export const CART_GET_CART = 'cart/getCart'
export const CART_REMOVE_CART = 'cart/removeCart'
export const CART_SET_CART = 'cart/setCart'
export const CART_COUNT = 'cart/cartCount'
export const CART_SET_COUNT = 'cart/setCount'
export const CART_CHECKOUT_DATA = 'cart/setCheckoutData'

// shop
export const SHOP_GET_LIST_HOT = 'shop/getListStoreHot'
export const SHOP_GET_DETAIL = 'shop/getStoreDetail'
export const SHOP_GET_LIST_CATEGORY = 'shop/getListCategoryByStore'
export const SHOP_GET_LIST_PRODUCT = 'shop/getListProductByStore'
export const SHOP_FOLLOW_SHOP = 'shop/followShop'

// order
export const ORDER_CREATE_ORDER = 'order/saveOrder'
export const ORDER_GET_DRAFT = 'order/getDraft'
export const ORDER_UPDATE_ORDER = 'order/updateOrder'
export const ORDER_LIST_ORDER = 'order/listOrder'
export const ORDER_SAVE_EVALUATE = 'order/saveEvaluate'
export const ORDER_GET_EVALUATE = 'order/getEvaluate'

// chat
export const CHAT_FETCH_MESSAGE = 'chat/fetchMessage'
export const CHAT_SEND_MESSAGE = 'chat/sendMessage'
export const CHAT_FETCH_ROOMS = 'chat/fetchRooms'
export const CHAT_FETCH_UN_READ_MESSAGE = 'chat/fetchUnreadMessage'
export const CHAT_SET_CHAT_WITH_SHOP = 'chat/setChatWithShop'
export const CHAT_SET_SWITCH_CHAT = 'chat/setSwitchChat'
export const CHAT_SET_UN_READ_MESSAGE = 'chat/setUnreadMessage'
export const CHAT_GET_ALL_STORES_NAME = 'chat/getAllStoresName'
export const CHAT_GET_LIST_CHAT_BY_STORE = 'chat/getListChatByStore'
export const CHAT_GET_DETAIL_CHAT = 'chat/getDetailChat'
export const CHAT_CREATE_CHAT = 'chat/createChat'

// my_page
export const MY_PAGE_SET_STATE_PAGE = 'my_page/setStatePage'
export const MY_PAGE_SET_SHOW_DETAIL_MESSAGE = 'my_page/setShowDetailMessage'

// Inquiry
export const INQUIRY_CREATE = 'my_page/createInquiry'
export const INQUIRY_PHONE_NUMBER = 'my_page/getPhoneNumber'

// job
export const JOB_LIST_JOB = 'job/getListJob'
export const JOB_DELETE_JOB = 'job/deleteJob'
export const JOB_ALL_STORE = 'job/getAllStores'
export const JOB_REGISTER_JOB = 'job/registerJob'
export const JOB_DETAIL_JOB = 'job/detailJob'
export const JOB_UPDATE_JOB = 'job/updateJob'

// notifications
export const COUNT_NOTIFY = 'notification/countNotifications'
export const LIST_NOTIFY = 'notification/listNotifications'
export const NOTIFICATION_UPDATE_READ = 'notification/readNotification'
export const NOTIFICATION_ANNOUNCEMENT = 'notification/getAnnouncement'
export const NOTIFICATION_SET_ANNOUNCEMENT = 'notification/setAnnouncement'
export const SETTING_NOTIFY = 'notification/settingNotify'
export const UPDATE_NOTIFY = 'notification/updateNotify'

// contacts
export const ALL_STORES_CONTACT = 'contact/getAllStoresContact'
export const ADMIN_PHONE_NUMBER_CONTACT = 'contact/getAdminPhoneNumber'
export const CREATE_CONTACT = 'contact/createStoreContact'

// application
export const APPLICATION_LIST = 'application/getListApplication'
export const APPLICATION_DETAIL = 'application/detailApplication'
export const APPLICATION_UPDATE = 'application/updateApplication'
export const APPLICATION_USER = 'application/getApplicationUser'

// interview schedule
export const INTERVIEW_SCHEDULE_LIST = 'interview_schedule/getListInterviewSchedule'
export const INTERVIEW_SCHEDULE_UPDATE = 'interview_schedule/updateInterviewSchedule'
export const INTERVIEW_SCHEDULE_DAY_UPDATE = 'interview_schedule/updateInterviewScheduleDay'
export const GET_STORE_IDS = 'interview_schedule/getStoreIds'
