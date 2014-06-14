---
layout: post_page
title: Draw beautiful charts with Highchart.js (2)
tags: highchart
category: highchart
titleCN: 使用Highchart库做漂亮图表---通用API简介
---

{% include copy.md %}

上次讲了Highcharts的API基本理解，这次讲一下一些对大多数图表都通用的一些配置和技巧。

####color

[官方文档](http://www.highcharts.com/docs/chart-design-and-style/colors)


highcharts的color很有意思，可以有N种表示，包括名称颜色，16进制颜色，RGB颜色，RGBA颜色，线性渐变和径向渐变。应用渐变和半透明颜色会让图表非常好看。


- 线性渐变：

  _Tips：起点是左上角，正数是右下方向，单位是px。另外，由于配置中会用到的颜色特别多，建议定义变量来控制而不是直接写颜色值到配置里。_

        fillColor: {
           linearGradient: [0, 190, 0, 0], // x起点，y起点，x终点，y终点
           // 或者
           // linearGradient: { x1: 0, x2: 0, y1: 0, y1: 1 },
           stops: [
              [0, '#1b6a6e'],
              [0.5, 'grey'],
              [1, 'rgba(94, 235, 219, 0.8)']
           ]
        }

- 径向渐变：

        color: {
            radialGradient: { cx: 0.5, cy: 0.5, r: 0.5 },
            stops:
               [0, '#003399'],
               [1, 'rgb(200, 75, 120)']
            ]
        }


####format和formatter

  很多时候，我们渲染的数据都需要一些过滤处理再显示，比如需要把前三的数据高亮显示，或者为0的数据不显示等。这个时候就选择性的使用对应属性下的`format`/`formatter`配置。`dataLabel`, `tooltip`, `labels`等都有这两个属性。对了，如果使用html记得把`userHTML`设置为`true`。
  
- `format`属性可控范围比较低：

        format: '数量: {y}'

- `formatter`就比较灵活一些(`this`里的值可以参看文档或者直接在控制台输出来查看)：

        formatter: function() {
           if (this.point.x === 0) return;
           // 这里加上一个class就可以更灵活的对样式进行控制了
           return '<span class="words">' + parseInt(this.percentage * 10) / 10 + '% <br />' + this.point.name + '</span>';
        }
      
        // 这里是提前对数据做了排序处理，并加入了自定义属性
        formatter: function() {
           var top = this.point.topN;
           return top < 6 ? 'TOP' + (top + 1) : '';
        }

####dashStyle

