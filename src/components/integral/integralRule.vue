<template>
    <!-- 积分规则  -->
    <div class="rule">
        <div class="ruleIn">
            <div class="ruleIn-title">
                <img src="/static/images/order-1.png" alt="" class="img">
                <span>获取积分</span>
            </div>
            <div class="ruleIn-text">
                 <p>1. 邀请有奖</p>
                 <p>用户邀请新用户注册，每注册成功1人邀请人获得100 积分；</p>
                 <p>2. 购买有奖</p>
                 <p>邀请用户购买平台商品，确认收货后邀请人即可获得对应金额的积分，每1元可获得1积分；</p>
                 <p>3. 转发有奖</p>
                 <p>用户转发邀请每次可获得2积分，每日通过分享可获得 最高10积分；</p>
                 <p>4. 绑定邮箱有奖</p>
                 <p>邀请用户绑定邮箱成功后，邀请人可获得5积分，不设s上限。</p>

            </div>
        </div>
        <!-- 分割线 -->
        <div class="ruleIn">
            <div class="ruleIn-title">
                <img src="/static/images/order-1.png" alt="" class="img">
                <span>使用积分</span>
            </div>
            <div class="ruleIn-text">
                <p>1. 购买抵现</p>
                <p>购买平台商品可用积分抵现金，100积分可抵1元，但 不可全部使用积分购买，使用积分购买的商品退货后， 购买支出的积分不予退回；</p>
                <p>2. 积分提现</p>
                <p>积分可转为现金，每10000积分即可提现100元至微信 账户；</p>
                <p>3. 积分期限</p>
                <p>用户在平台获取的积分使用有效期为1年，逾期不使用 或提现则作废。</p>


            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "integralRule"
    }
</script>

<style scoped>
    .rule {
        /*padding-top: 60px;*/
        margin: 0.2rem 0.24rem;

    }
    .ruleIn-title {
        height: 0.8rem;
        line-height: 0.8rem;
    }
    .ruleIn-title .img{
        float: left;
        width: 0.34rem;
        height: 0.34rem;
        padding-top: 0.23rem;
        padding-right: 0.2rem;
    }
    .ruleIn-title img{
        width: 0.34rem;
        height: 0.34rem;
    }
    .ruleIn-title span{
        width: 4rem;
        float: left;
        height: 0.8rem;
        font-size: 0.28rem;
        font-weight: bold;
        line-height: 0.8rem;
        display: inline-block;
        font-family: PingFangSC-Semibold;
        letter-spacing: 0.02rem;
    }
    .ruleIn-text {
        margin:0 0.27rem;
        margin-bottom: 0.2rem;
        border:0.01rem dashed #000;
        padding: 0.18rem 0.31rem;
    }
    .ruleIn-text p{
        font-size: 0.24rem;
        color: #777;
        padding: 0.05rem 0;
    }
    .ruleIn-text p:nth-child(2n){
       margin-bottom: 0.15rem;
    }
</style>