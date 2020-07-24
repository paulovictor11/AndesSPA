<template>
    <div id="categoria">
        <v-snackbar v-model="snackbar" :timeout="5000" color="amber darken-1">
            <span class="black--text">{{ message }}</span>
            <template v-slot:action="{ attrs }">
                <v-btn text color="black" v-bind="attrs" @click="snackbar = false">Fechar</v-btn>
            </template>
        </v-snackbar>

        <h1 class="subtitle-1 grey--text mt-5">Gêneros</h1>

        <v-container v-if="loading">
            <v-progress-circular indeterminate color="amber"></v-progress-circular>
        </v-container>

        <v-container v-else-if="genders.length == 0">
            <span class="grey--text">
                <i>Sem registro de gênero</i>
            </span>
        </v-container>

        <v-container v-else class="my-5">
            <v-row class="mb-3">
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn small text color="grey" @click="sortBy('nome')" v-on="on">
                            <v-icon left small>fas fa-sort</v-icon>
                            <span class="caption text-lowercase">por nome do gênero</span>
                        </v-btn>
                    </template>
                    <span>Ordenar por nome da gênero</span>
                </v-tooltip>

                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn small text color="grey" @click="sortBy('sigla')" v-on="on">
                            <v-icon left small>fas fa-sort</v-icon>
                            <span class="caption text-lowercase">por sigla do gênero</span>
                        </v-btn>
                    </template>
                    <span>Ordenar por nome da gênero</span>
                </v-tooltip>
            </v-row>

            <v-card flat class="px-3 mt-2" v-for="g in genders" :key="g.id">
                <v-row wrap class="pa-3 bordar">
                    <v-col cols="12" sm="2" md="1" >
                        <div class="caption grey--text"><i>#</i></div>
                        <div>{{ g.id }}</div>
                    </v-col>

                    <v-col cols="8" sm="6" md="5" >
                        <div class="caption grey--text">Nome</div>
                        <div>{{ g.nome }}</div>
                    </v-col>

                    <v-col cols="8" sm="6" md="5" >
                        <div class="caption grey--text">Sigla</div>
                        <div>{{ g.sigla }}</div>
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
                                        <show :genero="g" />
                                    </v-list-item-title>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-title>
                                        <edit :genero="g" @editedGender="showSnackbar" />
                                    </v-list-item-title>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-title>
                                        <destroy :genero="g" @deletedGender="showSnackbar" />
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>

        <store @storedGender="showSnackbar" />
    </div>
</template>

<script>
import Store from './Store';
import Show from './Show';
import Edit from './Edit';
import Destroy from './Destroy';
import service from '@/services/gender'

export default {
    components: {
        Store, Show, Edit, Destroy
    },
    data: () => ({
        snackbar: false,
        loading: true,
        message: null,
        genders: [],
    }),
    mounted () {
        this.list()
    },
    methods: {
        list () {
            service.list().then(model => {
                this.genders = model.data.data
                this.loading = false
            }).catch(e => console.log(e))
        },
        sortBy (prop) {
            this.genders.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
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