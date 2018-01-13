//获取应用实例
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {


  },
  onLoad: function () {

  },
  toHAdd: function (el) {
    wx.navigateTo({
      url: "../Hshangxin/Hshangxin"
    })
  },
  toHDel: function (el) {
    wx.navigateTo({
      url: "../HDel/HDel"
    })
  },
  toHMod: function (el) {
    wx.navigateTo({
      url: "../HMod/HMod"
    })
  }

})
