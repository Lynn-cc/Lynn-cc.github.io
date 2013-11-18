---
layout: post_page
title: Debug web pages with Charles
tags: debug tool
category: tools
titleCN: 利用Charles调试网页
---

[@麟儿丶](http://weibo.com/13511031)原创,转载请注明出处

[Charles](http://www.charlesproxy.com/)是一个非常棒的代理工具,下面分享一些常用功能

_注：基本所有的charles设置都可以使用通配符，有部分可以使用正则表达式（一般需勾选Regex框）_

###基本配置

####设置全局代理
_Proxy - Mac OS X Proxy_

MAC下是这个勾选项，还有一个是Mozilla Firfox Proxy

一般直接勾选全局代理就好了。不要忘记勾选了，不然刷新半天木有记录，可能还找不到原因。。

然后点击第一个带＋的图标，开启一个session，界面上那个红点图标在选中态才是正在记录中，否则该session就是空闲状态哦。

弱弱说一句，Charles这些体验有一点点复杂了，新手容易进来找不到方向，半天不明白为什么没有记录到请求～

所以在这就啰嗦了几句。


####设定需要被记录的请求/响应的匹配规则

_Proxy - Recording Settings_

用Include和Exclude设置匹配，只有include包含了且未被exclude包含的请求才会被记录到Session中,若include空，则记录所有请求

![设置include](http://pic.yupoo.com/babyliner1026/DjX3dVga/klTNu.png)

####设定始终不用缓存

_Tools - No Caching_

勾选Enable No Caching,这个一般大家默认都会用到的吧


### 个性规则配置


####设定文件本地替换
_Tools - Map Local_

勾选enable map local，charles就可以按照规则，把请求的对应目录（或文件）换成本地的目录（或文件）

_小tip：弹出的编辑窗里不用麻烦地挨个填，把整个网址输到host，它会自动帮你把网址解析成host、path、query等几部分的_

我做了一个整个目录的替换示例：

![本地替换规则](http://pic.yupoo.com/babyliner1026/DjXTbWaR/AuDYg.png)


####设定重写请求/响应规则

_Tools - Rewrite_

这个是我认为Charles里比较重要的一个功能，和 Map Local配合非常好用。

先设定好规则组，需要用的时候勾选Enable Rewrite，再勾选需要用到规则组就好了。

我工作中的需求是本地替换，就是把请求js文件替换成本地对应的文件，这样就可以:编辑-保存-刷新 三步调试了。

这里不能只用map local，是因为js文件在被上传到服务器的时候会自动加上日期后缀，还有可能有a-z每日版本后缀。这样是为了保证版本更新迭代不会受到缓存的影响。当然也方便回退版本等，这种加后缀应该很多网站都有用到。所以，替换要求是这样的：


请求 http://mat1.gtimg.com/www/mb/js/mi_131114b.js
	
需要被替换成对应的本地文件 (workDir)/js/mi.js

现在就来开始设置吧：

先在左边add一个规则分组

右边修改分组名字，可选只对某些固定地址才使用，最下面是添加需要的重写规则，可以写多条。

我把url进行了重写，见图：

![设置请求修改规则](http://pic.yupoo.com/babyliner1026/DjXTaN14/8AFNC.png)

这样设置之后

http://mat1.gtimg.com/www/mb/js/mi_131114b.js 这个请求就会变成

http://mat1.gtimg.com/www/mb/js/mi.js

然后，由于刚才设置了Map Local本地替换
所以这个被修改后的请求，会被指向本地的(workDir)/js/mi.js

这就完成了稍微复杂一点的替换功能了

Rewrite功能很强大的，包括header的增删改和param的增删改，还有body修改等。大家可以尽情发挥修改请求和替换文件目录的创意～


####为其他设备做代理

_proxy - proxy setting_

charles的另外一个比较常用的功能，就是为同一个局域网内的其他设备做代理，这样，就可以方便移动设备的调试了。

只需要勾选Enable transparent HTTP proxying，默认使用8888端口

然后在移动设备上设置代理地址：电脑的ip:8888 就可以了

现在就可以通过charles查看移动设备的所有请求了，同样可以对请求进行规则重写。

电脑本地编辑，保存，刷新移动设备，这样调试很简单吧！


####其他偶尔用到的功能
* Proxy - Throttle Setting
    这是网络延迟功能，可以测试慢网速下的体验效果
* Tool - Map Remote
    类似Map Local，只是替换成的是一个另网址，而不是本地路径
	

Charles还有很多其他的功能，比较反向代理，断点，保存完整请求什么的，只是lz木有用过，所以就只有大家自己去体验吧～
另外，Charles缺少一个我很需要的功能，就是host切换，这倒是有一点点小小的遗憾。

楼主是blog新手，如有错误请见谅and请告诉我，Thanks~~
