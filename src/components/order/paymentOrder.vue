<template>
    <!--  订单详情  -->
    <div class="payment">
        <div class="payment-time">
            <p>{{stater}}</p>
            <p>下单时间：{{shopLists.createdate}}</p>
        </div>
        <!--   地址 -->
        <div class="payment-site">
            <div  v-for="(item,index) in addresslist" :key="index">
                <div v-if="item.isdefault==1">
                    <p><span>{{item.name}}</span><span>{{item.mobile}}</span></p>
                    <p>{{item.detail}} </p>
                </div>
            </div>
        </div>
        <!--   商品清单 -->
        <div class="payment-shop">
            <p class="title">商品清单</p>
            <div class="shopImg-img">
                <img :src="shopLists.orderImg" alt="">
                <div class="imgTitle">
                    <p class="imgTitle-title">{{shopLists.orderName}}</p>
                    <p>
                        <span class="fl">￥{{shopLists.price}} </span>
                        <span class="fr">x{{shopLists.totalcount}}</span>
                    </p>
                </div>
            </div>

        </div>
        <!--   费用明细 -->
        <div class="payment-cost">
            <p class="title">费用明细</p>
            <ul>
                <li><span>商品金额</span><span>￥{{totalprices}}</span></li>
                <li><span>运费</span><span>￥{{shopLists.freight}}</span></li>
                <li><span>积分抵扣</span><span>￥{{shopLists.integralResist}}</span></li>

            </ul>
            <p class="costB">应付款<span>￥{{shopLists.totalprice}}</span></p>
        </div>

        <!--  点击按钮  -->
        <div class="buy" v-show="xianshi">
            <p>
                <span @click="submitIn(shopLists)">立即付款</span>
                <span @click="callIn()">取消订单</span>

            </p>
        </div>

        <!--  弹层  取消订单-->
        <div class="purchase" v-if="isShow">
            <div class="pur">
                <h2>您确定取消订单吗？</h2>
                <p>
                    <span @click="cancelIn">去意已决</span>
                    <span @click="affirmIn">再想想</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "paymentOrders",
        data(){
            return{
                xianshi:false,
                isShow:false,
                shopLists:[],
                stater:'',
                id:this.$route.query.id, //
                // orderAmount:''  // 优惠后的价格
                addresslist:[],
                pid : this.$route.query.id, // 订单主键
                status:this.$route.query.status, // 状态码
            }
        },
        created(){
            if(this.status == 9) {
                this.stater = "待付款"
                this.xianshi = true
            } else if(this.status == 1) {
                this.stater = "待发货"
            } else if(this.status == 2) {
                this.stater = "待收货"

            } else if(this.status == 3) {
                this.stater = "待评价"

            } else if(this.status == 4) {
                this.stater = "已评价"

            } else if(this.status == 6) {
                this.stater = "取消订单"

            }




            // 获取用户id
            var name = window.localStorage.getItem(this.GLOBAL.CODE);
            this.userId = name

            //  调取地址列表数据
            var url = "wx/find/adressAll";
            var config = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
            //  数据交互
            this.$Ajax.post(url,
                this.$qs.stringify({
                    userId: this.userId,
                }), config)
            .then((res) => {
                // console.log(res);
                // 收货地址长度
                var addresslist = res.data.data
                for (var i=0; i<addresslist.length; i++){
                    var add = addresslist[i];
                    let addid = add.id
                    this.addressId = addid

                    var isdefault = add.isdefault
                    if(isdefault == 1 ){
                        add.isDef = true;
                        add.isDefe= false
                    }


                }

                this.addresslist = addresslist

            })
            .catch((error) => {
                console.log(error)
            });


            // 获取数据  商品详情的
            var url = "wx/find/order";
            var config = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
            //  数据交互
            this.$Ajax.post(url,
                this.$qs.stringify({
                   id:this.id
                }), config)
            .then((res) => {
                // console.log(res.data.data);
                var shopLists = res.data.data;
                var orderImg = shopLists.orderImg.split(",")[0]
                var integralResist =shopLists.integralResist /100

                shopLists.orderImg = orderImg


                shopLists.integralResist = integralResist
                this.shopLists = shopLists
            })
            .catch((error) => {
                console.log(error)
            });
        },
        //  计算属性
        computed:{

            totalprices(){
                return this.shopLists.price * this.shopLists.totalcount
            }
        },
        methods:{
            // 判断弹出是否显示
            //  取消按钮
            callIn (){
                // console.log(e.target.attributes[1].data-orderId)
                this.isShow = true;
                // var id = this.id;
                // console.log(id)
                // this.pid = id;
            },

            // 取消 弹出  返回到订单页
            cancelIn(){
                console.log(this.pid)
                console.log()
                // 获取数据
                var url = "/wx/remove/order";
                var config = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
                //  数据交互
                this.$Ajax.post(url,
                    this.$qs.stringify({
                        orderid:this.pid
                    }), config)
                .then((res) => {
                    // console.log(res);
                    this.isShow = false
                    this.$router.push({
                        path:'/order/index',
                        name:"order",
                    })
                })
                .catch((error) => {
                    console.log(error)
                });
            },
            // 取消 弹出  返回到页面
            affirmIn(){
                this.isShow = false;
            },


            // 点击提交订单 跳转到订单页面
            submitIn(shopLists){
                console.log(shopLists.ordersn)
                console.log(shopLists.totalprice)
                // 设置 ajax
                var self = this;
                var config = {headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
// 数据交互
                const payurl='webchat/pay'
                const openid=self.GLOBAL.OPENID
                self.$Ajax.post(payurl,
                    self.$qs.stringify({
                        orderNo:shopLists.ordersn,
                        orderAmount:shopLists.totalprice,
                        openId:self.GLOBAL.OPENID
                    }))
                .then((res)=>{
                    console.log(res)
                    if(res.data.code==200){
                        WeixinJSBridge.invoke(
                            'getBrandWCPayRequest', {
                                "appId":res.data.data.appId, //公众号名称，由商户传入
                                "timeStamp":res.data.data.timeStamp, //时间戳，自1970年以来的秒数
                                "nonceStr":res.data.data.nonceStr, //随机串
                                "package":res.data.data.package,
                                "signType":res.data.data.signType, //微信签名方式：
                                "paySign":res.data.data.paySign //微信签名
                            },
                            function(res){
                                console.log(res)
                                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                                    alert('支付成功')
                                } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回 ok，但并不保证它绝对可靠。
                            }
                        );
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
            },



        }
    }
</script>

<style scoped>
    .payment {
        height: auto;
    }
    .payment-time {
        height: 1.4rem;
        line-height: 1.4rem;
        background-color: #0290fe;
        padding: 0.25rem 0.3rem 0 0.3rem;
    }
    .payment-time p{
        height: 0.5rem;
        line-height: 0.5rem;
        color: #fff;
    }
    .payment-time p:nth-child(1){
       font-size: 0.3rem;
    }
    .payment-time p:nth-child(2){
        font-size: 0.24rem;
    }
    .payment-site {
        padding: 0.25rem 0.3rem;
        background:#fff;
        height: 1.1rem;
        overflow: hidden;
    }
    .payment-site p {
        background:#fff;
        color: #000;
    }
    .payment-site p:nth-child(1) {
        line-height: 0.63rem;
        height: 0.63rem;
        font-size: 0.28rem;
    }
    .payment-site p:nth-child(1) span:nth-child(1) {
       padding-right: 0.3rem;
    }
    .payment-site p:nth-child(2) {
        font-size: 0.24rem;
        line-height: 0.4rem;
    }


    .payment-shop{
        height:auto;
        background: #fff;
        margin: 0.2rem 0;
        padding-bottom: 0.2rem;
    }
    .payment-shop p.title{
        background: #fff;
        height: 0.8rem;
        line-height: 0.8rem;
        padding: 0 0.24rem;
    }
    .shopImg-img {
        height: 1.4rem;
        background: #f8f8f8;
        padding: 0.23rem 0.44rem 0.23rem 0.3rem;
    }
    .shopImg-img .img{
        width: 1.4rem;
        height: 1.4rem;
        float: left;
    }
    .shopImg-img img{
        width: 1.4rem;
        height: 1.4rem;
    }
    .imgTitle {
        width: 5.1rem;
        float: right;
    }
    .imgTitle p.imgTitle-title {
        height: 0.75rem;
        line-height: 0.75rem;
        font-family: PingFang-SC-Medium;
        font-size: 0.28rem;
    }
    .imgTitle p span {
        height: 0.65rem;
        line-height: 0.65rem;
    }
    .imgTitle p span.fl{
        color: #ff7376;
        font-size: 0.28rem;
    }
    .imgTitle p span.fr{
        font-size: 0.24rem;
        font-family: PingFang-SC-Bold;
        color: #333;
    }


    .payment-cost {
        background: #fff;
        padding: 0 0.24rem;
        margin-bottom: 1rem;
    }
    .payment-cost p.title{
        height: 0.8rem;
        line-height: 0.8rem;
        font-weight: bold;
    }
    .payment-cost ul{
        padding-bottom: 0.2rem;
    }
    .payment-cost ul li{
        height: 0.6rem;
        line-height: 0.6rem;
    }
    .payment-cost ul li span:nth-child(1){
        color: #666;
        float: left;
    }
    .payment-cost ul li span:nth-child(2){
        color: #333;
        float: right;
    }
    .payment-cost p.costB{
        height: 1rem;
        line-height: 1rem;
        border-top:1px solid #ededed;
        text-align:right;
        color: #2c2c2c;
        font-size: 0.3rem;
        font-weight: bold;
    }
    .payment-cost p.costB span{
        padding-left: 0.3rem;
        display: inline-block;
        font-family: Arial-BoldMT;
        color: #ff7376;
    }
    .buy {
        width: 7.5rem;
        position: fixed;
        bottom: 0;

        height: 1rem;
        background-color: #ffffff;
        box-shadow: 0 0 0.11rem 0.01rem
        rgba(0, 0, 0, 0.1);
    }
    .buy p{
        padding:0.22rem 0.25rem 0 0;

    }
    .buy p span{
        display: inline-block;
        width: 1.50rem;
        font-size: 0.26rem;
        height: 0.54rem;
        line-height: 0.54rem;
        border-radius: 0.06rem;
        border: solid 0.02rem #ededed;
        text-align: center;
        float: right;
        margin-left: 0.2rem;
    }
    .buy p span:nth-child(1){
        color: #0290fe;
        border: solid 0.02rem #0290fe;
    }

    /* 弹框  取消订单 */
    .purchase {
        width: 7.5rem;
        position: fixed;
        background-color:rgba(0,0,0,0.3);
        height: 100%;
        top:60px;
        left: 0;
        z-index: 99;
    }
    .pur {
        width: 6.1rem;
        height: 2.88rem;
        position: absolute;
        top: 3.95rem;
        left: 0.7rem;
        background:#fff;
        border-radius: 0.1rem;

    }
    .pur h2{
        font-family: PingFangSC-Regular;
        font-size: 0.3rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.88rem;
        height: 1.88rem;
        text-align: center;
        letter-spacing: 3px;
        color: #333333;
    }
    .pur p {
        border-top: 0.02rem solid #eee;
        height: 0.98rem;
        line-height: 0.98rem;
    }
    .pur p  span {
        display: inline-block;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 0.3rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 3px;
        float: left;
        text-align: center;
    }
    .pur p span:nth-child(1) {
        width: 3.04rem;
        color: #333333;
        border-right: 0.02rem solid #eee;
    }
    .pur p span:nth-child(2) {
        color: #0290fe;
        width: 3.04rem;

    }
    /* 弹框  取消订单 */
    .purchase {
        width: 7.5rem;
        position: fixed;
        background-color:rgba(0,0,0,0.3);
        height: 100%;
        top:60px;
        left: 0;
        z-index: 99;
    }
    .pur {
        width: 6.1rem;
        height: 2.88rem;
        position: absolute;
        top: 3.95rem;
        left: 0.7rem;
        background:#fff;
        border-radius: 0.1rem;

    }
    .pur h2{
        font-family: PingFangSC-Regular;
        font-size: 0.3rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.88rem;
        height: 1.88rem;
        text-align: center;
        letter-spacing: 3px;
        color: #333333;
    }
    .pur p {
        border-top: 0.02rem solid #eee;
        height: 0.98rem;
        line-height: 0.98rem;
    }
    .pur p  span {
        display: inline-block;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 0.3rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 3px;
        float: left;
        text-align: center;
    }
    .pur p span:nth-child(1) {
        width: 3.04rem;
        color: #333333;
        border-right: 0.02rem solid #eee;
    }
    .pur p span:nth-child(2) {
        color: #0290fe;
        width: 3.04rem;
    }

    /*  没有订单时显示*/
    .salesin {
        width: 7.5rem;
        height: 7.5rem;
        background: #fff url("/static/images/bj.png") center center no-repeat;
        background-size: 7.5rem;
    }
    .salesin p{
        padding-top: 4.9rem;
        text-align: center;
        font-size: 0.28rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0;
        color: #333333;
    }

</style>