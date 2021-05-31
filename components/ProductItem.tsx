import { memo } from 'react'

interface ProductItemProps {
  product: {
    id: number
    price: number
    title: string
  }
  onAddToWishlist: (id: number) => Promise<void>
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
      <button onClick={() => onAddToWishlist(product.id)}>Add to wishlist</button>
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nexProps) => {
  return Object.is(prevProps.product, nexProps.product)
})