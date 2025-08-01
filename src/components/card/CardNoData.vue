<script setup>
const emits = defineEmits(['addCard'])

const handleAddCard = () => {
  emits('addCard')
}
</script>

<template>
  <view class="noData">
    <image src="@/static/image/noData.svg" mode="aspectFit" class="image"></image>
    <text class="addTip">快来添加你的第一个卡盒</text>
    <nut-button class="addBoxBtn" customColor="#4f46e5" @click="handleAddCard">
      <template #icon>
        <nut-icon name="uploader" size="24rpx"/>
      </template>
      添加卡盒
    </nut-button>
  </view>
</template>

<style lang="scss">
.noData {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  .image {
    width: 80%;
    height: 320rpx;
    will-change: transform;
  }

  .addTip {
    padding: 40rpx 0 20rpx;
  }

  .addBoxBtn {
    font-size: 24rpx;
  }
}
</style>