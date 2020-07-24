import { http } from './config'

export default {
    list: () => {
        return http.get('generos')
    },
    store: (genero) => {
        return http.post('generos', genero)
    },
    show: (id) => {
        return http.get(`genero/${id}`)
    },
    update: (id, genero) => {
        return http.put(`genero/${id}`, genero)
    },
    destroy: (id) => {
        return http.delete(`genero/${id}`)
    }
}