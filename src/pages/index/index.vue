<template>
  <view class="tabPage">
    <view class="page">
      <LearnCard  v-if="active === 0"/>
    </view>
    <nut-tabbar v-model="active">
      <nut-tabbaritem>
        <template #icon>
          <nut-icon name="home" />
        </template>
      </nut-tabbaritem>
      <nut-tabbaritem>
        <template #icon>
          <nut-icon name="home" />
        </template>
      </nut-tabbaritem>
    </nut-tabbar>
  </view>
</template>

<script setup>
import LearnCard from './tabbar/learnCard.vue'
import { ref, inject, onBeforeMount } from 'vue'

const active = ref(0)
const show = ref(true)
</script>

<style lang="scss">
.tabPage {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .page {
    flex: 1;
  }
}
</style>
