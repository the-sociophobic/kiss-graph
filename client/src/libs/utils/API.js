import axios from 'axios'

import isProd from './isProd'


const APIlink = () =>
  isProd() ?
    "https://kiss-graph.com"
    :
    "http://localhost:3005"

const post = async (path, data) =>
  (await axios.post(
    APIlink() + path,
    data,
  )).data

const get = async (path) =>
  (await axios.get(
    APIlink() + path,
  )).data


export {
  post,
  get,
}