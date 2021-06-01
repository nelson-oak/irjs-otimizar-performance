import { List, ListRowRenderer } from 'react-virtualized'

// import { useMemo } from 'react'

import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: number
    price: number
    title: string
    priceFormatted: string
  }>
  totalPrice: number
  onAddToWishlist: (id: number) => Promise<void>
}

export function SearchResults({ results, totalPrice, onAddToWishlist }: SearchResultsProps) {
  // const totalPrice = useMemo(() => {
  //   return results.reduce((total, product) => {
  //     return total + product.price
  //   }, 0)
  // }, [results])

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishlist={onAddToWishlist}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
      
      {/* {results.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToWishlist={onAddToWishlist}
        />
      ))} */}
    </div>
  )
}