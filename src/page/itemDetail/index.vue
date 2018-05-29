<template>
  <div class="itemDetail">
    <!-- <vue-swiper :itemImg="itemImg"></vue-swiper> -->
    <div class="details">
      <div class="img">
        <img :src="itemDetails.picUrl"/>
      </div>
      <div class="text">
        <p>
          {{itemDetails.title}}
        </p>
        <div class="price">
          <span class="first">￥{{itemDetails.couponPrice}}</span>
          <span class="second">原价 ￥{{itemDetails.price}}</span>
          <div class="count-price"><span>￥{{itemDetails.quan}}</span><i>券</i></div>
        </div>
      </div>
    </div>
    <div class="left" @click="goBack">
      <img src="../../assets/icon/return.png"/>
    </div>
    <div class="right">
      <ul>
        <li @click="goHome">
          <img src="../../assets/icon/rehome.png"/>
        </li>
        <li @click="camera">
          <img src="../../assets/icon/repic.png"/>
        </li>
        <li @click="superSearch">
          <img src="../../assets/icon/reso.png"/>
        </li>
      </ul>
    </div>
    <div class="goodsshow">
      <a href="javascript:;" class="seemore" @click="toggleShow"><span>商品图文详情<span class="text">({{text}})</span></span></a>
      <div class="goodsdetail" v-if="ItemImages" style="display:none">
        <img v-for="(item,index) in ItemImages" :key="index" :src="item"/>
      </div>
    </div>

    <div class="detailJP">
      <a href="javascript:;" class="seemore" @click="toggleShow"><span>本栏目更多精品</span></a>
      <div class="moreDetail" >
        <!-- <coupon-items :couponItems="itemImgCouponItems" :flag="false"></coupon-items> -->
        <coupon-items :queryUrl="url" :params='params' :flag="true"></coupon-items>
      </div>
    </div>
    <!-- 底部菜单 -->
    <div class="nbmenu">
      <div class="nbnav nb-btn1"><a href="javascript:;" @click="goHome"><i class="fa fa-home" style="font-size:12px"></i>&nbsp;首页</a></div>
      <div class="nbnav nb-btn2" @click="kefushow=!kefushow"><i class="fa fa-user-circle" style="font-size:12px"></i>&nbsp;客服</div>
      <div class="nbnav2 nb-btn3" @click="getTwdAndShortLinkInfo(1)"><a id="one" href="javascript:;" style="color:white;font-weight: bolder;">点击购买</a></div>
      <div class="nbnav2 nb-btn4" @click="getTwdAndShortLinkInfo(2)"><a id="two" href="javascript:;" style="color: #ffffff;font-size: 12px;font-weight:bolder;letter-spacing: 0px;">口令购买</a></div>
    </div>
    <!-- 客服 -->
    <div class="model" v-show="kefushow" @click="kefushow=!kefushow">
      <div class="content">
        <img src="../../assets/img/kefu.jpg" width="100%"/>
      </div>
    </div>
    <!-- 淘宝 -->
    <div class="model" v-show="tbCopy">
      <div class="content">
        <div class="head">口令购买</div>
        <div class="body">
          <p><span>长按框内&gt;拷贝</span></p>
          <div class="text"><span id="copyText">{{TwdAndShortLinkInfo.couponLinkTaoToken}}</span></div>
          <div class="button">
            <mt-button size="small" id="copyBtn" @click="copyLink" data-clipboard-target="#copyText">一键复制</mt-button>
          </div>
          <div class="text3">点击复制后，请打开【手机淘宝APP】购买！</div>
          <div class="text2">
            <div>
              <div>温馨提示手机无【手机淘宝APP】者，可选择浏览器购买方式哦~</div>
              <div>使用说明：复制口令后打开【手机淘宝APP】即可领取优惠券购买！</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--分享图片-->
    <div class="nb-sharecanvas" style="display: none;" @click="closesharecanva">
      <div class="nb-canvas">
        <!-- <div class="close" >
           <i class="fa fa-close " @click="closesharecanva" style=""></i>
        </div> -->
        <div class="content">
          <canvas id="sharecanvas" style="background-color:white;display:none; width:80%" class="am-text-center am-center" width="675" height="1017"></canvas>
          <img src="" class="imgData" check-src="true" background="white" style="display: none;">
        </div>
        <div class="foot">
          <span> {{loadingText}}</span>
        </div>

      </div>
    </div>

    <!--二维码-->
    <input style="display: none;" id="codeimageBase64" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import couponItems from "../../components/couponItems";
