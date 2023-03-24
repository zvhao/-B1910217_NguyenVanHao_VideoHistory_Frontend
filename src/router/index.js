import { createWebHistory, createRouter } from "vue-router";
import VideoHistory from "@/views/VideoHistory.vue";
const routes = [
	{
		path: "/",
		name: "videohistory",
		component: VideoHistory,
		props: true
	},
	{
		path: "/:pathMatch(.*)*",
		name: "notfound",
		component: () => import("@/views/NotFound.vue"),
	},
	{
		path: "/videos/edit/:slug",
		name: "video.edit",
		component: () => import("@/views/VideoEdit.vue"),
		props: true // Truyền các biến trong $route.params vào làm props
	},
	{
		path: "/videos/:slug",
		name: "video.show",
		component: () => import("@/views/VideoShow.vue"),
		props: true // Truyền các biến trong $route.params vào làm props
	},
	{
		path: "/videos/add",
		name: "video.add",
		component: () => import("@/views/VideoAdd.vue"),
		props: true // Truyền các biến trong $route.params vào làm props
	},
	{
		path: "/channel/:username",
		name: "channel",
		component: () => import("@/views/VideoChannel.vue"),
		props: true // Truyền các biến trong $route.params vào làm props
	},
	{
		path: "/register",
		name: "account.register",
		component: () => import("@/views/AccountRegister.vue"),
		props: true // Truyền các biến trong $route.params vào làm props
	},
	{
		path: "/login",
		name: "account.login",
		component: () => import("@/views/AccountLogin.vue"),
		props: true // Truyền các biến trong $route.params vào làm props
	},
];
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});
export default router;