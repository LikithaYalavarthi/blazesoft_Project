import { createSlice } from '@reduxjs/toolkit'

export const bookStore = createSlice({
  name: 'bookstore',
  initialState: {
   bookvalues: [
    { "id": "1", "name": "Book1", "price": "10", "category": "adventure", "description": "The book has all data" },
    { "id": "2", "name": "Book2", "price": "15", "category": "games", "description": "The book has fewer data" },
    { "id": "3", "name": "Book3", "price": "20", "category": "description", "description": "The book has more data" },
    { "id": "4", "name": "Book4", "price": "25", "category": "games", "description": "The book has high data" }
  ]},
  reducers: {
    addbook: (state, action) => {
       state['bookvalues'].push(action.payload)
    },
    editbook : (state, action) => {
        state['bookvalues'] = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { addbook, editbook } = bookStore.actions

export default bookStore.reducer