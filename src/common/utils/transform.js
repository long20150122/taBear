/*****
 * transform
 */

export default function(timeout, x, y){
    return {
        '-webkit-transition':'-webkit-transform '+ timeout +'ms',
        '-webkit-transform':'translate3d('+ x +'px,'+ y +'px, 0)',
        '-webkit-backface-visibility': 'hidden',
        'transition':'transform '+timeout+'ms',
        'transform':'translate3d('+ x +'px,'+ y +'px, 0)'
    };
}
