<template>
    <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn small text block v-on="on">
                <v-icon small left color="grey">far fa-eye</v-icon>
                <span class="grey--text">Visualizar</span>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <h5>Visualizar Categoria</h5>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3">
                    <v-text-field :disabled="true" color="amber darken-1" label="Nome" v-model="categoria.nome" prepend-icon="fas fa-edit"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn class="mt-3" depressed color="amber darken-1" @click="dialog = false">Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['categoria'],
    data: () => ({
        dialog: false,
    }),
}
</script>