<template>
    <!--  问题中心 -->
    <div class="question">
        <div class="show">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-collapse">
                    <a class="mui-navigate-right" href="#">常见问题</a>
                    <div class="mui-collapse-content">
                        <router-link :to="{name:'questionDetails'}">
                           <p><span class="fl">购物流程</span><img src="/static/images/next.png" alt="" class="fr"></p>
                        </router-link>
                        <p><span class="fl">积分问题</span><img src="/static/images/next.png" alt="" class="fr"></p>
                        <p><span class="fl">购买商品已发货我还能修改地址吗？</span><img src="/static/images/next.png" alt="" class="fr"></p>
                    </div>
                </li>
                <li class="mui-table-view-cell mui-collapse">
                    <a class="mui-navigate-right" href="#">商品问题</a>
                    <div class="mui-collapse-content">
                        <p>暂无数据</p>
                    </div>
                </li>
                <li class="mui-table-view-cell mui-collapse">
                    <a class="mui-navigate-right" href="#">订单问题</a>
                    <div class="mui-collapse-content">
                        <p>暂无数据</p>
                    </div>
                </li>
            </ul>
        </div>
        <!--  联系客服  -->
        <div class="address">
            <button class="buy" @click="locationIn">联系客服</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{

            }
        },
        methods:{
            locationIn(){
                
            }
        }


    }
</script>

<style scoped>
    /*  引用mui 框架  */
    /*@import "../../assets/mui/css/mui.css";*/
    a {
        background: #fff;
    }
    .show {
        /*padding-top: 60px;*/
        margin:0.24rem;
    }
    .mui-table-view-cell {

        padding: 16px 15px;

    }
    .mui-table-view-cell:after {
        left: 0;
    }
    .mui-table-view-cell.mui-collapse .mui-collapse-content {

        border-top: 1px solid #eee;
    }
    .mui-table-view-cell p{
        height: 1rem;
        line-height: 1rem;
        border-bottom:#eee 1px solid;
        font-size: 0.22rem;
    }
    .mui-table-view-cell p .fl{
       padding-left: 0.1rem;
    }
    .mui-table-view-cell p .fr{
      margin-top: 0.4rem;

    }
    .mui-table-view-cell p img{
        width:0.2rem ;
        height: 0.2rem;
    }
    .mui-table-view-cell > a[data-v-21411af9]:not(.mui-btn) {
        margin: -15px -15px;
        font-size: 0.26rem;
    }
    .mui-table-view-cell.mui-collapse .mui-collapse-content[data-v-21411af9] {
        margin: 15px -15px -11px;
        padding: 0 15px 0 15px;
    }
    .mui-table-view-cell.mui-collapse.mui-active[data-v-21411af9] {
        margin-top: -1px;
        color: #0290fe;
    }



    
    .buy {
        position: fixed;
        bottom: 0;
        width: 7.5rem;
        height:1rem;
        line-height: 1rem;
        text-align: center;
        color: #333;
        font-size: 0.28rem;
        background-color: #fff;
        border: none;

    }
</style>
