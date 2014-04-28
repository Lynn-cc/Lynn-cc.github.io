---
layout: post_page
title: Draw beautiful charts with Highchart.js
tags: highchart
category: highchart
titleCN: 使用Highchart库做漂亮图表---API基础
---

{% include copy.md %}

[Highchart](http://www.highcharts.com/)是一个非常流行的绘制图表的库，不过由于太过于强大和没有中文文档，许多同学表示很忧桑，博主最近刚好两个项目都在使用这个库，经过一系列痛苦折磨的学习摸索过程之后，终于能轻松地想让它画成啥样就啥样了。。。
所以楼主准备把学到的干货(血泪史)都写出来分享给大家，当然，由于耐性有限，不保证能持续更新。同时经验属于个人摸索，也不保证权威性，有问题的话以官方api为准。。。

####基本介绍
highcharts是基于jquery的，有以下几个js库：
 - `highcharts.js                 `   最常用的一些图表都可以绘制
 - `highstock.js                  `   包含了highcharts的所有功能，主要为时间为X轴的图表提供了更强大的支持
 - `highmaps.js                   `   对地图绘制支持的扩展库
 - `highcharts-more.js            `   提供更多不常用图表的支持
 - `modules/exporting.js          `   输出为图片的扩展支持
 - `adapters/mootools-adapter.js  `   为mootools做适配
 - `adapters/prototype-adapter.js `   为prototype做适配


一般我们使用highcharts或者highstock就可以了。官网有很多demo可以看，所以本文主要讲api结构的理解和使用方面，让大家可以更好的运用到实际工作需求中。

关于每个配置项是什么意思，请查看[官网入门](http://www.highcharts.com/docs/chart-concepts/understanding-highcharts/)，上面有图片更易理解。

highcharts的图表有一个设置全局的初始默认配置的方法，`Highcharts.setOptions`，配置项与单独图表的配置一样。下面是一个示例:

常用的统一设置还有语言`lang`，和`xAxis`的`dateTimeLabelFormats`这种

    Highcharts.setOptions({

        // 全部图表不需要title
        title: {text: ''},


        // 默认颜色取值数组
        colors: ['#1fbba6', '#3be3cc', '#8e8c8c', '#a6a6a6', '#bfbebe', '#dadada'],

        // 不要显示图表备注信息
        credits: { enabled: false },

        // tooltip的统一样式
        tooltip: {
            borderColor: 'white',
            backgroundColor: 'white',
            shadow: false,
            style: {
                fontSize: '14px'
            }
        },

        // 全部不需要图例
        legend: { enabled: false },

        // y轴全部不要title
        yAxis: { title: {text: ''} },

        // plotOption见下文介绍
        plotOptions: plotOptions,

        // chart统一设置为左侧无边距，不能重新适配绘制，统一背景颜色
        chart: {
            spacingLeft: 0,
            reflow: false,
            backgroundColor: '#efefef'
        }
    });

接下来就可以单独绘制每一个图表了，常用的图表类型是线性(line)，区域型(area)，柱状图(column)，饼状图(pie)。

一般一个dom就绘制一个图表，它的类型在`chart->type`里设置，默认都是line的。(当然可以一个dom里绘制多个图表，像官网首页那样，这个暂不介绍)。

全局配置中有一个plotOption，这是用来对每种类型的图表绘制做单独的配置的。和当前chart的type一致的配置会被应用，其中series中的配置是针对所有类型的。示例：

    var plotOptions = {

        // 饼状图
        pie: {
            startAngle: -180,
            endAngle: 180,
            innerSize: 190,
            size: 225,
            borderWidth: 0
        },

        // 区域图
        area: {
            fillColor: {
                linearGradient: [0, 190, 0, 0],
                stops: [
                    [0, 'rgba(0, 243, 255, 0.1)'],
                    [1, 'rgba(0, 243, 255, 0.8)']
                ]
            },
            lineWidth: 2,
            tooltip: {
                shape: 'callout'
            }
        },

        // 柱状图
        column: {
            borderRadius: 4,
            borderWidth: 0,
            minPointLength: 20 // 柱的最小高度
        },

        // 所有类型
        series: {
            tooltip: {
                shape: 'quare'
            }
        }
    };

上面的配置中，有两个和全局配置一样的tooltip。

这就要说到新学highcharts的时候了，同一个配置名，散落在api文档的无数地方，完全搞不懂怎么回事，其实这就是面向对象的思想嘛。

 - `全局配置`和`单个图表配置`是继承关系。
 - `plotOption->series`和`plotOption->[type]`是继承关系。
 - `plotOption->series`和`单个图表->series`是抽象和实例的关系，因为后者有一个data是用来放最终绘制的数据的。

不过博主面向对象学得不好，不知道上面这样说对不对。

总之，使用的同学需要根据这个配置的适用范围，来选择放置的位置。虽然是继承关系，不过并不一定每层的可配置项和上一层都是一样的。

如果你就画一个图表就不用考虑了，全部扔进单个配置就好了。。。

加上上面的代码，我们来画三个色调统一，tooltip效果一致的不同类型图表吧! [_DEMO>>_](/demo/2014-04-28-Draw-Beautiful-Charts-with-HighchartJs/index.html)

    $('<div></div>').highcharts({
        chart: {
            type: 'area'
        },
        xAxis: {
            type: 'datetime'
        },
        series: [{
            name: '每天心情',
            data: areaData
        }]
    }).attr('class', 'demo').appendTo($('body'));
    
    $('<div></div>').highcharts({
        chart: {
            type: 'column'
        },
        xAxis: {
            categories: ["水瓶", "双鱼", "白羊", "金牛", "双子", "巨蟹", "狮子", "处女", "天秤", "天蝎", "射手", "摩羯"]
        },
        series: [{
            name: '星座数值',
            data: columnData
        }]
    }).attr('class', 'demo').appendTo($('body'));
    
    $('<div></div>').highcharts({
        chart: {
            type: 'pie'
        },
        series: [{
            name: '年龄分布',
            data: pieData
        }]
    }).attr('class', 'demo').appendTo($('body'));
