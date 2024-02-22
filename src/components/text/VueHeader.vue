<template>
  <div class="flex w-full p-4 py-6 bg-primary drop-shadow-xl">
    <div class="flex flex-col max-w-7xl mx-auto w-full">
      <h1 class="text-xl font-semibold text-gray-200">
        <slot></slot>
      </h1>
      <p class="text-sm text-gray-300"><slot name="description"></slot></p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