[官方DEMO](http://jsfiddle.net/gh/get/jquery/1.7.1/highslide-software/highcharts.com/tree/master/samples/highcharts/plotoptions/series-dashstyle-all/)

highcharts的line样式非常多，而且不是像css那样定义的，不多说，见文档


####xAxis与yAxis

x轴和y轴的设置是相对复杂的一类，因为太多东东可以控制了。比如:

- lineXXX:      指主轴,包括`lineWidth`,`lineColor`,还有`offset`,`min`,`max`,`minPadding`,`maxPadding`

- gridLineXXX:  指基准线,包括`gridLineColor`,`gridLineDashStyle`,`gridLineWidth`,`gridZIndex`,`alternateGridColor`

- tickXXX:      指轴上的每个小节点,包括`tickColor`,`tickInterval`,`tickLength`,`tickPixelInterval`,`tickPosition`,`tickPositioner`,`tickPositions`,`tickWidth`,`tickmarkPlacement`，以及`minTickInterval`，还有`startOnTick`,`endOnTick`

- minorXXX:     这个用得比较少，指的是次轴的设置,其设置内容类似主轴


其中width,color,offset,zIndex什么的都是简单的样式控制。

讲一下比较难理解的tick的部分：
- `tickWidth`, `tickLength`: 这两个分别是小节点那个方块的长和宽,默认是一个针样子，即10px长，1px宽

- `tickInterval`, `tickPixelInterval`, `minTickInterval`：

  节点之间的间隔，多种计算方式，第一种`tickInterval`是普通的依照轴所代表的值来计算，比如时间轴就是毫秒，那么设置为1000 * 60 * 60 就是一小时为单位，实际使用中建议不这样用，因为大多数时候，我们只是希望它至少是小时或天，如果间隔过大，希望是自动使用更高的间隔，所以可以设置`minTickInterval`，另外在逻辑类是轴上，可以使用阶乘的方式计算间隔，详情见[文档](http://api.highcharts.com/highcharts#xAxis.tickInterval)。

  `tickPixelInterval`：比较容易理解，就是像素距离，不设置`tickInterval`情况下可以生效，这样保证无论数据什么样，节点的距离都是一样的，数值间隔会被自动计算。

- `tickmarkPlacement`：是种类的轴用的（例如苹果，梨，香蕉这种轴），设置节点是在每一个分类的中间位置还是每两个分类之间位置

- `tickPosition`：是说节点在轴内侧还是外侧

- `tickPositioner`, `tickPositions`：

  这两个和`tickInterval`那三个有关系，当希望不是以固定的间隔或逻辑间隔来设置每个节点的时候，可以完全自定义节点值，其中`tickPositions`是直接设置一个数值数组，数组中的值才有对应节点，而`tickPositioner`是函数，同样返回一个数组，函数优点在于上下文里可以读取很多内容，方便用于计算，比如dataMin，dataMax等

- `startOnTick`, `endOnTick`：是否显示第一个节点和最后一个节点


####DEMO
现在，我把上面学的东东都用一遍吧！
[_DEMO>>_](/demo/2014-06-13-Draw-Beautiful-Charts-with-HighchartsJs-2/index.html)


####代码
代码(有一段计算高低顺序的代码没有贴，可以在demo里看源码)：
先定义好所有要用的颜色：

    var constelColors = [
      ['rgba(19,198,174,0.8)','rgba(17,149,177,0.8)'],
      ['rgba(61,227,242,0.8)','rgba(57,117,216,0.8)'],
      ['rgba(243,94,85,0.8 )','rgba(241,45,74,0.8)' ],
      ['rgba(76,105,211,0.8)','rgba(21,54,122,0.8)' ],
      ['rgba(139,58,144,0.8)','rgba(75,35,117,0.8)' ],
      ['rgba(238,203,12,0.8)','rgba(233,158,14,0.8)']
    ];

    var colorDef = {
      xyLine: '#1b6a6e',                  // xy主轴
      bg: 'rgba(0, 0, 0, 0)',             // 背景透明
      greyCol: 'rgba(218,218,218,0.8)',   // 柱状图灰色柱
      gridLine: 'rgb(200, 200, 200)'      // xy虚线
    };

还记得上一篇文章里的plotOptions么

    var plotOptions = {
      column: {
        groupPadding: 0,
        borderRadius: 4,
        borderWidth: 0,
        color: colorDef.greyCol,
        colorByPoint: true,
        minPointLength: 20, // 最小柱高度
        pointPadding: 0.05,
        pointPlacement: '0.5',
        threshold: 0,
        dataLabels: {
          color: 'white',
          verticalAlign: 'top',
          enabled: true,
          inside: true,
          formatter: function() {
            var top = this.point.topN;
            return top < 6 ? 'TOP' + (top + 1) : '';
          }
        },
        states: {
          hover: {
            brightness: 0.05
          }
        }
      }
    };

以下是对x和y轴的配置：

    $('body').append($('<div class="demo"></div>').highcharts({
      chart: { type: 'column' },
      series: [{ data: data }],
      xAxis: {
        lineWidth: 1,
        lineColor: colorDef.xyLine,
        startOnTick: false,
        endOnTick: false,
        gridLineWidth: 1,
        gridLineColor: colorDef.gridLine,
        gridLineDashStyle: 'ShortDash',
        tickmarkPlacement: 'on',
        tickColor: colorDef.xyLine,
        tickWidth: 1,
        offset: 0,
        tickPosition: 'inside',
        type: 'category',
        labels: {
          y: 18,
          formatter: function() {
            return '<span class="xWords">' + ((this.value + '').match(/\d+/) ? '' : this.value) + '</span>';
          },
          useHTML: true
        }
      },
      yAxis: {
        lineWidth: 1,
        lineColor: colorDef.xyLine,
        startOnTick: false,
        endOnTick: false,
        gridLineColor: colorDef.gridLine,
        gridLineDashStyle: 'ShortDash',
        tickColor: colorDef.xyLine,
        tickWidth: 1,
        tickInterval: 5,
        tickPosition: 'inside',
        minTickInterval: 5,
        labels: {
          formatter: function() {
            return '<span class="yWords">' + this.value + '%</span>';
          },
          useHTML: true
        }
      },
      tooltip: { enabled: false }
    }));

