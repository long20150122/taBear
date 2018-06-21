/**
 * ft
 * 循环动画
 */
module.exports = function(duration, progress, easing) {

    easing = easing || function(p){return p};
    var animators = null;

    var requestAniFrame = (function(){
        return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    return {
        start: function(finished){
            var startTime = Date.now();
            requestAniFrame(function step(){
                var p = (Date.now() - startTime) / duration;
                var next =  true;

                if(p < 1.0){
                    progress(easing(p), p);
                }else{
                    if(typeof finished === 'function'){
                        next = finished() === false;
                    }else{
                        next = finished === false;
                    }

                    if(!next){
                        progress(easing(1.0), 1.0);
                    }else{
                        startTime += duration;
                        progress(easing(p), p);
                    }
                }

                if(next) requestAniFrame(step);
            });
        },
        queue: function(ani){
            animators = ani || [];
            return {
                append: function(){
                    var args = [].slice.call(arguments);
                    animators.push.apply(animators, args);
                },
                flush: function(){
                    if(animators.length){
                        function play(){
                            var animator = animators.shift();
                            animator.start(function(){
                                if(animators.length){
                                    play();
                                }
                            });
                        }
                        play();
                    }
                }
            }
        }
    };
};