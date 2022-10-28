export default {
  state: {
    userData: [],
    portfolioData: [],
    searchResults: []
  },
  getters: {
    getUserData(state) { 
      return state.userData;
    },
    getPortfolioData(state) { 
      return state.portfolioData;
    },
    getSearchResults(state) { 
      return state.searchResults;
    }
  },
  mutations: {
    setUserData(state, payload) { 
      state.userData = payload;
    },
    setPortfolioData(state, payload) { 
      state.portfolioData = payload;
    },
    setSearchResults(state, payload) {
      state.searchResults = payload;
    },
    addNewUserData(state, payload) {
      state.userData = [...state.userData, payload];

      const storedData = localStorage.getItem("previousData") 
      let parsedData = (storedData && JSON.parse(storedData)) || []
      parsedData = [...parsedData, payload]
      localStorage.setItem("previousData", JSON.stringify(parsedData))
    }
  },
  actions: {
    setUserData({ commit }, userData) { 
      commit('setUserData', userData);
    },
    setPortfolioData({ commit }, portfolioData) { 
      commit('setPortfolioData', portfolioData.map(item => {
        return {
          ...item,
          count: 0
        }
      }));
    },
    setSearchResults({ commit }, searchResults) { 
      commit('setSearchResults', searchResults);
    },
    updateQuantity({state}, {value, symbol}) { 

      const foundItem = state.searchResults.find(item => item.symbol === symbol);
      foundItem.count = value;
    },
    addNewUserData({ commit }, userData) { 
      console.log(userData)
      commit('addNewUserData', userData);
    }
  },
  namespaced: true
}