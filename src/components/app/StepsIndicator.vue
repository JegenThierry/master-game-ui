<template>
  <div class="flex p-4 rounded-md w-full">
    <ul class="mx-auto steps">
      <li
        v-for="(step, index) in steps"
        :key="step"
        class="step"
        :class="isStepCompleted(index) ? 'step-primary uppercase' : ''"
      >
        {{ step }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ currentStep: number; steps: string[] }>();

function isStepCompleted(index: number): boolean {
  return index <= props.currentStep;
}
</script>
