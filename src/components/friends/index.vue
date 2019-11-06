<template>
    <!-- 邀请好礼 -->
    <div class="friends">
      <img src="/static/images/code-1.png" alt="" class="img">
      <p>长按保存二维码可分享</p>
      <p>我的邀请码  {{code}}</p>
      <p>复制邀请码</p>
      <p>邀请我的好友</p>
      <p @click="friendsList">点击查看邀请记录>></p>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                code:'',
            }
        },
        created(){
            var code = window.localStorage.getItem(this.GLOBAL.CODE)
            this.code = code;
        },

       methods:{
         friendsList(){
           this.$router.push({
               path:'/friends/friendsList',
               name:'friendsList',
               query:{
                   userId:this.code   // 用户 id
               }
           })
         }
       }
    }
</script>

<style scoped>
  .friends {
      /*padding-top: 60px;*/
  }

  .friends .img {
    margin:0 1.95rem;
    width: 3.6rem;
    height: 3.6rem;
    padding-top: 1.3rem;
  }
  .friends .img img {

      width: 3.6rem;
      height: 3.6rem;
  }
  .friends p {
    text-align: center;
    font-weight: normal;
    font-stretch: normal;
  }
  .friends p:nth-child(2) {
      height: 1.25rem;
      line-height: 1.25rem;
      font-size: 0.32rem;
      color: #666666;
     margin-bottom: 0.85rem;

  }
  .friends p:nth-child(3) {
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.42rem;
    color: #0290fe;

  }
  .friends p:nth-child(4) {
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.32rem;
    color: #666666;
    margin-bottom: 0.85rem;
  }
  .friends p:nth-child(5) {
    width: 5.8rem;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.3rem;
    color: #fff;
    box-shadow: 0px 6px 10px 0px
    rgba(2, 144, 254, 0.3);
    border-radius: 0.4rem;
    background-color: #0290fe;
    margin: 0 0.88rem;
  }
  .friends p:nth-child(6) {
    height: 1.3rem;
    line-height: 1.3rem;
    font-size: 0.32rem;
    color: #666666;
    font-size: 0.24rem;
  }


</style>
