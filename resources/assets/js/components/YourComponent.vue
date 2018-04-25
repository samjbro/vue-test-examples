<template>
    <div :class="{active: isActive}">
        <ul>
            <child-component v-for="(child, i) in children" :key="i"/>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            isActive: {type: Boolean, required: false, default: false},
            children: {type: Array, required: false}
        }
    }
</script>