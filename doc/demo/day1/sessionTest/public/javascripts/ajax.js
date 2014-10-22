function parseJson(str)
{
	try
	{
		return new Function('return '+str)();
	}
	catch(e)
	{
		return null;
	}
}

function ajax(url, data, fnSucc, fnFaild)
{
	//准备
	data.t=Math.random();
	
	var arr=[];
	for(var i in data)
	{
		arr.push(i+'='+data[i]);
	}
	
	url+='?'+arr.join('&');
	
	//1.创建Ajax对象
	if(window.XMLHttpRequest)
	{
		var oAjax=new XMLHttpRequest();
	}
	else
	{
		var oAjax=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	//2.连接服务器（打开和服务器的连接）
	oAjax.open('GET', url, true);
	
	
	//3.发送
	oAjax.send();
	
	//4.接收
	oAjax.onreadystatechange=function ()
	{
		if(oAjax.readyState==4)
		{
			if(oAjax.status==200)
			{
				//alert('成功了：'+oAjax.responseText);
				fnSucc(oAjax.responseText);
			}
			else
			{
				//alert('失败了');
				if(fnFaild)
				{
					fnFaild();
				}
			}
		}
	};
}