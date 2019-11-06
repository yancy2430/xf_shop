<template>
    <!--  我的 个人中心  设置新的手机号  -->
    <div class="newIphone">
        <ul class="iphoneIn">
            <li>
                <label>新邮箱号</label>
                <input type="text"  v-model="email" placeholder="请输入您的邮箱帐号" class="iphone">
            </li>
            <!--<li>-->
                <!--<label>验证码</label>-->
                <!--<input type="text" v-model="code" placeholder="请输入验证码" class="code">-->
                <!--<span class="getCode">获取验证码</span>-->
            <!--</li>-->
        </ul>
        <span class="commit" @click="emailIn">确认提交</span>
        <span class="backtrack" @click="$router.back(-1)">返回</span>
    </div>
</template>

<script>
    export default {
        name: "newIphone",
        data(){
            return {
                email:'',
                code:''
            }
        },

        created(){
            var name = window.localStorage.getItem(this.GLOBAL.CODE);
            console.log(name)
            // this.iphone = name;
            this.userId = name
            // console.log(this.userId)
        },
        methods:{
            emailIn(){
                var self = this;
                var youxiang = "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"
                var url ="wx/center/updateByEmail";
                var config = {headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
                //  数据交互
                if(!this.email){
                    this.$toast({
                        message: '账户不能为空',
                        });
                } else if(youxiang.test(email) == false){
                    this.$toast({
                        message: '账户账户格式不对',
                    });
                }
                self.$Ajax.post(url,
                    self.$qs.stringify({
                        email:self.email,
                        userId:this.userId,

                    }),config)
                .then((res) => {
                    console.log(res);
                    if(res.code==200){
                        this.$toast({
                            message: '修改成功',
                         });
                    }else{
                        this.$toast({
                            message: '修改失败',
                         });
                    }


                })
            }
        }
        
    }
</script>

<style scoped>

    .newIphone{
        width: 7.02rem;
        margin: 0.24rem 0.24rem 0 0.24rem;
    }
    .newIphone span {
        display: block;
    }
    .newIphone ul.iphoneIn {
        background: #fff;
    }
    .newIphone ul.iphoneIn li {
        height: 1.1rem;
        line-height: 1.1rem;
        margin:0 0.3rem;
        padding: 0 0.38rem;
    }
    .newIphone ul.iphoneIn li:first-child {
        border-bottom:0.02rem solid #eeeeee;
    }
    .newIphone ul li:hover {
        cursor:hand;
        /*background: aqua;*/
    }
    .newIphone label{
        width: 1.3rem;
        display: block;
        float: left;
        font-size: 0.28rem;
        color: #777;
    }

    .newIphone input{

        float: left;
        background: none;
        border: none;
        text-align: left;
        height: 1.1rem;
        line-height: 1.1rem;
        font-size: 0.24rem;
        text-indent: 1em;
        color: #aaa;
    }
    .newIphone .iphoneIn .iphone{
        width: 4.36rem;
    }
    .newIphone .iphoneIn .code{
        width: 2.9rem;
        float: left;
    }
    .getCode {
        margin-top: 0.3rem;
        float: right;
        width: 1.33rem;
        color: #0290fe;
        font-size: 0.2rem;
        line-height: 0.5rem;
        text-align: center;
        height: 0.5rem;
        border-radius: 0.04rem;
        border: solid 2px #0290fe;

    }
    .commit, .backtrack{
        width: 7.02rem;
        line-height: 0.8rem;
        font-size: 0.28rem;
        text-align: center;
        height: 0.8rem;
        box-shadow: 0px 2px 9px 0px
        rgba(0, 34, 61, 0.06);
    }
    .commit {
        color: #fff;
        background: #0290fe;
        margin: 0.2rem 0;
    }
    .backtrack {
        background:#fff ;

    }

</style>
