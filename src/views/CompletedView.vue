<template>
	<div class="flex w-full h-full min-h-screen bg-indigo-100">
		<div class="flex flex-col gap-2 m-auto w-1/2 p-4 rounded-md bg-white shadow-md">
			<h1 class="text-indigo-700 text-xl">Ihr Gutschein!</h1>
			<p>
				Senden Sie bitte diesen Code: <span class="font-bold text-indigo-700">{{ codeForReward }}</span> an den
				Studienkoordinator Jegen Thierry <a href="mailto:thierryjegen@gmail.com">thierryjegen@gmail.com</a> um Ihren
				Amazon-Gutschtein zu erhalten.
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const codeForReward = ref<string>("");
onMounted(() => {
	codeForReward.value = localStorage.getItem("codeForReward") ?? "";
});
</script>
