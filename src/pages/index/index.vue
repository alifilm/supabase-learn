<template>
  <view class="container">
    <!-- 卡盒展示区 -->
    <scroll-view class="card-boxes-container" scroll-x>
      <view 
        v-for="(category, index) in categories.filter(c => c.value !== 'all')" 
        :key="index"
        class="card-box"
        :class="{ active: currentCategory === category.value }"
        @click="switchCategory(category.value)"
      >
        <view class="card-box-lid" :class="`box-${category.value}`">
          <text class="box-title">{{ category.name }}</text>
          <text class="box-count">{{ getCardCount(category.value) }}</text>
        </view>
        <view class="card-box-body" :class="`box-${category.value}`">
          <view class="card-stack" v-if="getCardCount(category.value) > 0">
            <view class="card-preview" v-for="(_, i) in 3" :key="i" v-if="i < getCardCount(category.value)">
              <view class="preview-line"></view>
              <view class="preview-line"></view>
            </view>
          </view>
          <text v-else class="empty-box-text">空盒子</text>
        </view>
      </view>
    </scroll-view>
    
    <!-- 当前卡盒标题 -->
    <view class="current-box-header">
      <text class="current-box-title">{{ getCurrentCategoryName() }}卡片</text>
      <view class="box-filter" @click="showFilterOptions = !showFilterOptions">
        <text class="filter-text">筛选</text>
        <view class="filter-icon">▼</view>
      </view>
    </view>
    
    <!-- 筛选选项 -->
    <view class="filter-options" v-if="showFilterOptions">
      <view 
        v-for="(category, index) in categories" 
        :key="index"
        class="filter-item"
        :class="{ active: currentCategory === category.value }"
        @click="switchCategory(category.value)"
      >
        <text class="filter-item-text">{{ category.name }}</text>
      </view>
    </view>

    <!-- 卡片列表 -->
    <scroll-view class="card-list" scroll-y>
      <view 
        v-for="card in filteredCards" 
        :key="card.id"
        class="card-item"
        :class="`card-${card.category}`"
        @click="viewCard(card)"
      >
        <!-- 卡片内容保持不变 -->
        <view class="card-header">
          <text class="card-title">{{ card.title }}</text>
          <view class="card-category-badge" :class="`badge-${card.category}`">
            <text class="badge-text">{{ getCategoryName(card.category) }}</text>
          </view>
        </view>
        <text class="card-content">{{ card.content }}</text>
        <view class="card-footer">
          <text class="card-date">{{ formatDate(card.createTime) }}</text>
          <view class="card-actions">
            <view class="action-btn" @click.stop="editCard(card)">
              <text class="action-text">编辑</text>
            </view>
            <view class="action-btn delete" @click.stop="deleteCard(card.id)">
              <text class="action-text">删除</text>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 空状态 -->
      <view v-if="filteredCards.length === 0" class="empty-state">
        <text class="empty-text">暂无{{ getCurrentCategoryName() }}卡片</text>
        <text class="empty-tip">点击右下角按钮添加新卡片</text>
      </view>
    </scroll-view>

    <!-- 添加按钮 -->
    <view class="add-btn" @click="addCard">
      <text class="add-icon">+</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentCategory: 'all',
      categories: [
        { name: '全部', value: 'all' },
        { name: '考研', value: 'postgraduate' },
        { name: '英语', value: 'english' },
        { name: '考编', value: 'exam' }
      ],
      cards: [],
      showFilterOptions: false
    }
  },
  computed: {
    filteredCards() {
      if (this.currentCategory === 'all') {
        return this.cards
      }
      return this.cards.filter(card => card.category === this.currentCategory)
    }
  },
  onLoad() {
    this.loadCards()
  },
  onShow() {
    this.loadCards()
  },
  methods: {
    // 加载卡片数据
    loadCards() {
      const cards = uni.getStorageSync('study_cards') || []
      this.cards = cards
    },
    
    // 切换分类
    switchCategory(category) {
      this.currentCategory = category
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
    
    // 获取当前分类名称
    getCurrentCategoryName() {
      if (this.currentCategory === 'all') return ''
      return this.getCategoryName(this.currentCategory)
    },
    
    // 格式化日期
    formatDate(timestamp) {
      const date = new Date(timestamp)
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${month}月${day}日`
    },
    
    // 查看卡片
    viewCard(card) {
      uni.navigateTo({
        url: `/pages/card-detail/card-detail?id=${card.id}&mode=view`
      })
    },
    
    // 编辑卡片
    editCard(card) {
      uni.navigateTo({
        url: `/pages/card-detail/card-detail?id=${card.id}&mode=edit`
      })
    },
    
    // 删除卡片
    deleteCard(cardId) {
      uni.showModal({
        title: '确认删除',
        content: '确定要删除这张卡片吗？',
        success: (res) => {
          if (res.confirm) {
            this.cards = this.cards.filter(card => card.id !== cardId)
            uni.setStorageSync('study_cards', this.cards)
            uni.showToast({
              title: '删除成功',
              icon: 'success'
            })
          }
        }
      })
    },
    
    // 添加卡片
    addCard() {
      uni.navigateTo({
        url: '/pages/add-card/add-card'
      })
    },
    // 添加新方法
    getCardCount(category) {
      return this.cards.filter(card => card.category === category).length
    },
  }
}
</script>

<style lang="scss">
.container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* 卡盒容器样式 */
.card-boxes-container {
  white-space: nowrap;
  height: 320rpx;
  margin-bottom: 30rpx;
}

/* 卡盒样式 */
.card-box {
  display: inline-block;
  width: 240rpx;
  height: 300rpx;
  margin-right: 20rpx;
  position: relative;
  transition: transform 0.3s;
}

.card-box.active {
  transform: translateY(-10rpx);
}

/* 卡盒盖子样式 */
.card-box-lid {
  height: 60rpx;
  border-radius: 16rpx 16rpx 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20rpx;
  color: #fff;
  font-weight: bold;
}

/* 卡盒主体样式 */
.card-box-body {
  height: 240rpx;
  border-radius: 0 0 16rpx 16rpx;
  background-color: #fff;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* 卡片堆叠效果 */
.card-stack {
  width: 80%;
  height: 80%;
  position: relative;
}

.card-preview {
  position: absolute;
  width: 100%;
  height: 70rpx;
  background-color: #fff;
  border-radius: 8rpx;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
  padding: 10rpx;
}

.card-preview:nth-child(1) {
  top: 0;
  z-index: 3;
}

.card-preview:nth-child(2) {
  top: 20rpx;
  left: 5rpx;
  z-index: 2;
}

.card-preview:nth-child(3) {
  top: 40rpx;
  left: 10rpx;
  z-index: 1;
}

.preview-line {
  height: 10rpx;
  background-color: #f0f0f0;
  margin-bottom: 10rpx;
  border-radius: 5rpx;
}

/* 卡盒颜色 */
.box-postgraduate {
  background-color: #4CAF50;
}

.box-english {
  background-color: #2196F3;
}

.box-exam {
  background-color: #FF9800;
}

/* 当前卡盒标题 */
.current-box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.current-box-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.box-filter {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 10rpx 20rpx;
  border-radius: 30rpx;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
}

.filter-text {
  font-size: 28rpx;
  color: #666;
  margin-right: 10rpx;
}

.filter-icon {
  font-size: 24rpx;
  color: #999;
}

/* 筛选选项 */
.filter-options {
  background-color: #fff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  margin-bottom: 20rpx;
  overflow: hidden;
}

.filter-item {
  padding: 20rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.filter-item:last-child {
  border-bottom: none;
}

.filter-item.active {
  background-color: #f0f0f0;
}

.filter-item-text {
  font-size: 28rpx;
  color: #333;
}

.empty-box-text {
  font-size: 24rpx;
  color: #999;
}

.box-count {
  font-size: 24rpx;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
}

/* 保留原有的卡片列表样式 */
</style>
