<template>
    <div class="loginR">

        <div class="top">
            <ul>
                <li @click="toggle($index,tab.view)" v-for="(tab,$index) in tabs" :class="{active: active == $index}">{{
                    tab.type }}
                </li>
            </ul>
        </div>
        <div>
            <div class="list">
                <component :is="currentView"></component>
                <!--<login></login>-->
            </div>

        </div>

        <div class="weixin">
            <p class="title"><span class="fl"></span>第三方登录<span class="fr"></span></p>
            <div @click="WeChatIn"><img src="/static/images/weixin.png" alt=""></div>
        </div>

    </div>
</template>

<script>
    import login from '../components/common/login'
    import register from '../components/common/regsiter'


    export default {
        data() {
            return {
                currentView: 'login',
                currentTitle: '登录',
                active: 0,
                tabs: [
                    {
                        type: '登录',
                        view: 'login'
                    },
                    {
                        type: '注册',
                        view: 'register'
                    }
                ]
            }
        },
        created() {
            let nowUrl = 'http://shop.xf-health.com/h5/index.html';
            window.location.href = 'http://shop.xf-health.com/webchat/authorize?url=' + nowUrl
            console.log(nowUrl)
        },
        methods: {
            toggle(i, v) {
                // alert(222)
                this.active = i
                this.currentView = v
                if (i == 0) {
                    this.currentTitle = "登录"
                } else if (i == 1) {
                    this.currentTitle = "注册"
                }
            },
            WeChatIn() {
                let nowUrl = 'http://shop.xf-health.com/h5/index.html';
                window.location.href = 'http://shop.xf-health.com/webchat/authorize?url=' + nowUrl
                console.log(nowUrl)
            },
        },

        components: {
            login,
            register
        },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


    .weixin {
        text-align: center;
        width: 5.30rem;
        margin: 0 auto;

    }

    .weixin p.title {
        height: 1rem;
        line-height: 1rem;
        font-size: 0.26rem;
        text-align: center;
        padding-top: 0.1rem;
    }

    .weixin p.title span {
        display: block;
        width: 1.8rem;
        height: 0.02rem;
        margin-top: 0.51rem;
    }

    .weixin p.title span.fl {

        background: linear-gradient(90deg, #fff, #b9c5d5);
    }

    .weixin p.title span.fr {

        background-image: linear-gradient(90deg, #b9c5d5, #fff)
    }

    .weixin img {
        width: 0.56rem;

    }


    .top {
        height: 2.07rem;
        margin: 0 0.24rem;
        border-bottom: 1px solid #e1e1e1;
    }

    .active {
        font-weight: bold;
        color: #333;
        border-bottom: 1px solid #0290fe;
    }

    .top ul {
        padding-top: 1.07rem;
    }

    .top ul li {

        line-height: 1rem;
        width: 50%;
        text-align: center;

        float: left;
        list-style: none;
        font-size: 0.32rem;
        color: #666;
    }


</style>
