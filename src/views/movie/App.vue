<template>
    <div class="m-count">
        <content-module :options="options"
        @lightboxHide="showFooter"
        @lightboxShow="hideFooter"
        ref="contentModule"
        ></content-module>

        <footer-nav :options="options"
        @bindMobileSuccess="setBindMobile"
        @resetComments="resetComments"
        ref="footerNav"
        ></footer-nav>
    </div>
</template>

<script>
import contentModule from "./content";
import footerNav from "./footer";

export default {
    props: ["options"],
    data() {
        return {
        }
    },
    components: {
        contentModule,
        footerNav
    },
    methods: {
        setBindMobile(data) {
            this.options.data.bindMobile = data.isBound;
        },
        hideFooter() {
            this.$refs.footerNav.hide();
        },
        showFooter() {
            this.$refs.footerNav.show();
        },
        resetComments() {
            this.$refs.contentModule.resetComments()
        }
    }
}
</script>