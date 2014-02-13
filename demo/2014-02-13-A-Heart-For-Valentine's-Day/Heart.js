(function() {
    /**
     * Heart constructor
     * @constructor
     * @augments Kinetic.Shape
     * @param {Object} config
     * @param {Number} config.radius
     * 
     *
     * @param {String} [config.fill] fill color
     *
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Array|Object} [config.fillPatternOffset] array with two elements or object with x and y component
     * @param {Array|Object} [config.fillPatternScale] array with two elements or object with x and y component
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be 'repeat', 'repeat-x', 'repeat-y', or 'no-repeat'.  The default is 'no-repeat'
     *
     * @param {Array|Object} [config.fillLinearGradientStartPoint] array with two elements or object with x and y component
     * @param {Array|Object} [config.fillLinearGradientEndPoint] array with two elements or object with x and y component
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     *
     * @param {Array|Object} [config.fillRadialGradientStartPoint] array with two elements or object with x and y component
     * @param {Array|Object} [config.fillRadialGradientEndPoint] array with two elements or object with x and y component
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     *
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Obect} [config.shadowOffset]
     * @param {Number} [config.shadowOffset.x]
     * @param {Number} [config.shadowOffset.y]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Array} [config.dashArray]
     * 
     * 
     * 
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale]
     * @param {Number} [config.scale.x]
     * @param {Number} [config.scale.y]
     * @param {Number} [config.rotation] rotation in radians
     * @param {Number} [config.rotationDeg] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offset.x]
     * @param {Number} [config.offset.y]
     * @param {Boolean} [config.draggable]
     * @param {Function} [config.dragBoundFunc]
     */
    Kinetic.Heart = function(config) {
        this._initHeart(config);
    };

    Kinetic.Heart.prototype = {
        _initHeart: function(config) {
            this.setDefaultAttrs({
                numPoints: 0,
                innerRadius: 0,
                outerRadius: 0
            });

            // call super constructor
            Kinetic.Shape.call(this, config);
            this.shapeType = 'Heart';
            this._setDrawFuncs();
        },
        drawFunc: function(canvas) {
            var radius = this.attrs.radius || 10;
            var i = 0;
            var num = 360;//分割为 360 个点
            var startRadian = 0;
            var radian = startRadian;
            var radianDecrement = Math.PI / num * 2;
            var context = canvas.getContext();

            context.beginPath();
            context.moveTo(getX(radian), getY(radian));

            for (var i = 0; i < num; i++) {
                radian += radianDecrement;
                context.lineTo(getX(radian), getY(radian));
            }

            function getX(t) {    //由弧度得到 X 坐标
                return radius * (16 * Math.pow(Math.sin(t), 3));
            }

            function getY(t) {    //由弧度得到 Y 坐标
                return -radius * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
            }

            context.closePath();
            canvas.fillStroke(this);
        }
    };
    Kinetic.Global.extend(Kinetic.Heart, Kinetic.Shape);

    // add getters setters
    Kinetic.Node.addGettersSetters(Kinetic.Heart, ['radius']);

    /**
     * set radius
     * @name setRadius
     * @methodOf Kinetic.Heart.prototype
     * @param {Number} radius
     */

    /**
     * get radius
     * @name getRadius
     * @methodOf Kinetic.Heart.prototype
     */
})();
