import Vue from 'vue'
import CustomNavbar from './../components/shared/Navbar.vue'
import CustomFooter from './../components/shared/Footer.vue'
import ContactForm from './../components/shared/ContactForm.vue'
import AppountmentForm from './../components/shared/AppountmentForm.vue'
import DigitalScanForm from './../components/shared/DigitalScanForm.vue'
import ContentSlider from './../components/shared/ContentSlider.vue'

Vue.component('custom-navbar', CustomNavbar)
Vue.component('custom-footer', CustomFooter)
Vue.component('contact-form', ContactForm)
Vue.component('appountment-form', AppountmentForm)
Vue.component('digital-scan-form', DigitalScanForm)
Vue.component('content-slider', ContentSlider)
