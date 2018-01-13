//app.js
const AV = require('./utils/av-weapp-min.js');
const shoper = require('./model/shoper.js');
const huodong = require('./model/huodong.js');
AV.init({
  appId: 'lJ7cFjdO2QgzD3jtD6OVbVW2-gzGzoHsz',
  appKey: 'Qcx8AqdOxW1GgkLnxiRR3mFW',
});

App({
  onLaunch: function () {
    // 展示本地存储能力
    AV.User.loginWithWeapp().then(user => {
      this.globalData.user = user.toJSON();
      var that = this
      var cql = 'select * from shoper where UserId="' + AV.User.current().id + '"';
      AV.Query.doCloudQuery(cql).then(function (data) {
        // results 即为查询结果，它是一个 AV.Object 数组
        var results = data.results;
       // console.log(data.results)
        if(results.length==0)
        {
          const Shoper = new shoper({
            phone: '暂无信息',
            name: '暂无名称',
            show: '暂无介绍',
            addr: '暂无地址',
            pic1: 'http://ac-lJ7cFjdO.clouddn.com/b6e4bc5ce79c87b40c2f.png',
            pic2: 'http://ac-lJ7cFjdO.clouddn.com/b6e4bc5ce79c87b40c2f.png',
            UserId: AV.User.current().id
          });
          const acl = new AV.ACL();
          //console.log(AV.User.current());
          acl.setPublicReadAccess(true);
          acl.setPublicWriteAccess(false);
          acl.setWriteAccess(AV.User.current(), true);
          Shoper.ACL = acl;
          //console.log(Shop.set(tempFilePath));
          Shoper.save()
        }
      });
      var cql1 = 'select * from huodong where UserId="' + AV.User.current().id + '"';
      AV.Query.doCloudQuery(cql1).then(function (data) {
        // results 即为查询结果，它是一个 AV.Object 数组
        var results = data.results;
        if (results.length == 0) {
          const Huodong = new huodong({
          name:'暂无名称',
          show: '暂无介绍',
          price: '0',
          pic: 'http://ac-lJ7cFjdO.clouddn.com/b6e4bc5ce79c87b40c2f.png',
          UserId: AV.User.current().id
        });
        
        const acl = new AV.ACL();
        acl.setPublicReadAccess(true);
        acl.setPublicWriteAccess(false);
        acl.setWriteAccess(AV.User.current(), true);
        Huodong.ACL = acl;
        //console.log(Shop.set(tempFilePath));
        Huodong.save()
          .then(console.log)
          .catch(console.error);
        }
      });


      AV.Query.doCloudQuery(cql);
   
    }).catch(console.error);
   wx.login({
      success: res => {
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })   
  },
  globalData: {
    userInfo: null,
  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh() //停止下拉刷新

  }
})