<template>
    <!--   商品评价   -->
        <div class="evaluation">

            <!--  模块  -->
            <div class="evaluateName" v-for="(item,index) in discuss" :key="index">
                <div class="img-title">
                    <img :src="item.headimg" alt="" class="img">
                    <span>{{item.username}}</span>
                    <span class="time">{{item.username}}</span>
                </div>
                <!-- 分割线  -->
                <div class="text">
                    <p>{{item.content}}</p>
                </div>
                <div class="imgShow">
                    <ul>
                        <li><img src="/static/images/bou-1.png" alt=""></li>
                        <li><img src="/static/images/bou-1.png" alt=""></li>
                        <li><img src="/static/images/bou-1.png" alt=""></li>
                        <li><img src="/static/images/bou-1.png" alt=""></li>
                    </ul>
                </div>

            </div>
            <!--  模块  -->

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
        </div>
</template>

<script>
    export default {
        name: "producteValuation",
        data(){
            return {
                isShow :true,
                goodsid:this.$route.query.goodsid,
                offset:1,
                limit:2,
                discuss:[]
            }
        },
        created() {
            // 获取评论列表
            var self = this;
            var url = "wx/default/comment";
            var config = {headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
            //  数据交互
            self.$Ajax.post(url,
                self.$qs.stringify({
                    goodsid:self.goodsid,
                    offset: self.offset,
                    limit: self.limit,
                }),config)
            .then((res) => {
                console.info(res.data.data.rows);
                var discuss = res.data.data.rows;
                // 整理数据
                for(var i=0; i<discuss.length; i++ ){
                    let dis = discuss[i];
                    let img = dis.imgmore;
                    let name =dis.username;
                    let username = name.replace(name.substr(2),"***");
                    dis.username = username
                    console.log(name);
                    console.log(username);


                }
                this.discuss = discuss

            })
            .catch((error) => {
                console.log(error)
            });
        },


        methods:{
            // 弹层 商品价格
            buyIn(){

            }
        }

    }
</script>

<style scoped>
    .evaluation{
        /*padding-top: 60px;*/
        color: #0290fe;
        font-size: 0.24rem;

    }
    .evaluateName {
        background: #fff;
        padding: 0 0.24rem;
        margin-bottom: 0.2rem;
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
        font-size: 0.24rem;
        color: #333;
    }
    .img-title span.time {
        float: right;
        font-size: 0.2rem;
        color: #666666;
    }
    .text {
        padding: 0.1rem 0;
        height: auto;
    }
    .text p {
        line-height: 0.35rem;
        font-size: 0.24rem;
        color: #333;
        font-family: PingFang-SC-Regular;
    }
    .imgShow {
        margin-right: -0.21rem;
        overflow: hidden;
    }
    .imgShow ul li{
        float: left;
        width: 33.33%;
        padding-right: 0.21rem;
        box-sizing: border-box;
        background-clip: content-box;
        padding-bottom: 0.1rem;
    }
    .imgShow ul li img{
        width: 2.2rem;
        height: 2.2rem;
    }
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


    /* 弹框  */
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
        width: 7.02rem;
        position: absolute;
        bottom: 0;
        height: 6.6rem;
        background: #fff;
        padding: 0 0.24rem;
        border-radius:0.1rem 0.1rem 0 0 ;
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

</style>