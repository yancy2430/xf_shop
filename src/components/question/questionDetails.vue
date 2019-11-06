<template>
    <!--  问题 页面详情 -->
    <div class="question">

        <div class="quiz">
            <h2>购买商品已发货还能修改地址吗？ </h2>
            <div class="answer">
                <p>"包裹签收前，您可以在订单详情页的地址栏，点击"修改地址/电话"，在地址列表内添加新地址，或者勾选其他地址。</p>
                <p>
                    修改结果会在48小时内通过短信通知您，请留意查看，您也可以在订单详情页查看"修改状态"，了解修改进度。</p>
                <p>
                    备注：修改地址不保证100%修改成功，如修改失败/待定，原地址无法签收，建议您拒收处理；或原地址签收后安排转寄，寄出后请您联系薯客服提供运单号与运费金额。"
                </p>
            </div>

        </div>

        <!--  联系客服  -->
        <div class="address">
            <button class="buy" @click="locationIn">联系客服</button>
        </div>

    </div>


</template>

<script>
    export default {
        name: "questionDetails"
    }
</script>

<style scoped>
    .quiz {
        /*padding-top: 60px;*/
        margin: 0.2rem 0.24rem;
        background: #fff;
        padding-bottom: 0.3rem;
        font-family: PingFangSC-Regular;
    }
    .quiz h2{
        height: 0.95rem;
        line-height: 0.95rem;
        font-size: 0.26rem;
        color: #333333;
        padding-left: 0.47rem;
        letter-spacing: 0.02rem;
    }
    .answer {
        border-top:0.02rem solid #eeeeee;
        padding:0 0.47rem;
    }
    .answer p {
        padding: 0.2rem 0;
        line-height: 0.33rem;
        font-size: 0.22rem;
        color: #aaa;
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