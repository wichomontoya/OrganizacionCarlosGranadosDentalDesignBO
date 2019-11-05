import Hello from './../../components/HelloWorld.vue'
// import Importer from './../../components/Importer.vue'
// import Graphics from './../../components/Graphics.vue'
// import Clients from './../../components/clients/Clients.vue'
// import EditClient from './../../components/clients/EditClient.vue'
// import NewClient from './../../components/clients/NewClient.vue'
// import Pits from './../../components/pits/Pits.vue'
// import NewPit from './../../components/pits/NewPit.vue'
// import Properties from './../../components/properties/Properties.vue'
import Sections from './../../components/sections/Index.vue'
import NewSection from './../../components/sections/NewSection.vue'
import EditSection from './../../components/sections/EditSection.vue'
import Articles from './../../components/articles/Index.vue'
import NewArticle from './../../components/articles/NewArticle.vue'
import EditArticle from './../../components/articles/EditArticle.vue'

export default [
  { path: '/', component: Hello, name: 'root' },
  { path: '/secciones', component: Sections, name: 'sections' },
  { path: '/articulos', component: Articles, name: 'articles' },
  { path: '/secciones/crear', component: NewSection, name: 'new_section' },
  { path: '/articulos/crear', component: NewArticle, name: 'new_article' },
  { path: '/secciones/editar/:id', component: EditSection, name: 'edit_section' },
  { path: '/articulos/editar/:id', component: EditArticle, name: 'edit_article' },
]
