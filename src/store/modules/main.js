import {
  APP_START,
  FORECAST_REQUEST,
  FORECAST_SUCCESS,
  FORECAST_FAIL
} from '../constants'
import { getForecast } from '../../utils/api'

const state = {
  forecast: {currently: {}}
}

const actions = {
  [APP_START] ({commit}) {
    commit(APP_START)
  },
  [FORECAST_REQUEST] ({commit}, data) {
    commit(FORECAST_REQUEST, data)
    getForecast(data)
  },
  [FORECAST_SUCCESS] ({commit}, data) {
    commit(FORECAST_SUCCESS, data)
  },
  [FORECAST_FAIL] ({commit}, data) {
    commit(FORECAST_FAIL, data)
  }
}

const mutations = {
  [APP_START] (state, shortcodes) {
    state.shortcodes = shortcodes
  },
  [FORECAST_REQUEST] (state) {

  },
  [FORECAST_SUCCESS] (state, req) {
    state.forecast = req.data
  },
  [FORECAST_FAIL] (state, err) {

  }
}

const getters = {
  forecast: state => state.forecast
}

export default {
  state,
  mutations,
  actions,
  getters
}
