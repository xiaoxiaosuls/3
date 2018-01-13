const AV = require('../../utils/av-weapp-min.js');
const shop = require('../../model/shop.js');
var tempFilePath

var app = getApp()
Page({
  data: {
    tempFilePaths: '',
    info: '',
    File:''

  },
  onReady: function () {
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
    var that = this
    var phoneReg = /^1[34578]\d{9}$/;


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
      //tip: '上传成功'

      this.setData({
        info: e.detail.value
      });
     const mm= new AV.File('file-name', {
        blob: {
          uri: tempFilePath,
        },
      }).save()
      .then(function(data){
        console.log(data.attributes.url)
       //file=>console.log(this.setData({  File }))
      // file => console.log(file.url())
       that.setData({
         File:data.attributes.url
       })
       const Shop = new shop({
         content: that.data.info,
         pic: that.data.File,
         Selected: false,
         UserId: AV.User.current().id
       });
       const acl = new AV.ACL();
       //console.log(AV.User.current());
       acl.setPublicReadAccess(true);
       acl.setPublicWriteAccess(false);
       acl.setWriteAccess(AV.User.current(), true);
       Shop.ACL = acl;
       //console.log(Shop.set(tempFilePath));
       Shop.save()
         .then(console.log)
         .catch(console.error);
       console.log(that.data.File)
      } )
      .catch(console.error);
        console.log(that.data.File)
    
    //  console.log(tempFilePath)
       
    //  console.log("clicked confirm");
      wx.navigateTo({
        url: 'confirm',
      })
    }

  },


  formReset: function () {
    this.setData({
      tempFilePaths: ''
    })
   // console.log('form发生了reset事件')

  }
 
})

