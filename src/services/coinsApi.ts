import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '../redux/baseQuery'

export const coinsApi = createApi({
  reducerPath: 'coinsApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCoins: builder.query<string[], void>({
      query: () => 'simple/supported_vs_currencies',
    }),
    getCoinsDetails: builder.query<ICoinsDetails[], ICoinsArgs>({
      query: ({
        page = 1,
        pageSize = 20,
      }) => ({
        url: 'coins/markets',
        params: {
          vs_currency : "usd",
          page,
          per_page : pageSize,
          price_change_percentage : '24h,7d',
        },
      }),
    }),
  }),
})

export const {
  useGetCoinsQuery,
  useGetCoinsDetailsQuery,
  useLazyGetCoinsDetailsQuery,
  useLazyGetCoinsQuery,
} = coinsApi


export interface ICoinsDetails {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: null
  ath: number
  ath_change_percentage: number
  ath_date: Date
  atl: number
  atl_change_percentage: number
  atl_date: Date
  roi: Roi | null
  last_updated: Date
  price_change_percentage_24h_in_currency: number
  price_change_percentage_7d_in_currency: number
}

export interface Roi {
  times: number
  currency: string
  percentage: number
}

export interface ICoinsArgs {
  page?: number
  pageSize?: number
}