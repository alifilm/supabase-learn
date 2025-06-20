<template>
  <view class="login-container">
    <!-- Logo区域 -->
    <view class="logo-section fade-in">
      <image src="/static/logo.png" class="logo-image" mode="aspectFit"></image>
      <text class="app-name">学习卡片</text>
      <text class="app-slogan">专为学习打造的智能卡片应用</text>
    </view>
    
    <!-- 登录按钮区域 -->
    <view class="login-options fade-in">
      <button class="login-btn primary-btn" @click="handleQuickLogin">
        <text class="btn-text">一键登录</text>
      </button>
      
      <button class="login-btn outline-btn" @click="handlePhoneLogin">
        <text class="btn-text">手机号登录</text>
      </button>
      
      <view class="agreement-section">
        <checkbox :checked="agreePolicy" @click="agreePolicy = !agreePolicy" color="#007aff" style="transform:scale(0.8)" />
        <text class="agreement-text">登录即表示同意</text>
        <text class="agreement-link" @click="viewUserAgreement">《用户协议》</text>
        <text class="agreement-text">和</text>
        <text class="agreement-link" @click="viewPrivacyPolicy">《隐私政策》</text>
      </view>
    </view>
    
    <!-- 底部信息 -->
    <view class="footer-info">
      <text class="copyright">© 2024 学习卡片 版权所有</text>
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

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: 80rpx 50rpx 40rpx;
  background-color: #f5f5f5;
}

.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60rpx;
}

.logo-image {
  width: 180rpx;
  height: 180rpx;
  margin-bottom: 30rpx;
}

.app-name {
  font-size: 48rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 20rpx;
}

.app-slogan {
  font-size: 32rpx;
  color: #666666;
  text-align: center;
}

.login-options {
  width: 100%;
  margin-top: 100rpx;
}

.login-btn {
  width: 100%;
  height: 90rpx;
  border-radius: 45rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30rpx;
}

.primary-btn {
  background-color: #007aff;
  color: #ffffff;
  border: none;
}

.outline-btn {
  background-color: transparent;
  color: #007aff;
  border: 2rpx solid #007aff;
}

.btn-text {
  font-size: 32rpx;
  font-weight: 500;
}

.agreement-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20rpx;
}

.agreement-text {
  font-size: 24rpx;
  color: #999999;
}

.agreement-link {
  font-size: 24rpx;
  color: #007aff;
}

.footer-info {
  margin-top: 60rpx;
  padding-bottom: 20rpx;
}

.copyright {
  font-size: 24rpx;
  color: #999999;
}

/* 动画效果 */
.fade-in {
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>