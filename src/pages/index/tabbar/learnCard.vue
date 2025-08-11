<template>
  <view class="learnPage">
    <nut-navbar title="卡盒" fixed safe-area-inset-top customColor="#323232">
      <template #left>
        <view class="learnPage-setting flex">
          <nut-icon name="setting" size="28rpx"/>
          设置
        </view>
      </template>
    </nut-navbar>
    <view class="flex1">
      <view v-if="cardList.length"></view>
      <CardNoData 
        v-else
        @addCard="handleAddCard"/>
    </view>
    <CatelogPopup 
      v-model:show="catelogShow" 
      :currentIdx="catelogIdx"
      :catelogList="catelogList"
      @popupItemClick="handleCatelogItemClick"/>
  </view>
</template>

<script setup>
import CardNoData from '@/components/card/CardNoData.vue'
import CatelogPopup from '@/components/card/CatalogPopup.vue'
import { ref, inject, onBeforeMount } from 'vue'

const $api = inject('$api')
const { cardList } = useLearnCard()
const { catelogShow, catelogIdx, catelogList, handleCatelogItemClick } = useCatelogPopup()
const { handleAddCard } = useNoData()

// 无数据的hook
function useNoData() {
  const handleAddCard = () => {
    catelogShow.value = true
  }

  return {
    handleAddCard
  }
}

// 目录popup的hook
function useCatelogPopup() {
  const catelogShow = ref(false)
  const catelogIdx = ref(0)
  const catelogList = ref([])

  const handleCatelogItemClick = (idx) => {
    catelogIdx.value = idx
  }

  const getCatelogList = async() => {
    const res = await $api.learn.getCardCollection()
    if (res.status === 200) {
      catelogList.value = res.data      
    }
  }

  onBeforeMount(() => {
    getCatelogList()
  })

  return {
    catelogShow,
    catelogIdx,
    catelogList,
    handleCatelogItemClick,
  }
}

function useLearnCard() {
  const cardList = ref([])

  onBeforeMount(() => {
    $api.learn.getLearnCategory().then(res => {
      console.log(res)
    })
  })

  return {
    cardList
  }
}
</script>

<style scoped>
:root {
  --nut-navbar-background: $uni-color-primary;
}
</style>

<style lang="scss">
.learnPage {
  height: 100%;
  display: flex;
  flex-direction: column;

  &-setting {
    background-color: rgb(245, 246, 246);
    color: $uni-text-color;
    border-radius: 20rpx;
    height: 40rpx;
    padding: 0 20rpx;
    font-size: 24rpx;
  }
}
</style>
