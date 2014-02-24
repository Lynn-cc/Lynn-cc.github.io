---
layout: post_page
title: Cross-domain by iframe with jQuery ajax
tags: jquery iframe cross-domain deferred
category: jQuery
titleCN: 封装jQuery的ajax实现iframe跨域
---

{% include copy.md %}

这次讲一下在封装jquery的ajax方法来实现iframe跨域的实践。

其实本身直接封装一下ajax方法，让它能用iframe跨域是很容易的，这是第一次的代码：

    cc.ajaxArr = [];
    cc.ajax = function(o) {
        if (cc.crossAlready) {
            o.crossDomain = false;
            o.xhr = cc.ajaxXhr;
            return $.ajax(o);

        } else if (cc.crossLoading) {
            cc.ajaxArr.push(o);

        } else {
            cc.ajaxArr.push(o);

            cc.crossLoading = true;

            cc.$ajaxIframe = $('<iframe id="ccajax" name="ccajax" src="http://somedomain.com/proxy.html" onload="cc.ajaxload()" style="display:none"></iframe>');
            $('body').append(cc.$ajaxIframe);
        }
    };

    cc.ajaxload = function() {
        var len = cc.ajaxArr.length;
        cc.ajaxXhr = cc.$ajaxIframe[0].contentWindow.xmlHttp;

        for (var i = 0; i < len; i++) {
            var o = cc.ajaxArr.shift();
            o.xhr = cc.ajaxXhr;
            o.crossDomain = false
            $.ajax(o);
        }
        cc.crossAlready = true;
        cc.crossLoading = false;
    };

但是这样做会有一个问题：jQuery下是鼓励这样写回调函数的：

    $.ajax({
        data: {test: 1},
        dataType: 'json'

    }).done(function(data) {
        console.log('success', data);

    }).fail(function(jqXhr, status) {
        console.log('failed', status);
        
    });


$.ajax返回的是一个[$.Deferred](http://api.jquery.com/jQuery.Deferred/)对象，是一个js异步的解决方案。关于它的介绍可以参考文档，或者[这篇文章](http://www.ruanyifeng.com/blog/2011/08/a_detailed_explanation_of_jquery_deferred_object.html)。

而我们希望cc.ajax的调用方式和$.ajax可以完全一样。

在上面的改写方式下，如果是iframe还没有加载好，那么cc.ajax是没有返回值的，所以不能这样链式添加回调函数。 

于是对cc.ajax做了改写：

    cc.ajaxArr = [];
    cc.ajax = function(o) {
        var obj;
        if (cc.crossAlready) {
            o.crossDomain = false;
            o.xhr = cc.ajaxXhr;

            return $.ajax(o);

        } else if (cc.crossLoading) {
            obj = {
                data: o,
                def: $.Deferred()
            };
            cc.ajaxArr.push(obj);
            return obj.def;

        } else {
            cc.$ajaxIframe = $('<iframe id="ccajax" name="ccajax" src="http://somedomain.com/proxy.html" onload="cc.ajaxload()" style="display:none"></iframe>');
            $('body').append(cc.$ajaxIframe);
            cc.crossLoading = true;

            obj = {
                data: o,
                def: $.Deferred()
            };
            cc.ajaxArr.push(obj);

           return obj.def;
        }
    };

    cc.ajaxload = function() {

        cc.ajaxXhr = cc.$ajaxIframe[0].contentWindow.xmlHttp;
        var len = cc.ajaxArr.length;
        for (var i = 0; i < len; i++) {
            var obj = cc.ajaxArr.shift();
            obj.data.xhr = cc.ajaxXhr;
            obj.data.crossDomain = false
            $.ajax(obj.data).then(function() {
                obj.def.resolveWith(this, arguments);
            }, function() {
                obj.def.rejectWith(this, arguments);
            });
        }
        cc.crossAlready = true;
        cc.crossLoading = false;
    };
