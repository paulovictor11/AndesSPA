import { http } from './config'

export default {
    list: () => {
        return http.get('categorias')
    },
    store: (categoria) => {
        return http.post('categorias', categoria)
    },
    show: (id) => {
        return http.get(`categoria/${id}`)
    },
    update: (id, categoria) => {
        return http.put(`categoria/${id}`, categoria)
    },
    destroy: (id) => {
        return http.delete(`categoria/${id}`)
    }
}