import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App.vue";
import router from "./router";

createApp(App).use(VueQueryPlugin).use(router).mount("#app");
