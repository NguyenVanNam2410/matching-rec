<template>
  <div class="no-data-element">
    <div class="d-flex items-center flex-col">
      <img src="../../assets/images/no-data.svg" alt="">
      <div class="text-nodata">{{ text }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NoDataElement',
  props: ['text']
}
</script>
