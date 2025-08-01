<script setup>
import { computed, ref } from 'vue'
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  list: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['update:show'])
const cateList = computed(() => {
  return [
    {
      name: '默认目录',
      id: 1
    },
    ...props.list
  ]
})
</script>

<template>
  <nut-popup 
    :visible="show"
    round
    position="bottom" 
    :custom-style="{ height: '30%' }"
    @click-overlay="emit('update:show', false)"
  >
    <view class="popup-wrapper">
      <view class="head flex">
        <view class="title">选择目录</view>
        <view class="flex1"></view>
        <view class="subTitle">新建目录</view>
        <view class="close" @click="handleClose">关闭</view>
      </view>
      <view class="list">
        <view v-for="(item, index) in cateList" :key="item.id" class="listItem flex active">
          <image
            src="@/static/image/card/catalog.svg"
            class="iconL"
            mode="scaleToFill"
          />
          <view>{{ item.name }}</view>
          <view class="flex1"></view>
          <nut-icon name="more-s" />
        </view>
      </view>
    </view>
  </nut-popup>
</template>

<style lang="scss" scoped>
  .popup-wrapper {
    padding: 40rpx 30rpx 0;
    border-radius: 30rpx;

    .head {
      color: $uni-text-color;
      padding: 0 0 30rpx;

      .title {
        font-size: 34rpx;
        font-weight: bold;
      }

      .subTitle {
        font-size: 28rpx;
      }

      .close {
        font-size: 24rpx;
        color: $uni-text-color-placeholder;
        padding: 0 10rpx 0 50rpx;
      }
    }

    .list {
      .listItem {
        justify-content: space-between;
        padding: 35rpx 30rpx;
        border-radius: 10rpx;

        &.active {
          background-color: rgb(238, 242,245);
          color: $uni-color-primary;
        }

        .iconL {
          width: 40rpx;
          height: 40rpx;
          margin-right: 30rpx;
        }
      }
    }
  }
</style>