import store from '@/store/cart.js';

const ShowAlert = function(message) {
  store.commit('setAlertMessage', message);
}

export default ShowAlert;
