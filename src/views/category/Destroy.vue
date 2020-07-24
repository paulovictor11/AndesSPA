<template>
    <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn small text block v-on="on">
                <v-icon small left color="grey">far fa-trash-alt</v-icon>
                <span class="grey--text">Deletar</span>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <h5>Deletar Categoria</h5>
            </v-card-title>
            <v-card-text>
                Tem certeza que deseja deletar a categoria {{ categoria.nome }}?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn class="mt-3" depressed color="amber darken-1" @click="dialog = false">Não</v-btn>
                <v-btn class="mt-3" depressed color="amber darken-1" @click="submit" :loading="loading">Sim</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import service from '@/services/category'

export default {
    props: ['categoria'],
    data: () => ({
        dialog: false,
        loading: false,
        model: {
            id: '',
            nome: ''
        }
    }),
    mounted () {
        this.mount()
    },
    methods: {
        mount () {
            this.model = this.categoria
        },
        submit () {
            this.loading = true

            var id = this.model.id

            service.destroy(id)
                .then(() => {
                    this.loading = false
                    this.dialog = false,
                    this.$emit('deletedCategory', 'Categoria deletada com sucesso')
                }).catch(e => console.log(e))
        }
    }
}
</script>