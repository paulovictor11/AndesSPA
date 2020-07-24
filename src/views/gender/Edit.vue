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
                <h5>Atualizar Gênero</h5>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field color="amber darken-1" label="Nome" v-model="model.nome" prepend-icon="fas fa-edit" :rules="nameRules"></v-text-field>
                    <v-text-field color="amber darken-1" label="Sigla" v-model="model.sigla" prepend-icon="fas fa-edit" :rules="siglaRules"></v-text-field>
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
import service from '@/services/gender'

export default {
    props: ['genero'],
    data: () => ({
        loading: false,
        dialog: false,
        model: {
            id: '',
            nome: '',
            sigla: ''
        },
        nameRules: [
            v => v.length >= 3 || 'Minimum length is 3 characters'
        ],
        siglaRules: [
            y => y.length == 1 || 'Maximum length is 1 characters'
        ],
    }),
    mounted () {
        this.mount()
    },
    methods: {
        mount () {
            this.model = this.genero
        },
        submit () {
            if (this.$refs.form.validate()) {
                this.loading = true

                var id = this.model.id
                var form = {
                    ...this.model
                }

                service.update(id, form).then(() => {
                    this.loading = false
                    this.dialog = false
                    this.$emit('editedGender', 'Gênero editado com sucesso')
                }).catch(e => console.log(e))
            }
        }
    }
}
</script>