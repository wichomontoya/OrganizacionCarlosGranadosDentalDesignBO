const state = {
  language: '',
  loader: false,
  login: true,
  user: "paginaweb@carlosgranadosdentaldesign.com",
  password: "DENTAL123"
  // user: 'admin@carlosgranadosdentaldesign.com',
  // password: '4dm1nOcgdd'
}

const getters = {
  getLanguage (state) {
    return state.language
  },
  getLoader (state) {
    return state.loader
  },
  getLogin (state) {
    return state.login
  },
  getUser (state) {
    return state.user
  },
  getPassword (state) {
    return state.password
  }
}

const mutations = {
  setLanguage: function (state, payload) {
    state.language = payload
  },
  setLoader: function (state, payload) {
    state.loader = payload
  },
  setLogin: function (state, payload) {
    state.login = payload
  },
  setUser: function (state, payload) {
    state.user = payload
  },
  setPassword: function (state, payload) {
    state.password = payload
  }
}

const actions = {
  updateLanguage: function ({commit}, payload) {
    commit('setLanguage', payload)
  },
  updateLoader: function ({commit}, payload) {
    commit('setLoader', payload)
  },
  updateLogin: function ({commit}, payload) {
    commit('setLogin', payload)
  },
  updateUser: function ({commit}, payload) {
    commit('setUser', payload)
  },
  updatePassword: function ({commit}, payload) {
    commit('setPassword', payload)
  }
}

export default {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
}
