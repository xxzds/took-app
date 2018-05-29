<template>
<div id="superPageList">
    <div class="page">
      <div class="fix">
        <div class="serach">
                    <a class="back" @click="goBack" href="javascript:;">
                      <i class="fa fa-angle-left"></i>
                    </a>
                    <div class="">
                      <input type="text" @keyup.enter="search" v-model="keyWord" name="keyWord" maxlength="200" placeholder="输入关键词或粘贴宝贝标题">
                      <i class="fa fa-close" v-show="closeShow" @click="clear"></i>
                      <a href="javascript:;" @click="search">搜索</a>
                    </div>
              </div>
              <div class="order-nav">
                <ul>
                      <li @click="typeClick($event,item)" :class="{active:item.index == 0}" v-for="(item,index) in liArr" :key="index">
                          <span>{{item.name}}</span>
                      </li>
                  </ul>
              </div>
      </div>
      <div class="content">
          <!-- <coupon-items :couponItems="couponItems" :flag="false"></coupon-items> -->
          <coupon-items :queryUrl="url" :params='params' :flag="false"></coupon-items>
      </div>
    </div>
    </div>
</template>
<script>
import couponItems from "../../components/couponItems";
import { get_local_cache, set_local_cache } from "@/config/cache";
import { fetch } from "@/config/fetch";
import { Toast } from "mint-ui";
export default {
  name: "superPageList",
  components: {
    couponItems
  },
  data() {
    return {
      keyWord: "",
      sortType: 0,
      dpyhq: 1,
      closeShow: false,
      liArr: [
        { name: "人气", sortType: 0, queryType: 2, index: 0 },
        { name: "默认", sortType: 0, queryType: 0, index: 1 },
        { name: "销量", sortType: 9, queryType: 0, index: 2 },
        { name: "价格", sortType: 3, queryType: 0, index: 3 }
      ],
      couponItems: [],
      toPage: 1,
      perPageSize: 20,
      queryType: 2,
      sortType: 0,
      url: "",
      params: {}
    };
  },
  methods: {
    typeClick: function(event, item) {
      const el = event.currentTarget;
      $(el)
        .addClass("active")
        .siblings()
        .removeClass("active");
      this.sortType = item.sortType;
      this.queryType = item.queryType;
      this.superSearchItems();
    },
    getRouterParams: function() {
      this.keyWord = sessionStorage.getItem("ssKey");
      this.superSearchItems();
    },
    clear: function() {
      this.keyWord = "";
      this.closeShow = false;
    },
    search: function() {
      if (this.keyWord == "" || this.keyWord == undefined) {
        Toast("搜索内容不能为空！");
        return;
      }
       sessionStorage.setItem("ssKey",this.keyword);
      sessionStorage.setItem("currentKey", 0);
      if (
        /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g.test(
          this.keyWord
        )
      ) {
        Toast("粘贴商品标题试试~（链接地址不支持）！");
        return;
      }
      this.superSearchItems();
    },
    goBack: function() {
      sessionStorage.setItem("ssKey","");
      this.$router.go(-1);
    },
    superSearchItems: function() {
      const obj = this;
      const par = {
        q: this.keyWord, //关键字
        queryType: this.queryType, //查询类型,0 默认排序 2人气
        sortType: this.sortType, //排序类型价格从高到低 queryType=0 ； sortType=3价格从低到高 queryType=0 ； sortType=4销量从高到低 queryType=0 ； sortType=9收入比率从高到低 queryType=0 ； sortType=1月推广量从高到低 queryType=0 ； sortType=5月支出佣金从高到低 queryType=0 ； sortType=7
        currentPage: 1,
        pageSize: 20,
        dpyhq: 1
      };
      console.log("pageSize currentPage 后台要统一字段");
      (obj.url = "querysuperSearchItems"), (obj.params = par);
    }
  },
  computed: {},
  created() {
    this.getRouterParams();
  }
};
</script>
<style lang='less'>
* {
  box-sizing: border-box;
}
.page {
  position: relative;
  height: calc(100% - 50px);
}
#superPageList {
  .fix {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: #fff;
    .serach {
      background: linear-gradient(#ff3d6f, #ff5ba6);
      padding: 0.4rem;
      display: flex;
      align-items: center;
      a.back {
        display: inline-block;
        width: 10%;
        text-align: center;
        color: #fff;
        font-size: 200%;
      }
      a.sort {
        width: 10%;
        text-align: center;
        img {
          width: 50%;
        }
        div {
          background-color: transparent;
          text-align: center;
          color: #fff;
          font-size: 50%;
        }
      }
      div {
        width: 80%;
        position: relative;
        background-color: #fff;
        border-radius: 20px;
        display: flex;
        align-items: center;
        input {
          margin: 0;
          padding: 8px 12px;
          border-radius: 20px;
          border: 0;
        }
        i {
          color: #999;
        }
        a {
          padding: 7px 12px;
          color: #fff;
          background-color: #ffb925;
          position: absolute;
          top: 0px;
          right: -1px;
          border-radius: 20px;
        }
      }
    }
    .order-nav {
      ul {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 4px;
        background-color: #ddd;
        li {
          background-color: #fff;
          flex: 1;
          text-align: center;
          height: 50px;
          line-height: 50px;
          &.active {
            color: #fe4a65;
            border-bottom: 1px solid #fe4a65;
          }
        }
      }
    }
  }
  .suggest {
    padding: 0.4rem;
    ul {
      width: 100%;
      li {
        width: 100%;
        padding: 0.2rem 0;
        &:not(:last-child) {
          border-bottom: 1px solid #ddd;
        }
      }
    }
  }
  .content {
    background-color: #fff;
    padding-top: 120px;
  }
}
</style>
