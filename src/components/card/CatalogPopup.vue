<script setup>
import { computed, ref } from 'vue'
const dialogVisible = ref(false)
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  currentIdx: {
    type: Number,
    default: 0
  },
  catelogList: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['update:show', 'popupItemClick'])
const list = computed(() => {
  return [
    // {
    //   name: '默认目录',
    //   id: 1
    // },
    ...props.catelogList
  ]
})

const handlePopupItemClick = (index) => {
  emit('popupItemClick', index)
}

const handleClose = () => {
  emit('update:show', false)
}

const handleDialogShow = () => {
  dialogVisible.value = true
}
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
        <view class="subTitle" @click="handleDialogShow">新建目录</view>
        <view class="close" @click="handleClose">关闭</view>
      </view>
      <view class="list">
        <view v-for="(item, index) in list" :key="item.id" :class="`listItem flex ${currentIdx === index ? 'active' : ''}`" @click="handlePopupItemClick(index)">
          <image
            :src="`../../static/image/card/catalog${currentIdx === index ? '_active.svg' : '.svg'}`"
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
  <nut-dialog title="基础弹框" content="这是基础弹框。" v-model:visible="dialogVisible" @cancel="onCancel" @ok="onOk" />
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