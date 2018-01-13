var objectId
const AV = require('../../utils/av-weapp-min.js');
const hudong = require('../../model/huodong.js');
Page({
  data: {
    hidden: false,
    nocancel: false
  },
  onLoad:function(option){
     objectId=option.objectId
    // console.log(option.objectId)
     //console.log(objectId)
  },
  cancel: function () {
    wx.switchTab({
      url: '../huodong/huodong',
    })
  },
  confirm: function () {
   // console.log(objectId)
    AV.Query.doCloudQuery('delete from huodong where objectId="' +objectId + '"').then(function () {
      // 删除成功   
       wx.switchTab({
         url: '../huodong/huodong',
    })
    }, function (error) {
      // 异常处理
    });
    

  }
}) 