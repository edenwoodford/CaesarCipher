//store.js
import { configureStore } from '@reduxjs/toolkit'
import statsReducer from './model.js'
import historyReducer from './model2.js'
export const store = configureStore({
reducer: {
    stats: statsReducer,
    history: historyReducer
}
})

