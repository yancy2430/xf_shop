<template>
    <!-- 评价  -->
    <div class="evaluate">
        <div class="imgTitle">
            <div class="img">



                <img :src="orderImg" alt="">
            </div>
            <div class="title">
                <p>{{name}}</p>
                <p>¥{{price}}</p>
            </div>
        </div>

        <!--  分割线  -->
        <div class="explain">

            <div class="text">
                <div class="top">
                      <textarea placeholder="这是评语这是评语，这是评语这是评语这是评语，这是评语这
是评语"  v-model="state" maxlength="200" @input="descInput">
                      </textarea>
                </div>
                <p><span>{{remnant}}/200</span></p>
            </div>
            <!--  图片上传-->

            <div class="put">
                <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
                <p>上传凭证</p>
                <div class="imgShow">
                    <div class="add-img" v-show="imgList.length">
                        <ul class="img-list">
                            <li v-for="(url,index) in imgList">
                                <img class="del" src="" @click.stop="delImg(index)"/>
                                <img :src="url.file.src">
                            </li>
                        </ul>
                        <!--<p class="font14">图片(最多6张，还可上传<span v-text="6-imgList.length"></span>张)</p>-->
                    </div>
                </div>
                <div class="add" @click="chooseType">
                    <div class="add-image" align="center">
                        <img src="/static/images/set.png" alt="">
                    </div>
                </div>

            </div>
        </div>
        <button class="buy" :disabled="isDisable" @click="evaluateIn">提交申请</button>
    </div>
</template>

<script>
    export default {
        name: "salesEvaluate",
        data(){
            return {
                isDisable:false,
                state:"",
                orderImg:this.$route.query.orderImg,
                name:this.$route.query.orderName, // 商品图片
                orderid:this.$route.query.orderid, // 订单主键
                price:this.$route.query.price,    // 商品单价


                showFace: false,
                imgList: [],
                size: 0,
                limit:6, //限制图片上传的数量
                tempImgs:[],  //

                remnant:200,


            }
        },
        created(){
            // 获取用户id
            var name = window.localStorage.getItem(this.GLOBAL.CODE);
            this.userId = name
        },
        methods:{


            descInput(){
                var txtVal = this.state.length;
                this.remnant = 200 - txtVal;
            },

            // 提交 退货按钮
            evaluateIn() {

                console.log(this.imgList)
                console.log(this.cause +"fasfdasfsaf")


                // 获取数据
                var url = "wx/rated/order";
                var config = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
                //  数据交互
                this.$Ajax.post(url,
                    this.$qs.stringify({
                        orderid: this.orderid,
                        file:"",
                        content:this.state,
                        userId:this.userId
                    }), config)
                .then((res) => {
                    console.log(res);
                    // this.$router.push({
                    //     path: '/sales/returnSuccess',
                    //     name: 'returnSuccess',
                    // })

                })
                .catch((error) => {
                    console.log(error)
                });

            },

            //    图片上传功能
            chooseType() {
                document.getElementById('upload_file').click();
            },
            fileChange(el) {
                if (!el.target.files[0].size) return;
                this.fileList(el.target);
                el.target.value = ''
            },
            fileList(fileList) {
                let files = fileList.files;
                for (let i = 0; i < files.length; i++) {
                    //判断是否为文件夹
                    if (files[i].type != '') {
                        this.fileAdd(files[i]);
                    } else {
                        //文件夹处理
                        this.folders(fileList.items[i]);
                    }
                }
            },
            //文件夹处理
            folders(files) {
                let _this = this;
                //判断是否为原生file
                if (files.kind) {
                    files = files.webkitGetAsEntry();
                }
                files.createReader().readEntries(function (file) {
                    for (let i = 0; i < file.length; i++) {
                        if (file[i].isFile) {
                            _this.foldersAdd(file[i]);
                        } else {
                            _this.folders(file[i]);
                        }
                    }
                });
            },
            foldersAdd(entry) {
                let _this = this;
                entry.file(function (file) {
                    _this.fileAdd(file)
                })
            },
            fileAdd(file) {
                if (this.limit !== undefined) this.limit--;
                if (this.limit !== undefined && this.limit < 0) return;
                //总大小
                this.size = this.size + file.size;
                //判断是否为图片文件
                if (file.type.indexOf('image') == -1) {
                    this.$dialog.toast({mes: '请选择图片文件'});
                } else {
                    let reader = new FileReader();
                    let image = new Image();
                    let _this = this;
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        file.src = this.result;
                        image.onload = function(){
                            let width = image.width;
                            let height = image.height;
                            file.width = width;
                            file.height = height;
                            _this.imgList.push({ file });
                            console.log( _this.imgList); };
                        image.src= file.src; }
                }
            },
            delImg(index) {
                this.size = this.size - this.imgList[index].file.size;//总大小
                this.imgList.splice(index, 1);
                if (this.limit !== undefined) this.limit = 6-this.imgList.length;
            },
            displayImg() {

            },








        }

    }
</script>



