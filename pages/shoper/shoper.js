const AV = require('../../utils/av-weapp-min.js');
const shoper = require('../../model/shoper.js');
Page({
  data: {
 /*  phone:'暂无信息',
   name:'暂无名称',
   show:'暂无介绍',
   addr:'暂无地址',
   pic1:'http://ac-lJ7cFjdO.clouddn.com/b6e4bc5ce79c87b40c2f.png',
   pic2:'http://ac-lJ7cFjdO.clouddn.com/b6e4bc5ce79c87b40c2f.png'*/
  },
  onReady: function () {
    var that=this
  // var query= new AV.Query('shoper')
   var cql = 'select * from shoper where UserId="' + AV.User.current().id+'"';
   AV.Query.doCloudQuery(cql).then(function (data) {
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
  onLoad:function(){
     
  },
  change:function(){
    wx.navigateTo({
      url: '../SMode/SMode',
    })
     
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh() //停止下拉刷新
    var that = this
    // var query= new AV.Query('shoper')
    var cql = 'select * from shoper where UserId="' + AV.User.current().id + '"';
    AV.Query.doCloudQuery(cql).then(function (data) {
      // results 即为查询结果，它是一个 AV.Object 数组
      var results = data.results;
      console.log(results[0])
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
  onShareAppMessage: function () {
    
  }
})