<template>
    <div class="m-orderInfo">
        <order-status :options="options"></order-status>
        <app-content :options="options"></app-content>
    </div>
</template>
<script>
import orderStatus from "./status";
import appContent from './content';
export default {
    props: ["options"],
    data() {
        return {
        }
    },
    components: {
        orderStatus,
        appContent
    },
    methods: {

    }
}
</script>

