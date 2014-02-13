var stage = new Kinetic.Stage({
    container: 'container',
    width: 800,
    height: 800
});
var layer = new Kinetic.Layer();

var start = {x: stage.getWidth() / 2, y :stage.getHeight() / 2};
var radius = 20;
var i = 0;
var j = 0;
var count = 0;
var step = 99;//分割为 360 个点
var startRadian = 0;
var radian = startRadian;
var radianDecrement = Math.PI / step * 2;
var heart, font;
var color = {
    r: {
        start: 0x33,
        distance: 0xff - 0x33
    },
    g: {
        start: 0x0,
        distance: 0x44 - 0x0

    },
    b: {
        start: 0xaa,
        distance: 0x77 - 0xff
    }
};

var bg = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: stage.getWidth(),
    height: stage.getHeight(),
    fill: '#000'
});
layer.add(bg);

function getGradient(num) {
    var colorStr = '';
    var percent = num / step; 
    for (var key in color) {
        colorStr += parse16(color[key]['start'] + color[key]['distance'] * percent);
    }
    return '#' + colorStr;
}

function parse16(num) {
    num = parseInt(num, 10);
    var table = ['A', 'B', 'C', 'D', 'E', 'F'];
    var b = num % 16,
    a = (num - b) / 16
    b = b > 9 ? table[b - 10] : b + '';
    a = a > 9 ? table[a - 10] : a + '';
    return a + b;
}

function getX(t) {    //由弧度得到 X 坐标
    return radius * (16 * Math.pow(Math.sin(t), 3));
}

function getY(t) {    //由弧度得到 Y 坐标
    return -radius * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
}


// add the layer to the stage
stage.add(layer);

var animHeart = new Kinetic.Animation(function(frame) {
    radian += radianDecrement;
    heart = new Kinetic.Heart({
        x: getX(radian) + start.x,
        y: getY(radian) + start.y,
        radius: 0.6,
        fill: getGradient(i),
        shadowColor: '#fff',
        shadowBlur: 20,
        shadowOpacity: 0.7
    });
    // add the shape to the layer
    layer.add(heart);
    i++;
    if (i > step) {
        animHeart.stop();
        animFont.start();
    }
}, layer);

var animFont = new Kinetic.Animation(function(frame) {

    var myString = ['执子之手,与子偕老', '愿有情人终成眷属', '2014情人节快乐']; 

    font = new Kinetic.Text({
        fontFamily: 'Microsoft Yahei',
        text: myString[j],
        align: 'center',
        fontSize: 30,
        fill: '#ff2222',
        x: start.x,
        y: start.y + 40 * (j - 1),
        //shadowColor: '#888',
        //shadowBlur: 10,
        //shadowOpacity: 0.4,
        opacity: 0
    });
    font.setOffset({
        x: font.getWidth() / 2
    });
    layer.add(font);
    count++;
    if (count >= 50) {
        count = 0;
        j++;
        if (j > myString.length) {
            animFont.stop();
        }
    } else {
        font.attrs.opacity += 1 / 50;
    }

}, layer);

animHeart.start();
