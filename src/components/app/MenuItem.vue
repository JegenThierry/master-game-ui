<template>
    <MenuItem @click="emits('menu-click')" v-slot="{ active }">
      <div class="p-1">
        <button :class="[
            active ? 'bg-secondary text-white' : 'text-gray-900',
            'transition-colors duration-150 ease-linear font-base group flex w-full items-center rounded-md px-2 py-2 text-sm z-10',
        ]">
           <slot></slot>
        </button>
      </div>
    </MenuItem>
</template>

<script setup lang="ts">
import { MenuItem } from '@headlessui/vue'

const emits = defineEmits(['menu-click']);
</script>