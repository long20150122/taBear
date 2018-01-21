<template></template>
<script>
    import popup from 'vlib/layer/popup'
    import mobile from './content.vue'
    import {bind} from 'vlib/comp/bus'
    import dialogManager from 'common/plugin/dialog'

    export default {
        props: {
            show: Boolean,
            url: {
                type: String,
                default: "../user/sendsmscode"
            },
            subUrl: {
                type: String,
                default: "../weixin/bindmobile"
            }
        },
        data () {
            return {
                m_bind: null
            }
        },
        mounted () {
            const self = this;
            self.m_bind = popup("<mobile @click='submit' :url='url' @close='close'/>", {
                option: {
                    autoHide: true,
                    animate: {
                        name: "slide-bottom"
                    }
                },
                popup: {
                    components: {
                        mobile
                    },
                    data () {
                        return {
                            url: self.url
                        }
                    },
                    methods: {
                        close () {
                            self.m_bind.hide();
                            self.changeShow();
                        },
                        submit (opt){
                            dialogManager.wait();
                            this.$http.post(self.subUrl, opt).then(() => {
                                dialogManager.toast("绑定成功！");
                                self.$emit("onBindSuccess", opt);
                                self.m_bind.hide();
                            }).catch((res) => {
                                dialogManager.alert(res.msg);
                            });
                        }
                    }
                }
            });
            this.m_bind.setPosition(0, "auto", "auto", 0);
            this.show && this.m_bind.show();
            bind(this.m_bind.get("hide"), this.changeShow);
        },
        methods: {
            changeShow () {
                this.$emit('update:show', false);
                //父模块绑定 :show.sync=""
            }
        },
        watch: {
            show (bool) {
                if(bool) {
                    this.m_bind.show();
                }else{
                    this.m_bind.hide();
                }
            }
        }
    }
</script>