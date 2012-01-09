/**
 * MultiScroll jQuery Plugin
 *
 * Scroll a div by hovering, dragging, clicking, or mousewheel.
 *
 * License: Pain-Free MIT (same as jQuery)
 *
 * Version 0.8
 *
 * TODO: up & down hoverscroll
 * TODO: append a giant div on click so we can scroll outside confines of frame
 * TODO: get rid of mousewheel dependency?
 * TODO: hoverscroll parameters: hoverscrollMinSpeed, hoverscrollMaxSpeed, hoverscrollSteps
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
    var autoscroll_debug = true;

    // TODO: figure out why clientWidth and scrollWidth are not quite equal
    // Gotta be the same thing as the border test showing white at the bottom.
    var crazyScrollSlop = 5; // in pixels, Chrome is 5, Mozilla is 4. wtf.

    function install(inopts) {
        var options = $.extend({}, $.fn.multiscroll.defaults, inopts);

        var frame = $(this);
        frame.find('.leftHover').each(function() { installLeftHover($(this), frame, options) });
        frame.find('.rightHover').each(function() { installRightHover($(this), frame, options) });

        frame.mousedown(function(event) {
            autoscroll(frame, 0);
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
            autoscroll(frame, 0);
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

    // sets the given element to fade in and out on hover
    function installHoverFade(self, frame, options) {
        self.mouseenter(function(event) {
            self.fadeTo('fast', 0.4);
        }).mouseleave(function(event) {
            self.fadeTo('fast', 0);
            autoscroll(frame, 0);
        }).css({ position: 'absolute', opacity: 0 });
    }

    function installHorizontalHover(self, frame, options) {
        installHoverFade(self, frame, options);
        self.height(frame.height());
    }

    function installLeftHover(self, frame, options) {
        installHorizontalHover(self, frame, options);
        self.mousemove(function(event) {
            var x = event.pageX - this.offsetLeft;
            var speed = 1 - x / self.width();
            autoscroll(frame, -speed*300); // TODO: get rid of this constant
        }).css({left: frame.position().left + 'px'});
    }

    function installRightHover(self, frame, options) {
        installHorizontalHover(self, frame, options);
        self.mousemove(function(event) {
            var x = event.pageX - this.offsetLeft;
            var speed = 1 - (self.width() - x) / self.width();
            autoscroll(frame, speed*300); // TODO: get rid of this constant
        }).css({left: (frame.position().left + frame[0].clientWidth - self.width()) + 'px'});
    }

    function autoscroll(frame, speed) {    // speed is in px/sec
        function complete() {
            if(autoscroll_debug) console.log("animation complete");
            autoscroll_speed = 0;
        }

        // if user is dragging, don't turn on an autoscroll
        var data = frame.data('multiscroll');
        if(data && data.down == true) return;

        // TODO: don't autoscroll if we're already completely left or completely right

        if(speed === 0) {
            if(autoscroll_debug) console.log("stopping");
            frame.stop();
        } else if(Math.abs(speed - autoscroll_speed) > 7) {  // TODO get rid of this constant, just need to prevent switching scrolling speeds every time the mouse moves
            var current = frame.scrollLeft();
            var unseen = frame[0].scrollWidth - frame[0].clientWidth;
            var duration = (speed > 0) ? 1000 * (unseen - current) / speed : 1000 * current / -speed;
            frame.stop();
            if(autoscroll_speed === 0) {
                // use easing to start
                if(speed > 0) {
                    if(autoscroll_debug) console.log("easing right at " + speed + " for " + duration);
                    frame.animate({ scrollLeft: unseen }, duration, "swing", complete);
                } else {
                    if(autoscroll_debug) console.log("easing left at " + speed + " for " + duration);
                    frame.animate({ scrollLeft: 0 }, duration, "swing", complete);
                }
            } else {
                // already moving, easing would make it look jumpy
                if(speed > 0) {
                    if(autoscroll_debug) console.log("switching right at " + speed + " for " + duration);
                    frame.animate({ scrollLeft: unseen }, duration, "linear", complete);
                } else {
                    if(autoscroll_debug) console.log("switching left at " + speed + " for " + duration);
                    frame.animate({ scrollLeft: 0 }, 1000 * current / -speed, "linear", complete);
                }
            }
        }
        autoscroll_speed = speed;
    }

})(jQuery);

