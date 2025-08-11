<script>
export default {
  onLaunch: function () {
  },
}
</script>

<style lang="scss">
/* 每个页面公共css */
@import './uni.scss';
@import '@/static/css/base.scss';
@import 'nutui-uniapp/styles/mixins/index.scss';
@import 'nutui-uniapp/styles/index.scss';

:root,
page {
  --nut-button-primary-background-color: #4f46e5;
  --nut-button-primary-border-color: #4f46e5;
}

page {
  background-color: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
}

button[plain] {
  border-width: 1rpx;
  border-color: $uni-text-color-grey;
}

/* 通用按钮样式 */
.btn {
  border-radius: $ios-button-radius;
  height: $ios-button-height;
  line-height: $ios-button-height;
  font-size: 30rpx;
  font-weight: 500;
  border: none;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: $ios-primary-color;
  color: #ffffff;
}

.btn-secondary {
  background-color: $ios-secondary-color;
  color: #666666;
}

.btn:active {
  transform: scale(0.98);
  opacity: 0.8;
}

/* 卡片通用样式 */
.card {
  background-color: $card-bg-color;
  border-radius: $card-border-radius;
  padding: $card-padding;
  box-shadow: $card-shadow;
  margin-bottom: 20rpx;
}

/* 输入框通用样式 */
.input, .textarea {
  font-size: 28rpx;
  color: #333333;
  line-height: 1.6;
}

.input:focus, .textarea:focus {
  outline: none;
}

/* 文本样式 */
.text-primary {
  color: $ios-primary-color;
}

.text-secondary {
  color: #666666;
}

.text-muted {
  color: #999999;
}

.text-center {
  text-align: center;
}
</style>
