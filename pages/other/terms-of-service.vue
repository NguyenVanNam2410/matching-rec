<template>
  <div class="terms">
    <div class="breadcrumb">
      <span class="breadcrumb-previous cursor-pointer" @click="$router.push('/')">{{ $t('my_page.top_page') }}</span>
      <img class="breadcrumb-arrow" src="../../assets/icons/breadcrumb-arrow.svg" />
      <span class="breadcrumb-current">{{ $t('footer.terms') }}</span>
    </div>
    <div class="terms-body">
      <div>
        <p class="terms-condition">{{ termCondition1 }}</p>
        <p>{{ term11 }}</p>
        <p>{{ term12 }}</p>
        <p>{{ term13 }}</p>
        <p>{{ term14 }}</p>
        <p>{{ term15 }}</p>
      </div>
      <div>
        <p class="terms-condition">{{ termCondition2 }}</p>
        <p>{{ term11 }}</p>
        <p>{{ term12 }}</p>
        <p>{{ term13 }}</p>
        <p>{{ term14 }}</p>
        <p class="pb-16">{{ term15 }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TermsPage',
  data() {
    return {
      termCondition1: '第１条　定義',
      term11: '「VAMPS」(以下「本サービス」といいます)とは、VAMPS(以下「当社」といいます)が提供するインターネット上の求人求職関連サービス及びこのサイトに付随するメールサービス等の各種情報提供サービス、その他支援サービスの総称をいいます。',
      term12: '「個人会員」とは、本サービスに個人情報(「VAMPSプライバシーポリシー」の定義に従います)を登録し、当社がこれを承諾した利用者をいいます。',
      term13: '「企業会員」とは、本サービスに登録し、当社がこれを承諾した求人企業及び職業紹介事業者（以下「紹介会社」といいます）のことをいいます。',
      term14: '「会員」とは、個人会員及び企業会員のことをいいます。',
      term15: '「会員登録」とは、個人会員の場合は本サービスに個人情報（求人応募の際の個人情報も含みます）を登録すること、企業会員の場合は本サービスに企業情報を登録することをいいます。',
      termCondition2: '第2条　定義'
    }
  }
}
</script>
