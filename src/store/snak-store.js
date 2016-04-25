import { createStore } from 'redux'
import reducers from '../reducers/index'


const STORE = createStore(reducers)

console.log('STORE___________________________________')
console.log(STORE)
console.log('STORE___________________________________')
export default STORE


//module.exports = STORE