<style scoped>



    .app-bg >>>img{
        width: 100%;
        height: 100%;
        -webkit-transform: scale(1.03);
        -moz-transform: scale(1.03);
        -ms-transform: scale(1.03);
        -o-transform: scale(1.03);
        transform: scale(1.03);
    } textarea {
          padding: 10px;
      } .text-length {
            font-size: 14px;
            z-index: 999;
            width: 100%;
            text-align: right;
            margin-bottom: 10px;
            color: #e4e4e4;
        } .warning {
              color: #fe9900;
          } .add-img {
                width: 100%;

            } .add-img p {
                  color: #999;
              } .mui-content {
                    padding-bottom: 60px;
                } .mui-content .idea {
                      margin-top: 8px;
                      background-color: #FFFFFF;
                  } .good-item {
                        text-align: center;
                        width: 33%;
                        max-width: 100%;
                        overflow: hidden;
                        padding-right: 10px;
                        padding-bottom: 10px;
                        float: left;
                    } .good-item span {
                          font-size: 15px;
                          height: 30px;
                          line-height: 30px;
                          border-radius: 50px;
                          display: block;
                          width: 100%;
                          color: #333;
                          overflow: hidden;
                          white-space: nowrap;
                          text-overflow: ellipsis;
                          border: 1px solid #CCCCCC;
                      } .mui-table {
                            padding-top: 10px;
                            color: #333;
                            padding-left: calc(0.5% + 10px);
                        } .h-line-behind {
                              line-height: 40px;
                              padding-left: 10px;
                          } .question {
                                border: 0;
                                margin-bottom: 10px;
                            } .add {
                                  display: inline-block;
                                  margin-bottom: 20px;
                              } .add-image {
                                    width: 1.8rem;
                                } .add-image .icon-camera {
                                      font-size: 24px;
                                  } .good-item .choose {
                                        color: #fff;
                                        background-color: #87582E;
                                        color: #FFF;
                                        border: 0;
                                    } .mui-btn-block {
                                          border: 0;
                                          border-radius: 0;
                                          background-color: #87582E;
                                          color: #fff;
                                          margin-bottom: 0;
                                          bottom: 0;
                                      } .mui-buttom {
                                            position: fixed;
                                            width: 100%;
                                            bottom: 0;
                                            z-index: 999;

                                        } /*九宫格*/ .img-list {
                                                      overflow: hidden;
                                                  } .img-list > li {
                                                        float: left;
                                                        width: 32%;
                                                        text-align: center;
                                                        position: relative;
                                                    } .img-list > li > div {
                                                          position: absolute;
                                                          left: 0;
                                                          top: 0;
                                                          width: 100%;
                                                          height: 100%;
                                                          overflow: hidden;
                                                      } .img-list > li > div .app-bg {
                                                            width: 100%;
                                                            height: 100%;
                                                        } .mui-fullscreen {
                                                              z-index: 9999;
                                                          } .del {
                                                                position: absolute;
                                                                width: 18px;

                                                                z-index: 999
                                                            }












    .imgTitle {
        height: 1.7rem;
        background: #fff;
    }
    .imgTitle .img {
        width: 1.3rem;
        height: 1.3rem;
        float: left;
        background-color: #ffffff;
        border-radius: 0.1rem;
        border: solid 0.01rem #e7e7e7;
        margin: 0.19rem 0.29rem 0 0.54rem;
    }
    .imgTitle .img img{
        width: 1.3rem;
        height: 1.3rem;
    }
    .imgTitle .title {
        width: 4rem;
        padding-top: 0.19rem;
        float: left;
    }
    .imgTitle .title p:nth-child(1){
        font-size: 0.24rem;
        height: 0.4rem;
        line-height: 0.4rem;
        color: #333333;
    }
    .imgTitle .title p:nth-child(2){
        font-size: 0.28rem;
        height: 0.8rem;
        line-height: 0.8rem;
        color: #333333;
    }
    .explain {
     margin-top: 0.2rem;
    }
    .explain .text{
        height: 1.96rem;
        background: #fff;

    }
    .explain .text .top{
        width: 7.5rem;
        height: 1.36rem;
        background: #fff;

    }
    .explain .text .top textarea {
        width: 7.02rem;
        font-size: 0.26rem;
        border: none;
        padding: 0.1rem 0.24rem;
        height: 1.13rem;
        line-height: 0.55rem;

    }

    ::-webkit-input-placeholder {
        color: #b9c5d5;
    }
    .explain .text p{
        height: 0.6rem;
        line-height: 0.6rem;
        background: #fff;
        text-align: right;
        margin: 0;
        padding: 0 0.24rem;

    }
    .put {
        height: auto;
        padding-top: 0.2rem;
        margin: 0 0.24rem;
    }
    .put p{
        height: 0.9rem;
        line-height: 0.9rem;
    }
    .imgShow {
        margin-right: -0.21rem;
        overflow: hidden;
    }
    .imgShow ul li{
        float: left;
        width: 33.33%;
        padding-right: 0.21rem;
        box-sizing: border-box;
        background-clip: content-box;
        padding-bottom: 0.1rem;
    }
    .imgShow ul li img{
        width: 2.2rem;
        height: 2.2rem;
    }

    .buy {
        width: 5.80rem;
        height: 0.80rem;
        line-height: 0.8rem;
        background-color: #ff7376;
        box-shadow: 0 0.06rem 0.1rem 0
        rgba(255, 115, 118, 0.3);
        border-radius: 40px;
        text-align: center;
        color: #fff;
        margin: 0.7rem 0.85rem;
        font-size: 0.32rem;

    }
</style>