const AV = require('../../utils/av-weapp-min.js');
const shop = require('../../model/shop.js');
var tempFilePath
var app = getApp()
var id
Page({
  data: {
    tempFilePaths: '',
    info: '',
    File:''
  },
  onLoad:function(query){
      id=query.Id
      
  },
  onReady: function () {
    var that = this
    var cql = 'select * from shop where objectId="' + id + '"';
    AV.Query.doCloudQuery(cql).then(function (data) {
      // results 即为查询结果，它是一个 AV.Object 数组
      var results = data.results;
      that.setData({
        'content.price': results[0]._serverData.content.price,
        'content.name': results[0]._serverData.content.name,
        'content.show': results[0]._serverData.content.show,
        pic: results[0]._serverData.pic,
      })
     // console.log(results[0]._serverData.content.name)
     // console.log(that.data.content.name)
    }, function (error) {
    });
  },
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({

      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // Temp: res.tempFilePaths
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
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
        content: '请输入商品名称',
        showCancel: false
      })
      return false
    }
    if (e.detail.value.name.length > 10) {
      wx.showModal({
        content: '商品名称过长',
        showCancel: false
      })
      return false
    }
    if (!tempFilePath) {
      wx.showModal({
        content: '商品图片不能为空',
        showCancel: false
      })
      return false
    }
    if (e.detail.value.show.length > 20) {
      wx.showModal({
        content: '商品简介过长',
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
        content: '商品价格有误',
        showCancel: false
      })
      return false
    }
    
     else {
      tip: '修改成功'
      new AV.File('file-name', {
        blob: {
          uri: tempFilePath,
        },
      }).save().then(function(data){
        that.setData({
          File: data.attributes.url
        })
        AV.Query.doCloudQuery('update shop set content.name="' + e.detail.value.name + '", content.show="' + e.detail.value.show + '",content.price="' + e.detail.value.price + '",pic="' + that.data.File + '" where objectId="' + id + '"').then(function () {
          // 删除成功
        }, function (error) {
          // 异常处理
        });
        wx.navigateTo({
          url: '../shangxin/confirm',
        })

      })
    //  console.log(e.detail.name)
    
     
  
    }
  },
  formReset: function () {
    this.setData({
      tempFilePaths: ''
    })
  //  console.log('form发生了reset事件')
  }
})  