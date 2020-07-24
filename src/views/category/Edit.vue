<template>
    <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn small text block v-on="on">
                <v-icon small left color="grey">far fa-edit</v-icon>
                <span class="grey--text">Editar</span>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <h5>Atualizar Categoria</h5>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field color="amber darken-1" label="Nome" v-model="model.nome" prepend-icon="fas fa-edit" :rules="inputRules"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn class="mt-3" depressed color="amber darken-1" @click="dialog = false">Fechar</v-btn>
                <v-btn class="mt-3" depressed color="amber darken-1" @click="submit" :loading="loading">Salvar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import service from '@/services/category'

export default {
    props: ['categoria'],
    data: () => ({
        loading: false,
        dialog: false,
        model: {
            id: '',
            nome: ''
        },
        inputRules: [
            v => v.length >= 3 || 'Minimum length is 3 characters'
        ],
    }),
    mounted () {
        this.mount()
    },
    methods: {
        mount () {
            this.model = this.categoria
        },
        submit () {
            if (this.$refs.form.validate()) {
                this.loading = true

                var id = this.model.id
                var form = {
                    nome: this.model.nome
                }

                service.update(id, form)
                    .then(() => {
                        this.loading = false
                        this.dialog = false
                        this.$emit('editedCategory', 'Categoria editada com sucesso')
                    }).catch(e => console.log(e))
            }
        }
    }
}
</script>