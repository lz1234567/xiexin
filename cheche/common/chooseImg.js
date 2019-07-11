function chooseImg(sourceType,callback){
	uni.chooseImage({
		count: 1, //默认9
		sizeType: ['compressed'], //可以指定是原图还是压缩图
		sourceType: [sourceType], //album 从相册选图，camera 使用相机，
		success: function (res) {
			callback(res);
		},
		fail:function(err){
			callback(false);
		}
	});
}
module.exports={
	chooseImg:chooseImg
}