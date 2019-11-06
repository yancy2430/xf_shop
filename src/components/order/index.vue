<template>
    <!--  我的订单   -->
    <div class="order">
        <div class="top">
            <ul>
                <li @click="toggle($index,tab.view)"  v-for="(tab,$index) in tabs" :class="{active: active == $index}">
                    {{tab.type}}
                </li>
            </ul>
        </div>
        <!--  分割线 -->
        <div>
            <div class="list">
                <component :is="currentView"></component>
                <!--<login></login>-->
            </div>

        </div>

    </div>
</template>


<script>
    import AllOrder from '@/components/order/allOrders'
    import ObligationOrder from '@/components/order/obligationOrder'
    import OverhangOrder from '@/components/order/overhangOrder'
    import ReceivingOrder from '@/components/order/receivingOrder'
    import EvaluateOrder from '@/components/order/evaluateOrder'
    import SalesOrder from '@/components/order/salesOrder'

    var activeIndex = 0
    export default {
        name: "index",
        data(){
            return {
                currentView:'AllOrder',
                currentTitle:'全部',
                active:this.activeIndex,
                tabs:[
                    {
                        type: '全部',
                        view: 'AllOrder',

                    },
                    {
                        type: '待付款',
                        view: 'ObligationOrder',

                    },
                    {
                        type: '待发货',
                        view: 'OverhangOrder',

                    },
                    {
                        type: '待收货',
                        view: 'ReceivingOrder',


                    },
                    {
                        type: '待评价',
                        view: 'EvaluateOrder',

                    },
                    {
                        type: '售后',
                        view: 'SalesOrder',

                    },
                ]
            }
        },
        created(){
            this.active = this.$route.params.act
            // console.log(this.active)
            if(this.active==0){
                this.currentTitle = "全部"
                this.currentView = "AllOrder"
            }else if(this.active==1){
                this.currentTitle = "待付款"
                this.currentView = "ObligationOrder"
            }else if(this.active==2){
                this.currentTitle = "待发货"
                this.currentView = "OverhangOrder"
            }else if(this.active==3){
                this.currentTitle = "待收货"
                this.currentView = "ReceivingOrder"
            }else if(this.active==4){
                this.currentTitle = "待评价"
                this.currentView = "EvaluateOrder"
            } if(this.active==5){
                this.currentTitle = "售后"
                this.currentView = "SalesOrder"

            }
            // console.log(this.currentTitle,this.currentView)
        },
        methods: {
            toggle(i,v,s) {
                // alert(222)
                this.active = i
                this.currentView = v

                if(i==0){
                    this.currentTitle = "全部"
                }else if(i==1){
                    this.currentTitle = "待付款"
                }else if(i==2){
                    this.currentTitle = "待发货"
                }else if(i==3){
                    this.currentTitle = "待收货"
                }else if(i==4){
                    this.currentTitle = "待评价"
                } if(i==5){
                    this.currentTitle = "售后"

                }
            },
        },
        components:{
            AllOrder,   // 全部订单
            ObligationOrder,  // 待付款订单
            OverhangOrder,   // 全部订单
            ReceivingOrder,  // 全部订单
            EvaluateOrder,   // 全部订单
            SalesOrder      // 全部订单
        },
    }
</script>

<style scoped>
    .top {
        height: 0.9rem;
        line-height: 0.9rem;
        border-bottom: 0.01rem solid #e1e1e1;
        background: #fff;
    }

    .active {

        font-weight: bold;
        color: #333;
        border-bottom: 0.02rem solid #0290fe;
    }
    .top ul {
        padding: 0 0.2rem;
    }
    .top ul li {

        line-height:0.9rem;
        width: 16.6666%;
        text-align: center;

        float:left;
        list-style: none;
        font-size: 0.28rem;
        color: #666;
        position: relative;
    }


</style>
