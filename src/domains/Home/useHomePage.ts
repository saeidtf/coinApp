import { ICoinsDetails, useGetCoinsDetailsQuery, useGetCoinsQuery } from '@/services/coinsApi'
import { SelectChangeEvent } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'

export default function useHomePage() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')
  const [coins, setCoins] = useState<ICoinsDetails[]>([])
  const [totalSize, setTotalSize] = useState(250)
  const [vsCurrency, setVsCurrency] = useState('usd')

  const { data: coinsName } = useGetCoinsQuery()
  const { data: coinsDetail, isFetching , error } = useGetCoinsDetailsQuery({
    page: 1,
    pageSize: 250,
    vsCurrency,
  })

  const debounce = (fn: any, ms: number) => {
    let timeoutId: any
    return (...args: any) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn(...args), ms)
    }
  }

  useEffect(() => {
    if (coinsDetail) {
      const searchCoins = coinsDetail.filter((coin) => {
        return coin.name.toLowerCase().includes(search.toLowerCase())
      })

      setTotalSize(searchCoins.length)

      const start = (page - 1) * pageSize
      const end = start + pageSize
      setCoins(searchCoins.slice(start, end))
    }
  }, [coinsDetail, page, search, pageSize])

  const handleSearch = debounce((e: any) => {
    setPage(1)
    setSearch(e.target.value)
  }, 500)

  const handlePageSize = (e: SelectChangeEvent<number>, child: ReactNode) => {
    setPage(1)
    setPageSize(+e.target.value)
  }

  return {
    page,
    setPage,
    pageSize,
    search,
    coins,
    coinsName,
    totalSize,
    setTotalSize,
    vsCurrency,
    setVsCurrency,
    handleSearch,
    handlePageSize,
    isFetching,
    error
  }
}
