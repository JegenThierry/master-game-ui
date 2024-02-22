import { createRouter, createWebHistory } from "vue-router";
import GameView from "@/views/GameView.vue";
import SurveyView from "@/views/SurveyView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import DashboardView from "@/views/DashboardView.vue";
import CompletedView from "@/views/CompletedView.vue";
import UpdateUserInfoView from "@/views/UpdateUserInfoView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/updateUserInfo/:userid",
			name: "updateUserInfo",
			component: UpdateUserInfoView,
		},
		{
			path: "/",
			name: "game",
			component: GameView,
		},
		{
			path: "/questionnaire/:id/:userid",
			name: "questionnaire",
			component: SurveyView,
		},
		{
			path: "/studyCompleted",
			name: "studyCompleted",
			component: CompletedView,
		},
		{
			path: "/dashboard",
			name: "dashboard",
			component: DashboardView,
		},
		{
			path: "/404",
			name: "404",
			component: NotFoundView,
		},
		{
			path: "/*",
			redirect: { path: "/404" },
		},
	],
});

export default router;
