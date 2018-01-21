/**
 * 对安卓手机键盘弹出会把页面顶上去的问题做兼容处理
 * 璩：2017-09-13
 */
import {getOffset} from 'lib/dom/domUtil'
import closest from 'lib/dom/closest'
import viewport from 'vlib/comp/viewport'

const inputControl = function(element, isAll){

    if(!isAll && viewport.isIPhone){
        return {add: function(){}, remove: function(){}};
    }

    let events = [],
        tid = null,
        count = 0,
        node = null,
        curEl = null,
        run = false,
        stop = false;
    const screen = window.innerHeight;

    function start(el){
        let height = window.innerHeight;
        if(node === null){
            node = closest(el, element || ".m-popup");
            if(!node){
                end();
                stop = true;
                return;
            }
        }
        if(screen !== height && !run){
            let result = screen - height;
            const pos = getOffset(el);
            if(!node.style.transform){
                result = Math.min(result, screen - result - pos.top - 30);
            }else{
                result = Math.min(result, screen - pos.top - 30);
            }
            node.style.transform = "translateY(" + result + "px)";
            run = true;
        }else if(screen === height && run){
            node.style.removeProperty("transform");
            run = false;
        }
        count++;
        if(count > 100 && !run){
            end();
        }
    }

    function end() {
        clearInterval(tid);
        tid = null;
        count = 0;
        curEl = null;
        run = false;
        if(stop){
            document.body.removeEventListener("click", _inputSet, false);
            events = [];
        }
    }

    function _inputSet(ev) {
        const target = ev.target;
        if("input,textarea".includes(target.nodeName.toLowerCase())){
            if(events.indexOf(target) > -1){
                if(tid === null){
                    tid = setInterval(start, 10, target);
                }else if(curEl !== target){
                    count = 0;
                    run = false;
                }
                curEl = target;
            }
        }else if(tid !== null && run){
            node.style.removeProperty("transform");
            end();
        }
    }

    document.body.addEventListener("click", _inputSet, false);

    return {
        add (el) {
            !stop && events.push(el);
        },
        remove (el) {
            if(stop) return;
            const index = events.indexOf(el);
            if(index > -1){
                events.splice(index, 1);
            }
        }
    }
};

export default inputControl;
