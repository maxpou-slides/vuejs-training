import axios from 'axios'

export function getAll () {
  return axios.get(process.env.HOSTELS_URL + 'hostels.json').then(response => response.data)
}
