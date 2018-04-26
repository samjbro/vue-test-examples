<template>
    <div :class="{active: isActive}">
        <ul>
            <child-component v-for="(child, i) in children" :key="i"/>
        </ul>
        <div class="foo" v-if="showFoo">Foo</div>
        <button @click="getInfo"></button>
    </div>
</template>

<script>
    import {http} from '@/services';
    export default {
        props: {
            isActive: {type: Boolean, required: false, default: false},
            children: {type: Array, required: false}
        },
        data() {
            return {
                showFoo: true
            }
        },
        methods: {
            getInfo() {
                http.get('http://www.google.com');
                http.post('http://www.analytics.com');
                this.showFoo = false;
            }
        }
    }
</script>