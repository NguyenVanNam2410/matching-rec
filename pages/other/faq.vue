<template>
  <div class="faq">
    <div class="breadcrumb">
      <span class="breadcrumb-previous cursor-pointer" @click="$router.push('/')">{{ $t('my_page.top_page') }}</span>
      <img class="breadcrumb-arrow" src="../../assets/icons/breadcrumb-arrow.svg" />
      <span class="breadcrumb-current">{{ $t('footer.faq') }}</span>
    </div>
    <div class="faq-body">
      <el-collapse>
        <el-collapse-item v-for="(item, index) in qaColumn" :key="index" :name="index">
          <template slot="title">
            <div class="d-flex items-center">
              <img src="../../assets/icons/question-icon.svg" />
              <span class="faq-question">{{ item.question }}</span>
            </div>
          </template>
          <div class="d-flex items-center">
            <img src="../../assets/icons/answer-icon.svg" />
            <span class="faq-answer">{{ item.answer }}</span>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FAQPage',
  data() {
    return {
      qaColumn: [
        {
          question: this.$t('qa.question_1'),
          answer: this.$t('qa.answer')
        },
        {
          question: this.$t('qa.question_2'),
          answer: this.$t('qa.answer')
        },
        {
          question: this.$t('qa.question_1'),
          answer: this.$t('qa.answer')
        },
        {
          question: this.$t('qa.question_2'),
          answer: this.$t('qa.answer')
        },
        {
          question: this.$t('qa.question_1'),
          answer: this.$t('qa.answer')
        }
      ]
    }
  }
}
</script>
