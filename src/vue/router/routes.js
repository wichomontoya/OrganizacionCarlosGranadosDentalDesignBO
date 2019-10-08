import Hello from './../../components/Hello.vue'
import Home from './../../components/views/Home.vue'
import PatientClinic from './../../components/views/PatientClinic.vue'
import ContinuingEducation from './../../components/views/ContinuingEducation.vue'
import ServicesForProfessionals from './../../components/views/ServicesForProfessionals.vue'

export default [
  { path: '/', component: Home, name: 'root' },
  { path: '/clinica_para_pacientes', component: PatientClinic, name: 'patient_clinic' },
  { path: '/educacion_continuada', component: ContinuingEducation, name: 'continuing_education' },
  { path: '/servicios_para_profesionales', component: ServicesForProfessionals, name: 'services_for_professionals' }
]
