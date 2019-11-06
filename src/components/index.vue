<template>
    <div class="index">

        <mt-swipe :auto="4000" class="banner">
            <mt-swipe-item><img src="/static/images/banner1.png" alt="" width="100%"></mt-swipe-item>
            <mt-swipe-item><img src="/static/images/banner2.png" alt="" width="100%"></mt-swipe-item>


        </mt-swipe>
        <!--  banner 轮播图 结束-->
        <div class="content">
            <div class="classify">
                <div class="classify-in fl">
                    <div class="sifyL">
                        <h3>正品保障</h3>
                        <p>用心守候 专业守护</p>
                    </div>
                    <div class="sifyR">
                        <img src="/static/images/quality.png" alt="" class="img">
                    </div>
                </div>
                <!-- 分割线 -->
                <div class="classify-in fr" @click="inviteIn">
                    <div class="sifyL">
                        <h3>邀请好友</h3>
                        <p>邀请好友得奖励</p>
                    </div>
                    <div class="sifyR">
                        <img src="/static/images/friend.png" alt="" class="img">
                    </div>
                </div>
            </div>
        </div>
        <!--  精品  -->
        <div class="boutique">
            <div class="boutique-t">
                <img src="/static/images/boutique.png" alt="">
                <span>晓风精品</span>
            </div>
            <!-- 分割线   -->
            <div class="boutique-in" v-for="(item,index) in shopList" :key="index">
                <div class="div" @click="productIn(item)">
                    <div class="bou-in-img">
                        <img :src="item.img">
                    </div>
                    <div class="bou-in-text">
                        <h4>{{item.title}}</h4>
                        <ul>
                            <li>￥<span>{{item.prices}}</span></li>
                            <li>销量：<span>{{item.sales}}</span></li>
                            <li>积分抵：<span>{{item.integralResist}}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 分割线-->
            <!-- 分割线-->
        </div>

        <footer-nav></footer-nav>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                shopList: [],
                offset: 1,
                limit: 10,


            }
        },
        // 加载完成后 取页面初始化所需的数据
        created() {
            // 获取用户id
            var name = window.localStorage.getItem(this.GLOBAL.CODE);
            this.userId = name


            // 商品列表
            //跳转到商品界面
            //  先写一个作用域

            var url = "wx/goods/list";
            var config = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
            //  数据交互
            this.$Ajax.post(url,
                this.$qs.stringify({
                    offset: this.offset,
                    limit: this.limit,
                }), config)
                .then((res) => {
                    // console.log(res.data.data.rows);
                    var shopLists = res.data.data.rows;
                    // this.shopList = shopLists;
                    //方法1  直接整理
                    for (var i = 0; i < shopLists.length; i++) {
                        let dic = shopLists[i]
                        let dis = dic.integralResist * 100 + "%"
                        let src = dic.img.split(",")[0]
                        // console.log(dis)
                        dic.integralResist = dis
                        dic.img = src
                        // console.log(src)
                    }
                    // console.log(shopLists)
                    //整理完毕
                    this.shopList = shopLists
                })
                .catch((error) => {
                    console.log(error)
                })


            // let nowUrl = window.location.href
            // console.log(nowUrl)


            // let urlCode = this.GetQueryString('code')
            // console.log(urlCode)
            // if (!urlCode) {
            //     let resUrl = 'http://xiaofeng.ckugua.com/h5/index.html';
            //     window.location.href = 'http://xiaofeng.ckugua.com/webchat/getOpenId?url=' + resUrl
            //     console.log(resUrl)
            // }
            // this.GetUserInfo(urlCode)
        },
        computed: {
            // 计算属性的 getter

        },
        methods: {
            GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                console.log(r)
                if (r != null) return unescape(r[2]);
                return null;
            },
            GetUserInfo(code) {
                let _this = this;
                let url = 'webchat/userInfo?code=' + code
                _this.$Ajax.get(url).then((response) => {
                    console.log(response.data)
                    let res = response.data;
                    if (res.code == 200) {
                        var userid = window.localStorage.getItem(this.GLOBAL.CODE);
                        let openidurl = 'webchat/wxUser?userid=' + userid + '&openId=' + res.data.openId + '&nickname=' + res.data.name + '&headimgurl=' + res.data.headImgUrl;
                        this.GLOBAL.OPENID = res.data.openId;
// {userid:userid,openId:res.data.openId,nickname:res.data.name,headimgurl:res.data.headImgUrl}
                        _this.$Ajax.get(openidurl).then((reslt) => {
                            console.log(reslt)
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                }).catch((errs) => {
                    console.log(errs)
                })
            },


            inviteIn() {

                if (this.userId == "" || this.userId == null) {
                    //跳转到login界面
                    //要延时执行的代码
                    this.$router.push({
                        path: '/loginR',
                        name: 'loginR',
                    })
                } else {
                    this.$router.push({
                        name: 'friends',
                    })
                }
            },
            //传递商品的id 信息
            productIn(item) {
                // console.log('商品的ID = '+item.id) // 获取商品id

                this.$router.push({
                    path: '/product/productDetails',
                    name: 'product',
                    query: {
                        pid: item.id,
                        img: item.img,
                    },
                })
            },
        }
    }
</script>
<style scoped>
    .index {
        height: auto;
        overflow: hidden;
        /*padding-top: 60px;*/
    }

    .banner {
        height: 3.75rem;

    }

    .banner img {
        width: 100%;
    }

    .content {
        margin: 0.3rem 0.24rem;

        height: 1.5rem;
    }

    .classify-in {
        position: relative;
        width: 3.41rem;
        height: 1.5rem;
        background-color: #ffffff;
        box-shadow: 2px 0.06rem 0.1rem 0 rgba(0, 0, 0, 0.06);
        border-radius: 0.1rem;
    }

    .sifyL {
        padding: 0.38rem 0 0 0.19rem;
    }

    .sifyL h3 {
        font-size: 0.3rem;
        height: 0.29rem;
        letter-spacing: 0;
        color: #333333;
    }

    .sifyL p {
        padding-top: 0.19rem;
        font-size: 0.26rem;
        letter-spacing: 0;
        color: #666666;
    }


    .sifyR {
        position: absolute;
        right: 0.23rem;
        top: .38rem;
    }

    .sifyR .img {
        padding-top: 0.14rem;
    }

    .sifyR img {
        width: 0.46rem;
        height: 0.46rem;
    }

    .boutique {
        margin: 0 0.24rem 1.5rem 0.24rem;
        position: relative;
        padding: 0.22rem 0.2rem;
        background-color: #ffffff;
        border-radius: 10px;

    }

    .boutique-t {
        height: 0.7rem;
        line-height: 0.7rem;
    }

    .boutique-t img {
        width: 0.4rem;
        height: 0.36rem;
        float: left;
        margin-top: 0.15rem;

    }

    .boutique-t span {
        font-size: 0.32rem;
        float: left;
        margin-left: 0.2rem;

    }

    .boutique-in {
        height: 1.7rem;
        overflow: hidden;
        margin: 0.15rem 0;
    }

    .bou-in-img {
        width: 1.7rem;
        height: 1.7rem;
        float: left;
        background-color: #efefef;
        border-radius: 12px;
    }

    .bou-in-img img {
        width: 1.7rem;
        height: 1.7rem;
    }

    .bou-in-text {
        width: 4.62rem;
        float: right;
    }

    .bou-in-text h4 {

        height: 0.7rem;
        line-height: 0.7rem;
        font-size: 0.28rem;
        color: #333333;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        -ms-text-overflow: ellipsis;
        white-space: nowrap;
    }

    .bou-in-text ul {
        font-family: ArialMT;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.28rem;
        color: #666666;

    }

    .bou-in-text ul li {
        width: 33.33%;
        float: left;
        font-family: PingFang-SC-Bold;

    }

    .bou-in-text ul li:nth-child(1) {
        text-align: left;
        color: #ff7376;
        font-family: ArialMT;
    }

    .bou-in-text ul li:nth-child(2) {
        font-size: 0.22rem;
        text-align: left;
    }

    .bou-in-text ul li:nth-child(3) {
        font-size: 0.22rem;
        display: flex;
        text-align: right;
    }


</style>
