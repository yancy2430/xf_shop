<template>
    <div class="footer">
      <!--footNav-->

        <router-link class="link" :to="{name:'index'}" >
          <div align="center"><img src="/static/images/home-1.png" alt=""></div>
          <p>首页</p>
        </router-link>

        <router-link class="link links" :to="{name:'mine'}">
          <div align="center"><img src="/static/images/my.png" alt=""></div>
          <p>我的</p>
        </router-link>

      <!--footNav-->
    </div>
</template>

<script>
    export default {
        name: "footer-nav",

    }
</script>

<style scoped>

    .footer {
      height: 1rem;

      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 9;
      background-color: #ffffff;
      box-shadow: 0 0 11rem 1rem
      rgba(0, 0, 0, 0.1);
    }
    .link {
        padding-top: 0.18rem;
        width: 50%;
        float: left
    }
    .link img {
         display: block;
         width: 0.36rem;
         height: 0.35rem;
    }
    .link p {
        display: block;
        text-align: center;
        font-size: 0.23rem;
        padding-top: 0.09rem;
    }
    .link p {
         color: #b7c3d2;
    }
    .links p{
         color: #0290fe;
    }

</style>
