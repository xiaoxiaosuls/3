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
    // console.log(huodong)
  },

})

