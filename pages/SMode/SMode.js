const AV = require('../../utils/av-weapp-min.js');
const shoper = require('../../model/shoper.js');
var tempFilePath1
var tempFilePath2
var objectId
Page({
  data: {
    tempFilePaths1: '',
    tempFilePaths2: '',
    objectId: '',
    File1:'',
    File2:''
  },
  onReady: function () {
    var that = this
    var cql = 'select * from shoper where UserId="' + AV.User.current().id + '"';
    AV.Query.doCloudQuery(cql).then(function (data) {
      // results 即为查询结果，它是一个 AV.Object 数组
      var results = data.results;
      that.setData({
        phone: results[0]._serverData.phone,
        name: results[0]._serverData.name,
        show: results[0]._serverData.show,
        addr: results[0]._serverData.addr,
        pic1: results[0]._serverData.pic1,
        pic2: results[0]._serverData.pic2,
      })
    }, function (error) {
    });
  },
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({

      count: 2, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // Temp: res.tempFilePaths
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths1: res.tempFilePaths
        })
        tempFilePath1 = res.tempFilePaths[0];
      }
    })
  },

  chooseimage1: function () {
    var _this = this;
    wx.chooseImage({

      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // Temp: res.tempFilePaths
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths2: res.tempFilePaths
        })
        tempFilePath2 = res.tempFilePaths[0];
      }
    })
  },
  formSubmit: function (e) {
    var that=this
    var phoneReg = /^1[34578]\d{9}$/;


    if (e.detail.value.name == '') {
      wx.showModal({
        content: '请输入店铺名称',
        showCancel: false
      })
      return false
    }
    if (e.detail.value.name.length>8) {
      wx.showModal({
        content: '店铺名称过长',
        showCancel: false
      })
      return false
    }
    if (e.detail.value.show.length > 12) {
      wx.showModal({
        content: '店铺介绍过长',
        showCancel: false
      })
      return false
    }
    if (e.detail.value.addr == '') {
      wx.showModal({
        content: '请输入地址',
        showCancel: false
      })
      return false
    }
    if (e.detail.value.addr.length > 12) {
      wx.showModal({
        content: '店铺地址过长',
        showCancel: false
      })
      return false
    }
    if (e.detail.value.phone == '') {
      wx.showModal({
        content: '请输入手机号码',
        showCancel: false
      })
      return false
    }

    if (!phoneReg.test(e.detail.value.phone)) {
      wx.showModal({
        content: '手机号码格式错误',
        showCancel: false
      })
      return false
    }
    if (!tempFilePath1) {
      wx.showModal({
        content: '店铺图片不能为空',
        showCancel: false
      })
      return false
    }
    if (!tempFilePath2)  {
      wx.showModal({
        content: '营业执照不能为空',
        showCancel: false
      })
      return false
    }
   

    
    else {
      //console.log(e.detail.value)
      new AV.File('file-name', {
        blob: {
          uri: tempFilePath1,
        },
      }).save().then(function(data){
        that.setData({
          File1: data.attributes.url
        })
        new AV.File('file-name', {
          blob: {
            uri: tempFilePath2,
          },
        }).save().then(function(data){
          that.setData({
            File2: data.attributes.url
          })
          var cql = 'select * from shoper where UserId="' + AV.User.current().id + '"';
          AV.Query.doCloudQuery(cql).then(function (data) {
            // results 即为查询结果，它是一个 AV.Object 数组
            var results = data.results;
            that.setData({
              objectId: results[0].id
            })
            AV.Query.doCloudQuery('update shoper set name="' + e.detail.value.name + '", show="' + e.detail.value.show + '",addr="' + e.detail.value.addr + '",phone="' + e.detail.value.phone + '",pic1="' + that.data.File1 + '",pic2="' + that.data.File2+ '",UserId="' + AV.User.current().id + '" where objectId="' + that.data.objectId + '"').then(function () {
              console.log(e.detail.value.show)
              console.log(e.detail.value.addr)
            }, function (error) {
              // 异常处理
            });
          });
        })
      })
     
   
      tip: '上传成功'
      //console.log(e.detail.value)
      //console.log(e.detail.value
      wx.navigateTo({
        url: '../shangxin/confirm',
      })


    }
  },
  onShareAppMessage: function () {

  }

})