import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3223'

export const getForecast = ({params, success = () => {}, fail = () => {}} = {}) => {
  axios({
    url: '/forecast',
    params
  }).then(success)
    .catch(fail)
}
