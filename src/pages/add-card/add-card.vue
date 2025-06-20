<template>
  <view class="container">
    <scroll-view class="form-container" scroll-y>
      <!-- 卡片类型选择 -->
      <view class="form-section">
        <text class="section-title">选择类型</text>
        <view class="category-selector">
          <view 
            v-for="category in categories" 
            :key="category.value"
            class="category-option"
            :class="{ active: form.category === category.value }"
            @click="selectCategory(category.value)"
          >
            <view class="category-icon" :class="`icon-${category.value}`">
              <text class="icon-text">{{ category.icon }}</text>
            </view>
            <text class="category-name">{{ category.name }}</text>
          </view>
        </view>
      </view>

      <!-- 标题输入 -->
      <view class="form-section">
        <text class="section-title">标题</text>
        <input 
          class="input-field"
          v-model="form.title"
          placeholder="请输入卡片标题"
          maxlength="50"
        />
      </view>

      <!-- 内容输入 -->
      <view class="form-section">
        <text class="section-title">内容</text>
        <textarea 
          class="textarea-field"
          v-model="form.content"
          placeholder="请输入卡片内容"
          maxlength="1000"
          auto-height
        />
      </view>

      <!-- 英语卡片特殊字段 -->
      <template v-if="form.category === 'english'">
        <view class="form-section">
          <text class="section-title">音标</text>
          <input 
            class="input-field"
            v-model="form.phonetic"
            placeholder="请输入音标（可选）"
          />
        </view>
        
        <view class="form-section">
          <text class="section-title">例句</text>
          <textarea 
            class="textarea-field"
            v-model="form.example"
            placeholder="请输入例句（可选）"
            maxlength="200"
          />
        </view>
      </template>

      <!-- 考研卡片特殊字段 -->
      <template v-if="form.category === 'postgraduate'">
        <view class="form-section">
          <text class="section-title">复习日期</text>
          <picker 
            mode="date" 
            :value="form.reviewDate" 
            @change="onDateChange"
            class="date-picker"
          >
            <view class="picker-text">
              {{ form.reviewDate || '选择复习日期（可选）' }}
            </view>
          </picker>
        </view>
      </template>

      <!-- 考编卡片特殊字段 -->
      <template v-if="form.category === 'exam'">
        <view class="form-section">
          <text class="section-title">卡片类型</text>
          <picker 
            :range="examTypes" 
            :value="examTypeIndex" 
            @change="onExamTypeChange"
            class="type-picker"
          >
            <view class="picker-text">
              {{ examTypes[examTypeIndex] }}
            </view>
          </picker>
        </view>
      </template>
    </scroll-view>

    <!-- 底部按钮 -->
    <view class="bottom-actions">
      <button class="cancel-btn" @click="cancel">取消</button>
      <button class="save-btn" @click="saveCard" :disabled="!canSave">保存</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: '',
        content: '',
        category: 'postgraduate',
        phonetic: '',
        example: '',
        reviewDate: '',
        examType: '政策信息'
      },
      categories: [
        { name: '考研', value: 'postgraduate', icon: '📚' },
        { name: '英语', value: 'english', icon: '🔤' },
        { name: '考编', value: 'exam', icon: '📋' }
      ],
      examTypes: ['政策信息', '备考计划', '重要知识点'],
      examTypeIndex: 0
    }
  },
  computed: {
    canSave() {
      return this.form.title.trim() && this.form.content.trim()
    }
  },
  methods: {
    // 选择分类
    selectCategory(category) {
      this.form.category = category
    },
    
    // 日期选择
    onDateChange(e) {
      this.form.reviewDate = e.detail.value
    },
    
    // 考编类型选择
    onExamTypeChange(e) {
      this.examTypeIndex = e.detail.value
      this.form.examType = this.examTypes[e.detail.value]
    },
    
    // 保存卡片
    saveCard() {
      if (!this.canSave) {
        uni.showToast({
          title: '请填写标题和内容',
          icon: 'none'
        })
        return
      }
      
      const cards = uni.getStorageSync('study_cards') || []
      const newCard = {
        id: Date.now().toString(),
        ...this.form,
        createTime: Date.now(),
        updateTime: Date.now()
      }
      
      cards.unshift(newCard)
      uni.setStorageSync('study_cards', cards)
      
      uni.showToast({
        title: '保存成功',
        icon: 'success'
      })
      
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
    },
    
    // 取消
    cancel() {
      uni.navigateBack()
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.form-container {
  flex: 1;
  padding: 30rpx;
}

.form-section {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #333333;
  display: block;
  margin-bottom: 20rpx;
}

/* 分类选择器 */
.category-selector {
  display: flex;
  justify-content: space-between;
}

.category-option {
  flex: 1;
  text-align: center;
  padding: 30rpx 20rpx;
  border-radius: 15rpx;
  margin: 0 10rpx;
  background-color: #f8f9fa;
  transition: all 0.3s ease;
}

.category-option.active {
  background-color: #007AFF;
  transform: translateY(-5rpx);
}

.category-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 40rpx;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15rpx;
}

.category-option.active .category-icon {
  background-color: rgba(255, 255, 255, 0.2);
}

.icon-text {
  font-size: 40rpx;
}

.category-name {
  font-size: 26rpx;
  color: #666666;
  font-weight: 500;
}

.category-option.active .category-name {
  color: #ffffff;
}

/* 输入框 */
.input-field {
  width: 100%;
  padding: 25rpx 0;
  font-size: 28rpx;
  color: #333333;
  border-bottom: 2rpx solid #f0f0f0;
}

.input-field:focus {
  border-bottom-color: #007AFF;
}

.textarea-field {
  width: 100%;
  min-height: 200rpx;
  padding: 25rpx 0;
  font-size: 28rpx;
  color: #333333;
  line-height: 1.6;
}

/* 选择器 */
.date-picker,
.type-picker {
  padding: 25rpx 0;
  border-bottom: 2rpx solid #f0f0f0;
}

.picker-text {
  font-size: 28rpx;
  color: #333333;
}

/* 底部按钮 */
.bottom-actions {
  display: flex;
  padding: 30rpx;
  background-color: #ffffff;
  border-top: 2rpx solid #f0f0f0;
}

.cancel-btn,
.save-btn {
  flex: 1;
  height: 88rpx;
  border-radius: 44rpx;
  font-size: 30rpx;
  font-weight: 500;
  border: none;
}

.cancel-btn {
  background-color: #f8f9fa;
  color: #666666;
  margin-right: 20rpx;
}

.save-btn {
  background-color: #007AFF;
  color: #ffffff;
  margin-left: 20rpx;
}

.save-btn:disabled {
  background-color: #cccccc;
  color: #999999;
}
</style>