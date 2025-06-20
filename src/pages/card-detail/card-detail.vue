<template>
  <view class="container">
    <scroll-view class="content" scroll-y v-if="card">
      <!-- 卡片头部 -->
      <view class="card-header">
        <view class="category-badge" :class="`badge-${card.category}`">
          <text class="badge-text">{{ getCategoryName(card.category) }}</text>
        </view>
        <view class="card-actions" v-if="mode === 'view'">
          <view class="action-btn" @click="editCard">
            <text class="action-text">编辑</text>
          </view>
        </view>
      </view>

      <!-- 卡片标题 -->
      <view class="title-section">
        <input 
          v-if="mode === 'edit'"
          class="title-input"
          v-model="editForm.title"
          placeholder="请输入标题"
        />
        <text v-else class="card-title">{{ card.title }}</text>
      </view>

      <!-- 卡片内容 -->
      <view class="content-section">
        <textarea 
          v-if="mode === 'edit'"
          class="content-textarea"
          v-model="editForm.content"
          placeholder="请输入内容"
          auto-height
        />
        <text v-else class="card-content">{{ card.content }}</text>
      </view>

      <!-- 英语卡片特殊内容 -->
      <template v-if="card.category === 'english'">
        <view class="special-section" v-if="card.phonetic || mode === 'edit'">
          <text class="section-label">音标</text>
          <input 
            v-if="mode === 'edit'"
            class="special-input"
            v-model="editForm.phonetic"
            placeholder="请输入音标"
          />
          <text v-else class="special-text">{{ card.phonetic || '暂无' }}</text>
        </view>
        
        <view class="special-section" v-if="card.example || mode === 'edit'">
          <text class="section-label">例句</text>
          <textarea 
            v-if="mode === 'edit'"
            class="special-textarea"
            v-model="editForm.example"
            placeholder="请输入例句"
          />
          <text v-else class="special-text">{{ card.example || '暂无' }}</text>
        </view>
      </template>

      <!-- 考研卡片特殊内容 -->
      <template v-if="card.category === 'postgraduate'">
        <view class="special-section" v-if="card.reviewDate || mode === 'edit'">
          <text class="section-label">复习日期</text>
          <picker 
            v-if="mode === 'edit'"
            mode="date" 
            :value="editForm.reviewDate" 
            @change="onDateChange"
            class="date-picker"
          >
            <view class="picker-text">
              {{ editForm.reviewDate || '选择复习日期' }}
            </view>
          </picker>
          <text v-else class="special-text">{{ formatDate(card.reviewDate) || '暂无' }}</text>
        </view>
      </template>

      <!-- 考编卡片特殊内容 -->
      <template v-if="card.category === 'exam'">
        <view class="special-section" v-if="card.examType || mode === 'edit'">
          <text class="section-label">类型</text>
          <picker 
            v-if="mode === 'edit'"
            :range="examTypes" 
            :value="examTypeIndex" 
            @change="onExamTypeChange"
            class="type-picker"
          >
            <view class="picker-text">
              {{ examTypes[examTypeIndex] }}
            </view>
          </picker>
          <text v-else class="special-text">{{ card.examType || '暂无' }}</text>
        </view>
      </template>

      <!-- 卡片信息 -->
      <view class="info-section">
        <text class="info-text">创建时间：{{ formatDateTime(card.createTime) }}</text>
        <text class="info-text" v-if="card.updateTime !== card.createTime">
          更新时间：{{ formatDateTime(card.updateTime) }}
        </text>
      </view>
    </scroll-view>

    <!-- 底部按钮 -->
    <view class="bottom-actions" v-if="mode === 'edit'">
      <button class="cancel-btn" @click="cancelEdit">取消</button>
      <button class="save-btn" @click="saveCard">保存</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      cardId: '',
      mode: 'view', // view 或 edit
      card: null,
      editForm: {},
      examTypes: ['政策信息', '备考计划', '重要知识点'],
      examTypeIndex: 0
    }
  },
  onLoad(options) {
    this.cardId = options.id
    this.mode = options.mode || 'view'
    this.loadCard()
  },
  methods: {
    // 加载卡片数据
    loadCard() {
      const cards = uni.getStorageSync('study_cards') || []
      this.card = cards.find(card => card.id === this.cardId)
      
      if (!this.card) {
        uni.showToast({
          title: '卡片不存在',
          icon: 'none'
        })
        uni.navigateBack()
        return
      }
      
      // 初始化编辑表单
      this.editForm = { ...this.card }
      
      // 设置考编类型索引
      if (this.card.category === 'exam' && this.card.examType) {
        this.examTypeIndex = this.examTypes.indexOf(this.card.examType)
      }
    },
    
    // 获取分类名称
    getCategoryName(category) {
      const categoryMap = {
        postgraduate: '考研',
        english: '英语',
        exam: '考编'
      }
      return categoryMap[category] || '未知'
    },
    
    // 格式化日期
    formatDate(dateStr) {
      if (!dateStr) return ''
      const date = new Date(dateStr)
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    },
    
    // 格式化日期时间
    formatDateTime(timestamp) {
      const date = new Date(timestamp)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hour = date.getHours().toString().padStart(2, '0')
      const minute = date.getMinutes().toString().padStart(2, '0')
      return `${year}年${month}月${day}日 ${hour}:${minute}`
    },
    
    // 编辑卡片
    editCard() {
      this.mode = 'edit'
    },
    
    // 取消编辑
    cancelEdit() {
      this.mode = 'view'
      this.editForm = { ...this.card }
    },
    
    // 日期选择
    onDateChange(e) {
      this.editForm.reviewDate = e.detail.value
    },
    
    // 考编类型选择
    onExamTypeChange(e) {
      this.examTypeIndex = e.detail.value
      this.editForm.examType = this.examTypes[e.detail.value]
    },
    
    // 保存卡片
    saveCard() {
      if (!this.editForm.title.trim() || !this.editForm.content.trim()) {
        uni.showToast({
          title: '请填写标题和内容',
          icon: 'none'
        })
        return
      }
      
      const cards = uni.getStorageSync('study_cards') || []
      const cardIndex = cards.findIndex(card => card.id === this.cardId)
      
      if (cardIndex !== -1) {
        cards[cardIndex] = {
          ...this.editForm,
          updateTime: Date.now()
        }
        uni.setStorageSync('study_cards', cards)
        
        this.card = cards[cardIndex]
        this.mode = 'view'
        
        uni.showToast({
          title: '保存成功',
          icon: 'success'
        })
      }
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

.content {
  flex: 1;
  padding: 30rpx;
}

/* 卡片头部 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.category-badge {
  padding: 12rpx 24rpx;
  border-radius: 20rpx;
}

.badge-postgraduate {
  background-color: #FF6B6B;
}

.badge-english {
  background-color: #4ECDC4;
}

.badge-exam {
  background-color: #45B7D1;
}

.badge-text {
  font-size: 24rpx;
  color: #ffffff;
  font-weight: 500;
}

.card-actions {
  display: flex;
}

.action-btn {
  padding: 12rpx 24rpx;
  background-color: #007AFF;
  border-radius: 15rpx;
}

.action-text {
  font-size: 24rpx;
  color: #ffffff;
}

/* 标题区域 */
.title-section {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 40rpx 30rpx;
  margin-bottom: 20rpx;
}

.card-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333333;
  line-height: 1.4;
}

.title-input {
  width: 100%;
  font-size: 36rpx;
  font-weight: 600;
  color: #333333;
  border: none;
  outline: none;
}

/* 内容区域 */
.content-section {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 40rpx 30rpx;
  margin-bottom: 20rpx;
}

.card-content {
  font-size: 30rpx;
  color: #666666;
  line-height: 1.8;
  white-space: pre-wrap;
}

.content-textarea {
  width: 100%;
  min-height: 300rpx;
  font-size: 30rpx;
  color: #666666;
  line-height: 1.8;
  border: none;
  outline: none;
}

/* 特殊内容区域 */
.special-section {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.section-label {
  font-size: 26rpx;
  color: #999999;
  display: block;
  margin-bottom: 15rpx;
}

.special-text {
  font-size: 28rpx;
  color: #333333;
  line-height: 1.6;
}

.special-input {
  width: 100%;
  font-size: 28rpx;
  color: #333333;
  border: none;
  outline: none;
}

.special-textarea {
  width: 100%;
  min-height: 120rpx;
  font-size: 28rpx;
  color: #333333;
  line-height: 1.6;
  border: none;
  outline: none;
}

.date-picker,
.type-picker {
  width: 100%;
}

.picker-text {
  font-size: 28rpx;
  color: #333333;
}

/* 信息区域 */
.info-section {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 30rpx;
}

.info-text {
  font-size: 24rpx;
  color: #999999;
  display: block;
  margin-bottom: 10rpx;
}

.info-text:last-child {
  margin-bottom: 0;
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
</style>