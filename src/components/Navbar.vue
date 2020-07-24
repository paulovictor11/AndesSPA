<template>
    <nav>
        <v-app-bar app color="amber darken-1" flat :clipped-left="true">
            <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title class="text-uppercase white--text">
                <span class="font-weight-light">Kilo</span>
                <span>Metro</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn text color="white">
                <span>Sair</span>
                <v-icon right>fas fa-sign-out-alt</v-icon>
            </v-btn>
        </v-app-bar>

        <v-card width="256" class="mx-auto" :elevation="6">
            <v-navigation-drawer app v-model="drawer" :clipped="true" :floating="true" class="grey lighten-4">
                <v-list dense nav>
                    <v-list-item-group color="warning">
                        <v-list-item v-for="(link, index) in links" :key="index" router :to="link.route">
                            <v-list-item-action>
                                <v-icon dense v-text="link.icon "></v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title v-text="link.text"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
        </v-card>
    </nav>
</template>

<script>
export default {
    data: () => ({
        drawer: false,
        links: [
            { icon: 'fas fa-chart-line', text: 'Dashboard', route: '/' },
            { icon: 'fas fa-list-ul', text: 'Categorias', route: '/categoria' },
            { icon: 'fas fa-venus-mars', text: 'Generos', route: '/genero' },
            { icon: 'fas fa-gifts', text: 'Produtos', route: '/produto' },
            { icon: 'fas fa-shopping-cart', text: 'Compras', route: '/compra' },
        ]
    })
}
</script>