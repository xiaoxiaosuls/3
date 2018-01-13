const AV = require('../../utils/av-weapp-min.js');
const huodong = require('../../model/huodong.js');

Page({
  data: {
     id:''
    //Shop:'
  },

  onReady: function () {
    // 
    this.setData({
      id:AV.User.current().id
    })

    // console.log(m);
    new AV.Query('huodong')
      .find()
      .then(huodong => this.setData({ huodong }))
      .catch(console.error);
    //console.log(AV.User.current());
    //console.log(shop);
  },
 toshop:function(){
  wx.navigateTo({
    url:'../detailhd/detailhd'
  })
 },
 onShareAppMessage: function () {

 },
 tomod:function(){
    wx.navigateTo(
      {
        url:'../Hshangxin/Hshangxin'
      }
    )
 },
 onPullDownRefresh: function () {
   wx.stopPullDownRefresh() //停止下拉刷新
   new AV.Query('huodong')
     .find()
     .then(huodong => this.setData({ huodong }))
     .catch(console.error);
   
   
   
 }
})