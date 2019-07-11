export default{
	getWay:'http://192.168.0.214:8089',
	uploadImages : function(data, callback) {
		plus.nativeUI.showWaiting('正在上传...');
		const token = 'express ' + uni.getStorageSync('_token') || '{}';
		const uploadTask = uni.uploadFile({
			url: getWay + uploadImagesUrl, 
			header: {
				'Authorization': token, //自定义请求头信息
				'content-type': 'multipart/form-data',
			},
			filePath: data.imgSrc,
			name: 'file',
			formData: {
				'pathName':data.pathName
			},
			success: (uploadFileRes) => {
				plus.nativeUI.closeWaiting();
				let d=JSON.parse(uploadFileRes.data);
				if(d.code==1){
					callback(d.data.image);
				}else{
					uni.showToast({title:d.msg,icon:"none"});
					callback(false)
				}
			},
			fail: (e) => {
				plus.nativeUI.closeWaiting();
				plus.nativeUI.alert('图片上传失败,请稍后重试');
				console.info(JSON.stringify(e));
				callback(false);
			}
		});
		/* uploadTask.onProgressUpdate((res) => {
			console.log('上传进度' + res.progress);
			console.log('已经上传的数据长度' + res.totalBytesSent);
			console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
		}); */
	},

	getRequest:function (url, data, methods, callback) {
		const token = 'express ' + uni.getStorageSync('_token') || '{}';
		//console.info(JSON.stringify(token)) 
		//console.info(JSON.stringify(data))
		//console.info(JSON.stringify(getWay+url));
		uni.request({
			url: getWay + url,
			data: data,
			header: {
				'Authorization': token, //自定义请求头信息
				'content-type': 'application/x-www-form-urlencoded',
			},
			method: methods,
			success: (res) => {
				if (res.data.code == 1) {
					callback(res.data);
				} else {
					console.info(JSON.stringify(res))
					console.info(JSON.stringify('报错接口:'+url))
					uni.showToast({
						icon: 'none',
						title: res.data.msg||res.data.message,
						duration: 3000, 
						position:"bottom"
					});
					callback(false);
				}
			},
			fail: (e) => {
				uni.showToast({
					icon: 'none',
					title: '网络错误',
					duration: 3000,
					position:"bottom"
				});
				callback(false);
			}
		});
	}
}
