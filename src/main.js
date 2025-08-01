import {
	createSSRApp
} from "vue";
import App from "./App.vue"
import api from "@/api/index.ts"

export function createApp() {
	const app = createSSRApp(App);
	app.provide('$api', api)
	return {
		app,
	};
}
