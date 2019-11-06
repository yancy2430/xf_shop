<template>
    <!-- 邀请好友列表  -->
    <div class="list">
        <div class="list-top">
            <div class="fl" @click="giveIn">
                <p>{{grade}}</p>
                <p>立即提现</p>
            </div>
            <div class="fr" @click="shareIn()">
                <p>立即分享</p>
                <p>潜在用户</p>
            </div>
        </div>

        <div class="list-name">
            <ul>
                <li>
                    <div class="timeName">
                       <p>158****5225</p>
                       <p>今天<span>10:00</span></p>
                    </div>
                    <div class="total">+320分</div>
                </li>
                <!-- 分割线-->


            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "friendsList",
        data(){
            return{
                grade:'',
            }
        },
        created(){
            // 从全局获取用户id
            var userId = window.localStorage.getItem(this.GLOBAL.CODE);
            this.userId = userId


            //  获取积分
            var url = "wx/selectBygrade";
            var config = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
            //  数据交互
            this.$Ajax.post(url,
                this.$qs.stringify({
                    userId:this.userId
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
        },
        methods:{
            //   积分 立即提现
            giveIn(){
                this.$router.push({
                    path:'integral/integralGive',
                    name:'integralGive',
                })


            },
            // 分享邀请码或二维码
            shareIn(){
                this.$router.push({
                    path:'/friends/index',
                    name:'friends',
                })

            },
        }
    }
</script>

<style scoped>
    .list {
        /*padding-top: 60px;*/
        margin: 0 0.45rem;
    }
    .list-top {
        width: 6.6rem;
        height: 2.72rem;
        background: url("/static/images/gral.png") center center no-repeat;
        background-size:100% 100%;
        margin: 0.3rem 0;
        box-shadow: 0 0.06rem 0.1rem 0
        rgba(2, 144, 254, 0.3);
        border-radius: 12px;
        text-align:center;
        color: #fff;
    }
    .list-top .fl {
        width: 3rem;
        font-size: 0.3rem;
        padding-top: 0.95rem;
    }
    .list-top .fl p:nth-child(1){
        font-size: 0.45rem;
    }
    .list-top .fl p:nth-child(2){
        font-size: 0.24rem;
    }
    .list-top .fl span{
        font-size: 0.48rem;
    }
    .list-top .fr{
        padding-top: 0.95rem;
        width: 3.6rem;
        font-size: 0.3rem;
    }
    .list-top .fr p:nth-child(1){
        font-size: 0.45rem;
    }
    .list-top .fr p:nth-child(2){
        font-size: 0.24rem;
    }
    .list-top .fr span{
        font-size: 0.48rem;
    }

    .list-name {
        height: auto;
    }
    .list-name ul{
         border-top:1px solid #cfd8e1;
    }
    .list-name ul li {
        height: 1rem;
        line-height: 1rem;
        border-bottom: 1px solid #cfd8e1;
        padding: 0 0.1rem;
    }
    .timeName {
        width: 3.72rem;
        float: left;
        padding-top: 0.15rem;
    }
    .timeName p{
        display: block;
        font-family: PingFangSC-Regular;
    }
    .timeName p:nth-child(1){
        line-height: 0.45rem;
        font-size: 0.32rem;
        color: #666666;

    }
    .timeName p:nth-child(2){
        line-height: 0.4rem;
        font-size: 0.18rem;
        color: #aaaaaa;
    }
    .timeName p span{
        padding-left: 0.2rem;
    }
    .total {
        width: 1.2rem;
        height: 1rem;
        line-height: 1rem;
        float: right;
        color: #ff7376;
        font-size: 0.26rem;
        text-align: right;
    }

</style>
