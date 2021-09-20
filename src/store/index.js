import Vue from 'vue'
import Vuex from 'vuex'
import { db, dbAuth } from '@/firebase/config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profilePhoneNumber: null,
    profileId: null,
    profileInitials: null
  },
  mutations: {
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profilePhoneNumber = doc.data().phoneNumber
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload
    },
    changeLastName(state, payload) {
      state.profileLastName = payload
    },
    changePhoneNumber(state, payload) {
      state.profilePhoneNumber = payload
    },
  },
  actions: {
    async getCurrentUser({commit}) {
      const dataBase = await db.collection("users").doc(dbAuth.currentUser.uid);
      const dbResult = await dataBase.get();
      commit("setProfileInfo", dbResult)
      commit("setProfileInitials")
    },
    async updateUserSettings({commit, state}) {
      const dataBase = await db.collection('users').doc(state.profileId);
      await dataBase.update({
        firstName : state.profileFirstName,
        lastName : state.profileLastName,
        phoneNumber : state.profilePhoneNumber
      })
      commit("setProfileInitials")
    }
  }
})