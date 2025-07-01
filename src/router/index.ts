import { createRouter, createWebHistory } from 'vue-router'
import List from '../components/List.vue'
import Form from '../components/Form.vue'

const routes = [
    { path: '/', name: 'List', component: List },
    { path: '/design/new', name: 'DesignNew', component: Form },
    { path: '/design/:id/edit', name: 'DesignEdit', component: Form, props: true },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
