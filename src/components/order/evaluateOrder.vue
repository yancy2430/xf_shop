<template>
    <!--  待评价订单   -->
    <div class="all-orders">
        <ul v-if="shopLists.length !=0">
            <li v-for="(item,index) in shopLists" :key="index">
                <div @click="paymentIn(item)">
                    <div class="title">
                        <div class="titleText">交易成功</div>
                    </div>
                    <div class="imgTitle">
                        <div class="imgIn">
                            <img :src="item.orderImg" alt="">
                        </div>
                        <!-- 分割线 -->
                        <div class="titleT">
                            <p class="titlePrice">
                                <span class="fl">{{item.orderName}}</span>
                                <span class="fr">¥{{item.price}}</span>
                            </p>
                            <p class="count">x{{item.totalcount}}</p>
                            <p class="points">积分抵扣：{{item.integralResist}}元</p>
                            <p class="freight">运费：{{item.freight}}元</p>
                        </div>
                    </div>

                    <div class="total">
                        <p>
                            <span>共{{item.totalcount}}件商品</span>
                            <span>合计：¥{{item.totalprice}}</span>
                        </p>
                    </div>
                </div>
                <div class="buts">
                    <span class="at-once" @click="evaluateIn(item)">评价</span>
                    <span class="cancel" @click="retumendIn(item)">申请退货</span>

                </div>
            </li>
            <!-- 分割线 -->

        </ul>
        <!--没有订单时 显示-->
        <div class="salesin" v-else>
            <p>还没有相关订单哦</p>
        </div>
    </div>

</template>

<script>
    export default {
        name: "evaluateOrders",
        data(){
            return{
                shopLists:[]
            }
        },
        created(){
            // 获取用户id
            var name = window.localStorage.getItem(this.GLOBAL.CODE);
            this.userId = name
            // 获取数据
            var url = "wx/order/all";
            var config = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
            //  数据交互
            this.$Ajax.post(url,
                this.$qs.stringify({
                    offset: 1,
                    limit: 10,
                    userId:this.userId,
                    status :3

                }), config)
            .then((res) => {
                console.log(res.data.data.rows);
                var shopLists = res.data.data.rows;
                for(var i=0;i<shopLists.length;i++){
                    let dis = shopLists[i]
                    let orderImg = dis.orderImg.split(",")[0]
                    dis.orderImg  =orderImg

                }
                this.shopLists = shopLists
            })
            .catch((error) => {
                console.log(error)
            });

        },




        methods:{
            // 查看详情
            paymentIn(item){
                this.$router.push({
                    path:'/order/paymentOrders',
                    name:"paymentOrders",
                    query:{
                        id:item.id,
                        status:item.status
                    }
                })
            },


            // 申请退货
            retumendIn(item){
                this.$router.push({
                    path:'/sales/salesReturn',
                    name:'salesReturn',
                    query:{
                        orderid:item.id, // 订单编号
                        orderImg:item.orderImg,  // 订单图片
                        orderName:item.orderName,  // 订单名称
                        totalprice:item.totalprice,          // 商品总价格
                        price:item.price       // 商品单价




                    },
                })
            },
            // 评价
            evaluateIn(item){
                this.$router.push({
                    path:'/sales/salesEvaluate',
                    name:'salesEvaluate',
                    query:{
                        orderid:item.id, // 订单编号
                        orderImg:item.orderImg,  // 订单图片
                        orderName:item.orderName,  // 订单名称
                        price:item.price,      // 商品单价


                    },
                })
            },

        }
    }
</script>

<style scoped>
    .all-orders {
        height: auto;
    }
    .all-orders ul {
        width: 7.02rem;
        margin: 0 0.24rem;
    }
    .all-orders ul li{
        margin: 0.2rem 0;
        height:4.20rem;
        background: #fff;
        padding: 0 0.19rem 0 0.28rem;
    }

    .all-orders .title {
        height: 0.66rem;
        font-size: 0.2rem;
        overflow: hidden;
        /*margin: 0 0.19rem 0 0.28rem;*/
        line-height: 0.66rem;
    }
    .all-orders .title .titleText {
        width: 1.3rem;
        float: left;
        font-size: 0.22rem;
        color: #ff7376;
    }
    .all-orders .title .times{
        width: 3rem;
        float: right;
        text-align: right;
    }
    .all-orders .title .times img{
        padding-top: 0.22rem;
        padding-right: 0.05rem;
        width: 0.24rem;
        height: 0.24rem;
    }
    .all-orders .title .times img img{
        width: 0.24rem;
        height: 0.24rem;
    }
    .all-orders .title .times .time{
        font-family: PingFangSC-Regular;
        font-size:0.2rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 1px;
        color: #aaaaaa;
    }





    .all-orders .imgTitle {
        /*height: 1.9rem;*/
        overflow: hidden;
        /*margin: 0 0.2rem 0 0.3rem;*/

    }
    .imgTitle .imgIn {
        width: 1.3rem;
        height: 1.3rem;
        background-color: #ffffff;
        border-radius: 0.1rem;
        border: solid 0.01rem #e7e7e7;
        margin-top: 0.34rem;
        float: left;
    }
    .imgTitle .imgIn img{
        width: 1.3rem;
        height: 1.3rem;

    }
    .imgTitle .titleT {
        float: right;
        /*height: 1.9rem;*/
        width: 4.8rem;

    }
    .imgTitle .titleT .titlePrice {
        margin-top: 0.25rem;
        height: 0.45rem;
        line-height: 0.45rem;
        font-size: 0.28rem;

    }
    .imgTitle .titleT .count{
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.2rem;
        text-align: right;

    }
    .imgTitle .titleT .points {
        height: 0.45rem;
        line-height: 0.45rem;
        font-size: 0.2rem;
        text-align: right;
        color:#333;
    }
    .imgTitle .titleT .freight {
        height: 0.45rem;
        line-height: 0.45rem;
        font-size: 0.2rem;
        text-align: right;
        color:#777;
    }
    .all-orders .total {
        height: 0.85rem;
        overflow: hidden;
        line-height:0.45rem;
    }
    .all-orders .total p{
        font-size: 0.28rem;
        text-align: right;
    }
    .all-orders .total p span{
        display: inline-block;
        padding-left: 0.31rem;
    }
    .all-orders .buts {
        height: 0.79rem;
        font-size: 0.3rem;
        text-align: right;
    }
    .buts span{
        width:2.25rem;
        display:inline-block;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        font-size: 0.26rem;
        float: right;
    }
    .buts span.cancel{
        border-radius: 0.04rem;
        border: solid 0.02rem #c6c6c6;
        background: #fff;
        color: #777;
    }
    .buts span.at-once{
        margin-left: 0.05rem;
        border-radius: 0.04rem;
        border: solid 0.02rem #ff7376;
        background: #ff7376;
        color: #fff;
    }
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
