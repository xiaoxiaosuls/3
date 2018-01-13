const AV = require('../../utils/av-weapp-min.js');
const shop = require('../../model/shop.js');

Page({
  data: {
  //  shopId:[]
  content:'',
  Selected:[],
  pic:'',
  UserId:'',
  aa:[{}],
  id:''
  },

  onReady: function () {
   
    new AV.Query('shop')
      .find()
      .then(shop => this.setData({ shop }))
      .catch(console.error)
      
  },
   selectList :function(e){
    var that = this
    console.log(e)
    var cql = 'select * from shop where objectId= "' + e.target.id+'"';
    AV.Query.doCloudQuery(cql).then(function (data) {
      // results 即为查询结果，它是一个 AV.Object 数组
      var results = data.results;
     
      var cql1 = 'update shop set Selected= ' + !results[0]._serverData.Selected + ' where objectId="' + e.target.id + '"'
      AV.Query.doCloudQuery(cql1).save();
     
    });
   wx.navigateTo({
     url: './cz',
   })
  },
  toshangchuan:function(){
    var that = this
    var cql = 'select * from shop where Selected=true';
    AV.Query.doCloudQuery(cql).then(function (data) {
      // results 即为查询结果，它是一个 AV.Object 数组
      var results = data.results;
      wx.navigateTo({
        url: '../HHshangxin/HHshangxin'
      })
     
    });
    
    
  }

})