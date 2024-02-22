<template>
    <h1 class="flex flex-col gap-y-2 font-bold text-xl">
        <slot></slot>
        <DividerElement :color="seperatorColor || Color.Accent" :size="Size.BASE" />
    </h1>
</template>

<script setup lang="ts">
import DividerElement from "@/components/app/DividerElement.vue";
import { Size, Color } from "@/models/enums";

defineProps<{ hasSeperator: boolean, seperatorColor?:Color }>();
</script>