webpackJsonp([6],{HxEC:function(t,i){},SXvg:function(t,i){},ZKdc:function(t,i,e){"use strict";var s=e("hZtR"),a=(Boolean,Boolean,Number,Boolean,{name:"sliderimg",data:function(){return{currentPageIndex:0,dots:[]}},props:{loop:{type:Boolean,default:!0},autoPlay:{type:Boolean,default:!0},interval:{type:Number,default:4e3},dotShow:{type:Boolean,default:!1}},mounted:function(){var t=this;this.$nextTick(function(){setTimeout(function(){t.initTabScroll(),t.initDots(),t.initSlider(),t.scroll&&t.autoPlay&&(clearTimeout(t.timer),t.autoMove())},20),window.addEventListener("resize",function(){t.scroll&&setTimeout(function(){t.initTabScroll(!0),t.scroll.refresh()},20)})})},activated:function(){this.scroll&&this.autoPlay&&(clearTimeout(this.timer),this.autoMove())},deactivated:function(){clearTimeout(this.timer)},beforeDestroy:function(){clearTimeout(this.timer)},destroyed:function(){clearTimeout(this.timer)},methods:{initTabScroll:function(t){var i,e=0;this.children=this.$refs.tabWrapper.children,i=this.$refs.wrapper.getBoundingClientRect().width;for(var s=0;s<this.children.length;s++){this.children[s].style.width=i+"px",e+=i}console.log(i,e),this.loop&&!t&&this.children.length>1&&(e+=2*i),this.$refs.tabWrapper.style.width=e+"px"},initSlider:function(){var t=this;this.scroll?this.scroll.refresh():(this.scroll=new s.a(this.$refs.wrapper,{click:!0,scrollX:!0,momentum:!1,eventPassthrough:"vertical",snap:{loop:this.loop,threshold:.1,speed:400}}),this.scroll.on("scrollEnd",function(){var i=t.scroll.getCurrentPage().pageX;t.currentPageIndex=i,t.autoPlay&&(clearTimeout(t.timer),t.autoMove())}),this.scroll.on("beforeScrollStart",function(){t.autoPlay&&clearTimeout(t.timer)}))},autoMove:function(){var t=this,i=this.currentPageIndex+1;i===(this.loop?this.children.length-2:this.children.length)&&(i=0),this.timer=setTimeout(function(){t.scroll.goToPage(i,0,400)},this.interval)},initDots:function(){this.dotShow&&(this.dots=new Array(this.children.length))}}}),o={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"sliderimg"},[e("div",{ref:"wrapper",staticClass:"wrapper"},[e("ul",{ref:"tabWrapper",staticClass:"content clr"},[t._t("default")],2),t._v(" "),e("div",{staticClass:"dots"},t._l(t.dots,function(i,s){return e("span",{key:s,staticClass:"dot",class:{active:t.currentPageIndex===s}})}))])])},staticRenderFns:[]};var n=e("C7Lr")(a,o,!1,function(t){e("SXvg")},null,null);i.a=n.exports},"t8+U":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e("IHPB"),a=e.n(s),o=e("W3pG"),n=e("Uy/6"),l=e("ZKdc"),r=e("hZtR"),c=e("aozt"),u=e.n(c),h=(o.a,n.a,l.a,{name:"equipment",data:function(){return{busy:!0,loadingShow:!1,noDataShow:!1,nowPage:1,totalPage:10,allData:{},bigId:0,flag:!0,categoryId:0,imgData:[],isDeactivated:!1}},created:function(){this.$store.commit("LOADING_SHOW",!0),(this.$route.query.id||0===this.$route.query.id)&&(console.log("created阶段id：",this.$route.query.id),this.bigId=parseInt(this.$route.query.id)),this._getData()},deactivated:function(){this.isDeactivated=!0,console.log("我被停用了",this.isDeactivated)},activated:function(){this.isDeactivated&&(this.busy=!1),this.isDeactivated=!1,console.log("我开始使用了",this.isDeactivated)},mounted:function(){},watch:{$route:function(t,i){"equipment"===t.name&&(this.bigId===parseInt(this.$route.query.id)||!this.$route.query.id&&0!==this.$route.query.id||(this.bigId=parseInt(this.$route.query.id),this.categoryId=0,this._initCanshu(),this._getData()))}},methods:{goeQuipDetail:function(t){this.$router.push({path:"equipdetails",query:{id:t}})},_getData:function(){var t=this;console.log(this.bigId,this.categoryId,this.nowPage),u.a.get("/Mobile/Equipment/index.html",{params:{id:this.bigId,category_id:this.categoryId,p:this.nowPage}}).then(function(i){console.log(i),t.$store.commit("LOADING_SHOW",!1),200===i.status&&(t.allData=i.data,t.totalPage=t.allData.totalPages,t.imgData=[].concat(a()(t.imgData),a()(i.data.goods_list)),console.log(t.imgData),t.$nextTick(function(){t._initScroll()}),t.flag?(t.flag=!1,t.busy=!1):(console.log("当前页数是：",t.nowPage,t.totalPage),t.nowPage>=t.totalPage?(t.busy=!0,t.loadingShow=!1,t.noDataShow=!0):t.busy=!1,t.isDeactivated&&(t.loadingShow=!1,t.busy=!0),t.loadingShow=!1))}).catch(function(t){console.log(t)})},changeCategoryId:function(t){this.categoryId=t,this._initCanshu(),this._getData()},_initCanshu:function(){this.imgData=[],this.busy=!0,this.nowPage=1,this.flag=!0,this.noDataShow=!1},_initScroll:function(){var t=this;setTimeout(function(){t._setYxListWidth(),t._initYxList()},20),window.addEventListener("resize",function(){t.scroll&&setTimeout(function(){t._setYxListWidth(),t.scroll.refresh()},20)})},loadMore:function(){var t=this;console.log("重复加载",this.busy),this.loadingShow=!0,this.busy=!0,setTimeout(function(){t.nowPage++,t._getData()},1e3)},showAlert:function(){var t=this;console.log("父组件开始调用我了,开始刷新页面"),setTimeout(function(){t._setYxListWidth(),t.scroll.refresh()},20)},changeId:function(t){this.$router.push({path:"equipment",query:{id:t}})},_setYxListWidth:function(){var t=0;this.children=this.$refs.zbWrapper.children;for(var i=0;i<this.children.length;i++){var e=this.children[i];console.log("单个li宽度为：",e.clientWidth,"marginRight数值是：",getComputedStyle(e).marginRight,":px"),t+=parseFloat(e.clientWidth)+parseFloat(getComputedStyle(e).marginRight)}console.log(0,t),this.$refs.zbWrapper.style.width=Math.ceil(t)+1+"px"},_initYxList:function(){this.scroll||(this.scroll=new r.a(this.$refs.zb_biglist,{scrollX:!0,eventPassthrough:"vertical"}))}},components:{pubfooter:o.a,topsearch:n.a,sliderimg:l.a}}),d={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"equip"},[s("div",{staticClass:"bannerImg"},[s("topsearch"),t._v(" "),0!==Object.keys(t.allData).length?s("sliderimg",t._l(t.allData.IndexAd,function(i){return s("li",{key:i.ad_id,ref:"tabitem",refInFor:!0,on:{click:function(e){t.goeQuipDetail(i.ad_link)}}},[s("img",{attrs:{src:i.img_path}})])})):t._e()],1),t._v(" "),s("div",{staticClass:"zbbig_fenlei"},[s("ul",{staticClass:"clr"},t._l(t.allData.Equipment,function(i,e){return s("li",{key:e,class:{on:e===t.bigId},on:{click:function(i){t.changeId(e)}}},[s("i",{staticClass:"jingxuan",class:{jingxuan:0==e,liuxue:1==e,youxue:2==e,qianzheng:3==e}}),s("p",[t._v(t._s(i))])])}))]),t._v(" "),s("div",{staticClass:"zb_biglist_out"},[s("div",{ref:"zb_biglist",staticClass:"zb_biglist"},[s("ul",{ref:"zbWrapper",staticClass:"clr"},t._l(t.allData.category_arr,function(i,e){return s("li",{key:e,class:{on:e==t.categoryId},on:{click:function(i){t.changeCategoryId(e)}}},[t._v(t._s(i))])}))])]),t._v(" "),s("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],staticClass:"zbsmail",attrs:{"infinite-scroll-disabled":"busy","infinite-scroll-distance":"10"}},[s("ul",{staticClass:"clr"},t._l(t.imgData,function(i,e){return s("li",{key:e,on:{click:function(e){t.goeQuipDetail(i.goods_id)}}},[s("img",{attrs:{src:i.goods_images}}),t._v(" "),s("div",{staticClass:"zb_title"},[t._v(t._s(i.goods_name))]),t._v(" "),s("p",[s("span",{staticClass:"nowprice"},[t._v("￥"+t._s(t._f("quzheng")(i.shop_price)))]),s("em",{staticClass:"oldprice"},[t._v("￥"+t._s(t._f("quzheng")(i.market_price)))])])])}))]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.loadingShow,expression:"loadingShow"}],staticClass:"list_load"},[s("img",{attrs:{src:e("t3LQ")}}),t._v("数据加载中...\n  ")]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.noDataShow,expression:"noDataShow"}],staticClass:"list_load"},[t._v("\n    没有更多数据了\n  ")]),t._v(" "),s("pubfooter",{attrs:{indexNum:1}})],1)},staticRenderFns:[]};var g=e("C7Lr")(h,d,!1,function(t){e("HxEC")},null,null);i.default=g.exports}});
//# sourceMappingURL=6.58ae0ed786e1a049e4f6.js.map