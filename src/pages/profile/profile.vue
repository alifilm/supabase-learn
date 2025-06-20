<template>
  <view class="profile-container">
    <!-- 用户信息卡片 -->
    <view class="user-card card fade-in">
      <view class="user-avatar">
        <image :src="userInfo.avatar || '/static/default-avatar.png'" class="avatar-img" />
      </view>
      <view class="user-info">
        <text class="username">{{ userInfo.nickname || '学习者' }}</text>
        <text class="user-desc">{{ userInfo.motto || '坚持学习，成就未来' }}</text>
      </view>
      <view class="edit-btn" @click="editProfile">
        <text class="edit-text">编辑</text>
      </view>
    </view>

    <!-- 学习统计 -->
    <view class="stats-section">
      <view class="section-title">学习统计</view>
      <view class="stats-grid">
        <view class="stat-item card" v-for="(stat, index) in studyStats" :key="index">
          <view class="stat-number">{{ stat.value }}</view>
          <view class="stat-label">{{ stat.label }}</view>
        </view>
      </view>
    </view>

    <!-- 功能菜单 -->
    <view class="menu-section">
      <view class="section-title">功能设置</view>
      <view class="menu-list">
        <view class="menu-item card" v-for="(item, index) in menuItems" :key="index" @click="handleMenuClick(item)">
          <view class="menu-icon">
            <text class="icon">{{ item.icon }}</text>
          </view>
          <view class="menu-content">
            <text class="menu-title">{{ item.title }}</text>
            <text class="menu-desc">{{ item.desc }}</text>
          </view>
          <view class="menu-arrow">
            <text class="arrow">›</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 关于信息 -->
    <view class="about-section">
      <view class="section-title">关于应用</view>
      <view class="about-card card">
        <view class="app-info">
          <text class="app-name">学习卡片</text>
          <text class="app-version">版本 1.0.0</text>
        </view>
        <view class="app-desc">
          <text>专为考研、英语、考编学习打造的智能卡片应用</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        nickname: '',
        motto: '',
        avatar: ''
      },
      studyStats: [
        { label: '总卡片数', value: 0 },
        { label: '今日学习', value: 0 },
        { label: '连续天数', value: 0 },
        { label: '完成率', value: '0%' }
      ],
      menuItems: [
        {
          icon: '🎯',
          title: '学习目标',
          desc: '设置每日学习目标',
          action: 'setGoal'
        },
        {
          icon: '📊',
          title: '学习报告',
          desc: '查看详细学习数据',
          action: 'viewReport'
        },
        {
          icon: '🔔',
          title: '提醒设置',
          desc: '设置学习提醒时间',
          action: 'setReminder'
        },
        {
          icon: '📤',
          title: '数据导出',
          desc: '导出学习卡片数据',
          action: 'exportData'
        },
        {
          icon: '⚙️',
          title: '应用设置',
          desc: '个性化设置选项',
          action: 'settings'
        }
      ]
    }
  },
  
  onLoad() {
    this.loadUserInfo()
    this.loadStudyStats()
  },
  
  onShow() {
    this.loadStudyStats()
  },
  
  methods: {
    // 加载用户信息
    loadUserInfo() {
      const userInfo = uni.getStorageSync('user_info') || {}
      this.userInfo = {
        nickname: userInfo.nickname || '学习者',
        motto: userInfo.motto || '坚持学习，成就未来',
        avatar: userInfo.avatar || ''
      }
    },
    
    // 加载学习统计
    loadStudyStats() {
      const cards = uni.getStorageSync('study_cards') || []
      const studyLog = uni.getStorageSync('study_log') || []
      
      // 计算总卡片数
      this.studyStats[0].value = cards.length
      
      // 计算今日学习数
      const today = new Date().toDateString()
      const todayStudy = studyLog.filter(log => 
        new Date(log.date).toDateString() === today
      ).length
      this.studyStats[1].value = todayStudy
      
      // 计算连续学习天数
      this.studyStats[2].value = this.calculateStreakDays(studyLog)
      
      // 计算完成率
      const completedCards = cards.filter(card => card.completed).length
      const completionRate = cards.length > 0 ? Math.round((completedCards / cards.length) * 100) : 0
      this.studyStats[3].value = `${completionRate}%`
    },
    
    // 计算连续学习天数
    calculateStreakDays(studyLog) {
      if (studyLog.length === 0) return 0
      
      const sortedLog = studyLog.sort((a, b) => new Date(b.date) - new Date(a.date))
      let streak = 0
      let currentDate = new Date()
      
      for (let log of sortedLog) {
        const logDate = new Date(log.date)
        const diffDays = Math.floor((currentDate - logDate) / (1000 * 60 * 60 * 24))
        
        if (diffDays === streak) {
          streak++
          currentDate = logDate
        } else {
          break
        }
      }
      
      return streak
    },
    
    // 编辑个人资料
    editProfile() {
      uni.showModal({
        title: '编辑资料',
        editable: true,
        placeholderText: '请输入昵称',
        success: (res) => {
          if (res.confirm && res.content) {
            this.userInfo.nickname = res.content
            uni.setStorageSync('user_info', this.userInfo)
            uni.showToast({
              title: '保存成功',
              icon: 'success'
            })
          }
        }
      })
    },
    
    // 处理菜单点击
    handleMenuClick(item) {
      switch (item.action) {
        case 'setGoal':
          this.setStudyGoal()
          break
        case 'viewReport':
          this.viewStudyReport()
          break
        case 'setReminder':
          this.setReminder()
          break
        case 'exportData':
          this.exportData()
          break
        case 'settings':
          this.openSettings()
          break
      }
    },
    
    // 设置学习目标
    setStudyGoal() {
      uni.showModal({
        title: '设置每日学习目标',
        content: '请输入每日要学习的卡片数量',
        editable: true,
        placeholderText: '例如：10',
        success: (res) => {
          if (res.confirm && res.content) {
            const goal = parseInt(res.content)
            if (goal > 0) {
              uni.setStorageSync('daily_goal', goal)
              uni.showToast({
                title: '目标设置成功',
                icon: 'success'
              })
            }
          }
        }
      })
    },
    
    // 查看学习报告
    viewStudyReport() {
      uni.showToast({
        title: '功能开发中',
        icon: 'none'
      })
    },
    
    // 设置提醒
    setReminder() {
      uni.showToast({
        title: '功能开发中',
        icon: 'none'
      })
    },
    
    // 导出数据
    exportData() {
      const cards = uni.getStorageSync('study_cards') || []
      if (cards.length === 0) {
        uni.showToast({
          title: '暂无数据可导出',
          icon: 'none'
        })
        return
      }
      
      uni.showToast({
        title: '导出功能开发中',
        icon: 'none'
      })
    },
    
    // 打开设置
    openSettings() {
      uni.showToast({
        title: '设置功能开发中',
        icon: 'none'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  margin: 40rpx 0 20rpx 0;
}

/* 用户信息卡片 */
.user-card {
  display: flex;
  align-items: center;
  padding: 30rpx;
  margin-bottom: 20rpx;
  
  .user-avatar {
    margin-right: 20rpx;
    
    .avatar-img {
      width: 120rpx;
      height: 120rpx;
      border-radius: 60rpx;
      background-color: #e0e0e0;
    }
  }
  
  .user-info {
    flex: 1;
    
    .username {
      display: block;
      font-size: 36rpx;
      font-weight: 600;
      color: #333333;
      margin-bottom: 10rpx;
    }
    
    .user-desc {
      font-size: 28rpx;
      color: #666666;
    }
  }
  
  .edit-btn {
    padding: 12rpx 24rpx;
    background-color: #007AFF;
    border-radius: 20rpx;
    
    .edit-text {
      font-size: 26rpx;
      color: #ffffff;
    }
  }
}

/* 学习统计 */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
  
  .stat-item {
    text-align: center;
    padding: 30rpx 20rpx;
    
    .stat-number {
      display: block;
      font-size: 48rpx;
      font-weight: 700;
      color: #007AFF;
      margin-bottom: 10rpx;
    }
    
    .stat-label {
      font-size: 26rpx;
      color: #666666;
    }
  }
}

/* 功能菜单 */
.menu-list {
  .menu-item {
    display: flex;
    align-items: center;
    padding: 30rpx;
    margin-bottom: 20rpx;
    transition: all 0.2s ease;
    
    &:active {
      transform: scale(0.98);
      background-color: #f0f0f0;
    }
    
    .menu-icon {
      width: 80rpx;
      height: 80rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f8f8f8;
      border-radius: 20rpx;
      margin-right: 20rpx;
      
      .icon {
        font-size: 36rpx;
      }
    }
    
    .menu-content {
      flex: 1;
      
      .menu-title {
        display: block;
        font-size: 32rpx;
        font-weight: 500;
        color: #333333;
        margin-bottom: 8rpx;
      }
      
      .menu-desc {
        font-size: 26rpx;
        color: #666666;
      }
    }
    
    .menu-arrow {
      .arrow {
        font-size: 40rpx;
        color: #cccccc;
      }
    }
  }
}

/* 关于信息 */
.about-card {
  padding: 30rpx;
  
  .app-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
    
    .app-name {
      font-size: 32rpx;
      font-weight: 600;
      color: #333333;
    }
    
    .app-version {
      font-size: 26rpx;
      color: #666666;
    }
  }
  
  .app-desc {
    font-size: 28rpx;
    color: #666666;
    line-height: 1.6;
  }
}
</style>