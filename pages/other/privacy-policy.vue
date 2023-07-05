<template>
  <div class="policy">
    <div class="breadcrumb">
      <span class="breadcrumb-previous cursor-pointer" @click="$router.push('/')">{{ $t('my_page.top_page') }}</span>
      <img class="breadcrumb-arrow" src="../../assets/icons/breadcrumb-arrow.svg" />
      <span class="breadcrumb-current">{{ $t('footer.privacy') }}</span>
    </div>
    <div class="policy-body">
      <div class="d-flex flex-col">
        <span class="policy-first">{{ policy1 }}</span>
        <span class="policy-second">{{ policy2 }}</span>
        <span class="policy-third">{{ policy3 }}</span>
        <span class="policy-fourth">{{ policy4 }}</span>
      </div>
      <div class="d-flex flex-col">
        <span class="policy-first">{{ policy5 }}</span>
        <span class="policy-second">{{ policy6 }}</span>
        <span class="policy-third">{{ policy7 }}</span>
        <span class="policy-fourth">{{ policy8 }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  data() {
    return {
      policy1: 'VAMPSは、皆さまの個人情報を保護するために細心の注意を払い、以下の方針に基づき個人情報の管理・運用を実施しています。VAMPS（以下「本サービス」といいます）をご利用いただく前に必ずお読みください。本サイトにおいて個人情報をご提供された場合に、当社の個人情報の取扱いに関して同意をいただいたものといたします。',
      policy2: '「個人会員」とは、本サービスに個人情報(「VAMPSプライバシーポリシー」の定義に従います)を登録し、当社がこれを承諾した利用者をいいます。',
      policy3: '「企業会員」とは、本サービスに登録し、当社がこれを承諾した求人企業及び職業紹介事業者（以下「紹介会社」といいます）のことをいいます。',
      policy4: '「会員」とは、個人会員及び企業会員のことをいいます。',
      policy5: 'VAMPS（以下「当社」といいます）は、皆さまの個人情報を保護するために細心の注意を払い、以下の方針に基づき個人情報の管理・運用を実施しています。VAMPS（以下「本サービス」といいます）をご利用いただく前に必ずお読みください。本サイトにおいて個人情報をご提供された場合に、当社の個人情報の取扱いに関して同意をいただいたものといたします。',
      policy6: '「個人会員」とは、本サービスに個人情報(「VAMPSプライバシーポリシー」の定義に従います)を登録し、当社がこれを承諾した利用者をいいます。',
      policy7: '「企業会員」とは、本サービスに登録し、当社がこれを承諾した求人企業及び職業紹介事業者（以下「紹介会社」といいます）のことをいいます。',
      policy8: '「会員」とは、個人会員及び企業会員のことをいいます。'
    }
  }
}
</script>
