<template>
    <!--   商品详情  -->
    <div class="product">
         <div class="product-banner">
             <mt-swipe :auto="4000" >
                 <mt-swipe-item  v-for="(item,index) in bannerImg" :key="index">
                     <img :src="item" alt="" class="img">
                 </mt-swipe-item>

             </mt-swipe>

         </div>
         <div class="nature">
              <div class="natureTop">
                    <div class="natureT">
                         <h3>{{shopDetails.title}}</h3>
                         <p>￥<span>{{shopDetails.prices}}</span></p>
                    </div>
                    <div class="share fr"  @click="getConfig">
                        <img src="/static/images/order-1.png" alt=""  class="img">
                        <span>分享</span>
                    </div>
              </div>
              <div class="natureB">
                   <ul>
                       <li>运费：￥<span>{{shopDetails.freight}}</span></li>
                       <li>销量：<span>{{shopDetails.sales}}</span></li>
                       <li>库存：<span>{{shopDetails.sellhit}}</span></li>

                   </ul>
              </div>
         </div>
         <!--   商品评价 -->
         <div class="evaluate" @click="evaluateIn">
             <div class="evaluateT">
                 <p><span>商品评价</span><span>查看全部 ＞</span></p>
             </div>

             <div class="evaluateName" v-for="(item,index) in discuss" :key="index">
                 <div @click="evaluateIn(item)">
                     <div class="img-title">
                         <img :src="item.headimg" alt="" class="img">
                         <span>{{item.username}}</span>
                     </div>
                     <!-- 分割线  -->
                     <div class="text">
                         <p>{{item.content}}</p>
                     </div>
                 </div>


             </div>
         </div>
         <!--   商品详情 -->
        <div class="details">
            <div class="detailsT">商品详情</div>
            <div class="content">
                <!--{{shopDetails.imgmore}}-->
                <div class="div" v-for="(item,index) in imgmores" :key="index">
                    <img :src="item">
                </div>

            </div>
        </div>


         <!-- 立即购买  -->
         <button class="buy" v-if="isShow" @click="buyIn">立即购买</button>
         <!--<purchase v-if="!isShow"></purchase>-->
         <div class="purchase" v-if="!isShow">
            <div class="pur">
                <div class="top">
                    <div class="topL">
                        <img :src="img" alt="" class="img">
                        <div class="jiage">
                            <p>￥<span>{{shopDetails.prices}}</span></p>
                            <p>库存：<span>{{shopDetails.sellhit}}</span></p>
                        </div>
                        <div class="cancel" @click="cancelIn">x</div>
                    </div>
                    <!--{{getPrice}}  商品总价格  -->
                </div>
                <div class="bottom">
                    <div class="title">
                        <span>购买数量</span>
                    </div>
                    <div class="jiajian">
                        <span @click="shopReduce">-</span>
                        <input type="text" disabled v-model="num"/>
                        <span @click="shopAdd">+</span>
                    </div>
                </div>
            </div>
            <button class="buy" @click="purchaseIn(shopDetails)">确认</button>
            <!-- 立即购买  -->
        </div>



         <!-- 分享弹层 -->
         <div class="tancheng" v-show="showFx">
             <div class="tancheng-img">
                 <img src="/static/images/fenxiangtc.png" alt="">
                 <p @click="tancheng">我知道了</p>
             </div>
         </div>

    </div>
</template>

