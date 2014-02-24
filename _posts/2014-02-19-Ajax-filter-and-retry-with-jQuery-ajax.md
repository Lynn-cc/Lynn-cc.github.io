---
layout: post_page
title: ajax filter and retry with jQuery ajax
tags: jquery ajax
category: jQuery
titleCN: 封装jQuery的ajax实现回调过滤
---

{% include copy.md %}

在[之前的文章里](/Cross-domain-by-iframe-with-jquery-ajax/)讲了封装jQuery方法实现ajax跨域，这次讲一下在封装jquery的ajax方法来实现对请求进行过滤以及重发，比如在请求成功的时候，如果返回数据异常，提示是否重新发送请求，或者统一对所有ajax的错误请求进行重发和统计等。

代码修改如下：

    cc.ajaxArr = [];
    cc.ajax = function(o) {
        var obj = {
            data: o,
            def: $.Deferred()
        };
        var sendNow;

        if (cc.crossAlready) {
            o.crossDomain = false;
            o.xhr = cc.ajaxXhr;
            sendNow = 1;

        } else if (cc.crossLoading) {
            cc.ajaxArr.push(obj);

        } else {
            cc.$ajaxIframe = $('<iframe id="ccajax" name="ccajax" src="http://somedomain.com/proxy.html" onload="cc.ajaxload()" style="display:none"></iframe>');
            $('body').append(cc.$ajaxIframe);
            cc.crossLoading = true;
            cc.ajaxArr.push(obj);
        }

        if (sendNow) {
            cc.sendAjax(obj);
        }

        return obj.def.promise();
    };

    cc.ajaxload = function() {
        var obj;
        cc.ajaxXhr = cc.$ajaxIframe[0].contentWindow.xmlHttp;

        for (var i = 0; i < cc.ajaxArr.length; i++) {
            obj = cc.ajaxArr.shift();
            obj.data.xhr = cc.ajaxXhr;
            obj.data.crossDomain = false
            cc.sendAjax(obj)
        }
        cc.crossAlready = true;
        cc.crossLoading = false;
    };

    cc.sendAjax = function(obj) {
        // 将success, error, complete参数都换成链式的done,fail,always
        // 酱紫才能统一做控制
        if (obj.data.success) {
            obj.def.done(obj.data.success);
            obj.data.success = null;
        }
        if (obj.data.error) {
            obj.def.fail(obj.data.error);
            obj.data.error = null;
        }
        if (obj.data.complete) {
            obj.def.always(obj.data.complete);
            obj.data.complete = null;
        }

        $.ajax(obj.data).then(function() {
            // 为成功回调做统一过滤
            cc.ajaxDoneFilter.call(this, arguments, obj);
        }, function() {
            // 为失败回调做统一过滤
            cc.ajaxFailFilter.call(this, arguments, obj);
        });
    };

    /**
     * cc.ajax成功的统一过滤函数
     * @this 同jQuery ajax回调函数的默认this
     * @param {Object} jQuery ajax的回调的默认参数的原arguments对象，包含：data, status, jqXHR
     * @param {Object} 自定义的cc.ajax的缓存对象，包含:
     *      data：调用cc.ajax的所有参数
     *      def： cc.ajax返回的中间Deferred对象,改变此对象状态用以触发原回调函数
     */
    cc.ajaxDoneFilter = function(arg, obj) {
        var d = arg[0];
        if (d.result === -1) {
            // 触发提示重发逻辑
            cc.doSomething(function(retry){
                if (retry) {
                    // 如果真的悲剧的要重新发请求的话。。。
                    // 就再调用cc.ajax吧。。。
                    // 记得用最后发送成功的this和arguments
                    // 这里没有限制重试次数
                    cc.ajax(obj.data).then(function() {
                        obj.def.resolveWith(this, arguments);
                    }, function() {
                        obj.def.rejectWith(this, arguments);
                    });
                } else {
                    obj.def.resolveWith(this, arg);
                }
            });
        } else {
            // 不做过滤处理直接触发回调
            obj.def.resolveWith(this, arg);
        }
    };

    // cc.ajax的失败统一过滤函数，参数等同cc.ajaxDoneFilter
    // 这里可以用来统计错误
    cc.ajaxFailFilter = function(arg, obj) {
        // 注意：这里也没有限制重试次数
        setTimeout(function() {
            cc.ajax(obj.data).then(function() {
                obj.def.resolveWith(this, arguments);
            }, function() {
                obj.def.rejectWith(this, arguments);
            });
        }, 100);
    };

    cc.doSomething = function(callback) {
        callback(confirm('出错了！是否重发请求?'));
    }
