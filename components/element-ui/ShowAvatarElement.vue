<template>
  <div class="show-avatar-element">
    <div v-if="user.avatar">
      <img :src="user.avatar" alt="">
    </div>
    <div v-else class="d-flex show-avatar" :style="{backgroundColor: backgroundColor}">
      <span>
        {{ user.name.slice(0, 1) }}
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ShowAvatarElement',
  props: ['user'],
  data() {
    const listColor = [
      '#AB4CF5',
      '#E83434',
      '#11D35F',
      '#F017C0',
      '#F9B126',
      '#266EF9'
    ]
    return {
      backgroundColor: listColor[Math.floor(Math.random() * 6)]
    }
  }
}
</script>
