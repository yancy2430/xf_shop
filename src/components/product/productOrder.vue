<template>
    <!-- 确认订单信息   -->
    <div class="productOrder">
        <div class="site">

            <div v-if="this.addresslist.length != 0">
                <div v-for="(item,index) in addresslist" :key="index">
                    <div class="address" v-if="item.isDef">
                        <div class="site">
                            <div class="siteName">
                                <p>{{item.name}}</p>
                                <p>默认</p>
                            </div>
                            <!---->
                            <div class="siteText">
                                <div class="siteText_top">
                                    <span>{{item.mobile}}</span>
                                    <div class="amend" @click="addressXgIn(item)">
                                        <img src="/static/images/amend.png" alt="" class="img">
                                        <span>修改</span>
                                    </div>
                                </div>
                                <p>{{item.detail}}</p>

                                <!--{{item.id}}-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--&lt;!&ndash;  切换分割线 &ndash;&gt;-->
            <div v-else>
                <P class="mydizi" @click="addsiteIn">
                    <span>+</span> 添加地址
                </P>
            </div>
        </div>
        <!--  商品详情   -->
        <div class="shopImg">
            <div class="shopImg-title">订单商品</div>
            <div class="shopImg-img">
                <img :src="img" alt="" class="img">
                <div class="imgTitle">
                    <p class="imgTitle-title">{{title}}</p>
                    <p>
                        <span class="fl">￥{{prices}} </span>
                        <span class="fr">x{{totalcount}}</span>
                    </p>
                </div>
            </div>
            <ul class="limit">
                <li>
                    <span class="fl">商品总额：</span>
                    <span class="fr">￥{{getPrice}}</span>
                </li>
                <li>
                    <span class="fl">运费：</span>
                    <span class="fr">￥{{freight}}*{{totalcount}}</span>
                </li>
