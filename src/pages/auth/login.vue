<template>
  <view class="flex flex-col items-center justify-between min-h-screen px-16rpx py-24rpx bg-gray-100">
    <!-- Logo区域 -->
    <view class="flex flex-col items-center mt-32rpx animate-fade-in">
      <image src="/static/logo.png" class="w-100rpx h-100rpx mb-16rpx" mode="aspectFit"></image>
      <text class="text-32rpx font-bold text-gray-800 mb-8rpx">学习卡片</text>
      <text class="text-20rpx text-gray-500 text-center">专为学习打造的智能卡片应用</text>
    </view>
    
    <!-- 登录按钮区域 -->
    <view class="w-full mt-40rpx animate-fade-in">
      <button
        class="w-full h-56rpx rounded-full flex items-center justify-center mb-16rpx bg-blue-500 text-white border-none text-24rpx font-medium shadow-sm transition active:scale-98"
        @click="handleQuickLogin"
      >
        <text>一键登录</text>
      </button>
      <button
        class="w-full h-56rpx rounded-full flex items-center justify-center mb-16rpx bg-transparent text-blue-500 border-2 border-blue-500 text-24rpx font-medium shadow-sm transition active:scale-98"
        @click="handlePhoneLogin"
      >
        <text>手机号登录</text>
      </button>
      <view class="flex flex-row items-center justify-center mt-8rpx">
        <checkbox :checked="agreePolicy" @click="agreePolicy = !agreePolicy" color="#007aff" style="transform:scale(0.8)" />
        <text class="text-16rpx text-gray-400 ml-4rpx">登录即表示同意</text>
        <text class="text-16rpx text-blue-500 mx-2rpx" @click="viewUserAgreement">《用户协议》</text>
        <text class="text-16rpx text-gray-400">和</text>
        <text class="text-16rpx text-blue-500 ml-2rpx" @click="viewPrivacyPolicy">《隐私政策》</text>
      </view>
    </view>
    
    <!-- 底部信息 -->
    <view class="mt-32rpx pb-8rpx">
      <text class="text-14rpx text-gray-400">© 2024 学习卡片 版权所有</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      agreePolicy: true
    }
  },
  methods: {
    // 一键登录
    handleQuickLogin() {
      if (!this.agreePolicy) {
        this.showAgreementTip()
        return
      }
      
      // 这里实现一键登录逻辑
      uni.showLoading({
        title: '登录中...'
      })
      
      // 模拟登录过程
      setTimeout(() => {
        uni.hideLoading()
        this.loginSuccess()
      }, 1500)
    },
    
    // 手机号登录
    handlePhoneLogin() {
      if (!this.agreePolicy) {
        this.showAgreementTip()
        return
      }
      
      // 跳转到手机号登录页面
      uni.navigateTo({
        url: '/pages/auth/phone_login'
      })
    },
    
    // 查看用户协议
    viewUserAgreement() {
      uni.showToast({
        title: '用户协议功能开发中',
        icon: 'none'
      })
    },
    
    // 查看隐私政策
    viewPrivacyPolicy() {
      uni.showToast({
        title: '隐私政策功能开发中',
        icon: 'none'
      })
    },
    
    // 提示用户同意协议
    showAgreementTip() {
      uni.showToast({
        title: '请先同意用户协议和隐私政策',
        icon: 'none'
      })
    },
    
    // 登录成功处理
    loginSuccess() {
      // 保存登录状态
      uni.setStorageSync('isLoggedIn', true)
      
      // 跳转到首页
      uni.switchTab({
        url: '/pages/index/index'
      })
    }
  }
}
</script>

<style>
</style>