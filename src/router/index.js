import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Categoria from '../views/category/Categoria.vue'
import Genero from '../views/gender/Genero.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard
    },
    {
        path: '/categoria',
        name: 'categoria',
        component: Categoria
    },
    {
        path: '/genero',
        name: 'genero',
        component: Genero
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
