"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Minus, Plus, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/zustands/cart";
import type { ProductType } from "@/app/types/product";
import type { CartItemType } from "@/app/types/cart";

type ProductSmallCardProps = {
  product: ProductType;
};

const ProductSmallCard: React.FC<ProductSmallCardProps> = ({ product }) => {
  const {
    id,
    name,
    description,
    price,
    images,
    onSale,
    discountPercentage,
    discount,
    quantity: maxStock,
  } = product;
  const { cart, addItemToCart, updateItemQuantity, removeItemFromCart } =
    useCartStore();

  const effectiveDiscount = useMemo(
    () => (onSale ? (discountPercentage ?? 0) : (discount ?? 0)),
    [onSale, discountPercentage, discount],
  );

  const priceAfterDiscount = useMemo(
    () =>
      effectiveDiscount ? (price * (100 - effectiveDiscount)) / 100 : price,
    [price, effectiveDiscount],
  );

  const imageUrl = useMemo(
    () =>
      images && images.length > 0 ? images[0].url : "product-placeholder.png",
    [images],
  );

  const cartItem = useMemo(
    () =>
      cart?.items.find((item: CartItemType) => item.product?.id === product.id),
    [cart, product.id],
  );

  const isAtMaxStock = (cartItem?.quantity || 0) >= maxStock;
  const currentQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    const newItem: CartItemType = {
      id: product.id, // Using product ID as cart item ID for simplicity
      productId: product.id,
      product: product,
      quantity: 1,
      price: priceAfterDiscount,
    };

    addItemToCart(newItem);
  };

  const handleUpdateQuantity = (change: number) => {
    const newQuantity = currentQuantity + change;

    if (newQuantity <= 0) {
      removeItemFromCart(product.id);
      return;
    }

    if (newQuantity > maxStock) return;

    updateItemQuantity(product.id, newQuantity);
  };

  return (
    <div className="group overflow-hidden rounded-4xl bg-white/10 backdrop-blur-lg shadow-xl transition duration-300 border border-white/20 hover:border-white/40">
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-black/50">
        {onSale && (
          <span className="absolute top-4 left-4 z-10 border border-red-400 bg-red-600/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-2xl">
            Sale {discountPercentage ? `-${discountPercentage}%` : ""}
          </span>
        )}
        {images && images.length > 0 ? (
          <Image
            src={`/images/${imageUrl}`}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <Package className="w-12 h-12 text-emerald-300/50" />
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col gap-4">
        <div>
          {/* Title */}
          <h3 className="text-lg font-bold line-clamp-2 text-white">{name}</h3>

          {/* Description */}
          <p className="text-sm text-emerald-100 line-clamp-2">
            {description || "No description available."}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-emerald-300">
            ${priceAfterDiscount.toFixed(2)}
          </span>
          {effectiveDiscount ? (
            <span className="text-sm line-through text-emerald-200/60">
              ${price.toFixed(2)}
            </span>
          ) : null}
        </div>

        {/* Stock Warning */}
        {isAtMaxStock && currentQuantity > 0 && (
          <p className="text-xs font-bold text-red-400">
            ⚠ Maximum stock reached ({maxStock} available)
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link href={`/products/${id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full rounded-2xl font-bold border-emerald-400/40 text-emerald-200 hover:bg-emerald-900/50 hover:border-emerald-400/60 backdrop-blur-md bg-white/5"
              size="sm"
            >
              Details
            </Button>
          </Link>

          {currentQuantity > 0 ? (
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-lg rounded-2xl flex-1 border border-white/20">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg h-7 w-7 p-0 hover:text-red-400 text-white"
                onClick={() => handleUpdateQuantity(-1)}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="font-bold flex-1 text-center text-sm text-white">
                {currentQuantity}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg h-7 w-7 p-0 hover:text-emerald-400 text-white"
                onClick={() => handleUpdateQuantity(1)}
                disabled={isAtMaxStock}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button
              className="flex-1 rounded-2xl font-bold bg-emerald-600/80 hover:bg-emerald-500/90 text-white backdrop-blur-md border border-emerald-400/30"
              size="sm"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSmallCard;
