const AV = require('../../utils/av-weapp-min.js');
const shop = require('../../model/shop.js');
/*AV.init({
  appId: 'lJ7cFjdO2QgzD3jtD6OVbVW2-gzGzoHsz',
  appKey: 'Qcx8AqdOxW1GgkLnxiRR3mFW',
});*/
Page({
  data: {

    //Shop:'
  },

  onReady: function () {
   // 
    
   // console.log(m);
   new AV.Query('shop')
      .find()
      .then(shop => this.setData({ shop }))
      .catch(console.error);
   //console.log(AV.User.current());
    //console.log(shop);
  },
  onShareAppMessage: function () {

  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh() //停止下拉刷新
    new AV.Query('shop')
      .find()
      .then(shop => this.setData({ shop }))
      .catch(console.error);
    /*wx.showNavigationBarLoading() //在标题栏中显示加载
    
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 800);*/
  }
})