<script>
    import { mapState } from 'vuex'

    var imgmores = []
    export default {
        name: "productDetails",
        data(){
            return {
                showFx:false,
                isShow:true,     //  购买 弹窗
                id:this.$route.query.pid,    // 商品的id主键
                goodsid:this.$route.query.pid,  // 商品主键 id
                img:this.$route.query.img, // 产品图标
                offset:1,  // 第几页
                limit:10,  // 每页多少条
                shopDetails:{}, // 详情页数据
                discuss:[],     // 商品评论 数组列表
                imgmores:[],  // 商品详情图片列表
                bannerImg:[],  // banner 循环数组列表
            }
        },
        created() {





            // 商品评价
            var url = "wx/default/comment";
            var config = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
            //  数据交互
            this.$Ajax.post(url,
                this.$qs.stringify({
                    goodsid:this.goodsid,  // 商品的id
                    offset: this.offset,
                    limit: this.limit,
                }), config)
            .then((res) => {
                // console.log(res.data.data.rows);
                var discuss = res.data.data.rows;
                for(var i=0; i< discuss.length;i++){
                    let dic = discuss[i];
                    let username = dic.username
                    // console.log(username)
                    var name = username.replace(username.substr(2)," *****")
                    // console.log(name)
                    dic.username = name
                }
                this.discuss = discuss
            })
            .catch((error) => {
                console.log(error)
            });

            // 商品详情
            var self = this;
            var url = "wx/details";
            var config = {headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
            //  数据交互
            self.$Ajax.post(url,
                self.$qs.stringify({
                    id:self.id,  // 商品主键 id
                }),config)
            .then((res) => {
                console.log(res.data.data);
                var shopDetails = res.data.data;
                // console.log(shopDetails)
                // 整理轮播图
                let src = shopDetails.img.split(",");
                shopDetails.img =src;
                this.bannerImg =src;

                // 整理商品详情内容 以页面显示
                let imgmore = shopDetails.imgmore.split(","); // 把字符串用逗号分割成数组
                // console.log(imgmore)
                shopDetails.imgmore = imgmore;
                this.imgmores = imgmore //全局
                // console.log(res.data.data);


                //  库存  用不到了
                window.localStorage.setItem(this.GLOBAL.SELLHIT, res.data.data.sellhit);
                // 数据整理完整 返回效果
                this.shopDetails = shopDetails

            })
            .catch((error) => {
                console.log(error)
            });
        },
        //  计算属性
        computed:{
            // 数量
            num(){
                return this.$store.state.num
            },
            //  总价格 等于 数量 * 单价
            getPrice(){
                return this.num * this.shopDetails.prices
            }
        },

        methods:{
            // 显示 隐藏 分享页面
            tancheng(){
                this.showFx = false
            },
            // 验证是否登录
            buyIn (){
                // 用户名 ID
                var name = window.localStorage.getItem(this.GLOBAL.CODE)
                console.log("用户名:"+name)
                if(name == "" || name == null){
                    //跳转到login界面
                    //要延时执行的代码
                    this.$router.push({
                        path:'/loginR',
                        name:'loginR',
                    })
                }else {
                    this.isShow = false;
                }
            },
            //  立即购买 提交到订单
            purchaseIn(shopDetails){
                this.isShow =true;
                this.$router.push({
                    path:'/product/productOrder',
                    name:'productOrder',
                    query:{
                        title:shopDetails.title,   // 商品名称
                        prices:shopDetails.prices,   // 商品价格
                        num:this.num,    // 商品的数量
                        freight:shopDetails.freight,  // 运费
                        getPrice:this.getPrice,   //商品总价格
                        img:this.img, // 产品图标
                        goodsid:this.goodsid  // 商品主键

                    },
                })
            },
            //
            cancelIn(){
                this.isShow =true;
            },
            shopReduce(){   //  商品数量减少
                //console.log('--')
                if( this.num <=1 ) return;
                /*this.$store.commit('updateCartCount',-1)*/
                this.$store.commit('decrement')
            },
            shopAdd(){     //   商品数量增加
                //console.log('++')
                // this.num++;
                var sellH = window.localStorage.getItem(this.GLOBAL.SELLHIT)
                if(this.num >= sellH) return;
                this.$store.commit('increment')
            },

            // 商品评价
            evaluateIn() {
                // console.log(item)
                this.$router.push({
                    name:'productValuation',
                    query:{
                        goodsid:this.shopDetails.id,
                        imgmore:this.shopDetailsimgmore,
                    },
                })
            },



            //  分享 调用sdk
            // 微信分参数
            getConfig() {
                this.showFx = true
                var _this=this;
                let url = location.href.split('?')[0] //获取锚点之前的链接

                 //let url = 'http://xiaofeng.ckugua.com/index.html' //获取锚点之前的链接
                // console.log(url)
                _this.$Ajax.post('webchat/config?url=http%3a%2f%2fxiaofeng.ckugua.com%2findex.html').then(response => {
                    // console.log(response)
                    let res = JSON.parse(response.data.data);
                    console.log(res)
                    _this.wxInit(res);
                })
            },
            // 微信分享
            wxInit(res) {
                var _this=this;
                let url = location.href.split('?')[0] //获取锚点之前的链接
                console.log(url)
                // let links = url+'#/Food/' + this.$route.params.id;
                let links = 'http://xiaofeng.ckugua.com/index.html/#/product/productDetails?pid=/'+_this.$route.query.pid;
                let title = '晓峰科技';
                let desc = '了解更多，请关注“晓峰科技”公众号';
                let imgUrl = _this.$route.query.imgmore;
                _this.wx.config({
                    debug: false,
                    appId: res.appId,
                    timestamp: res.timestamp,
                    nonceStr: res.nonceStr,
                    signature: res.signature,
                    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
                });
                _this.wx.ready(function() {
                    _this.wx.onMenuShareAppMessage({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: links, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function() {
                            alert('分享成功')
                            _this.isShow =true;
                        },
                        cancel: function() {
                            alert('分享失败')
                            _this.isShow =true;
                        }
                    });
                    //微信分享菜单测试
                    _this.wx.onMenuShareTimeline({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: links, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function() {
                            alert('分享成功')
                            _this.isShow =true;
                        },
                        cancel: function() {
                            alert('分享失败')
                            _this.isShow =true;
                        }
                    })
                });
                _this.wx.error(function(err) {
                    alert(JSON.stringify(err))
                });
            }



        },

    }
</script>

<style scoped>
    .tancheng {
        position: fixed;
        background-color:rgba(0,0,0,0.7);
        width: 7.5rem;
        height: 100%;
        top: 0;
        left: 0;
    }
    .tancheng img{
        position: absolute;
        top: 0.2rem;
        right: 0.5rem;
        width: 5.61rem;
        height: 3.65rem;
    }
    .tancheng p{
        position: absolute;
        top: 6rem;
        right: 3rem;
        border: 1px dashed #fff;
        color: #fff;
        padding: 0.1rem 0.2rem;
        font-weight: normal;

    }




    .product-banner {
      /*padding-top: 60px;*/
      width: 7.5rem;
      height: 7.5rem;
  }
  .product-banner img {
      width: 7.5rem;
      height: 7.5rem;
  }
  .buy {
      position: fixed;
      bottom:0;
      width: 7.5rem;
      height:0.5rem;
      text-align: center;
      background: aqua;
  }
  .nature {
      height: 2.1rem;
      background: #fff;
  }
  .natureTop {
      height: 1.3rem;
      padding-left: 0.24rem;
  }
  .natureT {
      width: 5.9rem;
      font-size: 0.3rem;
      float: left;
  }
  .natureT h3{
      height: 0.75rem;
      line-height: 0.75rem;
      font-size: 0.28rem;
      color: #333333;
      font-weight: normal;
      font-stretch: normal;
      font-family: PingFang-SC-Bold;
  }
  .natureT p{
      color: #ff7376;
      font-size: 0.34rem;
  }
  .natureT p span{
      font-family: Arial-BoldMT;
  }
  .share {
      width: 1.34rem;
      height: 0.6rem;
      line-height: 0.6rem;
      background-color: #dbdbdb;
      border-radius: 0.29rem 0 0 0.29rem;
      float: right;
      text-align: center;
      margin-top: 0.69rem;
    }
  .share .img {
      float: left;
      padding:0.17rem 0.08rem 0 0.35rem;
  }
  .share img {
      width: 0.26rem;
      height: 0.26rem;
  }
  .share span{
      float: left;
      font-size: 0.24rem;
      color: #666666;
  }
  .natureB {
      height: 0.8rem;
      margin: 0 0.24rem;
      line-height: 0.8rem;
  }
  .natureB ul {
      font-size: 0.24rem;
      color: #999;
  }
  .natureB ul li{
      width: 33.333%;
      float: left;
  }
  .natureB ul li:nth-child(1){
      text-align: left;
  }
  .natureB ul li:nth-child(2){
      text-align: center;
  }
  .natureB ul li:nth-child(3){
      text-align: right;
  }

  .evaluate {
      background: #fff;
      height: 2.6rem;
      margin: 0.2rem 0;
      padding: 0 0.24rem;
  }
  .evaluateT {
      width: 7.02rem;
      height: 0.87rem;
      line-height: 0.87rem;
      border-bottom: 1px solid #cfd8e1;
  }
  .evaluateT p span {
      width: 50%;
      display: inline-block;
  }
  .evaluateT span:nth-child(1){
      text-align: left;
      font-size: 0.28rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
  }
  .evaluateT span:nth-child(2){
      color: #0290fe;
      text-align: right;
      font-size: 0.24rem;
  }
  .evaluateName {
      height: 1.7rem;
  }
  .img-title {
      height: 0.5rem;
      padding-top: 0.2rem ;
  }
  .img-title .img{
      float: left;
      width: 0.5rem;
      height: 0.5rem;
      padding-right: 0.21rem;
  }
  .img-title img{
      width: 0.5rem;
      height: 0.5rem;
  }
  .img-title span {
      display: inline-block;
      height: 0.5rem;
      line-height: 0.5rem;
  }
   .text {
      padding-top: 0.1rem;
      height: 0.7rem;
      overflow: hidden;
  }
  .text p {
      line-height: 0.35rem;
      font-size: 0.24rem;
      color: #333;
      font-family: PingFang-SC-Regular;
  }
  .details {
      height: auto;
  }
  .details .detailsT{
      height:0.88rem;
      line-height: 0.88rem;
      background: #fff;
      font-size: 0.28rem;
      color: #333;
      text-align: center;
      font-weight: bold;
  }

  .content {
       text-align: center;
       margin:0.24rem;
       padding-bottom: 1rem;
       box-sizing: border-box;
  }
  .content img{
     width: 7.02rem;
  }


  /*  购买小按钮  */
  .buy {
      position: fixed;
      bottom:0;
      width: 7.5rem;
      height:1rem;
      line-height: 1rem;
      text-align: center;
      background-color: #0290fe;
      font-size: 0.32rem;
      color: #fff;
      border: none;
      font-family: PingFang-SC-Bold;

  }



  /* 购买商品数量 弹框  */
  .purchase {
      width: 7.5rem;
      position: fixed;
      background-color:rgba(0,0,0,0.3);
      height: 100%;
      top:0px;
      left: 0;
      z-index: 99;
  }
  .pur {
      width: 7.02rem;
      position: absolute;
      bottom: 0;
      height: 6.6rem;
      background: #fff;
      padding: 0 0.24rem;
      border-radius:0.1rem 0.1rem 0 0 ;
  }
  .pur .top{
      height: 1.7rem;
      padding-top: 0.4rem;
      padding-bottom:0.4rem;
      border-bottom: 0.01rem solid #cfd8e1;

  }
  .pur .top .topL{
      height: 1.7rem;
      position: relative;
  }
  .pur .top img{
      width: 1.7rem;
      height: 1.7rem;
      border-radius: 0.12rem;
      float: left;
  }
  .jiage {
      float: left;
      padding-left: 0.3rem;
  }
  .jiage p:nth-child(1){
      font-family: PingFang-SC-Bold;
      height: 0.7rem;
      line-height: 0.7rem;
      color: #ff7376;
      font-size: 0.34rem;
  }
  .jiage p:nth-child(2){
      font-family: PingFang-SC-Regular;
      height: 1rem;
      line-height:1rem;
      font-size: 0.26rem;
      color: #666666;
  }
  .cancel {
      width: 0.33rem;
      height: 0.33rem;
      background: #fff;
      text-align: center;
      line-height: 0.33rem;
      border: 0.01rem solid #999;
      border-radius: 0.33rem;
      color: #999;
      font-weight:normal;
      position: absolute;
      right: 0;
      top: 0;
  }
  .bottom {
      padding-top: 0.5rem;
      width: 7.02rem;
      height: 1.73rem;

  }
  .title{
      float: left;
  }
  .title sapn{
      font-family: PingFang-SC-Medium;
      color: #333;
      font-size: 0.28rem;
      font-weight: normal;
  }
  .jiajian {
      float: right;
      width: 1.46rem;
      height: 0.46rem;
      background-color: #fde7e8;
      border-radius: 0.23rem;
  }
  .jiajian input{
      float: left;
      width: 0.54rem;
      border: none;
      text-align: center;
      line-height: 0.46rem;
      color: #ff7376;
      font-size: 0.32rem;
  }
  .jiajian span{
      float: left;
      display: inline-block;
      width: 0.46rem;
      height: 0.46rem;
      background: #000000;
      border-radius: 0.23rem;
      text-align: center;
      line-height: 0.46rem;
      font-family: PingFang-SC-Medium;
      font-size: 0.32rem;
      color: #fff;

  }
  .jiajian span:nth-child(1){
      background-color: #fdbebf;
  }
  .jiajian span:nth-child(3){
      background-color: #ff7376;
  }

  /*  确认小按钮  */
  .purchaseIn {
      position: absolute;
      bottom: 1rem;
      left: 0;
      width: 7.5rem;
      height:1rem;
      line-height: 1rem;
      text-align: center;
      background-color: #0290fe;
      font-size: 0.32rem;
      color: #fff;
      border: none;
      font-family: PingFang-SC-Bold;
      z-index:1 ;
  }





  /*!*  确认小按钮  *!*/
  /*.purchaseIn {*/
      /*position: absolute;*/
      /*bottom: 1rem;*/
      /*left: 0;*/
      /*width: 7.5rem;*/
      /*height:1rem;*/
      /*line-height: 1rem;*/
      /*text-align: center;*/
      /*background-color: #0290fe;*/
      /*font-size: 0.32rem;*/
      /*color: #fff;*/
      /*border: none;*/
      /*font-family: PingFang-SC-Bold;*/
      /*z-index: 99999;*/
  /*}*/
</style>
