function XHR(){
	var jsonToParams = function (json){
		var res = "";
		for (var attr in json){
			if(res===""){
				res = attr+'='+json[attr]
			}else{
				res+='&'+attr+'='+json[attr];
			}
		}
		return res;
	}
	var xmlObject= null;
	var data=null;
	var err=null;
	
	var xhr = function(method, url, params, callback){
		try{
		    xmlObject = new XMLHttpRequest();
			xmlObject.onreadystatechange=function(){
				if(xmlObject.status===200&&xmlObject.readyState===4){
					data = JSON.parse(xmlObject.responseText);
					callback(null,data)
				}//else{
					//err= xmlObject.status;
					//callback(err,null);
				//}
			}
		xmlObject.open(method,url,true);
		xmlObject.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		if(method==="post"){
			xmlObject.send(params);
		}else{
			xmlObject.send();
		}
		
		}catch(err){
			callback(err,null)
		}
	}
	this.get=function(url,params,callback){
		params =typeof params==="string"?
				params:jsonToParams(params);
		url+="?"+params;
		xhr("get",url,params,callback);
	}
	
	this.post=function(url,params,callback){
		params = typeof params==="string"?
				params:jsonToParams(params);
		xhr("post",url,params,callback);
	}
	
	this.put=function(url,params,callback){
		params =typeof params==="string"?
				params:jsonToParams(params);
		url+="?"+params;
		xhr("put",url,params,callback);
	}
	
	this.delete=function(url,params,callback){
		params =typeof params==="string"?
				params:jsonToParams(params);
		url+="?"+params;
		xhr("delete",url,params,callback);
	}
}