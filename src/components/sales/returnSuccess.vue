<template>
    <!-- 退款 申请成功  -->
    <div class="success">
        <div class="img">
            <img src="/static/images/return.png" alt="">
        </div>
        <p>申请成功</p>
        <p>商家会在48小时内与您取得联系！</p>
        <button class="buy"  @click="shopIn">继续购物</button>
    </div>
</template>

<script>
    export default {
        name: "returnSuccess",
        methods:{
            shopIn(){
                this.$router.push({
                    path: '/',
                    name: 'index',
                })
            }
        }

    }
</script>

<style scoped>
    .success .img{
        width: 7.5rem;
        height: 5.55rem;
        background: #f8f8f8;

    }
    .success .img img{
        margin: 1.7rem 0 0 1rem;
        width: 5.49rem;
        height: 2.8rem;

    }
    .success p{
        text-align: center;
    }
    .success p:nth-child(2){
        height: 0.7rem;
        line-height: 0.7rem;
        font-family: AdobeHeitiStd-Regular;
        font-size: 0.38rem;

        color: #333333;
    }
    .success p:nth-child(3){
        height: 0.65rem;
        line-height: 0.65rem;
        font-family: AdobeHeitiStd-Regular;
        font-size: 0.28rem;

        color: #999999;
    }


    .buy {
        width: 5.80rem;
        height: 0.80rem;
        line-height: 0.8rem;
        background-color: #ff7376;
        box-shadow: 0 0.06rem 0.1rem 0
        rgba(255, 115, 118, 0.3);
        border-radius: 40px;
        text-align: center;
        color: #fff;
        margin: 0.7rem 0.85rem;
        font-size: 0.32rem;

    }

</style>