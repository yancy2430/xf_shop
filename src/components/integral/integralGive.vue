<template>
    <!-- 积分提现 换算页面 -->
    <div class="give">
        <div class="top">
            <p>可用积分 <span>{{grade}}分</span></p>
            <p>每10000积分可提现100元</p>
        </div>
        <div class="giveHs">
            <p>提现积分</p>
           <div class="matrixing">
               <input type="text" v-model="results" placeholder="请输入要提现的积分"><span>=</span><span>{{num}}</span>
           </div>
        </div>

        <p class="details" @click="detailsIn">查看详情>></p>
    </div>
</template>

<script>
    export default {
        name: "integralGive",
        data(){
            return{
                grade:'0',
                results:'',
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
                    userId:this.userId,
                    grade:this.results
                }), config)
            .then((res) => {
                console.log(res)


            })
            .catch((error) => {
                console.log(error)
            });
        },
        computed: {
            num(){
                return this.results / 100;
            }
        },

        methods:{
            // 点击跳转到提现列表页  提现申请
            detailsIn(){
                //  获取积分
                var url = "wx/center/updateBygrade";
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




                this.$router.push({
                    path:'/integral/integralGiveList',
                    name:'integralGiveList',
                })
            }
        },

    }
</script>

<style scoped>
    .give {
        /*padding-top: 60px;*/
        margin: 0.24rem;

    }
    .top {
        height: 1.25rem;
        padding:0.5rem 0;
    }
    .top p:nth-child(1){
       height: 0.63rem;
        font-size: 0.3rem;
    }
    .top p:nth-child(2){
        height: 0.62rem;
        font-size: 0.2rem;
    }
    .giveHs {
        height: 2.04rem;
    }
    .giveHs p{
        height: 0.84rem;
        line-height: 0.8rem;
    }
    .giveHs .matrixing{
        height: 1.2rem;
        line-height: 1.2rem;
    }
    .giveHs .matrixing input{
        width: 3.35rem;
        border: none;
    }
    .giveHs .matrixing span{
         display: inline-block;
    }
    .giveHs .matrixing span:nth-child(2){
          width: 0.32rem;
    }
    .giveHs .matrixing span:nth-child(3){
        width: 3.3rem;
        text-align: right;
    }

</style>