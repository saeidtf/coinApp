import { fetchBaseQuery } from '@reduxjs/toolkit/query'

const baseQuery = fetchBaseQuery({
  cache: 'default',

  baseUrl: "https://api.coingecko.com/api/v3",
  prepareHeaders: async (headers, { getState }) => {    
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', '*/*')
    return headers
  },
})

export default baseQuery
