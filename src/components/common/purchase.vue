<template>
    <!-- 立即购买   -->
    <div class="purchase" v-show="isShows">
           <div class="pur">
                <div class="top">
                    <div class="topL">
                        <img src="/static/images/bou-1.png" alt="" class="img">
                        <div class="jiage">
                            <p>￥<span>256</span></p>
                            <p>库存：<span>2257</span></p>
                        </div>
                        <div class="cancel" @click="cancelIn">x</div>
                    </div>
                </div>
                <div class="bottom">
                	      <div class="title">
                	      	<span>购买数量</span>
                	      </div>
                	      <div class="jiajian">
                	      	 <span @click="shopReduce">-</span>
                	      	 <input type="text" disabled v-model="num"/>
                	      	 <span @click="shopAdd">+</span>
                	      </div>
                </div>
               <button class="purchaseIn"  v-if="!isShow" @click="purchaseIn">确认</button>
           </div>

        <!-- 立即购买  -->
    </div>
</template>

<script>
    export default {
        name: "purchase",
        data(){
            return{
                isShows:true,
                num:1,
            }
        },
        methods:{
            // 取消 弹层
            cancelIn(){
                this.isShows = false;
            },
            shopReduce(){   //  商品数量减少
                //console.log('--')
                if( this.num <=1 ) return;
                this.num--;
                /*this.$store.commit('updateCartCount',-1)*/
            },
            shopAdd(){     //   商品数量增加
                //console.log('++')
                this.num++;
                /*this.$store.commit('updateCartCount',1)*/
            },
            purchaseIn(){
                this.isShows = false;
                this.$route.path({
                    path:'/product/productValuation',
                    name:'productValuation',
                })
            }
        }
    }
</script>

<style scoped>
    .purchase {
        width: 7.5rem;
        position: fixed;
        background-color:rgba(0,0,0,0.3);
        height: 100%;
        top:60px;
        left: 0;
        z-index: 99;
    }
    .pur {
        width: 7.02rem;
        position: absolute;
        bottom: 1rem;
        height: 6.6rem;
        background: #fff;
        padding: 0 0.24rem;
    }
    .pur .top{
        height: 1.7rem;
        padding-top: 0.4rem;
        padding-bottom:0.4rem;
        border-bottom: 0.01rem solid #cfd8e1;

    }
    .pur .top .topL{
        height: 1.7rem;
        position: relative;
    }
    .pur .top img{
        width: 1.7rem;
        height: 1.7rem;
        border-radius: 0.12rem;
        float: left;
    }
    .jiage {
        float: left;
        padding-left: 0.3rem;
    }
    .jiage p:nth-child(1){
        font-family: PingFang-SC-Bold;
        height: 0.7rem;
        line-height: 0.7rem;
        color: #ff7376;
        font-size: 0.34rem;
    }
    .jiage p:nth-child(2){
        font-family: PingFang-SC-Regular;
        height: 1rem;
        line-height:1rem;
        font-size: 0.26rem;
        color: #666666;
    }
    .cancel {
        width: 0.33rem;
        height: 0.33rem;
        background: #fff;
        text-align: center;
        line-height: 0.33rem;
        border: 0.01rem solid #999;
        border-radius: 0.33rem;
        color: #999;
        font-weight:normal;
        position: absolute;
        right: 0;
        top: 0;
    }
    .bottom {
        padding-top: 0.5rem;
        width: 7.02rem;
        height: 1.73rem;

    }
    .title{
         float: left;
    }
    .title sapn{
        font-family: PingFang-SC-Medium;
        color: #333;
        font-size: 0.28rem;
        font-weight: normal;
    }
    .jiajian {
          float: right;
    	  width: 1.46rem;
    	  height: 0.46rem;
    	  background-color: #fde7e8;
    	  border-radius: 0.23rem;
    }
    .jiajian input{
        float: left;
        width: 0.54rem;
        border: none;
        text-align: center;
        line-height: 0.46rem;
        color: #ff7376;
        font-size: 0.32rem;
    }
    .jiajian span{
        float: left;
        display: inline-block;
        width: 0.46rem;
        height: 0.46rem;
        background: #000000;
        border-radius: 0.23rem;
        text-align: center;
        line-height: 0.46rem;
        font-family: PingFang-SC-Medium;
	    font-size: 0.32rem;
        color: #fff;
    	   
    }
    .jiajian span:nth-child(1){
        background-color: #fdbebf;
    }
    .jiajian span:nth-child(3){
        background-color: #ff7376;
    }

    /*  确认小按钮  */
    .purchaseIn {
        position: absolute;
        bottom: 1rem;
        left: 0;
        width: 7.5rem;
        height:1rem;
        line-height: 1rem;
        text-align: center;
        background-color: #0290fe;
        font-size: 0.32rem;
        color: #fff;
        border: none;
        font-family: PingFang-SC-Bold;
        z-index: 99999;
    }
     
    /*!*  确认小按钮  *!*/
    /*.purchaseIn {*/
        /*position: absolute;*/
        /*bottom: 1rem;*/
        /*left: 0;*/
        /*width: 7.5rem;*/
        /*height:1rem;*/
        /*line-height: 1rem;*/
        /*text-align: center;*/
        /*background-color: #0290fe;*/
        /*font-size: 0.32rem;*/
        /*color: #fff;*/
        /*border: none;*/
        /*font-family: PingFang-SC-Bold;*/
        /*z-index: 99;*/
    /*}*/

</style>