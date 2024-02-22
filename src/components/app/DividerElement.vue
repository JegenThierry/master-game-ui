<template>
    <div :class="`${tailwindColor} ${tailwindSize} rounded-full`"></div>
</template>

<script setup lang="ts">
import { Size, Color } from "@/models/enums";
import { computed } from "vue";
import { getColorFromEnum } from "@/helpers/colorHelper";

const props = defineProps<{ size:Size, color:Color }>();
const tailwindColor = computed(() => {
  return getColorFromEnum(props.color).bgColor
});

const tailwindSize = computed(() => {
    switch(props.size){
        case Size.XS: return "h-px"
        case Size.SM: return "h-0.5"
        case Size.BASE: return "h-1"
        case Size.MD: return "h-2"
        case Size.XL: return "h-4"
        case Size.XXL: return "h-8"
    }
})
</script>