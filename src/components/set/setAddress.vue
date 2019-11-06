<template>
    <!--  新增地址列表  -->
    <div class="address">
        <div class="site"  v-for="(item,index) in addresslist" :key="index">
            <div class="siteName">
                <p>{{item.name}}</p>
                <p v-if="item.isDef">默认11</p>
            </div>
            <!---->
            <div class="siteText">
                <div class="siteText_top">
                    <span>{{item.mobile}}</span>
                    <div class="amend" @click="addressXgIn(item)">
                        <img src="/static/images/amend.png" alt="" class="img">
                        <span>修改</span>
                    </div>
                </div>
                <p>{{item.detail}}</p>
                <!--{{item.isdefault}}-->
            </div>
        </div>
        <!-- 分割线 -->

        <button class="buy" @click="locationIn">新增地址</button>
    </div>

</template>

<script>
    export default {
        name: "setAddress",
        data(){
            return{
                addresslist:[],
                act:'',
                Show :'',
                // isdefault:this.$route.params.isdefault
            }
        },
        created(){
            var name = window.localStorage.getItem(this.GLOBAL.CODE);
            this.userId = name
            // console.log(isdefault)
            // var aa = this.item.name
            // console.log(aa)

            //  获取数据
            var url = "wx/find/adressAll";
            var config = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
            //  数据交互
            this.$Ajax.post(url,
                this.$qs.stringify({
                    userId: this.userId,

                }), config)
            .then((res) => {
                // console.log(res.data.data);
                var addresslist = res.data.data
                // console.log(res.data.data);
                // 收货地址长度
                window.localStorage.setItem(this.GLOBAL.SITE, addresslist.length)
                // console.log(addresslist.length);
                for(var i=0 ;i<addresslist.length; i++){
                    var add = addresslist[i];
                    var isdefault = add.isdefault
                    if(add.isdefault == 0 ){
                        add.isDef = false;
                    }else {
                        add.isDef = true;
                    }

                    // console.log(isdefault)
                    // 是否为默认收货
                    window.localStorage.setItem(this.GLOBAL.ISDEFAULT, add.isdefault)
                }

                // 是否为默认收货
                // window.localStorage.setItem(this.GLOBAL.SITE, addresslist.)

                // var shopLists = res;
                // this.shopList = shopLists
              this.addresslist = addresslist
            })
            .catch((error) => {
                console.log(error)
            });



            // window.localStorage.setItem(this.GLOBAL.ISDEFAULT, isdefault)
            var names = window.localStorage.getItem(this.GLOBAL.ISDEFAULT);

            this.isdefault= names
            // console.log(names)
        },
        methods:{
            // 新增地址
            locationIn (){
                this.$router.push({
                    path:'/set/setLocation',
                    name:'setLocation',
                    params:{
                        act:0,
                    }

                })
            },
            //  修改地址
            addressXgIn (item){
                this.$router.push({
                    path:'/set/setLocation',
                    name:'setLocation',
                    params:{
                        id:item.id,
                        act:1,
                        name :item.name,
                        mobile:item.mobile,
                        detail:item.detail

                    }
                })

            }
        }
    }
</script>

<style scoped>
    .site{
        /*width: 7.02rem;*/
        width: 6.42rem;
        height: 1.8rem;
        background: #fff;
        margin:0.2rem 0.24rem 0 0.24rem;
        padding: 0 0.3rem;
    }
    .siteName {
        /*width: 1.9rem;*/
        width: 1.41rem;
        float: left;
    }
    .siteName p:nth-child(1){
        padding-top: 0.4rem;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.28rem;
    }
    .siteName p:nth-child(2) {
        font-family: PingFang-SC-Regular;
        width: 0.64rem;
        height: 0.34rem;
        line-height:0.34rem;
        font-size: 0.2rem;
        text-align: center;
        background-color: #fff;
        border: solid 2px #0290fe;
        color: #0290fe;
    }
    .siteText {
        width:5.01rem;
        height: auto;
        float: left;
    }
    .siteText_top {
        padding-top: 0.4rem;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.28rem;
    }
    .siteText_top span {
        float:left;
    }
    .amend {
        float: right;
    }
    .amend .img{
        float: left;
        padding-top:0.13rem;
        padding-right: 0.05rem;
    }
    .amend img{
        width: 0.24rem;
        height: 0.23rem;
    }
    .amend span{
        font-family: PingFang-SC-Regular;
        font-size: 0.24rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #868686;
        float:left;
    }
    .siteText p{
        font-family: PingFang-SC-Regular;
        font-size: 0.24rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0;
        color: #868686;
    }
   .buy {
       position: fixed;
       bottom: 0;
       width: 7.5rem;
       height:1rem;
       line-height: 1rem;
       text-align: center;
       color: #fff;
       font-size: 0.28rem;
       background-color: #0290fe;
       box-shadow: 0 0.02rem 0.09rem 0
       rgba(0, 34, 61, 0.06);

   }
</style>