<template>
  <div v-if="banner" class="banner-element">
    <div class="banner-content">
      <div class="banner-title">{{ banner }}</div>
      <div class="sub-title">
        <span v-if="title">{{ title }}</span>
        <div v-if="subBanner" class="sub-banner-title">{{ subBanner }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BannerElement',
  props: ['banner', 'title', 'subBanner']
}
</script>
