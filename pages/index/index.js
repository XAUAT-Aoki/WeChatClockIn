//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    username: '',
    password: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  //获取输入账号
  usernameInput:function(e){
    this.setData({
      username:e.detail.value
    })
  },

  //获取输入密码

  passwordInput:function(e){
    this.setData({
      password:e.detail.value
    })
  },

  //登录处理
  login:function(){
    var that=this;
    if(this.data.username.length==0||this.data.password.length==0){
      wx.showToast({
        title: '账号或密码不能为空',
        icon:'none',
        duration:2000
      })
    }
    else{

      // wx.navigateTo({
      //   url: '../submitCode/submitCode',
      // });
      //以上为测试使用
      wx.request({
        url: 'http://localhost:59950/Student/WeChatLogin',
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method:"POST",
        data:{
          username:that.data.username,
          password:that.data.password
        },
        success(res){
          if(res.data.message==true)
          { 
            console.log(res);
            app.globalData.userName = res.data.username;
            app.globalData.userId = that.data.username;
            //app.globalData.remainTime=res.data.remainTime;
            wx.navigateTo({
              url: '../submitCode/submitCode',
            });
          }
          else{
            wx.showToast({
              title: res.data.res,
              icon:"none",
              duration:2000
            })
          }
        },
        fail(res){
          wx.showToast({
            title: '网络错误，请稍后重试!',
            icon:"none",
            duration:2000
          })
        }
      })
    }
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
