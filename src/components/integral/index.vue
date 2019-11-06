<template>
     <!--   我的 积分  -->
  <div class="integral">
        <div class="integral-top">
            <div class="digit" @click="digitIn">
                <img src="/static/images/digit.png" alt="">
                <p>{{grade}}</p>
                <p>当前积分</p>
            </div>
            <div class="friend" @click="friendIn">
                <img src="/static/images/friend_code.png" alt="">
                <p>我的邀请</p>
            </div>

        </div>
        <ul class="list">
            <li @click="shareIn">
                <span>分享邀请码或二维码</span>
                <img src="/static/images/next1.png" alt="" class="img">
            </li>
            <li @click="pointsIn">
                <span>积分规则</span>
                <img src="/static/images/next1.png" alt="" class="img">
            </li>
            <li @click="detailsIn">
                <span>积分提现详情</span>
                <img src="/static/images/next1.png" alt="" class="img">
            </li>
        </ul>
  </div>
</template>

<script>
    export default {
      name: "index",
        data(){
          return {
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
            // 积分列表页面
            digitIn(){
                this.$router.push({
                    path:'/integral/integralList',
                    name:'integralList',
                })
            },
            // 我的邀请
            friendIn(){
                this.$router.push({
                    path:'/friends/friendsList',
                    name:'friendsList',
                })

            },
            // 分享邀请码或二维码
            shareIn(){
                this.$router.push({
                    path:'/friends/index',
                    name:'friends',
                })

            },
            // 积分规则
            pointsIn(){
                this.$router.push({
                    path:'/integral/integralRule',
                    name:'integralRule',
                })

            },
            // 提现列表
            detailsIn(){
                this.$router.push({
                    path:'/integral/integralGiveList',
                    name:'integralGiveList',
                })
            }
        }
    }
</script>

<style scoped>
    .integral {
        /*padding-top: 60px;*/
        width: 7.5rem;
        height: auto;

    }
    .integral-top {
        height: 2.3rem;
        padding: 0 1rem;
        text-align: center;
        background: #fff;
    }
    .integral-top img{
        width: 0.94rem;
        height: 0.94rem;
        /*border-radius: 50%;*/
        /*box-shadow: 0px 3px 3px 0px*/
        /*rgba(255, 207, 87, 0.43);*/
    }
    .digit {
        width: 2.75rem;
        float: left;
        padding-top: 0.38rem;
    }
    .digit p{
        font-family: PingFangSC-Regular;
        color: #333333;
    }
    .digit p:nth-child(2){
        font-size: 0.30rem;
        height: 0.36rem;
        line-height: 0.36rem;
        font-weight: bold;
    }
    .digit p:nth-child(3){
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.16rem;
    }
    .friend {
        width: 2.75rem;
        padding-top: 0.45rem;
        float: left;
    }
    .integral ul.list{
        margin-top: 0.2rem;
        padding: 0 0.3rem;
        background: #fff;

    }
    .integral ul.list li{
        height: 1rem;
        line-height: 1rem;
        padding: 0 0.13rem;
    }
    .integral ul.list li:nth-child(1){
        border-bottom: 0.01rem solid #eeeeee;
    }
    .integral ul.list li span{
        display: inline-block;
        font-weight: bold;
        font-size: 0.26rem;
    }

    .integral ul.list li .img{
        width: 0.12rem;
        height: 0.22rem;
        float: right;
        margin-top: 0.39rem;
    }
    .integral ul.list li img{

        width: 0.2rem;
        height: 0.3rem;
    }

</style>
