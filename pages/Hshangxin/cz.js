
Page({
  data: {
    hidden: false,
    nocancel: true
  },

  confirm: function () {
    // console.log("abc")
    
    wx.navigateTo({
      url: './Hshangxin',
    })
  }
})    