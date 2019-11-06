<template>
    <!-- 邀请好友列表  -->
     <div class="list">
          <div class="list-top">
              <div class="fl">
                  <p><span>{{population}}</span>人</p>
                  <p>已邀请好友</p>
              </div>
              <div class="fr" @click="">
                  <p><span>{{grade}}</span>分</p>
                  <p>已获得积分</p>
              </div>
          </div>
          <p class="title"><span class="fl"></span>已邀请的好友<span class="fr"></span></p>
          <div class="list-name">
            <ul>
              <li v-for="(item, index) in product" :key="index">
                <img src="/static/images/portrait.png" alt="" class="img">
                <span>{{item.mobile}}</span>
                <span>{{item.gmtCreate}}</span>
              </li>
              <!-- 分割线-->
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
                offset:1,
                limit:20,
                product:[],
                grade:"",     // 积分值
                population:'',

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


            // 查看邀请的人
            var url = "wx/center/inviteAll";
            var config = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
            //  数据交互
            this.$Ajax.post(url,
                this.$qs.stringify({
                    offset: this.offset,
                    limit: this.limit,
                    userId:this.userId
                }), config)
            .then((res) => {
                // 获取人数
                let population = res.data.data.total;
                // console.log(population)
                this.population = population

                // console.log(res.data.data.rows);
                let product = res.data.data.rows;
                for(var i=0; i<product.length; i++){
                    let pro = product[i];
                    let mob = pro.mobile;
                    let mobile = mob.replace(mob.substr(3,4),"****");
                    pro.mobile = mobile

                    // console.log(mobile)
                }

                this.product =product;

            })
            .catch((error) => {
                console.log(error)
            });
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
           margin-top: 0.3rem;
           box-shadow: 0 0.06rem 0.1rem 0
           rgba(2, 144, 254, 0.3);
           border-radius: 12px;
           text-align:center;
           font-family: PingFang-SC-Regular;
           color: #fff;
     }
     .list-top .fl {
           width: 3rem;
           font-size: 0.3rem;
           padding-top: 0.95rem;
     }
     .list-top .fl p:nth-child(1){
       font-size: 0.36rem;
     }
     .list-top .fl p:nth-child(2){
         font-size: 0.26rem;
         font-weight: normal;
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
       font-size: 0.36rem;
         font-weight: bold;

     }
     .list-top .fr p:nth-child(2){
         font-size: 0.26rem;
         font-weight: normal;
     }
     .list-top .fr span{
       font-size: 0.48rem;
     }
     .list p.title {
        height: 1.25rem;
        line-height: 1.25rem;
        border-bottom: 1px solid #cfd8e1;
        font-size: 0.34rem;
        text-align: center;
       padding-top: 0.1rem;
     }
     .list p.title span{
         display: block;
         width: 1.8rem;
         height: 0.02rem;
         margin-top: 0.61rem;
     }
     .list p.title span.fl{

         background: linear-gradient(90deg,#fff, #b9c5d5 );
     }
     .list p.title span.fr{

         background-image: linear-gradient(90deg, #b9c5d5, #fff)
     }


    .list-name {
       height: auto;
    }
     .list-name ul li {
        height: 0.98rem;
        line-height: 0.98rem;
        border-bottom: 1px solid #cfd8e1;
         overflow: hidden;
     }
     .list-name ul li .img {
         width: 0.46rem;
         height: 0.46rem;
         float: left;
         padding-right: 0.17rem;
         padding-top: 0.26rem;
     }
     .list-name ul li img {
         width: 0.46rem;
         height: 0.46rem;

     }
     .list-name ul li span {
       display:block;
       float: left;
     }
     .list-name ul li span:nth-child(2){
       width: 3.8rem;
      font-size: 0.3rem;
       color: #333;
     }
     .list-name ul li span:nth-child(3){
         width: 2.15rem;
         font-size: 0.26rem;
         text-align: right;
         color: #999;
         overflow: hidden;
     }
</style>
