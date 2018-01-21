<template>
    <div class="m-dialog-alert">
        {{ option.msg }}
    </div>
</template>
<script>
    export default {
        props: {
            option: {
                type: Object,
                default () {
                    return {};
                }
            }
        }
    }
</script>