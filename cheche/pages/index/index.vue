<template>
	<view class="content">
		<view class="hander" style="background: #4A4AFF; width: 100%;height: 200upx; text-align: center; line-height: 200upx; ">
			<image src="../../static/maiche/左.png" style="width: 40upx; height: 40upx; float: left; margin-top: 80upx;margin-left: 30upx;"></image>
			<text style="margin-right: 60upx;">我要卖车</text>
		</view>
	</view>
	
	<view >
		<w-picker 
			mode="selector" 
			:defaultVal="[0]" 
			@confirm="onConfirm" 
			ref="city" 
			themeColor="#f00"
			:selectList="selectList"
		></w-picker>
		<w-picker 
			mode="selector" 
			:defaultVal="[0]" 
			@confirm="onConfirm2" 
			ref="holiday" 
			themeColor="#f00"
			:selectList="selectList1"
		></w-picker>
		<view class="" v-if="tabCurrentIndex==1">
			<view class="grace-flex" style="height: 40px;line-height: 40px;background: #f2f2f2;margin-top: 3px;">
		
				<view style="width: 50%; " class="tjsj-select-month" @tap="selectMonth">{{city}}<text class="grace-icons icon-arrow-down"></text></view>
				<view style="width: 50%;" class="tjsj-select-month" @tap="selectMonth1">{{holiday}}<text class="grace-icons icon-arrow-down"></text></view>
			</view>
		</view>
	
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue";
		import uCharts from '@/components/u-charts/u-charts.js';
		import  { isJSON } from '@/common/checker.js';
		import chartsJSON from '@/common/uChartsData.json';
		import wPicker from "@/components/w-picker/w-picker.vue";
		import rangeDatePick from '@/components/range-dtpicker/range-dtpicker.vue';
	var _self;
	var canvaPie=null;
	var canvaPie2=null;
	var canvaMix=null;
	export default {
		 data() {
		        return {
					city:'重庆市',//
					ztgk_date:["2010","2019"],
					currentMonth_njjrfx:["2010","2019"],
					currentMonth_gyjdfx:'2019-07',
					checkStatus:0,
		            searchKey : "",
					holiday:'景区等级',
		            searchClose : false,
					
					
					
					tabCurrentIndex:0,
					swiperCurrentIndex: 0,
					tabs: [
						{ name: '按景区名称选择',  },
						{ name: '按景区条件选则',  },
					],
					
					piearr3:[],//节假日分析
					piearr4:[],//各年节假日
					selectList:[
						{label:"我问",value:"我我我"},{label:"我问",value:"我我我"},
						{label:"我问",value:"我我我"},{label:"我问",value:"我我我"},
						{label:"我问",value:"我我我"},{label:"我问",value:"我我我"},
					],
					selectList1:[
						{label:"我问",value:"我我我"},{label:"我问",value:"我我我"},
						{label:"我问",value:"我我我"},{label:"我问",value:"我我我"},
						{label:"我问",value:"我我我"},{label:"我问",value:"我我我"},
					],
					
					
					
		        }
		    },
			created(){
				let d=new Date();
				let date=d.getFullYear()
				this.currentDate=date;
				this.currentDate3=this.getDate();
				/* for(let i=0;i<=30;i++){
					this.selectList[i]={label:date-i,value:date-i};
				} */
				/* for(let i=10;i>=0;i--){
					this.selectList[i]={label:d-i,value:d-i};
				} */
				_self = this;
				this.cWidth=uni.upx2px(500);
				this.cHeight=uni.upx2px(540);
				this.getServerData3();//
				this.getServerData4();//
			},
			
		    methods:{
				tabChange: function (e) {
					var index = e.target.id.replace('tabTag-', '');
					this.swiperCurrentIndex = index;
					this.tabCurrentIndex    = index;
					this.titleShowId        = 'tabTag-'+index;
				},
				// 导航栏点击
				touchPie2(e){
					canvaPie2.showToolTip(e, {
						format: function (item) {
							return item.name + ':' + item.data 
						}
					});
				},
				onConfirm:function(val){
					this.city=val.result;
				},
				selectMonth:function(){
					this.$refs.city.show();
				}, 
				selectMonth1:function(){
					this.$refs.holiday.show();
				}, 
				onConfirm2:function(val){
					this.holiday=val.result;
				},
				
				
				
				
				
		        searchChange:function(e){
		            var key = e.detail.value;
		            this.searchKey = key;
		            if(key.length >= 1){
		                this.searchClose = true;
		            }else{
		                this.searchClose = false;
		            }
		        },
		        clearKey:function(){
		            this.searchClose = false;
		            this.searchKey   = "";
		        },
		        searchNow:function(){
		            uni.showToast({
		                title : '开始搜索 ' + this.searchKey,
		                icon  : "none"
		            });
		        },
				setKey : function(e){
					var key = e.currentTarget.dataset.key;
					uni.showToast({
					    title : '开始搜索 ' + key,
					    icon  : "none"
					});
				},
				getDate(type) {
					const date = new Date();
					let year = date.getFullYear();
					let month = date.getMonth() + 1;
					let day = date.getDate();
					month = month > 9 ? month : '0' + month;
					day = day > 9 ? day : '0' + day;
					return `${year}-${month}`;
				}
		    },
			components: {uniSegmentedControl,wPicker,rangeDatePick}
		}
</script>

<style>
	
</style>
