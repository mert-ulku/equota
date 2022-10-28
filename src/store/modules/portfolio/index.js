export default {
  state: {
    userData: [],
    portfolioData: [],
  },
  getters: {
    getUserData(state) { 
      return state.userData;
    },
    getPortfolioData(state) { 
      return state.portfolioData;
    }
  },
  mutations: {
    setUserData(state, payload) { 
      state.userData = payload;
    },
    setPortfolioData(state, payload) { 
      state.portfolioData = payload;
    }
  },
  actions: {
    setUserData({ commit }, userData) { 
      commit('setUserData', userData);
    },
    setPortfolioData({ commit }, portfolioData) { 
      commit('setPortfolioData', portfolioData);
    }
  },
  namespaced: true
}