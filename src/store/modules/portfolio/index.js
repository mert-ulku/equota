export default {
  state: {
    userData: [],
    portfolioData: [],
    searchKeyword: ''
  },
  getters: {
    getUserData(state) { 
      return state.userData;
    },
    getPortfolioData(state) { 
      return state.portfolioData;
    },
    getSearchKeyword(state) { 
      return state.searchKeyword;
    }
  },
  mutations: {
    setUserData(state, payload) { 
      // localStorage.setItem("previousData", JSON.stringify(payload))
      state.userData = payload;
    },
    setPortfolioData(state, payload) { 
      state.portfolioData = payload;
    },
    addNewUserData(state, payload) {
  
      state.userData = [...state.userData, payload];

      const storedData = localStorage.getItem("previousData") 
      let parsedData = (storedData && JSON.parse(storedData)) || []
      parsedData = [...parsedData, payload]
      localStorage.setItem("previousData", JSON.stringify(parsedData))
      
    },
    setSearchKeyword(state, payload) { 
      state.searchKeyword = payload;
    },
  },
  actions: {
    setUserData({ commit }, userData) { 
      commit('setUserData', userData);
    },
    updateUserDataItemQuantity({ commit, state }, { quantity, symbol }) {

      const copyUserData = [...state.userData];

      const foundIndex = copyUserData.findIndex(item => {
        return item.symbol === symbol
      })
      copyUserData[foundIndex].quantity = Number(quantity);

      commit('setUserData', copyUserData);
    },
    setPortfolioData({ commit }, portfolioData) { 
      commit('setPortfolioData', portfolioData)
    },
    updateQuantity({ state, commit }, { value, symbol }) {

      const copyPortfolioData = [...state.portfolioData]

      const foundIndex = copyPortfolioData.findIndex(item => {
        return item.symbol === symbol
      })

      copyPortfolioData[foundIndex].quantity = Number(value)

      commit('setPortfolioData', copyPortfolioData)


    },
    addNewUserData({ commit }, userData) { 
      commit('addNewUserData', userData);
    },
    updatePortfolioItem({ state, commit }, item) { 
 
      const savedData = localStorage.getItem('previousData');
      const parsedData = JSON.parse(savedData);
      const foundIndex = parsedData.findIndex(data => data.symbol === item.symbol);
      parsedData[foundIndex] = item;
      localStorage.setItem("previousData", JSON.stringify(parsedData))

      const isInUserData = state.userData.find(data => {
        return data.symbol === item.symbol
      })

      if(isInUserData) {
        const copyUserData = [...state.userData];

        const foundIndex = copyUserData.findIndex(data => {
          return data.symbol === item.symbol;
        })

        copyUserData[foundIndex].quantity = Number(item.quantity);

        commit('setUserData', copyUserData);
      }
    },
    removeUserData({ commit, state }, item) { 
      const copyUserData = [...state.userData];
      const filteredData = copyUserData.filter(data => data.symbol !== item.symbol);
      commit('setUserData', filteredData);

      const savedData = localStorage.getItem('previousData');
      const parsedData = JSON.parse(savedData);
      const filteredSavedData = parsedData.filter(data => data.symbol !== item.symbol);
      localStorage.setItem("previousData", JSON.stringify(filteredSavedData))
    }
  },
  namespaced: true
}