const AV = require('../../utils/av-weapp-min.js');
const shop = require('../../model/shop.js');


Page({
  data: {
  }, 

  onReady: function () {
    // console.log(AV.User.current());
    new AV.Query('shop')
      .descending('createdAt')
      .find()
      .then(shop => this.setData({ shop }))
      .catch(console.error);
   // console.log(shop);
  },
  todelete: function (e) {
    //console.log(e.target.id)
    wx.navigateTo({
      url: './tips?objectId='+e.target.id,
    })
  }
})