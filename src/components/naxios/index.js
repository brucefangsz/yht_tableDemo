import axios from 'axios';
export default function naxios(config, successCallback, errorCallback) {
	config.url = config.url + "?isAjax=1";
	console.log(config);
	axios(config)
		.then(function (res) {
			if (res.data && res.data.needrelogin) {
				parent.location.reload();
			}
			successCallback && successCallback(res)
		})
		.catch(function (error) {
			errorCallback && errorCallback(error)
		})

}