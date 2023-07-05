<template>
  <div :class="['border-input', {'border-form-middle': middle}]">
    <el-row class="d-flex">
      <el-col :span="6" :md="colSize ? colSize : 6">
      </el-col>
      <el-col :span="18" :md="colSize ? (24 - colSize) : 18">
        <div class="border-middle">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'BorderElement',
  props: ['middle', 'colSize']
}
</script>
