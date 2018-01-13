

Page({
  data: {
    hidden: false,
    nocancel: true
  },

  confirm: function () {
   // console.log("abc")
   wx.switchTab({
     url: '../index/index',
   })
  }
})    