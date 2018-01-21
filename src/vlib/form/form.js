/**
 * 获取表单数据
 */
module.exports = function(node) {
    var base = require("lib/comp/base"); // 基础对象
    var isNode = require("lib/dom/isNode");
    var getType = require("lib/util/getType");
    var merge = require("lib/json/merge");
    var queryToJson = require("lib/json/queryToJson");
    var formatDate = require("pages/common/util/formatDate");
    var filter = require("pages/common/util/filterData");

    //-----------声明模块全局变量-------------
    var nodeList = null;
    var that = base();
    var data = null;

    //-------------事件响应声明---------------
    var evtFuncs = {};

    //-------------子模块实例化---------------
    var initMod = function() {};

    //-------------绑定事件------------------
    var bindEvents = function() {};

    //-------------自定义函数----------------
    var custFuncs = {
        formatChecked: function(obj){
            for(var k in obj){
                if(getType(obj[k]) === "object"){
                    custFuncs.formatChecked(obj[k]);
                }else{
                    obj[k] = "";
                }
            }
        },
        getFormData: function(doc, filter){
            var fn = null;
            if(isNode(doc)){
                custFuncs.initInput(doc);
            }else if(getType(doc) === "function"){
                fn = doc;
            }
            if(fn !== null && getType(filter) === "function"){
                fn = filter;
            }
            var result = {}, set = {};
            nodeList.forEach(function(item){
                var type = item.type;
                var name = item.name;
                var value = item.value.trim();
                if(fn !== null && fn({node: item, type: type, name: name, value: value})) return;
                if (type === "radio" || type === "checkbox") {
                    if(!item.checked){
                        custFuncs.put(set, name, "");
                        return;
                    }
                }
                custFuncs.put(result, name, value);
            });
            custFuncs.formatChecked(set);
            return merge(true, set, result);
        },
        getValidate: function(doc, attr){
            isNode(doc) && custFuncs.initInput(doc);
            var result = {}, set = {};
            nodeList.forEach(function(item){
                var name = item.name;
                var str = item.getAttribute(attr || "data-validate");
                if(!name || !str) return;
                var obj = queryToJson(str);
                if(set[name]) return;
                set[name] = true;
                if(getType(obj.nullText) !== "undefined"){
                    obj.text = obj.nullText;
                    delete obj.nullText;
                }
                if(getType(obj.precision) !== "undefined"){
                    obj.radix = obj.precision;
                    delete obj.precision;
                }
                var nObj = {};
                for(var k in obj){
                    if(/^(\w{1})(\w+)$/.test(k)){
                        nObj[RegExp.$1.toUpperCase() + RegExp.$2] = obj[k];
                    }
                }
                custFuncs.put(result, name, nObj);
            });
            return result;
        },
        getNodeMap: function(doc){
            isNode(doc) && custFuncs.initInput(doc);
            var result = {};
            nodeList.forEach(function(item){
                var name = item.name;
                custFuncs.put(result, name, item);
            });

            return result;
        },
        getAppointNode: function(name){
            return filter(custFuncs.getNodeMap(), name);
        },
        put: function (obj, name, val) {
            if (!name) return;
            var arr = name.split(".");
            if (arr.length > 1) {
                var p = [obj];
                var len = arr.length;
                for(var index = 0; index < len; index ++){
                    var item = arr[index];
                    if (!p[p.length - 1][item]) {
                        p[p.length - 1][item] = {};
                    }
                    p.push(p[p.length - 1][item]);
                    if (index === len - 2) {
                        custFuncs.set(p[p.length - 1], arr[len - 1], val);
                        break;
                    }
                }
                p = null;
            } else {
                custFuncs.set(obj, name, val);
            }
        },
        set: function (obj, name, val) {
            if (getType(obj[name]) !== "undefined") {
                if (getType(obj[name]) === "array") {
                    obj[name].push(val);
                } else {
                    obj[name] = [obj[name]];
                    obj[name].push(val);
                }
            } else {
                obj[name] = val;
            }
        },
        initForm: function(doc, opts){
            isNode(doc) && custFuncs.initInput(doc);
            opts = merge({title: true, placeholder: true, attr: "data-validate"}, opts || {});
            nodeList.forEach(function (item) {
                var name = item.name;
                var str = item.getAttribute(opts.attr);
                if(!name || !str) return;
                var validate = queryToJson(str);
                if (validate.nullText) {
                    opts.title && (item.title = (validate.select ? "请选择" : "请输入") + validate.nullText);
                    opts.placeholder && (item.placeholder = (validate.select ? "请选择" : "请输入") + validate.nullText);
                }
                if (validate.dateFormat && trim(item.value) !== "") {
                    item.value = formatDate(trim(item.value), validate.dateFormat);
                }
            });
        },
        initInput: function(doc){
            nodeList = [].slice.call(doc.querySelectorAll("input,select,textarea"));
        },
        reload: function(){
            custFuncs.initInput(node);
        }
    };

    //-------------一切从这开始--------------
    var init = function(_data) {
        data = _data;

        custFuncs.initInput(isNode(node) ? node : document);
        initMod();

        bindEvents();
    };

    //---------------暴露API----------------
    that.init = init;
    that.reload = custFuncs.reload;
    that.getFormData = custFuncs.getFormData;
    that.getNodeMap = custFuncs.getNodeMap;
    that.initForm = custFuncs.initForm;
    that.getValidate = custFuncs.getValidate;
    that.getAppointNode = custFuncs.getAppointNode;

    return that;
};