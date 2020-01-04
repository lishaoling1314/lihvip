<template>
    <div class="lihvipDuce">
        <div class="banner">
            <div class="text">
                <div class="banner-main">
                    <div class="duce-title">
                        <img src="@/assets/img/duce-title0.png" alt="">
                    </div>
                    <p>利汇优品，致力于打造行业内领先的会员电商平台。</p>
                    <p>利汇优品秉承一贯的严谨态度，深入各个产品的源头，严格把控商品的质量，再辅以一手货源、正品低价、以及完善的售后服务信息化技术等多重优势，力求帮消费者臻选到优质商品，专注提供更加舒适的生活体验及满意贴心的服务。</p>
                    <p>利汇优品，甄选好货，给你全世界的品质生活。</p>
                </div>
            </div>
        </div>
        <div class="duce-pattern duce_item">
            <div class="duce-title">
                <img src="@/assets/img/duce-title1.png" alt="">
            </div>
            <div class="duce-pattern-main">
                <div class="main-l">
                    <img src="@/assets/img/duce-pattern-3.png" alt="">
                    <img src="@/assets/img/duce-pattern-2.png" alt="">
                    <img src="@/assets/img/duce-pattern-1.png" alt="">
                    <img src="@/assets/img/duce-pattern-0.png" alt="">
                </div>
                <div class="main-r">
                    <img src="@/assets/img/duce-pattern-4.png" alt="">
                </div>
            </div>
            <div style="clear:both"></div>
        </div>

        <!-- <div class="duce-About duce_item">
             <div class="duce-title">
                <img src="@/assets/img/duce-title2.png" alt="">
            </div>
            <div class="duce-About-main">
                <div class="main-video">
                    <video src="https://file.lihvip.com/data/upload_file/video/20190726/About-video.mp4" controls height="450" preload width="800" poster="@/assets/img/video.jpg"></video>
                </div>
                <div class="main-logo">
                    <img src="@/assets/img/duce-logo.png" alt="">    
                </div>
                <div style="clear:both"></div>
            </div>
        </div> -->



        <div class="duce-Choice duce_item">
            <div class="duce-title">
                <img src="@/assets/img/duce-title3.png" alt="">
            </div>
            <div class="duce-Choice-main">
                <div class="main-col" v-for="(item,index) in ChoiceData"  :key="index">
                    <div class="main-view">
                        <img :src="item.img" alt="">
                        <p>{{item.title}}</p>
                        <p>{{item.text}}</p>
                    </div>
                </div>
            <div style="clear:both"></div>
            </div>
        </div>


        <div class="duce-Range duce_item">
            <div class="duce-title">
                <img src="@/assets/img/duce-title4.png" alt="">
            </div>
            <div class="duce-Range-main">

                <div class="main-swiper">
                    <div class="swiper-border" :style="{'left':swiperBorder=='1'?'-2px':(swiperBorder=='2'?'295px':'592px')}"></div>
                    <!-- 295px -->
                    <!-- 592px -->
                    <div class="main-col" v-for="(item,index) in swiper" :key="index" :style="{ 'background-image': 'url(' + item.img + ')' }" @click="swiperImg(index)">
                        <!-- <div class="no-online" v-if="!item.is"><span>即将上线</span></div> -->
                    </div>
                    <div style="clear:both"></div>
                </div>
                <div class="main-content">
                    <div class="main-text" v-for="(item,index) in swiper" :key="index">
                        <div v-if="item.active">
                            <p class="title">{{item.title}}</p>
                            <p class="text">{{item.text}}</p>
                        </div>
                    </div>
                </div>
                <div class="main-tap">
                    <img src="@/assets/img/duce-left.png" alt="" class="tap-left tap-col" @click="up()">
                    <div class="tap-view tap-col">0{{swiperBorder}}<span>/</span><span class="opacity">03</span></div>
                    <img src="@/assets/img/duce-right.png" alt="" class="tap-right tap-col" @click="next()">
                </div>
                <div style="clear:both"></div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data(){
        return {
            swiperBorder:1,
            swiper:[
                {img:'./static/img/duce-swiper1.png',is:true,text:'大自然蕴藏着无尽的宝藏，珍奇的钻石，在自然的孕育下，演绎着色彩的传奇，缔造非凡之作，利汇优品为你呈现比利时工匠的至臻工艺与璀璨钻石的瑰丽之美，让你用最低的价格买到最上乘的珠宝美饰',title:'珠宝',active:true},
                {img:'./static/img/duce-swiper2.png',is:false,text:'数字时代，人被时间裹挟，忙碌却没有自己 的时间，想回到从前，虽然慢一点，但一分 一秒，都值得品味，不急不躁，找回步调， 来利汇优品选购一款手表吧，最低的折扣，最新的款式，最特别的购买方式，此刻，时光正好。',title:'手表',active:false},
                {img:'./static/img/duce-swiper3.png',is:false,text:'不知从何时开始，诗和远方成了奢侈的代名词。身体困于都市丛林，心却在旷野、星空、海盗飘荡、利汇优品给你最低折扣的奢品享受，拎起最喜欢的包包，去远方，或许没有那么难',title:'箱包',active:false}
            ],
            ChoiceData:[
                {img:'./static/img/duce-Choice1.png',title:'七天退换',text:'所售商品，七天内无理由退换货'},
                {img:'./static/img/duce-Choice2.png',title:'正品保障',text:'所售商品一经查实，假一赔十'},
                {img:'./static/img/duce-Choice3.png',title:'会员服务',text:'荣耀会员，尽显更多折扣'},
                {img:'./static/img/duce-Choice4.png',title:'正品低价',text:'厂家直供，享受正品低价'},
                {img:'./static/img/duce-Choice5.png',title:'专属服务',text:'一对一客服提供全程、不间断售后服务，保证及时、快速解决客户难题'},
                {img:'./static/img/duce-Choice6.png',title:'货款保障',text:'三方合同保障货款安全'}
            ]
        }
    },
   
    methods: {
        swiperImg(index){
            switch(index){
                case 0:
                    this.swiperBorder = 1;
                break;
                case 1:
                   this.swiperBorder = 2;
                break;
                case 2:
                   this.swiperBorder = 3;
                break;
                default:
            }
            this.swiper.map((item,index)=>{
                item.active = false
            })
            this.swiper[index].active = true;
        },
        up(){
            if(this.swiperBorder>1){
                this.swiperBorder --
            }
            this.swiper.map((item,index)=>{
                item.active = false
            })
            this.swiper[this.swiperBorder-1].active = true;
        },  
        next(){
            if(this.swiperBorder < 3){
                this.swiperBorder ++
            }
            this.swiper.map((item,index)=>{
                item.active = false
            })
            this.swiper[this.swiperBorder-1].active = true;
        }
    },
}
</script>

