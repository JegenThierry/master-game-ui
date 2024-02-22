<template>
	<div id="background-wrap" class="fixed">
		<div
			v-for="(cloud, index) in clouds"
			:key="index"
			:style="{
				animation: `animateCloud ${getRandomNumber(65, 35, false)}s linear infinite ${index % 2 ? 'reverse' : ''}`,
				transform: `scale(${getRandomNumber(0.35, 0.15, true)})`,
			}">
			<div class="cloud"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ numberOfClouds: number }>();

const clouds = ref<number[]>(Array.from({ length: props.numberOfClouds }));

function getRandomNumber(maxValue: number, minValue: number, isDecimalNumber: boolean): number {
	const val = Math.random() * maxValue + minValue;
	if (isDecimalNumber) return val;
	return Math.floor(val);
}
</script>

<style>
#background-wrap {
	left: 0;
	padding-top: 130px;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 0;
}

@keyframes animateCloud {
	0% {
		margin-left: -100vw;
	}
	100% {
		margin-left: 150vw;
	}
}
.cloud {
	background: #fff;
	border-radius: 100px;
	box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);
	height: 120px;
	position: relative;
	margin-top: -100px;
	width: 350px;
}

.cloud:after,
.cloud:before {
	background: #fff;
	content: "";
	position: absolute;
	z-index: 10;
}

.cloud:after {
	border-radius: 100px;

	height: 100px;
	left: 50px;
	top: -50px;
	width: 100px;
}

.cloud:before {
	border-radius: 200px;

	width: 180px;
	height: 180px;
	right: 50px;
	top: -90px;
}

@keyframes glitch {
	2%,
	64% {
		transform: translate(2px, 0) skew(0deg);
	}
	4%,
	60% {
		transform: translate(-2px, 0) skew(0deg);
	}
	62% {
		transform: translate(0, 0) skew(5deg);
	}
}

.glitch {
	animation: glitch 1s linear infinite;
}

.glitch:before,
.glitch:after {
	content: attr(title);
	position: absolute;
	left: 0;
}

.glitch:before {
	animation: glitchTop 1s linear infinite;
	clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
}

@keyframes glitchTop {
	2%,
	64% {
		transform: translate(2px, -2px);
	}
	4%,
	60% {
		transform: translate(-2px, 2px);
	}
	62% {
		transform: translate(13px, -1px) skew(-13deg);
	}
}

.glitch:after {
	animation: glitchBotom 1.5s linear infinite;
	clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
}

@keyframes glitchBotom {
	2%,
	64% {
		transform: translate(-2px, 0);
	}
	4%,
	60% {
		transform: translate(-2px, 0);
	}
	62% {
		transform: translate(-22px, 5px) skew(21deg);
	}
}
</style>
