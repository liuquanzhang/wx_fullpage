// pages/fullpage/fullpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollindex: 0,  //当前页面的索引值
    totalnum: 0,  //总共页面数
    starty: 0,  //开始的位置x
    endy: 0, //结束的位置y
    margintop: 0,  //滑动下拉距离
    move:false, //滑动状态
    sliderlist:[], //指示器
    sliderHeight:0, //指示器高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const query = wx.createSelectorQuery();
    query.selectAll('.scroll-fullpage .section').boundingClientRect(function(e){
      console.log("rect",e);
      let sliderlist = [];
      for(let i = 0;i < e.length;i++){
        sliderlist.push({
          index:i
        })
      }
      that.setData({
        totalnum: e.length,
        sliderlist: sliderlist
      })
    }).exec();
    
    // query.exec(function(res){
    //   console.log(options,res);
    //   that.setData({
    //     totalnum:res[0].length
    //   })
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    setTimeout(() => {
      const query = wx.createSelectorQuery();
      query.select('.sliderBox').boundingClientRect(function (e) {
        console.log(e);
        that.setData({
          sliderHeight: e.height / 2
        })
      }).exec()
    },100)
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  scrollTouchstart: function (e) {
    let py = e.touches[0].pageY;
    console.log(py);
    this.setData({
      starty: py,
      move:false
    })
  },
  scrollTouchmove: function (e) {
    let py = e.touches[0].pageY;
    let d = this.data;
    let h = wx.getSystemInfoSync().windowHeight;
    console.log("move")
    this.setData({
      endy: py,
      margintop: -d.scrollindex * h + py - d.starty,
      move: true
    })
    
  },
  scrollTouchend: function (e) {
    let d = this.data;
    if(!d.move){
      return;
    }
    let h = wx.getSystemInfoSync().windowHeight;
    console.log(d.scrollindex,h);
    if (d.endy - d.starty > 100 && d.scrollindex > 0) {
      this.setData({
        scrollindex: d.scrollindex - 1
      })
    } else if (d.endy - d.starty < -100 && d.scrollindex < this.data.totalnum - 1) {
      this.setData({
        scrollindex: d.scrollindex + 1
      })
    }
    this.setData({
      starty: 0,
      endy: 0,
      margintop: -d.scrollindex*h
    })
  },
})