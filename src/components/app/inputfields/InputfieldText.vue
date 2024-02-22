<template>
    <div class="form-control">
        <label class="label">
            <span class="label-text">{{ label }}</span>
        </label>
        <input :class="`input input-bordered ${getColor} w-full`" type="text" :value="modelValue"
            @input="updateInput(($event.target as HTMLInputElement)?.value)" :id="id" :placeholder="placeholder" />
    </div>
</template>

<script setup lang="ts">
import { Color } from "@/models/enums";
import { computed } from "vue";

const props = defineProps<{ modelValue: string, placeholder: string, label: string, id: string, color: Color }>();
const emits = defineEmits(["update:modelValue"])

const getColor = computed(() => {
    switch (props.color) {
        case Color.Primary: return 'input-primary'
        case Color.Accent: return 'input-accent'
        case Color.Warn: return 'input-warn'
        case Color.Error: return 'input-error'
        case Color.Neutral: return 'input-neutral'
    }
})

function updateInput(newValue: string) {
    emits("update:modelValue", newValue);
}
</script>