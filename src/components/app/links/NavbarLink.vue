<template>
    <RouterLink :class="`group flex flex-col transition-all duration-200 ease-in-out`" :to="to">
      <div class="text-lg font-medium my-auto mt-1"> <slot></slot> </div>
      <DividerElement
          :class="`${route.path == to ? 'w-full' : 'w-0'} group-hover:w-full mb-auto mx-auto transition-all duration-200 ease-in-out`"
          :color="Color.Primary"
          :size="Size.SM"
      />
    </RouterLink>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import DividerElement from '@/components/app/DividerElement.vue';
import { Color, Size } from '@/models/enums';

defineProps<{to:string}>();
const route = useRoute()

</script>