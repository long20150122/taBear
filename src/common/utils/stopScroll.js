/******
 * 禁止滚动
 * 璩 2017/09/14
 */
import getStyle from 'vlib/util/getStyle'
import {isElement, isNode, isFunction } from  'vlib/util/dataType'
// import {fire} from 'vlib/comp/bus'
import getScrollNode from 'common/utils/getScrollNode'

export default function(node, filter){
    node = isNode(node) ? node : document.body;
    filter = isFunction(filter) ? filter : function () {};
    let nodeList = [];

    function _init(){
        if(nodeList.length > 0) return;

        for(let n of node.childNodes){
            if(isElement(n) && !filter(n)){
                nodeList.push({node: n, position: "static", top: 0, scrollTop: 0});
                // const scrolling = n.querySelectorAll(".scrolling");
                // for(let s of scrolling){
                //     nodeList.push({node: s, position: "static", top: 0, scrollTop: 0});
                // }
            }
        }
        nodeList.forEach(item => {
            item.position = getStyle(item.node, "position");
            item.top = getStyle(item.node, "top");
            item.position_bool = !!item.node.style.position;
            item.top_bool = !!item.node.style.top;
            item.scrollTop = getScrollNode(item.node, document.body).scrollTop;
            item.node.style.top = -item.scrollTop + "px";
            item.node.style.position = "fixed";
        });
        // fire("plugin.stop:scroll", true);
    }

    function _clear(){
        if(nodeList.length === 0) return;
        nodeList.forEach(item => {
            if(item.top_bool){
                item.node.style.top = item.top;
            }else{
                item.node.style.removeProperty("top");
            }
            if(item.position_bool){
                item.node.style.position = item.position;
            }else{
                item.node.style.removeProperty("position");
            }
            getScrollNode(item.node, document.body).scrollTop = item.scrollTop;
        });
        nodeList = [];
        // fire("plugin.stop:scroll", false);
    }

    return {
        start: _init,
        end: _clear
    }
}