import { fetch, getitemUrl } from "@/config/fetch";
import { MessageBox, Toast, Indicator } from "mint-ui";
import Clipboard from "clipboard";
import eventbus from "../../utils/eventbus";

export default {
  name: "itemDetail",
  components: { couponItems },
  data() {
    return {
      itemImg: [],
      itemDetails: {},
      item: {},
      getQrCodeBase64: "",
      ItemImages: [],
      text: "点击查看",
      show: false,
      number: 4,
      itemImgCouponItems: [],
      loadingText: "图文合成中，请耐心稍等片刻",
      kefushow: false,
      TwdAndShortLinkInfo: {},
      jumpUrl: "",
      tbCopy: false,
      url: "",
      params: {},
      shortUrl: ""
    };
  },
  computed: {
    id() {
      return this.$store.state.itemDetails.itemDetails_id;
    }
  },
  methods: {
    getTwdAndShortLinkInfo: function(type) {
      const params = {
        auctionid: this.item.numIid
        // userFlag:4,
      };
      const obj = this;
      fetch("POST", "quergetTwdAndShortLinkInfo", params)
        .then(res => {
          if (!res.success) {
            alert("调用接口失败");
            return;
          }
          if (res.message == "successful") {
            obj.TwdAndShortLinkInfo = res.data;
            let a = navigator.userAgent;
            if (a.indexOf("wechat") > -1 || a.indexOf("MicroMessenger") > -1) {
              obj.jumpUrl =
                "http://www.tooklili.com:81/taobao?backurl=" +
                encodeURIComponent(res.data.couponLink);
            } else {
              obj.jumpUrl = res.data.couponLink;
            }
            if (type == 1 && obj.jumpUrl != null) {
              window.location.href = obj.jumpUrl;
              return;
            }
            if (type == 2) {
              //打开弹层
              obj.tbCopy = true;
              return;
            }
          }
        })
        .catch(err => {
          alert("网络异常");
        });
    },
    copyLink: function() {
      const clipboard = new Clipboard("#copyBtn");
      const obj = this;
      clipboard.on("success", function(e) {
        e.trigger.innerHTML = "复制成功";
        e.trigger.style.backgroundColor = "#9ED29E";
        setTimeout(function() {
          obj.tbCopy = false;
        }, 2000);

        e.clearSelection();
      });

      clipboard.on("error", function(e) {});
    },
    closesharecanva: function() {
      $(".nb-sharecanvas").fadeOut();
    },
    superSearch: function() {
      const obj = this;
      MessageBox.confirm("是否使用超级搜索查询本商品更多优惠？", "确认操作")
        .then(action => {
          obj.$router.push({ name: "superSearch" });
        })
        .catch(err => {});
    },
    toggleShow: function() {
      if (!this.show) {
        setTimeout(function() {
          $("html,body").animate(
            { scrollTop: $(".goodsshow").offset().top },
            300
          );
        }, 500);
        $(".goodsdetail").fadeIn(500);
        this.text = "加载完毕";
      } else {
        setTimeout(function() {
          $("html,body").animate({ scrollTop: $("body").offset().top }, 300);
        }, 500);
        $(".goodsdetail").fadeOut(500);
        this.text = "查看图片";
      }
      this.show = !this.show;
    },
    ...mapActions(["get_itemDetails_data"]),
    getItemImg: function() {
      const params = {
        numIid: this.item.numIid
      };
      const obj = this;
      fetch("POST", "querygetItemImages", params)
        .then(res => {
          if (res.message == "successful") {
            obj.ItemImages = res.data;
          }
          obj.ItemImages = res.data;
        })
        .catch(err => {});
    },
    goBack: function() {
      // this.$router.push();
      //传递一个map，choiceHospital是key，hospital是value
      this.$router.go(-1);
    },
    goHome: function() {
      this.$router.push("home");
    },
    getItemDetail: function() {
      if (
        this.get_itemDetails_id != null &&
        this.get_itemDetails_id != "null" &&
        this.get_itemDetails_id != ""
      ) {
        this.$http.post(getitemUrl + this.get_itemDetails_id).then(res => {
          let result = res.data.data;

          if (result) {
            let img = {
              imgSrc: result.picUrl
            };
            this.itemImg.push(img);
            this.itemDetails = result;
          }
        });
      } else {
        this.itemDetails = this.item;
      }
      console.log(this.itemDetails.id);
      console.log(typeof this.itemDetails);
    },
    camera: function() {
      $(".nb-sharecanvas").fadeIn();
    },

    getShortLink: function(callback) {
      let self = this;
      const params = {
        url: window.location.href
      };

      fetch("POST", "getShortLinkUrl", params).then(res => {
        let url = res.data;
        self.shortUrl = url;

        callback && callback();
      });
    },

    getCamera: function() {
      const obj = this;
      const params = {
        url: obj.shortUrl
      };
      fetch("POST", "querygetQrCodeBase64", params)
        .then(res => {
          obj.getQrCodeBase64 = res.data;
          $("#codeimageBase64").val(res.data);
          this.canvasApp();
        })
        .catch(err => {});
    },
    canvasApp: function() {
      var canvas = document.getElementById("sharecanvas");
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff";
      var obj = this;
      canvas.width = document.documentElement.clientWidth * 0.9 * 2;
      canvas.height = canvas.width / 2 + 680;
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < imageData.data.length; i += 4) {
        if (imageData.data[i + 3] == 0) {
          imageData.data[i] = 255;
          imageData.data[i + 1] = 255;
          imageData.data[i + 2] = 255;
          imageData.data[i + 3] = 255;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      var item_img = new Image();
      item_img.setAttribute("crossOrigin", "anonymous");
      item_img.src = obj.itemDetails.picUrl;
      item_img.onerror = function() {
        obj.loadingText = "网络错误，请稍后再试";
        return false;
      };
      item_img.onload = function() {
        ctx.drawImage(item_img, 0, 0, canvas.width, canvas.width);
        var code_img = new Image();
        code_img.setAttribute("crossOrigin", "anonymous");
        code_img.src = $("#codeimageBase64").val();
        code_img.onerror = function() {
          obj.loadingText = "网络错误，请稍后再试";
          return false;
        };
        code_img.onload = function() {
          ctx.drawImage(
            code_img,
            canvas.width - 220,
            canvas.width + 20,
            200,
            200
          );
          var str = obj.itemDetails.title;
          ctx.fillStyle = "#605761";
          ctx.lineWidth = 1;
          ctx.textAlign = "left";
          ctx.textBaseline = "top";
          ctx.font = "28px Helvetica";
          var lineWidth = 0;
          var canvasWidth = canvas.width - 60;
          var initHeight = canvas.width + 30;
          var lastSubStrIndex = 0;
          for (var i = 0; i <= str.length; i++) {
            lineWidth += ctx.measureText(str[i]).width;
            if (lineWidth > canvasWidth - 230) {
              ctx.fillText(str.substring(lastSubStrIndex, i), 20, initHeight);
              initHeight += 40;
              lineWidth = 0;
              lastSubStrIndex = i;
            }
            if (i == str.length - 1) {
              ctx.fillText(
                str.substring(lastSubStrIndex, i + 1),
                20,
                initHeight
              );
            }
          }

          var price = obj.itemDetails.price;
          ctx.fillStyle = "#aba0ac";
          ctx.textAlign = "left";
          ctx.font = "30px Helvetica";
          ctx.textBaseline = "top";
          ctx.fillText("原价" + price, 20, initHeight + 30);
          ctx.strokeStyle = "#aba0ac";
          ctx.lineWidth = 2;
          ctx.moveTo(10, initHeight + 46);
          ctx.lineTo(180, initHeight + 46);
          ctx.stroke();
          var end_price_title = "券后价:";
          ctx.fillStyle = "#aba0ac";
          ctx.textAlign = "left";
          ctx.font = "30px Helvetica";
          ctx.textBaseline = "top";
          ctx.fillText(end_price_title, 20, initHeight + 80);
          //券后价
          var end_price = obj.itemDetails.couponPrice;
          ctx.fillStyle = "#fba137";
          ctx.textAlign = "left";
          ctx.font = "42px Helvetica";
          ctx.textBaseline = "top";
          ctx.fillText(end_price, 120, initHeight + 72);
          ctx.setLineDash([10, 5]);
          ctx.lineWidth = 1;
          ctx.strokeStyle = "#aba0ac";
          ctx.beginPath();
          ctx.moveTo(10, canvas.height - 50);
          ctx.lineTo(canvas.width - 10, canvas.height - 50);
          ctx.stroke();
          ctx.fillStyle = "white";
          ctx.lineWidth = 0;
          ctx.beginPath();
          ctx.moveTo((canvas.width - 308) / 2 - 10, canvas.height - 64);
          ctx.lineTo((canvas.width - 308) / 2 + 320, canvas.height - 64);
          ctx.lineTo((canvas.width - 308) / 2 + 320, canvas.height - 46);
          ctx.lineTo((canvas.width - 308) / 2 - 10, canvas.height - 46);
          ctx.lineTo((canvas.width - 308) / 2 - 10, canvas.height - 64);
          ctx.fill();
          var code_title = "长按二维码识别查看商品";
          ctx.fillStyle = "#aba0ac";
          ctx.font = "28px Helvetica";
          ctx.fillText(
            code_title,
            (canvas.width - 308) / 2,
            canvas.height - 64
          );
          var image = new Image();
          image.setAttribute("crossOrigin", "anonymous");
          image.src = canvas.toDataURL("img/jpeg");
          $(".imgData").attr("background", "white");
          $(".imgData").attr("src", image.src);
          //$(".imgData").attr("id",image.src);
          $(".imgData").show();

          if ($(".imgData").attr("src") != "") {
            obj.loadingText = "说明：长按上方图片发给朋友或保存图片。";
          }
        };
      };
    },
    getRandomItemByCateId: function() {
      const obj = this;
      const par = {
        cateId: this.item.cateId,
        size: this.number
      };
      (obj.url = "querygetRandomItemByCateId"), (obj.params = par);
      //  fetch('POST', 'querygetRandomItemByCateId', params).then(res=>{
      //     obj.itemImgCouponItems = res.data
      //  }).catch(err=>{

      //  })
    }
  },
  created() {
    let self = this;
    console.log("123123");
    console.dir(self.$route.query);
    self.$nextTick(function() {
      //const clipboard = new Clipboard('.btn');
      self.item = self.$route.query;
      //获取轮播图片
      self.getItemImg();
      self.getItemDetail();
      //获取本栏目数据
      self.getRandomItemByCateId();
      //

      self.getShortLink(() => {
        self.getCamera();
      });
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.itemDetail {
  position: relative;
  background-color: #ddd;
  .model {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10006;
    .content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      .head {
        text-align: center;
        background-color: #f54d23;
        border-radius: 5px 5px 0 0;
        color: white;
        padding: 0.2rem 0;
      }
      .body {
        background-color: #fff;
        border-radius: 0 0 5px 5px;
        p {
          text-align: center;
          padding: 0.2rem;
          span {
            color: #fff;
            background-color: #f54d23;
            padding: 1px 5px;
            font-size: 80%;
          }
        }
        .text {
          text-align: center;
          padding: 0.4rem 0;
        }
        div.button {
          text-align: center;
          .mint-button {
            border-radius: 20px;
            background-color: #f54d23;
            color: #fff;
            margin-bottom: 0.4rem;
          }
        }
        .text3 {
          color: #0e90d2;
          text-align: center;
          font-size: 90%;
          padding-bottom: 0.4rem;
        }
        .text2 {
          padding: 0.4rem;
          border-radius: 0 0 5px 5px;
          background-color: #f3f3f3;
          color: #86564b;
          font-size: 80%;
          line-height: 1.4;
          text-align: justify;
        }
      }
    }
  }
  .nbmenu {
    position: fixed;
    width: 100%;
    max-width: 640px;
    height: 50px;
    line-height: 50px;
    display: -webkit-box;
    z-index: 10000;
    background: #fafafa;
    color: #ffffff;
    font-size: 0.4rem;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 0;
    .nb-btn1 {
      bottom: 0;
      left: 0;
      color: #666;
      text-align: center;
    }

    .nbnav {
      position: absolute;
      z-index: 10001;
      width: 20%;
      float: left;
    }
    .nb-btn2 {
      bottom: 0;
      left: 18%;
      color: #666;
      text-align: center;
    }
    .nb-btn3 {
      bottom: 0;
      left: 40%;
      background: #fb874e;
      text-align: center;
    }
    .nbnav2 {
      position: absolute;
      z-index: 10001;
      width: 30%;
      float: left;
    }
    .nb-btn4 {
      bottom: 0;
      left: 70%;
      background: #f54d23;
      text-align: center;
    }
  }
  .nb-sharecanvas {
    display: flex;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10005;
    .nb-canvas {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      .content {
        background-color: #fff;
      }
      .foot {
        background-color: #555;
        color: #fff;
        padding: 0.2rem;
        border-radius: 5px;
        margin-top: 0.4rem;
      }
      .close {
        display: inline-block;
        width: 0.8rem;
        height: 0.8rem;
        border: 3px solid #fff;
        background-color: #2f9aea;
        border-radius: 0.8rem;
        position: absolute;
        right: -10px;
        top: -10px;
        text-align: center;
      }
      i {
        color: #fff;
        margin-top: 3px;
      }
      img {
        width: 100%;
      }
    }
  }
  .goodsshow {
    margin-top: 0.4rem;
    background-color: #fff;
    a {
      display: block;
      padding: 0.4rem;
      border-bottom: 1px solid #ddd;
      span {
        .text {
          font-size: 80%;
          padding-left: 0.4rem;
        }
      }
    }
    .goodsdetail {
      margin-top: 0.4rem;
      img {
        width: 100%;
      }
    }
  }
  .detailJP {
    margin-top: 0.4rem;
    margin-bottom: 70px;
    background-color: #fff;
    a {
      display: block;
      padding: 0.4rem;
      border-bottom: 1px solid #ddd;
      span {
        .text {
          font-size: 80%;
          padding-left: 0.4rem;
        }
      }
    }
    .goodsdetail {
      margin-top: 0.4rem;
      img {
        width: 100%;
      }
    }
  }
  .details {
    background-color: #fff;
    .img {
      img {
        width: 100%;
      }
    }
    .text {
      padding: 0.2rem;
      p {
        font-weight: bold;
        color: #444;
        height: 40px;
        line-height: 20px;
        overflow: hidden;
      }
      .price {
        margin-top: 0.2rem;
        .first {
          color: #f54d23;
          font-size: 120%;
          font-weight: 700;
        }
        .second {
          color: #555555;
          text-decoration: line-through;
          font-size: 80%;
        }
        .count-price {
          float: right;
          color: #fff;
          background: linear-gradient(#fb874e, #f54d23);
          padding: 2px 4px;
        }
      }
    }
  }
  .left {
    z-index: 1001;
    display: inline-block;
    width: 1rem;
    position: absolute;
    top: 0.6rem;
    left: 0.6rem;
    img {
      width: 100%;
    }
  }
  .right {
    z-index: 1001;
    display: inline-block;
    width: 1rem;
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    ul {
      li {
        img {
          width: 100%;
          margin-bottom: 0.4rem;
        }
      }
    }
  }
}
</style>
