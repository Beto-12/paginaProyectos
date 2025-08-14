import Description from "../views/Description.vue";
import Rooms from "../views/Rooms.vue"
import Gastronomy from "../views/Gastronomy.vue";
import Services from "../views/Services.vue"
import Sports from "../views/Sports.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {path:"/", name: "descripcion" ,component:Description},
    {path:"/rooms", name: "habitaciones", component:Rooms},
    {path:"/gastronomy", name: "gastronomia", component:Gastronomy},
    {path:"/services", name: "servicios", component:Services},
    {path:"/sports", name: "deportes" ,component:Sports}
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})