<template>
    <div id="categoria">
        <v-snackbar v-model="snackbar" :timeout="5000" color="amber darken-1">
            <span class="black--text">{{ message }}</span>
            <template v-slot:action="{ attrs }">
                <v-btn text color="black" v-bind="attrs" @click="snackbar = false">Fechar</v-btn>
            </template>
        </v-snackbar>

        <h1 class="subtitle-1 grey--text mt-5">Categorias</h1>

        <v-container v-if="loading">
            <v-progress-circular indeterminate color="amber"></v-progress-circular>
        </v-container>

        <v-container v-else-if="categories.length == 0">
            <span class="grey--text">
                <i>Sem registro de categorias</i>
            </span>
        </v-container>

        <v-container v-else class="my-5">
            <v-row class="mb-3">
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn small text color="grey" @click="sortBy('nome')" v-on="on">
                            <v-icon left small>fas fa-sort</v-icon>
                            <span class="caption text-lowercase">por nome da categoria</span>
                        </v-btn>
                    </template>
                    <span>Ordenar por nome da categoria</span>
                </v-tooltip>
            </v-row>

            <v-card flat class="px-3 mt-2" v-for="cat in categories" :key="cat.id">
                <v-row wrap class="pa-3 bordar">
                    <v-col cols="12" sm="2" md="1" >
                        <div class="caption grey--text"><i>#</i></div>
                        <div>{{ cat.id }}</div>
                    </v-col>

                    <v-col cols="8" sm="8" md="10" >
                        <div class="caption grey--text">Nome</div>
                        <div>{{ cat.nome }}</div>
                    </v-col>

                    <v-col cols="4" sm="2" md="1">
                        <div class="caption grey--text">Opções</div>
                        <v-menu offset-y>
                            <template v-slot:activator="{ on }">
                                <v-btn small icon color="grey" v-on="on">
                                    <v-icon small>fas fa-ellipsis-v</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-title>
                                        <show :categoria="cat" />
                                    </v-list-item-title>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-title>
                                        <edit :categoria="cat" @editedCategory="showSnackbar" />
                                    </v-list-item-title>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-title>
                                        <destroy :categoria="cat" @deletedCategory="showSnackbar" />
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>

        <store @storedCategory="showSnackbar" />
    </div>
</template>

<script>
import Store from './Store';
import Show from './Show';
import Edit from './Edit';
import Destroy from './Destroy';
import service from '@/services/category'

export default {
    components: {
        Store, Show, Edit, Destroy
    },
    data: () => ({
        snackbar: false,
        loading: true,
        message: null,
        categories: [],
    }),
    mounted () {
        this.list()
    },
    methods: {
        list () {
            service.list()
                .then(model => {
                    this.categories = model.data.data
                    this.loading = false
                }).catch(e => console.log(e))
        },
        sortBy (prop) {
            this.categories.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
        },
        showSnackbar(message) {
            this.snackbar = true
            this.message = message
            this.list()
        }
    }
}
</script>

<style scoped>
    .bordar {
        border-left: 4px solid #FFB300;
    }
</style>