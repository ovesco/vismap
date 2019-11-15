<template>
    <div>
        <div class="floatbar">
            <div class="floatbar-icon" @click="$store.commit('toggleMenu')">
                <a-icon type="menu-unfold" />
            </div>
        </div>
    </div>
</template>

<script>
import { Icon } from 'ant-design-vue';

export default {
  components: {
    aIcon: Icon,
  },
};
</script>

<style scoped lang="scss">
    .floatbar {
        position: absolute;
        top:80px;
        left:10px;
        background:white;
        z-index:314159;
        border-radius:2px;
        height:34px;
        border: 2px solid rgba(0,0,0,0.2);
        background-clip: padding-box;

        .floatbar-icon {

            display: flex;
            justify-content: center;
            align-items:center;
            width: 30px;
            height:30px;
            background-clip: padding-box;
            cursor: pointer;

            &:hover {
                background:#f4f4f4;
            }

            i {
                font-size:1rem;
            }
        }
    }
</style>
