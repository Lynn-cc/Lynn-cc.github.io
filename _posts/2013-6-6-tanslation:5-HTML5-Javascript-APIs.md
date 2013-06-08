---
layout: post_page
title: 5 HTML5 Javascript APIs
keywords: HTML5, Javascript, API
---

原文:[5 HTML5 Javascript APIs to keep an eye on](http://daker.me/2013/06/5-html5-javascript-apis-to-keep-an-eye-on.html)

翻译:[@麟儿丶](http://weibo.com/13511031)

在我的上一篇文章中，讲的是HTML5 API，所以，接下来写一些旧的新的Javascript API应该也会很有意思。CSS正在不断强化，直到今天，可以用纯CSS实现过去必须由Javascript来完成的事情，而另一方面，Javascript也必须强化来跟随这个变革，所以现在Javascript可以做非常多的事情了，比如，访问硬件（摄像头、麦克风、游戏手柄、GPU），还有访问文件系统和Websocket。




####电池状态API

电池状态的API使任何网页都可以通过Javascript来检查设备（笔记本电脑、手机或平板电脑）的电池状态。

    var battery = navigator.battery ||
    navigator.webkitBattery || navigator.mozBattery

    console.log("Battery charging: ", battery.charging); // true
    console.log("Battery level: ", battery.level); // 0.58
    console.log("Battery discharging time: ", battery.dischargingTime);

正如你所看到的，你需要额外做一些检查来保证代码的浏览器兼容性。我做了一些研究，找到了battery.js，它对电池API进行了简单的封装。

    if(Battery.isSupported()) {
        // Get the battery status
        var status = Battery.getStatus();
        console.log('Level: ' + Math.floor(status.level * 100) + '%'); // 30%
        console.log('Charging: ' + status.charging);                   // true
        console.log('Time until charged: ' + status.chargingTime);     // 3600 (seconds) or Infinity
        console.log('Battery time left: ' + status.dischargingTime);   // 3600 (seconds) or Infinity
        // Register a handler to get notified when battery status changes
        Battery.onUpdate = function(status) {
            console.log(status); // {level, charging, chargingTime, dischargingTime}
        };
    }

浏览器支持:
- chrome16.0
- Firefox 19

####手柄API
手柄API使你可以把你的游戏手柄连接到电脑并用它来玩浏览器上的游戏。在HTML5游戏的日益出名，这个API在未来会发挥重要作用。

    navigator.gamepads = navigator.webkitGamepads || navigator.MozGamepads;
    var requestAnimationFrame = window.webkitRequestAnimationFrame ||
                                window.mozRequestAnimationFrame;
    var cancelAnimationFrame = window.webkitCancelAnimationFrame ||
                               window.MozCancelAnimationFrame;
    var controllers = {}; // Stash connected controllers.
    var reqId = null;

    function onConnected(e) {
        controllers[e.gamepad.index] = e.gamepad;
        runAnimation();
    }

    function onDisconnected(e) {
        delete controllers[e.gamepad.index];
        cancelAnimationFrame(reqId);
    }
    window.addEventListener('webkitgamepadconnected', onConnected, false);
    window.addEventListener('webkitgamepaddisconnected', onDisconnected, false);
    window.addEventListener('MozGamepadDisconnected', onDisconnected, false);
    window.addEventListener('MozGamepadConnected', onConnected, false);

来自:[The Edge of HTML5](https://html5-demos.appspot.com/static/html5-therealbleedingedge/template/index.html#27)

浏览器支持：
- chrome:3.6
- Firefox:21

有个[gamepadjs](http://www.gamepadjs.com/)的库，会让你更加容易地使用这个API。

####设备方向感应API

使用设备方向感应API，可以和重力感应一样，确定设备当前移动的方向（x、y、z）。

来自[html5rocks.com](html5rocks.com)

![重力感应示意图](http://daker.me/assets/posts/deviceorientation.png)

    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(event) {
            var a = event.alpha,
                b = event.beta,
                g = event.gamma;
            console.log('Orientation - Alpha: ' + a + ', Beta: '+ b + ', Gamma: ' + g);
        }, false);
    } else {
        console.log('This device does not support deviceorientation');
    }

浏览器支持
- chrome:3.6
- Firefox:7.0
- Opera:15.0

使用这个API的话，设备必须有陀螺仪，更多关于浏览器的支持情况，可以查看caniuse.com

####地理位置API

地理位置API，可以让你分享你的地理位置信息给信任的网站。Javascript可以在页面上得到经纬度信息，反过来，还可以发送到远程服务器，做一些有趣的基于地理位置的事情，比如找附近的企业，或者在地图上标出你的位置，同时也能用于地理位置有关的内容，如照片。

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude,
                lon = position.coords.longitude;
            console.log('Geolocation - Latitude: '+ lat +', Longitude: '+ lon);
        });
    }
    else {
        console.log('Geolocation is not supported for this Browser/OS version yet.');
    }

浏览器支持：
- Chrome:3.5
- Firefox:5.0
- Opera:10.6
- IE:9.0
- Safari:5.0

更多浏览器的支持情况，请查看[caniuse.com](caniuse.com)
    
####页面可见API

这个API可以设置页面是否可见。当把页面最小化，或者切换其他tab的时候，一个可见性事件会被触发，如果你是个游戏开发者，这将非常有用，当用户切换页面的时候，你可以将游戏暂停。

    document.addEventListener('visibilitychange', function(e) {
        console.log('hidden:' + document.hidden,
                  'state:' + document.visibilityState)
    }, false);

浏览器支持
- Chrome:10.0
- Firefox:14.0
- Opera:12.1
- IE:10.0

更多浏览器的支持请查看[caniuse.com](caniuse.com)
