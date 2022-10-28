import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const modules = {}
const requireModule = require.context(
  './modules',
  true,
  /\.\/[\w-]+\/index\.js$/
)
requireModule.keys().forEach(fileName => {
  modules[fileName.replace('/index.js', '').replace('./', '')] = requireModule(fileName).default
});

export default new Vuex.Store({
  modules
});
