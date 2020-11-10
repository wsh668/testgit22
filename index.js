//index.js
//获取应用实例阿松大
const app = getApp()
const api = app.globalData.api
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperimgs: ['/imgs/001.jpg', '/imgs/002.jpg', '/imgs/003.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    show: false,
    a:'1',
    policy: '',
    openId: 'o-f665UJEyVfb_vLa-IbnvFanWHE'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    const that = this
    // 判断用户是否已经授权
     if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          show: true
        })
      } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          console.log(res.userInfo)
          this.setData({
            userInfo: res.userInfo,
            show: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              show: true
            })
          }
        })
      }


    // 政策查询显示
    wx.cloud.callFunction({
      name: "policy",
      data: {
        modal: 'select',
        loadtype: 'indexsel'
      },
      success(res) {
        that.setData({
          policy: res.result.data
        })
        console.log(res.result.data)
      },
      fail(res) {
        console.log("获取失败")
      }
    })

  },


  getUserInfo: function(e) {
    console.log(e)
    show: true
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    // 用户授权信息存入
    wx.cloud.callFunction({
      name: "user",
      data: {
        modal: 'add',
        name: '',
        sex: '',
        duty: '',
        email: '',
        phone: '',
        address: ''
      },
      success(res) {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail(res) {
        console.log("获取失败")
      }
    })
    // 用户授权企业信息存入
    wx.cloud.callFunction({
      name: "company",
      data: {
        modal: 'add',
        comname: '',
        comtype: '',
        comscope: '',
        compeopnum: '',
        revenue: '',
        comphone: '',
        comaddress: ''
      },
      success(res) {
        console.log("保存成功")
      },
      fail(res) {
        console.log("获取失败")
      }
    })
  },

  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

// 查看更多服务
  findServe(){
    wx.navigateTo({
      url: '../serve/serve',
    })
  },

  // 查看更多文件
  findPolicy() {
    wx.navigateTo({
      url: '../policy/policy',
    })
  },

  // 政策解读
  unscramblesel() {
    wx.navigateTo({
      url: '../unscramblesel/unscramblesel',
    })
  },


  // 关注项目
  focus() {
    wx.navigateTo({
      url: '../focus/focus',
    })
  },


  // 我的项目
  myproject() {
    const that = this 
    wx.navigateTo({
      url: '../myproject/myproject',
      success: function (res) {
        wx.hideLoading()
        res.eventChannel.emit('openId', that.data.openId)
      }
    })
  },


  // 政策内容显示
  getpolicycont(e){
    wx.navigateTo({
      url: '../policyCont/policyCont',
      success: function (res) {
        res.eventChannel.emit('policyid', e.currentTarget.dataset.id)
      }
    })
  },

  // 取消授权
  cancelbtn(){
    this.setData({
      show: true
    })
  },

  // 允许授权
  allowbtn() {
    this.getUserInfo
  },

  aac(){
    // 用户授权信息存入
    wx.cloud.callFunction({
      name: "message",
      data: {
        modal: 'select'
      },
      success(res) {
        console.log(res.result)
      },
      fail(res) {
        console.log("获取失败")
      }
    })
  }
})
