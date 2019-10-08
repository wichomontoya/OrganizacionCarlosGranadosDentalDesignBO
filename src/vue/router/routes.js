import Hello from './../../components/HelloWorld.vue'
import Importer from './../../components/Importer.vue'
import Graphics from './../../components/Graphics.vue'
import Clients from './../../components/clients/Clients.vue'
import NewClient from './../../components/clients/NewClient.vue'
import Pits from './../../components/pits/Pits.vue'
import NewPit from './../../components/pits/NewPit.vue'
import Properties from './../../components/properties/Properties.vue'

export default [
  { path: '/', component: Hello, name: 'root' },
  { path: '/importador', component: Importer, name: 'importer' },
  { path: '/graficos', component: Graphics, name: 'graphics' },
  { path: '/clientes', component: Clients, name: 'clients' },
  { path: '/nuevo_cliente', component: NewClient, name: 'new_client' },
  { path: '/pozos', component: Pits, name: 'pits' },
  { path: '/nuevo_pozo', component: NewPit, name: 'new_pit' },
  { path: '/propiedades', component: Properties, name: 'properties' }
]
