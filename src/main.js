import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import * as VueStripeCheckOut from "vue-stripe-checkout";

Vue.use(
  VueStripeCheckOut,
  "pk_test_51HGQmJF3taK9EUdAS1170CzCc7bsaEh16jCnNa4Z8tMWf946mSBORTGRyklB2DxvtxzRfLfWf5noywd5cZCI81Bg00MvCyGKqh"
);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
