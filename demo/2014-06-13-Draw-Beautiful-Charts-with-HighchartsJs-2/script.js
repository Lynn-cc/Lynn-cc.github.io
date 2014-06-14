var constelData = [["白羊",6],["金牛",6],["双子",6],["巨蟹",0],["狮子",0],["处女",17],["天秤",22],["天蝎",11],["射手",6],["摩羯",22],["水瓶",0],["双鱼",6]];

// top6的柱是渐变彩色的
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

Highcharts.setOptions({
  title: {text: ''},
  credits: { enabled: false },
  legend: { enabled: false },
  yAxis: { title: {text: ''} },
  plotOptions: plotOptions,
  chart: {
    spacingLeft: 0,
    reflow: false,
    backgroundColor: colorDef.bg
  }
});

(function(data) {
  var swapData = {};

  // 保存当前所有类别及顺序
  var constels = $.map(data, function(v) { return v[0]; });

  // 排序再更改每条数据的详细设置
  data.sort(function(a, b) { return b[1] - a[1]; });

  $.each(data, function(index, obj) {
    var name = obj[0];
    var value = obj[1];
    if (index < constelColors.length) {
      swapData[name] = {
        name: name,
        y: value,
        topN: index, // 自定义属性，方便对前几名做特殊处理
        color: {
          linearGradient: [0, 230, 0, 230 / 20 * (20 - value)],
          stops: [
            [0, constelColors[index][0]],
            [1, constelColors[index][1]]
          ]
        }
      };
    } else {
      swapData[name] = {
        name: name,
        y: value,
        topN: index,
        color: colorDef.greyCol
      };
    }
  });

  // 还原到原本顺序
  $.each(constels, function(index, name) {
    if (swapData[name]) {
      data[index] = swapData[name];
    }
  });

  // 为了保证左右的空白和虚线位置，前面加个空白柱
  // 这个技巧比较坑爹，谁叫设计要求呢
  data.unshift('');

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
})(constelData);


