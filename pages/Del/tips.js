var objectId
const AV = require('../../utils/av-weapp-min.js');
const shop = require('../../model/shop.js');
Page({
  data: {
    hidden: false,
    nocancel: false
  },
  onLoad:function(option){
    objectId=option.objectId
  },
  cancel: function () {
    wx.switchTab({
      url: '../index/index'
    })
  },
  confirm: function () {
    AV.Query.doCloudQuery('delete from shop where objectId="' + objectId + '"').then(function () {
      wx.switchTab({
        url: '../index/index',
      })
      wx.showModal({
        content: '删除成功',
        showCancel: false
      })
      // 删除成功
    }, function (error) {
      // 异常处理
    });
   
  }
}) 