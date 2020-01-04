// pages/submitCode/submitCode.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    errorInfor: "扫码失败，请重试！",
    isError: 0,
    qrCode:'',
    message:"惟将终夜长开眼，报答平生未展眉。"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      username: app.globalData.userName
    });
    wx.getLocation({
      success: function(res) {
        app.globalData.latitude=res.latitude;
        app.globalData.longitude = res.longitude;
        app.globalData.accuracy = res.accuracy;
        app.globalData.horizontalAccuracy = res.horizontalAccuracy;
        app.globalData.verticalAccuracy = res.verticalAccuracy;
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

   
  // Error提示
  displayError: function () {
    this.setData({
      isError: 1
    })
  },

  //扫描二维码
  startScan: function () {
    var that=this;
    //var code1;
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        var result=res.result;
        app.globalData.qrCode=res.result;
        //console.log(result);
        that.setData({
          qrCode:res
        })
        wx.showToast({
          title: '扫码成功',
          icon:"success",
          duration:2000
        })
        wx.request({
          url: 'http://localhost:59950/Student/WeChatClockIn',
          header: { 'Content-Type': 'application/x-www-form-urlencoded' },
          method: "POST",
          data: {
            code: app.globalData.qrCode,
            username: app.globalData.userId,
            latitude: app.globalData.latitude,
            longitude: app.globalData.longitude,
            accuracy: app.globalData.accuracy,
            horizontalAccuracy: app.globalData.horizontalAccuracy,
            verticalAccuracy: app.globalData.verticalAccuracy
          },
          success(res) {
              wx.showToast({
                title: res.data.message,
                icon: "none",
                duration: 2000
              })
          }
        });
      },
      fail(res) {
        wx.showToast({
          title: '打开失败，请检查网络后重试！',
          icon:"fail",
          duration:2000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})