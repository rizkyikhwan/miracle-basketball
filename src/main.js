import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import jQuery from "jquery";
global.jQuery = jQuery;
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBoxOpen,
  faTruck,
  faExchangeAlt,
  faMapMarkedAlt,
  faSearch,
  faShoppingCart,
  faChevronUp
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faWhatsapp,
  faLine,
  faDiscord
} from "@fortawesome/free-brands-svg-icons";
import "./assets/css/main.css";

library.add(
  faBoxOpen,
  faTruck,
  faExchangeAlt,
  faMapMarkedAlt,
  faFacebook,
  faInstagram,
  faTwitter,
  faWhatsapp,
  faLine,
  faSearch,
  faShoppingCart,
  faDiscord,
  faChevronUp
);

Vue.use(VueToast);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueSweetalert2);
Vue.use(VueFormWizard);
Vue.use(Vuesax);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
