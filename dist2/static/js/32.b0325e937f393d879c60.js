webpackJsonp([32],{"+4l3":function(t,s){},yooK:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("JGLT"),o=a("Jp5S"),i=a("mHYM"),n=a("aozt"),l=a.n(n),d=(o.a,e.a,{name:"shipaddress",data:function(){return{allData:{},confirmShow:!1,nowIndex:0,fromType:""}},directives:{TransferDom:o.a},activated:function(){this._getAddressData()},created:function(){this.fromType=this.$route.query.type,this._getAddressData()},methods:{selectAddress:function(t){"confirmorder"==this.fromType&&(this.$store.commit("SET_ADDRESSDATA",this.allData[t]),console.log(this.allData[t].address_id),this.$router.go(-1))},onConfirm:function(){var t=this;console.log("我要开始删除了"),console.log("delIdArr值是",this.delIdArr);l.a.get("/Mobile/User/del_address.html",{params:{address_id:this.allData[this.nowIndex].address_id}}).then(function(s){console.log(s),1==s.data.status?t.allData.splice(t.nowIndex,1):i.a.showError(s.data.msg)}).catch(function(t){console.log(t)})},setDefaultAddress:function(t){var s=this;if(console.log("设置默认地址",t),1!=this.allData[t].is_default){l.a.get("/Mobile/User/set_default.html",{params:{address_id:this.allData[t].address_id}}).then(function(a){if(console.log(a),1==a.data.status){for(var e=0;e<s.allData.length;e++)s.allData[e].is_default=0;s.allData[t].is_default=1}else i.a.showError(a.data.msg)}).catch(function(t){console.log(t)})}else this.allData[t].is_default=1},editAddress:function(t){console.log("编辑",t),this.$router.push({path:"editaddress",query:{addressId:this.allData[t].address_id}})},delAddress:function(t){console.log("删除",t),this.nowIndex=t,this.confirmShow=!0},_getAddressData:function(){var t=this;l.a.get("/Mobile/User/address_list.html",{params:{}}).then(function(s){console.log(s),1==s.data.status?t.allData=s.data.data:i.a.showError(s.data.msg)}).catch(function(t){console.log(t)})}},components:{Confirm:e.a}}),r={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"shipaddress"},[t.allData.length<1?e("div",{staticClass:"nodata"},[e("img",{attrs:{src:a("xXKw")}}),t._v(" "),e("h3",[t._v("您还没有添加收货地址")]),t._v(" "),e("p",[t._v("快去添加新地址")]),t._v(" "),e("router-link",{staticClass:"goother",attrs:{tag:"a",to:"/addaddress",exact:""}},[t._v("去添加")])],1):t._e(),t._v(" "),t.allData.length>0?e("div",{staticClass:"addresscont"},t._l(t.allData,function(s,a){return e("div",{staticClass:"addresslist"},[e("div",{on:{click:function(s){t.selectAddress(a)}}},[e("div",{staticClass:"sjr"},[e("span",[t._v("收货人: "+t._s(s.consignee))]),t._v(" "),e("em",[t._v(t._s(s.mobile))])]),t._v(" "),e("p",{staticClass:"sjdz",domProps:{innerHTML:t._s("收货地址:"+s.detail_info)}},[t._v("收货地址: "+t._s(s.detail_info))])]),t._v(" "),e("div",{staticClass:"caozuo"},[e("label",{on:{click:function(s){t.setDefaultAddress(a)}}},[e("input",{staticClass:"checkbtn mui-checkbox",attrs:{type:"checkbox",disabled:1==s.is_default},domProps:{checked:1==s.is_default}}),e("span",[t._v(t._s(1==s.is_default?"默认地址":"设为默认地址"))])]),t._v(" "),e("div",{staticClass:"caozuobtn"},[e("span",{on:{click:function(s){t.editAddress(a)}}},[e("i"),t._v("编辑")]),t._v(" "),e("span",{on:{click:function(s){t.delAddress(a)}}},[e("i",{staticClass:"del"}),t._v("删除")])])])])})):t._e(),t._v(" "),t.allData.length>0?e("div",{staticClass:"addcont"},[e("router-link",{staticClass:"addbtn",attrs:{tag:"a",to:"/addaddress",exact:""}},[e("span",[t._v("+")]),t._v(" 添加新地址\n    ")])],1):t._e(),t._v(" "),e("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[e("confirm",{attrs:{title:"操作提示"},on:{"on-confirm":t.onConfirm},model:{value:t.confirmShow,callback:function(s){t.confirmShow=s},expression:"confirmShow"}},[e("p",{staticStyle:{"text-align":"center"}},[t._v("确定删除本地址吗？")])])],1)])},staticRenderFns:[]};var c=a("C7Lr")(d,r,!1,function(t){a("+4l3")},null,null);s.default=c.exports}});
//# sourceMappingURL=32.b0325e937f393d879c60.js.map