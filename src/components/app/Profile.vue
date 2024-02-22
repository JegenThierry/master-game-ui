<template>
	<div class="flex gap-x-2">
		<img class="object-cover object-center w-12 h-12 rounded-full" :src="imageSrc" alt="Profile Image" />
		<div class="flex flex-col gap-y-1 justify-between -mt-1">
            <div class="flex">
                <div class="text-sm font-semibold truncate">{{ username }}</div>
                <div class="ml-auto text-sm font-semibold truncate">Level <span class="font-medium text-indigo-600">{{ level }}</span></div>
            </div>
			<progress
                id="mana"
                :title="`${currentMana}/${maxMana} Mana`" 
                class="w-56 progress progress-primary" 
                :value="currentMana" 
                :max="maxMana" 
            />
			<progress 
                id="stamina"
                :title="`${currentStamina}/${maxStamina} Ausdauer`" 
                class="w-56 progress progress-success" 
                :value="currentStamina" 
                :max="maxStamina" 
            />
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	username: string;
	imageSrc: string;
	currentMana: number;
	currentStamina: number;
	maxMana: number;
	maxStamina: number;
    level:number
}>();
</script>