<!--                <li @click="gralIn">-->
<!--                    <span class="fl">积分抵扣：</span>-->
<!--                    <span class="fr">￥{{integralResist}}</span>-->
<!--                </li>-->
                <li>
                    <span class="fl">实付金额：</span>
                    <span class="fr">￥{{totalprices}}</span>
                </li>
            </ul>
        </div>
        <!-- 留言 -->
        <div class="visitors">
            <div class="visitors-title">留言：</div>
            <div class="visitors-text">
                <textarea style="width:5.6rem; height: 2rem" placeholder=" 给卖家留言">

                </textarea>
            </div>
        </div>
        <!-- 点击按钮 -->
        <div class="buy">
            <ul>
                <li>实付金额: <span>￥{{totalprices}}</span></li>
                <li @click="submitIn">提交订单</li>
            </ul>
        </div>

        <!--<purchase v-if="!isShow"></purchase>-->
        <div class="purchase" v-if="isShow">
            <div class="pur">
                <h2>积分抵扣</h2>
                <p class="jifen">可用积分:<span>{{grade}}</span></p>
                <input type="number" placeholder="请输入使用分值" name="points" v-model="jiage" min="0" max="10">
                <p class="jiner">可抵扣金额：￥<span>{{sum1}}</span></p>

            </div>
            <div class="buy">
                <ul>
                    <li @click="buyIn">不使用积分</li>
                    <li @click="purchaseIn">确认</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "productOrder",
        data() {
            return {
                isShow: false, // 判断是否显示 换算积分图层
                // showIn:true,  // 判断是否有地址 显示样式
                img: this.$route.query.img, // 产品图标
                goodsid: this.$route.query.goodsid,  // 商品主键
                sellhit: this.$route.query.sellhit,  // 商品库存
                title: this.$route.query.title,        // 商品名字
                prices: this.$route.query.prices,      //商品价格
                getPrice: this.$route.query.getPrice,  // 商品总价格
                freight: this.$route.query.freight,    // 运费
                totalprice: this.$route.query.getPrice, // 优惠后总价格
                totalcount: this.$route.query.num,        // 总个数
                jiage: '',
                addresslist: [],  // 默认地址列表
                integralResist: 0,     // 积分抵多少
                remark: "",            // 备注
                addressId: "",     // 地址主键
                city: "",
                street: "",


            }
        },
        created() {

            // 获取用户id
            var name = window.localStorage.getItem(this.GLOBAL.CODE);
            this.userId = name

            // 获取用户 积分
            var url = "wx/selectBygrade";
            var config = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
            //  数据交互
            this.$Ajax.post(url,
                this.$qs.stringify({
                    userId: this.userId
                }), config)
                .then((res) => {
                    // console.log(res.data.data.grade)
                    // 获取积分
                    var grade = res.data.data.grade
                    this.grade = grade
                })
                .catch((error) => {
                    console.log(error)
                });


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
                    // console.log(addresslist.length);
                    for (var i = 0; i < addresslist.length; i++) {
                        var add = addresslist[i];
                        let addid = add.id
                        this.addressId = addid
                        var city = add.detail.split(" ")[0]
                        var street = add.detail.split(" ")[1]

                        // console.log(city)
                        // console.log(street)
                        this.city = city
                        this.street = street


                        var isdefault = add.isdefault
                        if (isdefault == 1) {
                            add.isDef = true;
                            add.isDefe = false
                        }


                    }

                    this.addresslist = addresslist

                })
                .catch((error) => {
                    console.log(error)
                });
            // console.log(this.addressId)

        },
        // 计算积分
        computed: {
            sum1() {
                return this.jiage / 100;
            },
            // 商品价格 + 运费价格 - 抵扣价格
            totalprices() {
                var totalprices = parseInt(this.getPrice) + parseInt(this.freight * this.totalcount) - this.integralResist
                return totalprices ? totalprices : 0
            }

        },
        methods: {
            //  点击 积分抵扣 页面弹出
            gralIn() {
                console.log(1)
                this.isShow = true
            },
            //  点击 取消积分抵扣
            buyIn() {
                this.isShow = false;
            },
            //  点击 确认积分抵扣
            purchaseIn() {
                this.isShow = false;
                this.integralResist = this.sum1;  // 获取积分抵扣的钱
                // totalprices = this.totalprices - this.integralResist;
                // this.sum = this.sum - this.jiage;
                console.log(this.integralResist)
            },

            // 点击提交订单 跳转到订单页面
            submitIn() {
                // 设置 ajax
                var self = this;


                var url = "wx/order/add";
                var config = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
// 数据交互
                self.$Ajax.post(url,
                    self.$qs.stringify({
                        totalprice: self.totalprice, // 总价格
                        totalcount: self.totalcount, // 总个数
                        goodsid: self.goodsid, // 商品主键
                        addressId: self.addressId, // 地址主键
                        integralResist: self.integralResist, // 积分抵多少
                        remark: self.remark, // 备注
                        userId: self.userId, //用户主键
// orderAmount:self.totalprices, // 优惠后的价格
// orderNo:''

                    }), config)
                    .then((res) => {
                        console.log(res)
                        if (res.data.code == 200) {
                            let No = res.data.data.orderNo;
                            const payurl = 'webchat/pay'
                            const openid = self.GLOBAL.USERINFO.openId
                            self.$Ajax.post(payurl,
                                self.$qs.stringify({
                                    orderNo: res.data.data.orderNo,
                                    orderAmount: res.data.data.orderAmount,
                                    openId: openid
                                }))
                                .then((res) => {

                                    if (res.data.code == 200) {
                                        WeixinJSBridge.invoke(
                                            'getBrandWCPayRequest', {
                                                "appId": res.data.data.appId, //公众号名称，由商户传入
                                                "timeStamp": res.data.data.timeStamp, //时间戳，自1970年以来的秒数
                                                "nonceStr": res.data.data.nonceStr, //随机串
                                                "package": res.data.data.package,
                                                "signType": res.data.data.signType, //微信签名方式：
                                                "paySign": res.data.data.paySign //微信签名
                                            },
                                            function (res) {
                                                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回 ok，但并不保证它绝对可靠。


                                            }
                                        );
                                    }
                                    setInterval(function () {
                                        // 获取数据  商品详情的
                                        var url = "wx/find/orderByNo";
                                        var config = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
                                        //  数据交互
                                        self.$Ajax.post(url,
                                            self.$qs.stringify({
                                                orderNo:No
                                            }), config)
                                            .then((res) => {
                                                // console.log(res.data.data);
                                                if (res.data.data.status==1){
                                                    window.location.href = 'http://shop.xf-health.com/h5/#/order/index'
                                                }
                                            })
                                            .catch((error) => {
                                                console.log(error)
                                            });


                                    }, 1000);

                                }).catch((err) => {

                                console.log(err)
                            })
                        }
                        else {
                            console.log(res.data.msg)
                            alert(res.data.msg)
                            window.location.href = 'http://shop.xf-health.com/h5/#/order/index'
                        }
// this.$router.push({
// path:'/order/index',
// name:"order",
// // query:{
// // imgmore:self.imgmore, // 产品图标
// // },
// })
                    })
            },



            addsiteIn() {
                // this.$router.pop()
                this.$router.push({
                    path: '/set/setLocation',
                    name: 'setLocation',
                    params: {
                        act: 0,
                    }
                })
            },

            //  修改地址
            addressXgIn(item) {
                this.address = item
                this.$router.push({
                    path: '/set/setLocation',
                    name: 'setLocation',
                    params: {
                        address: this.address,
                        id: item.id,
                        act: 3,
                        name: item.name,
                        mobile: item.mobile,
                        detail: item.detail,
                        city: this.city,
                        street: this.street

                    }
                })
            }
        }
    }
