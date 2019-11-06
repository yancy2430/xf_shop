<template>
    <header class="header">
        <a href="javascript:;" class="left" @click="$router.back(-1)"><img src="/static/images/next2.png" alt=""></a>
        <span>{{title}}</span>
    </header>
</template>

<script>
    export default {
        name: "header-nav",
        data(){
          return {
               title: "晓峰科技"
          }
        }

    }
</script>

<style scoped>
  .header {
    width: 90%;
    background: #f2f2f2;
    padding:0 5%;
      position: fixed;
      z-index: 9999999;
  }
  .header span {
      width: 60%;
      float: left;
      text-align: center;
      font-weight: bold;

  }
  .header a.left {
    width: 20%;
    float: left;
    text-align: left;

  }

  .header a.right {
      width: 20%;
      float: right;
      text-align: right;

  }



</style>
