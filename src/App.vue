<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
    // 初始化示例数据
    this.initSampleData()
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  methods: {
    // 初始化示例数据
    initSampleData() {
      const existingCards = uni.getStorageSync('study_cards')
      if (!existingCards || existingCards.length === 0) {
        const sampleCards = [
          {
            id: '1',
            title: '线性代数基础概念',
            content: '向量空间是线性代数的核心概念，它是由向量组成的集合，满足加法和数量乘法的运算规则。理解向量空间的性质对于掌握线性代数至关重要。',
            category: 'postgraduate',
            reviewDate: '2024-02-15',
            createTime: Date.now() - 86400000,
            updateTime: Date.now() - 86400000
          },
          {
            id: '2',
            title: 'Serendipity',
            content: '意外发现有价值事物的能力；机缘巧合',
            category: 'english',
            phonetic: '/ˌserənˈdɪpəti/',
            example: 'It was pure serendipity that led to this amazing discovery.',
            createTime: Date.now() - 172800000,
            updateTime: Date.now() - 172800000
          },
          {
            id: '3',
            title: '公务员考试报名条件',
            content: '1. 具有中华人民共和国国籍\n2. 年龄一般为18周岁以上、35周岁以下\n3. 拥护中华人民共和国宪法\n4. 具有良好的品行\n5. 具有正常履行职责的身体条件\n6. 具有符合职位要求的工作能力\n7. 具有大学专科及以上文化程度',
            category: 'exam',
            examType: '政策信息',
            createTime: Date.now() - 259200000,
            updateTime: Date.now() - 259200000
          }
        ]
        uni.setStorageSync('study_cards', sampleCards)
      }
    }
  }
}
</script>

<style lang="scss">
/* 每个页面公共css */
@use './uni.scss';
// @import '@tuniao/tn-style/dist/uniapp/index.css';

/* 全局重置样式 */
view, text, button, input, textarea, image, scroll-view {
  box-sizing: border-box;
}

page {
  background-color: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
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
