<template>
    <div class="m-search">
        <app-choose :options="options"></app-choose>
        <app-content :options="options"></app-content>
    </div>
</template>
<script>
import appChoose from './choose'
import appContent from './content'
export default {
    props: ["options"],
    data() {

    },
    components: {
        appChoose,
        appContent
    }
}
</script>
