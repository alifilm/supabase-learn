<template>
  <nut-navbar title="" fixed safe-area-inset-top customColor="#323232"></nut-navbar>
  <view class="loginPage flex-column-center">
    <text class="title">欢迎使用 孔明</text>
    <text class="desc">专为学习打造的智能卡片应用</text>

    <view class="logo-bg">
      孔明
    </view>

    <!-- Logo区域 -->
    <view class="loginPage-logo">
      <image src="/static/logo.png" mode="aspectFit" class="logo"></image>
    </view>

    <!-- 卡片区域 -->
    <view class="loginPage-card">
      <view class="content">
        <nut-button type="primary" size="large" class="btn btn-login" @tap="handleQuickLogin">
          一键登录
        </nut-button>
        <nut-button type="default" size="large" class="btn btn-phone" @tap="handlePhoneLogin">
          手机号登录
        </nut-button>
        <view class="policy">
          <!-- <checkbox :checked="agreePolicy" @change="agreePolicy = !agreePolicy"/> -->
          <tn-checkbox v-model="agreePolicy" checked-shape="circle" />
          <text class="policy-text">登录即表示同意</text>
          <text class="policy-link" @tap="viewUserAgreement">《用户协议》</text>
          <text class="policy-text">和</text>
          <text class="policy-link" @tap="viewPrivacyPolicy">《隐私政策》</text>
        </view>
      </view>
    </view>

    <!-- 底部信息 -->
    <view class="loginPage-footer">
      <text class="footer-text">© 2024 学习卡片 版权所有</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue"

const agreePolicy = ref(false)

const handleQuickLogin = () => {
  if (!this.agreePolicy.value) {
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
}

</script>

<style lang="scss">
.loginPage {
  height: 80vh;
  padding: 0 30rpx;

  .title {
    padding: 20rpx 0;
    font-size: 36rpx;
  }

  .logo-bg {
    font-size: 80rpx;
    color: #aaa;
    transform: translateY(45deg);
  }

  &-logo {
    padding: 80rpx 0 50rpx;
    .logo {
      width: 280rpx;
      height: 280rpx;
      border-radius: 12rpx;
      display: block;
      margin: 0 auto;
    }
  }

  &-card {
    flex: 1;
    padding: 30rpx 0;

    .content {
      display: flex;
      flex-direction: column;

      button {
        margin: 0 0 20rpx;
      }
    }

    .policy {
      padding: 0 0 20rpx;
      font-size: 24rpx;
    }
  }

  &-footer {
    text-align: center;
  }
}
</style>