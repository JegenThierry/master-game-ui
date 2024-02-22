<template>
    <button @click="emits('button-click')" :class="`btn ${getButtonType} ${isRound ? 'rounded-full' : ''}`"><slot></slot></button>
</template>

<script setup lang="ts">
import { ButtonType } from "@/models/enums";
import { computed } from "vue";

const props = defineProps<{ buttonType: ButtonType, isRound:boolean }>();
const emits = defineEmits(['button-click']);

const getButtonType = computed(() => {
    switch(props.buttonType){
        case ButtonType.Primary: return 'btn-primary';
        case ButtonType.Ghost: return 'btn-ghost';
        case ButtonType.Link: return 'btn-link text-xs';
        case ButtonType.Secondary: return 'btn-secondary';
        case ButtonType.Disabled: return 'btn-disabled';
    }
});
</script>