</script>

<style scoped>
    .site {
        /*padding-top: 60px;*/
        width: 7.5rem;
        height: 1.8rem;
        background: #fff;
        margin-bottom: 0.2rem;
        /*overflow: hidden;*/
    }

    .site p.mydizi {
        line-height: 1.8rem;
        padding-left: 0.24rem;
        font-size: 0.28rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: #333333;
    }

    .site p.mydizi span {
        font-size: 0.5rem;
        color: #0290fe;
    }


    .siteName {
        /*width: 1.9rem;*/
        width: 1.66rem;
        padding-left: 0.24rem;
        float: left;
    }

    .siteName p:nth-child(1) {
        padding-top: 0.4rem;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.28rem;
    }

    .siteName p:nth-child(2) {
        font-family: PingFang-SC-Regular;
        width: 0.64rem;
        height: 0.34rem;
        line-height: 0.34rem;
        font-size: 0.2rem;
        text-align: center;
        background-color: #fff;
        border: solid 2px #0290fe;
        color: #0290fe;
    }

    .siteText {
        width: 5.36rem;
        height: auto;
        float: left;
    }

    .siteText_top {
        padding-top: 0.4rem;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.28rem;
    }

    .siteText_top span {
        float: left;
    }

    .amend {
        float: right;
    }

    .amend .img {
        float: left;
        padding-top: 0.13rem;
        padding-right: 0.05rem;
    }

    .amend img {
        width: 0.24rem;
        height: 0.24rem;
    }

    .amend span {
        font-family: PingFang-SC-Regular;
        font-size: 0.24rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #868686;
        float: left;
    }

    .siteText p {
        font-family: PingFang-SC-Regular;
        font-size: 0.24rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0;
        color: #868686;
    }

    .shopImg {
        height: auto;
    }

    .shopImg-title {
        background: #fff;
        height: 0.8rem;
        line-height: 0.8rem;
        padding: 0 0.24rem;
    }

    .shopImg-img {
        height: 1.4rem;
        margin: 0.23rem 0.44rem 0.23rem 0.3rem;
    }

    .shopImg-img .img {
        width: 1.4rem;
        height: 1.4rem;
        float: left;
    }

    .shopImg-img img {
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

    .imgTitle p span.fl {
        color: #ff7376;
        font-size: 0.28rem;
    }

    .imgTitle p span.fr {
        font-size: 0.24rem;
        font-family: PingFang-SC-Bold;
        color: #333;
    }

    .shopImg ul {
        padding: 0 0.3rem;
        height: auto;
        background: #fff;
    }

    .shopImg ul li {
        height: 0.8rem;
        line-height: 0.8rem;
        border-bottom: 0.01rem solid #ccc;
    }

    .shopImg ul li:last-child {

        border-bottom: none;
    }

    .shopImg ul li span.fl {
        font-family: PingFang-SC-Regular;
        font-size: 0.28rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0;
        color: #333333;
    }

    .shopImg ul li span.fr {
        font-family: PingFang-SC-Medium;
        font-size: 0.28rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0;
        color: #ff7376;
    }

    .visitors {
        height: 2.3rem;
        background: #fff;
        padding: 0.3rem 0.3rem;
        margin-top: 0.2rem;
    }

    .visitors-title {
        float: left;
        width: 1.2rem;
    }

    .visitors-text {
        height: 2rem;
        float: left;
    }

    .visitors-text textarea {
        border: none;
        font-size: 0.28rem;
        color: #333333;
    }

    .buy {
        position: fixed;
        bottom: 0;
        height: 1rem;
        line-height: 1rem;
        width: 100%;
    }

    .buy ul {
    }

    .buy ul li {
        width: 50%;
        float: left;
        text-align: center;
        background-color: #ffffff;
        box-shadow: 0 0 0.01rem 0.01rem rgba(0, 0, 0, 0.1);
    }

    .buy ul li span {
        color: #ff7376;
        font-weight: bold;
    }

    .buy ul li:nth-child(1) {
        font-size: 0.32rem;
        color: #333;
    }

    .buy ul li:nth-child(2) {
        font-size: 0.32rem;
        color: #fff;
        background: #0290fe;
    }

    /* 弹框  */
    .purchase {
        width: 7.5rem;
        position: fixed;
        background-color: rgba(0, 0, 0, 0.3);
        height: 100%;
        top: 60px;
        left: 0;
        z-index: 9999;
    }

    .pur {
        width: 5.26rem;
        position: absolute;
        bottom: 0;
        height: 7rem;
        background: #fff;
        padding: 0 1.12rem;
        border-radius: 0.1rem 0.1rem 0 0;
    }

    .pur h2 {
        height: 1.1rem;
        line-height: 1.1rem;
        text-align: center;
        font-family: PingFang-SC-Bold;
        font-size: 0.32rem;
        font-weight: normal;
        font-stretch: normal;
    }

    .pur .jifen {
        height: 1rem;
        line-height: 1rem;
        font-family: PingFang-SC-Medium;
        font-size: 0.3rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0.03rem;
        color: #333333;
    }

    .pur input {
        width: 5.24rem;
        height: 0.6rem;
        border-radius: 2px;
        border: solid 1px #cccccc;
        opacity: 0.71;
        text-indent: 1em;
    }

    input::-webkit-input-placeholder {
        color: #ccc;
    }

    input::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #ccc;
    }

    .pur .jiner {
        height: 1.5rem;
        line-height: 1.5rem;
        font-family: PingFang-SC-Medium;
        font-size: 0.3rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0.03rem;
        color: #333333;
        text-align: center;
    }


    /*  确认小按钮  */
    .purchaseIn {
        position: absolute;
        bottom: 1rem;
        left: 0;
        width: 7.5rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        background-color: #0290fe;
        font-size: 0.32rem;
        color: #fff;
        border: none;
        font-family: PingFang-SC-Bold;
        z-index: 1;
    }

</style>
