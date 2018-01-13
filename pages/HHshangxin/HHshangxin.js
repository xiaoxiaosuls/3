const AV = require('../../utils/av-weapp-min.js');
const huodong = require('../../model/huodong.js');
var tempFilePath
var app = getApp()
var shopId
Page({
  data: {
    tempFilePaths: '',
    File:'',
    id:''
  },
  onReady: function () {
    var that = this
    var cql = 'select * from huodong where UserId="' + AV.User.current().id + '"';
    AV.Query.doCloudQuery(cql).then(function (data) {
      // results 即为查询结果，它是一个 AV.Object 数组
      var results = data.results;
   
     // console.log(results)
      that.setData({ 
        id: results[0].id,
        name: results[0]._serverData.name,
        show: results[0]._serverData.show,
        pic: results[0]._serverData.pic,
        price: results[0]._serverData.price,
      })
    }, function (error) {
    });
  },
  onLoad:function(e){
    shopId =e.shopId
    // console.log(shopId)
  },
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({

      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
        tempFilePath = res.tempFilePaths[0];
      }
    })
  },
  formSubmit: function (e) {
    var that=this
    if (e.detail.value.name == '') {
      wx.showModal({
        content: '请输入活动名称',
        showCancel: false
      })
      return false
    }
    if (e.detail.value.name.length > 10) {
      wx.showModal({
        content: '活动名称过长',
        showCancel: false
      })
      return false
    }
    if (!tempFilePath) {
      wx.showModal({
        content: '活动图片不能为空',
        showCancel: false
      })
      return false
    }
    if (e.detail.value.show.length > 20) {
      wx.showModal({
        content: '活动简介过长',
        showCancel: false
      })
      return false
    }
    if (e.detail.value.price == '') {
      wx.showModal({
        content: '请输入价格',
        showCancel: false
      })
      return false
    }
    if (e.detail.value.price > 999) {
      wx.showModal({
        content: '活动价格有误',
        showCancel: false
      })
      return false
    }
     else {
      tip: '上传成功'
      new AV.File('file-name', {
        blob: {
          uri: tempFilePath,
        },
      }).save().then(function(data){
        that.setData({
          File: data.attributes.url
        })
        console.log(that.data.id)
        var cql1 = 'update huodong set name="' + e.detail.value.name + '",show="' + e.detail.value.show + '",price="' + e.detail.value.price + '",pic="' + that.data.File + '",UserId="' + AV.User.current().id+'" where objectId="' +that.data.id+ '"';
        AV.Query.doCloudQuery(cql1).then(function(data){console.log(data.results)})
       
      }    
        );
      wx.navigateTo({
        url: '../shangxin/confirm',
      })

    }
  },
  formReset: function () {
    this.setData({
      tempFilePaths: ''
    })
    console.log('form发生了reset事件')
  }
})  