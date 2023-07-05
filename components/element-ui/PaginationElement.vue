<template>
  <div class="pagination-common">
    <ul class="pagination d-flex">
      <li :class="['page-item last-background', currentPage === 1 ? 'disable' : '']" @click="prePage">
        <span class="icon-next button-prev"></span>
      </li>
      <li v-if="minPage > 1" class="page-item page-more"><span>...</span></li>
      <li v-for="item in listPage" :key="item"
        :class="['page-item', item === currentPage ? 'active' : '']" @click="changePage(item)">
        <span class="page-link" href="#">{{ item }}</span>
      </li>
      <li v-if="maxPage < lastPage" class="page-item page-more"><span>...</span></li>
      <li :class="['page-item last-background', currentPage === lastPage ? 'disable' : '']" @click="nextPage">
        <span class="icon-next"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PaginationElement',
  props: ['currentPage', 'lastPage'],
  data() {
    return {
      maxContent: 1
    }
  },
  computed: {
    minPage() {
      if (this.lastPage <= this.maxContent * 2 + 2) {
        return 1
      }
      if (this.maxContent + this.currentPage >= (this.lastPage - 1)) {
        return this.lastPage - this.maxContent * 2 - 2
      }
      if (this.currentPage - this.maxContent > 1) {
        return this.currentPage - this.maxContent - 1
      }

      return 1
    },
    maxPage() {
      if (this.lastPage <= this.maxContent * 2 + 2) {
        return this.lastPage
      }
      if (this.currentPage <= (this.maxContent + 1)) {
        return this.maxContent * 2 + 3
      }
      if (this.maxContent + this.currentPage < this.lastPage) {
        return this.maxContent + this.currentPage + 1
      }
      return this.lastPage
    },
    listPage() {
      const data = []
      for (let x = this.minPage; x <= this.maxPage; x++) {
        data.push(x)
      }
      return data
    }
  },
  methods: {
    changePage(page) {
      this.$emit('change', page)
      window.scrollTo(0, 0)
    },
    prePage() {
      if (this.currentPage >= 2) {
        this.changePage(this.currentPage - 1)
      }
    },
    nextPage() {
      if (this.currentPage <= this.lastPage - 1) {
        this.changePage(this.currentPage + 1)
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
