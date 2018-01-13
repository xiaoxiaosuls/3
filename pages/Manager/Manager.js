//获取应用实例
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

    
  },
  onLoad: function () {
   
  },
  toAdd: function (el) {
    wx.navigateTo({
      url: "../shangxin/shangxin"
    })
  },
  toDel: function (el) {
    wx.navigateTo({
      url: "../Del/Del"
    })
  },
  toMod: function (el) {
    wx.navigateTo({
      url: "../Mod/Mod"
    })
  }

})
