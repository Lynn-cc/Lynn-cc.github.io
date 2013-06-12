---
layout: post_page
title: New Layouts for the Multi-Deivce Web
tags: design multi-devices
category: Design
published: false
titleCN: 设计新的多设备兼容的网页布局
---

原文：[New Layouts for the Multi-Deivce Web](http://www.lukew.com/ff/entry.asp?1721)

翻译：[@麟儿丶](http://weibo.com/13511031)

大多数网页，都是给用鼠标键盘的笔记本电脑或者台式电脑设计的。随着上网的设备种类越来越多，这些设计已经落后了。设计现在的网页，意味着必须考虑单手使用的智能手机，双手操作的平板电脑，使用鼠标键盘输入的传统PC，混合设备等。网页布局必须去解决这些现实问题。

----------

####新的现状
随着设备种类的增加，人们和网页交互的方式也变得更多了。要知道交互设计和布局对某种设备的影响，可以看[以下三点](http://www.lukew.com/ff/entry.asp?1485)：有大众化的屏幕作为输出，支持输入的类型，普遍的交互方式（这点会主要受输入输出的功能的影响）。例如，考虑智能手机。

如今的智能手机定义为手掌大小（一般是3-5英寸），有不同的像素，多点触控输入，在半手臂远的地方单手使用。一个[最近的调查](http://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php?)，针对在路上使用智能手机的1333人，发现大约75%的使用单手。网页布局需要考虑这个[现实情况](http://www.lukew.com/ff/entry.asp?1664)。

![thumb use of smartphones](http://static.lukew.com/rinput_phone_use.png)

平板电脑同时还支持多点触控，但是他们有着更大的屏幕（7-10英寸），这会影响他们的交互方式。这种大屏幕显然一只手是不够舒服的，所以使用双手更普遍一些。两手触控来交互的话，屏幕两侧能更好的使用简单是手势。随着[平板的不断发展](http://www.lukew.com/ff/entry.asp?1692)，网页设计需要将这些现实情况考虑到。

![tablet postures](http://static.lukew.com/rinput_tablet_use.png)

搭载了触摸，鼠标，键盘的输入的混合设备同样在变得普遍起来。在这些设备上，触摸交互的使用比人们想象的要频繁得多。一个[网上的调查](http://software.intel.com/en-us/articles/the-human-touch-building-ultrabook-applications-in-a-post-pc-age/)显示，这种设备的交互，77%是触摸屏，12%是鼠标，8%是键盘。同样的，屏幕的尺寸和人们使用的方式影响着交互设计。为了避免手臂悬在空中的疲劳，人们会放松他们的手臂和手肘在平面上，再使用触摸屏幕来进行输入。

![hybrid device posture](http://static.lukew.com/rinput_hybrid_use.png)

除了这些设备之外，我们还有很多的使用传统鼠标和键盘的平板和桌面设备需要在设计时考虑到。

####为多种设别和多种输入方式而设计
[Topic pages on
Polar](http://polarb.com/polls/tags/webdesign)也曾经为不同屏幕尺寸，甚至不同输入方式做过专门的适应设计。最终的结果就是适应了这些现状的Web界面得到了使用。特别的，在有关人们怎么与不同设备交互的人体工程学里：在智能手机使用一只手；在平板电脑两只手在两侧使用；鼠标滚动，点击，键盘快捷键无论在哪里都能用。

在只能手机里，Polar topic pages着重于通过设计大的可触摸的按钮和一个可滑动的单列内容的方式来[单手使用](http://www.lukew.com/ff/entry.asp?1664)。我们也会着重于在人们通过手机请求内容时少次多量地下载。在其他设备，我们自动在你滚动的时候加载更多内容。

![Polar topic on small screens](http://static.lukew.com/rinput_polar_small.png)

在更大的只能手机屏幕和更小的平板（你非要叫它平板手机也行），我们增加了内容的尺寸，还着重保持了触摸输入方式。然而，我们还同样需要对键盘的支持。但我们还没有促进实施这个计划，至少现在没有。

在平板尺寸大小的屏幕上，我们在屏幕的左边加入了一个浏览栏，可以快速查看内容和在右栏打开对应内容。这是希望在人们双手可以舒服的放在设备两侧，从而更好的用两手使用平板。

![Polar topic pages on small medium screens](http://static.lukew.com/rinput_polar_medsmall.png)

从一般的平板大小到笔记本和混合设备都在这个范围。