<style lang="less">
    .lihvipDuce{
        .banner{
            width: 100%;
            height: 820px;
            background: url(../../assets/img/doce-banner.png);
            background-repeat:no-repeat; 
            background-size:100% 520px; 
            text-align: center;
            box-sizing: border-box;
            margin-top: -50px;
            .text{
                width: 100%;
                height: 298px;
                background: #fff;
                top: 520px;
                position: relative;
                .banner-main{
                    position: relative;
                    top: -166px;
                    width: 1200px;
                    margin: 0 auto;
                    background: #fff;
                    height: 382px;
                    -moz-box-shadow:0px 10px 15px #f1f1f1; -webkit-box-shadow:0px 10px 15px #f1f1f1; box-shadow:0px 10px 15px #f1f1f1;
                    padding: 57px 125px 54px 125px;
                    box-sizing: border-box;
                    p{
                        margin-top: 20px;
                        color: #91856F;
                        font-size: 14px;
                        text-align: left;
                    }
                }
            }
        }
        .duce_item{
        	padding: 30px 0;
        	&:nth-child(even){
        		background: #f0f0f0;
        	}
        }
        .duce-pattern{
            margin-top: 80px;
            margin-bottom: 139px;
            .duce-pattern-main{
                width: 1200px;
                background: red;
                margin:  56px auto;
                .main-l{
                    float: left;
                    width: 804px;
                    img{
                        width: 398px;
                        height: 220px;
                    }
                }
                .main-r{
                    width: 396px;
                    float: right;
                    img{
                        width: 396px;
                        height: 446px;
                    }
                }
                
            }
        }
        .duce-About{
            background: #fff;
            padding: 78px 0;
                .duce-About-main{
                    width: 1200px;
                    margin: 50px auto;
                    display: flex;
                    align-items: center;
                    background: #F4F0E9;
                    .main-video{
                        float: left;
                        width: 800px;
                        height: 450px;
                    }
                    .main-logo{
                        float: right;
                        width: 400px;
                        text-align: center;
                    }
                }
        }
        .duce-Choice{
            margin-top: 80px;
            padding-bottom: 20px;
            box-sizing: border-box;
            .duce-Choice-main{
                width: 1200px;
                margin:0 auto;
                margin-top: 50px;
                .main-col{
                    float: left;
                    width: 230px;
                    width: 33.33%;
                    height: 170px;
                    margin-bottom: 65px;
                    .main-view{
                        img{width: 50px;height: 50px;}
                        p:nth-child(2){margin: 17px 0;color: #91856F;font-size: 14px;}
                        p:nth-child(3){color: #928E85;font-size: 12px;}
                        width: 280px;
                        text-align: center;
                        margin: 0 auto;
                        padding: 20px 0;
                    }
                }
            }
        }
        .duce-Range{
            background: #fff;
            // margin-top: 53px;
            padding: 80px;
            .duce-Range-main{
                width: 1200px;
                margin:50px auto;
                
                position: relative;
                .main-swiper{
                    float: left;
                    .swiper-border{
                        border:2px solid #91856F;
                        width: 276px;
                        height: 536px;
                        position: absolute;
                        top: -2px;
                        z-index: 99;
                        transition: all 0.3s;
                    }
                    .main-col{
                        float: left;
                        width: 277px;
                        height: 536px;
                        position: relative;
                        z-index: 9;
                        margin-right: 20px;
                        padding-top: calc(268px - 73px);
                        box-sizing: border-box;
                        .no-online{
                            width: 147px;
                            height: 147px;
                            border-radius: 50%;
                            margin: 0 auto;
                            line-height: 170px;
                            text-align: center;
                            background: url(../../assets/img/duce-swiper-no-online.png);
                            background-repeat: no-repeat;
                            background-size: 20px 20px;
                            background-position: calc(125px / 2) calc(147px - 30px);
                            border:1px solid #91856F;
                            span{
                                display: inline-block;
                                width: 50px;
                                margin: 0 auto;
                                color: #91856F;
                                letter-spacing: 5px;
                                font-size: 12px;
                                line-height: 26px;
                            }
                        }
                    }
                }
                .main-content{
                    float: right;
                    width: 300px;
                    box-sizing: border-box;
                    text-align: center;
                    padding: 70px 0 0 0;
                
                    .main-text{
                        color: #91856F;
                        padding: 0 35px;
                        box-sizing: border-box;
                        .title{font-size: 16px;line-height: 45px;font-weight: bold;}
                        .text{font-size: 12px;text-align: left;line-height: 36px;}
                    }

                }
                .main-tap{
                    position: absolute;
                    bottom: 30px;
                    right: 35px;
                    width: 250px;
                    text-align: center;
                    img{
                        width: 20px;
                        height: 20px;
                    }
                    .tap-left{float: left;}
                    .tap-view{
                        float: left;
                        width: 150px;
                        margin-left: 33px;
                        span.opacity{
                            opacity: 0.6;
                        }
                        span{margin: 0 15px;}
                    }
                    .tap-right{float: right;}
                }

            } 
        }
        .duce-title{
            width: 384px;
            margin: 0 auto;
            img{
                max-width: 384px;
            }
        }
    }
</style>