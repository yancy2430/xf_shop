<template>
    <!--  积分提现列表  -->
    <div class="giveList">
        <div class="list-name">
            <ul>
                <li v-for="(i,index) in integralGiveList" v-bind:key="index">
                    <div class="timeName">
                        <p>{{i.content}}</p>
                        <p>{{i.createTime}}</p>
                    </div>
                    <div class="total">{{i.grade}}</div>
                </li>
                <!-- 分割线-->
                <!-- <li>
                    <div class="timeName">
                        <p>提现至微信钱包</p>
                        <p>今天<span>10:00</span></p>
                    </div>
                    <div class="total">100元</div>
                </li> -->
                <!-- 分割线-->
                <!-- <li>
                    <div class="timeName">
                        <p>提现至微信钱包</p>
                        <p>今天<span>10:00</span></p>
                    </div>
                    <div class="total">100元</div>
                </li> -->
                <!-- 分割线-->
                <!-- <li>
                <div class="timeName">
                    <p>提现至微信钱包</p>
                    <p>今天<span>10:00</span></p>
                </div>
                <div class="total">100元</div>
            </li> -->
                <!-- 分割线-->



            </ul>
        </div>

    </div>
</template>

<script>
    export default {
        name: "integralGiveList",
        data(){
            return{
                offset:1,
                limit:100,

                integralGiveList:[]
            }
        },
        created(){
            // 从全局获取用户id
            var userId = window.localStorage.getItem(this.GLOBAL.CODE);
            this.userId = userId


            //  获取积分
            var url = "wx/getGradeLog";
            var config = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
            //  数据交互
            this.$Ajax.post(url,
                this.$qs.stringify({
                    userId:this.userId,
                    offset:this.offset,
                    limit:this.limit

                }), config)
            .then((res) => {
                console.log(res)
                if(res.data.code==200){
                    this.integralGiveList=res.data.data.rows
                }

            })
            .catch((error) => {
                console.log(error)
            });

        }
    }
</script>

<style scoped>
    .giveList {
        /*padding-top: 60px;*/
        margin: 0.24rem;
    }
    .list-name {
        height: auto;
    }
    .list-name ul{

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