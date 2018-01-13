const AV = require('../../utils/av-weapp-min.js');
const huodong = require('../../model/huodong.js');

Page({
  data: {

    //Shop:'
  },

  onReady: function () {
    // 

    // console.log(m);
    new AV.Query('huodong')
      .find()
      .then(huodong => this.setData({ huodong }))
      .catch(console.error);
    //console.log(AV.User.current());
    //console.log(shop);
  },
  toshop: function () {
    wx.navigateTo({
      url: '../detailhd/detailhd'
    })
  },
  todelete:function(e){
    wx.navigateTo({
      url: './tips?objectId='+e.target.id,
    })
    //console.log(e.target.id)
  },
  
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh() //停止下拉刷新
    new AV.Query('huodong')
      .find()
      .then(huodong => this.setData({ huodong }))
      .catch(console.error);
    
    
    
  }
})