/**
 * MultiScroll jQuery Plugin
 *
 * Scroll a div by hovering, dragging, clicking, or mousewheel.
 *
 * License: Pain-Free MIT (same as jQuery)
 *
 * Version 0.8
 *
 * TODO: append a giant div on click so we can scroll outside confines of frame
 * TODO: get rid of mousewheel dependency?
 */

(function($) {
    $.fn.multiscroll = function(params) {
        return this.each(function() { install.call(this, params); });
    };

    $.fn.multiscroll.defaults = {
        wheelSpeed: { x: 30, y: 30 }
    };


// TODO: this needs fixing
    var autoscroll_speed = 0;
    var autoscroll_debug = false;

    // TODO: figure out why clientWidth and scrollWidth are not quite equal
    var crazyScrollSlop = 5; // in pixels, Chrome is 5, Mozilla is 4. wtf.

    function install(inopts) {
        var options = $.extend({}, $.fn.multiscroll.defaults, inopts);

        var frame = $(this);
        frame.mousedown(function(event) {
            autoscroll(0);
            frame.data('multiscroll', {
                down: true, x: event.clientX, y: event.clientY,
                scrollLeft: this.scrollLeft, scrollTop: this.scrollTop
            });
            return false;
        }).mouseup(function(event) {
            frame.data('multiscroll', {down: false});
        }).mouseleave(function(event) {
            frame.data('multiscroll', {down: false});
        }).mousemove(function(event) {
            var data = frame.data('multiscroll');
            if(data && data.down == true) {
                // if we scroll w/o checking, some browsers will have unsightly bouncing
                if(this.scrollWidth > this.clientWidth + crazyScrollSlop) {
                    this.scrollLeft = data.scrollLeft + data.x - event.clientX;
                }
                if(this.scrollHeight > this.clientHeight + crazyScrollSlop) {
                    this.scrollTop = data.scrollTop + data.y - event.clientY;
                }
            }
        }).mousewheel(function(event, delta) {
            autoscroll(0);
            if(this.scrollHeight > this.clientHeight + crazyScrollSlop) {
                this.scrollTop -= (delta * options.wheelSpeed.y);
            } else {
                if(this.scrollWidth > this.clientWidth + crazyScrollSlop) {
                    this.scrollLeft -= (delta * options.wheelSpeed.x);
                }
            }
            return false;
        }).css({ 'overflow' : 'hidden' });
    }

    function autoscroll(speed) {    // speed is in px/sec
        function complete() {
            if(autoscroll_debug) console.log("animation complete");
            autoscroll_speed = 0;
        }
        if(speed === 0) {
            if(autoscroll_debug) console.log("stopping");
            $("#timeline").stop();
        } else if(Math.abs(speed - autoscroll_speed) > 7) {
            if(autoscroll_debug) console.log("speed=" + speed + " autoscroll=" + autoscroll_speed);
            var current = $("#timeline").scrollLeft();
            var dur = (speed > 0) ? 1000 * (692 - current) / speed : 1000 * current / -speed;
            $("#timeline").stop();
            if(autoscroll_speed === 0) {
                // use easing to start
                if(speed > 0) {
                    if(autoscroll_debug) console.log("easing right at " + speed + " for " + dur);
                    $("#timeline").animate({ scrollLeft: 692 }, dur, "swing", complete);
                } else {
                    if(autoscroll_debug) console.log("easing left at " + speed + " for " + dur);
                    $("#timeline").animate({ scrollLeft: 0 }, dur, "swing", complete);
                }
            } else {
                // already moving, easing would make it look jumpy
                if(speed > 0) {
                    if(autoscroll_debug) console.log("switching right at " + speed + " for " + dur);
                    $("#timeline").animate({ scrollLeft: 692 }, dur, "linear", complete);
                } else {
                    if(autoscroll_debug) console.log("switching left at " + speed + " for " + dur);
                    $("#timeline").animate({ scrollLeft: 0 }, 1000 * current / -speed, "linear", complete);
                }
            }
        }
        autoscroll_speed = speed;
    }

})(jQuery);

