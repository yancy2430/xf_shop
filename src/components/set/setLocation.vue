<template>
    <!-- 新增收货地址内容 -->
    <div class="setLocation">
          <ul class="location">
                <li>
                   <label>收货人</label>
                  <input type="text"  v-model="username" placeholder="" class="uesr">
                </li>
                <li>
                  <label>手机号</label>
                  <input type="text"  v-model="phone" placeholder="" class="iphone">
                  <span>+86</span>
                <li>
                  <label>所在地区</label>
                  <input type="text"  v-model="site" class="iphone">
                  <img src="/static/images/next.png" alt="">
                </li>
          </ul>
        <div class="street">
            <textarea   v-model="sites" placeholder="详细地址：如道路、门牌号、小区、楼洞号等">

            </textarea>
        </div>
        <div class="switch">
            <div class="fl">设为默认地址</div>
            <div class="fr">
                 <mt-switch v-model="quasi" @change="change"></mt-switch>
            </div>
        </div>
        <div class="switch" v-show="showIn" @click="deleteIn">
            <!--<p>删除收货地址</p>-->
        </div>


        <button class="buy" @click="addressIn">确认提交</button>

    </div>

</template>

<script>
    export default {
        name: "setLocation",
        data(){
          return {
              id:this.$route.params.id,
              username:this.$route.params.name,
              phone:this.$route.params.mobile,
              site:this.$route.params.city,
              sites:this.$route.params.street,
              quasi:true,
              isdefault:'1',  // 设置是否为默认 1  不默认 0
              showIn:false,
              act:this.$route.params.act,     // 新增为0  修改为1  从订单页过来的为3

          }
        },
        created(){
            var name = window.localStorage.getItem(this.GLOBAL.CODE);
            this.userId = name;
            console.log(this.userId)

            // 显示为 新增还是 修改
            if(this.act==0){
               this.showIn = false
            } else {
                this.showIn = true
            }
        },
        methods:{
            change(){
                if(this.quasi == true){
                    this.isdefault = 1
                    console.log( this.isdefault)
                } else {
                    this.isdefault = 0
                    console.log( this.isdefault)
                }
            },
            // 提交地址
            addressIn(){
                if(this.act==0){
                    // var detail = this.site + this.sites
                    var url = "wx/add/adress";
                    var config = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
                    //  数据交互
                    this.$Ajax.post(url,
                        this.$qs.stringify({
                            userId: this.userId,
                            detail: this.site +" "+ this.sites,
                            mobile: this.phone,
                            name: this.username,
                            isdefault: this.isdefault,

                        }), config)
                    .then((res) => {
                        console.log(res)
                        console.log("执行了")
                        // var shopLists = res;
                        // this.shopList = shopLists
                        // this.$router.pop()
                        /*
                        this.$router.push({
                            path:'/set/setAddress',
                            name:'setAddress',
                        })
                        */
                        this.$route.params.address = {"detail":"ceshjig","phone":"18916939933"}
                        console.log("555",this.$route.params.address)
                        this.$router.back(-1)
                    })
                    .catch((error) => {
                        console.log(error)
                    });

                } else if(this.act==1){
                    var url = "wx/update/adress";
                    var config = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
                    //  数据交互
                    this.$Ajax.post(url,
                        this.$qs.stringify({
                            id:this.id,
                            userId: this.userId,
                            detail: this.site +" "+ this.sites,
                            mobile: this.phone,
                            name: this.username,
                            isdefault: this.isdefault,

                        }), config)
                    .then((res) => {
                        console.log(res);
                        // var shopLists = res;
                        // this.shopList = shopLists
                        this.$router.push({
                            path:'/set/setAddress',
                            name:'setAddress',
                            params:{
                                isdefault:this.isdefault
                            }
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                    });
                } else if(this.act==3){
                    var url = "wx/update/adress";
                    var config = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
                    //  数据交互
                    this.$Ajax.post(url,
                        this.$qs.stringify({
                            id:this.id,
                            userId: this.userId,
                            detail: this.site +" "+ this.sites,
                            mobile: this.phone,
                            name: this.username,
                            isdefault: this.isdefault,

                        }), config)
                    .then((res) => {
                        console.log(res);
                        // var shopLists = res;
                        // this.shopList = shopLists
                        this.$router.back(-1)
                    })
                    .catch((error) => {
                        console.log(error)
                    });
                }

            },
            // 删除地址
            deleteIn(){

            }
        }
    }
</script>

<style scoped>
  .setLocation {

    font-size: 0.3rem;
  }
  .setLocation ul.location {
      margin-top:0.24rem;
      background: #fff;
      padding:0 0.3rem ;
  }
  .setLocation ul.location li {
       height: 1rem;
       line-height: 1rem;
       padding: 0 0.2rem 0 0.39rem;
       border-bottom:2px solid #eee ;
  }
  .setLocation ul.location li:nth-child(3) {

      border-bottom:none ;
  }
  .setLocation ul.location li img {
     width: 0.22rem;
      height: 0.3rem;
  }
  .setLocation ul.location li label {
       width: 1.3rem;
  }
  .setLocation ul.location input {
       width: 4.73rem;
       height: 0.5rem;
       line-height: 0.5rem;
       border: none;
       font-size: 0.32rem;
       margin-top: 0.25rem;
  }
  .setLocation ul.location input.iphone {
       width: 4rem;
  }
  .street {
      padding: 0.2rem 0.4rem;
      height:1.43rem;
      border-top: 1px solid #eee;
      box-sizing:border-box;
      background:#fff;
  }
  .street textarea{
      padding: 0.05rem;
      width: 6.12rem;
      height: 0.94rem;
      line-height: 0.3rem;

      font-size: 0.24rem;
  }
  .switch {
      margin: 0.2rem 0;
      height: 1rem;
      line-height: 1rem;
      background: #fff;
  }
  .switch .fl{
      padding-left: 0.68rem;
  }
  .switch .fr{
       padding-top: 0.24rem;
      padding-right: 0.49rem;
  }
  switch p {}


    .buy {
        width: 7.02rem;
        height: 0.8rem;
        line-height: 0.8rem;
        background-color: #0290fe;
        box-shadow: 0 2rem 9rem 0
        rgba(0, 34, 61, 0.06);
        font-family: PingFangSC-Regular;
        font-size: 0.28rem;
        color: #ffffff;
        margin-top: 2.07rem;
    }

</style>
