const AV = require('../../utils/av-weapp-min.js');
const order = require('../../model/order.js');
const addr = require('../../model/addr.js');
const shoper = require('../../model/shoper.js');
const shop = require('../../model/shop.js');
const huodong = require('../../model/huodong.js');
Page({
  data:{
    nowtab: '全部订单',
    
  },
  onLoad:function(data){
    this.setData({
      nowtab: data.toTab
    })
    console.log(data.toTab)
  },
  onReady: function () {
    var that=this
    new AV.Query('order')
      .find()
      .then(order => this.setData({ order }))
      .catch(console.error);
    new AV.Query('addr')
      .find()
      .then(addr => this.setData({ addr }))
      .catch(console.error);
    new AV.Query('shoper')
      .find()
      .then(shoper => this.setData({ shoper }))
      .catch(console.error);
    new AV.Query('shop')
      .find()
      .then(shop => this.setData({ shop }))
      .catch(console.error);
    new AV.Query('huodong')
      .find()
      .then(huodong => this.setData({ huodong }))
      .catch(console.error);

    this.setData({
      id: AV.User.current().id
    })
  },
  tofahuo:function(e){

    
      
       var cql1='update order set status="'+'已完成",state="'+'已完成" where objectId="'+e.target.id+'"'
       AV.Query.doCloudQuery(cql1)
       wx.showModal({
         content: '发货成功！',
         showCancel: false
       })
       
    
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh() //停止下拉刷新
    new AV.Query('order')
      .find()
      .then(order => this.setData({ order }))
      .catch(console.error);
   
  },
  switchTabs: function (el) {
    this.setData({
      nowtab: el.currentTarget.dataset.nowtab
    })
  }
})
