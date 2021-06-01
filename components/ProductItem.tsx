import { memo, useState } from 'react'
import dynamic from 'next/dynamic'
import lodash from 'lodash'

import { AddProductToWishlistProps } from './AddProductToWishlist'
// import { AddProductToWishlist } from './AddProductToWishlist'

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist)
}, {
  loading: () => <span>Carregando</span>
})

interface ProductItemProps {
  product: {
    id: number
    price: number
    title: string
    priceFormatted: string
  }
  onAddToWishlist: (id: number) => Promise<void>
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)

  // Exemplo de como seria em uma função
  // async function showFormattedDate() {
  //   const { format } = await import('date-fns')

  //   format()
  // }

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>Adicionar aos favoritos</button>
      
      {isAddingToWishlist && 
      <AddProductToWishlist
        onAddToWishlist={() => onAddToWishlist(product.id)}
        onRequestClose={() => setIsAddingToWishlist(false)}
      />}
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nexProps) => {
  return lodash.isEqual(prevProps.product, nexProps.product)
})