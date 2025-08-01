interface RequestParam {
    url: string;
    method?: string;
    data?: any;
    header?: any;
    loading?: boolean;
}

// 请求封装
const request = (options = {
    url: '',
    method: 'GET' as UniApp.RequestOptions['method'],
    data: {},
    header: {},
    loading: false
}) => {
    return new Promise((resolve, reject) => {
      // 根据配置决定是否显示loading
      if (options.loading) {
        uni.showLoading({
          title: '加载中...',
          mask: true
        });
      }
      uni.request({
        url: import.meta.env.VITE_BASE_URL + options.url,
        method: options.method || 'GET',
        data: options.data,
        header: {
          'content-type': 'application/json',
          // 'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          ...options.header
        },
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            // HTTP 错误处理
            handleHttpError(res.statusCode);
            resolve(res);
          }
        },
        fail: (err) => {
          uni.showToast({
            title: '网络请求失败',
            icon: 'none'
          });
          reject(err);
        },
        complete: () => {
          // 隐藏加载中
          uni.hideLoading();
        }
      });
    });
  };
  
  const handleHttpError = (statusCode: number) => {
    switch (statusCode) {
      case 400:
        uni.showToast({
          title: '请求错误',
          icon: 'none'
        });
        break;
      case 401:
        uni.showToast({
          title: '未授权，请登录',
          icon: 'none'
        })
        break;
      case 403:
        uni.showToast({
          title: '拒绝访问',
          icon: 'none'
        });
        break;
    }
  }

export default {
  get: (url, data, options = {}) => request({
    url,
    method: 'GET',
    data,
    ...options
  }),
  post: (url, data, options = {}) => request({
    url,
    method: 'POST',
    data,
    ...options
  }),
}