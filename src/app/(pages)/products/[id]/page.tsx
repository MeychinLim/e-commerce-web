"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Star,
  ImageOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products } from "@/static/products";
import { useShopStore } from "@/zustands/shopStore";
import type { ProductType } from "@/app/types/product";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page: React.FC<PageProps> = ({ params }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  // const [isFavorite, setIsFavorite] = useState(false);
  const { cart, setCart } = useShopStore();
  const [paramsData, setParamsData] = useState<{ id: string } | null>(null);

  React.useEffect(() => {
    params.then((p) => setParamsData(p));
  }, [params]);

  const product = useMemo(
    () =>
      paramsData
        ? products.find((p) => p.id === parseInt(paramsData.id))
        : undefined,
    [paramsData],
  );

  const effectiveDiscount = useMemo(() => {
    if (!product) return 0;
    return product.onSale
      ? (product.discountPercentage ?? 0)
      : (product.discount ?? 0);
  }, [product]);

  const priceAfterDiscount = useMemo(() => {
    if (!product) return 0;
    return effectiveDiscount
      ? (product.price * (100 - effectiveDiscount)) / 100
      : product.price;
  }, [product, effectiveDiscount]);

  const cartItem = useMemo(
    () =>
      cart?.items.find((item: ProductType) => item.id === product?.id) ||
      undefined,
    [cart, product],
  );

  if (!paramsData || !product) {
    return (
      <div className="px-4 py-8 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-3xl font-bold">Product Not Found</h1>
        <Link href="/products">
          <Button className="rounded-2xl">Back to Products</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product || !cart) return;

    const existingItem = cart.items.find(
      (item: ProductType) => item.id === product.id,
    );

    const updatedItems = existingItem
      ? cart.items.map((item: ProductType) =>
        item.id === product.id
          ? {
            ...item,
            quantity: (item.quantity || 0) + selectedQuantity,
          }
          : item,
      )
      : [
        ...cart.items,
        {
          ...product,
          quantity: selectedQuantity,
        },
      ];

    setCart({
      ...cart,
      items: updatedItems,
    });

    setSelectedQuantity(1);
  };

  // const handleUpdateCartQuantity = (newQuantity: number) => {
  //   if (!cart || newQuantity < 0) return;

  //   if (newQuantity === 0) {
  //     const updatedItems = cart.items.filter(
  //       (item: ProductType) => item.id !== product.id,
  //     );
  //     setCart({
  //       ...cart,
  //       items: updatedItems,
  //     });
  //     return;
  //   }

  //   const updatedItems = cart.items.map((item: ProductType) =>
  //     item.id === product.id ? { ...item, quantity: newQuantity } : item,
  //   );

  //   setCart({
  //     ...cart,
  //     items: updatedItems,
  //   });
  // };

  const isInStock = product.quantity && product.quantity > 0;
  const cartQuantity = cartItem?.quantity || 0;
  const hasDiscount =
    (product.onSale &&
      product.discountPercentage &&
      product.discountPercentage > 0) ||
    (product.discount && product.discount > 0);

  return (
    <div className="px-4 py-8">
      <Link href="/products" className="inline-block mb-6">
        <Button variant="outline" className="rounded-2xl">
          ← Back to Products
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Section */}
        <div className="flex flex-col gap-4">
          <div className="relative h-96 w-full overflow-hidden rounded-2xl border">
            {product.onSale && (
              <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-2xl">
                Sale{" "}
                {product.discountPercentage
                  ? `-${product.discountPercentage}%`
                  : ""}
              </span>
            )}

            {!product?.images && product?.images?.length > 0 ? (
              <Image
                src={`/images/${product.images[0]?.url}`}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <ImageOff className="w-25 h-25 text-gray-400" />
              </div>
            )}
          </div>

          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image) => (
                <div
                  key={image.id}
                  className="relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-100 cursor-pointer hover:opacity-75"
                >
                  <Image
                    src={`/images/${image.url}`}
                    alt={`Thumbnail ${image.id}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 font-semibold">{product.category}</p>
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold">
              ${priceAfterDiscount.toFixed(2)}
            </div>
            {hasDiscount && (
              <div className="flex items-center gap-2">
                <span className="text-lg line-through text-gray-400">
                  ${product.price.toFixed(2)}
                </span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-2xl text-sm font-bold">
                  -
                  {product.onSale
                    ? product.discountPercentage
                    : product.discount}
                  %
                </span>
              </div>
            )}
          </div>

          {/* Rating and Stock Section */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {product.rating && (
              <div className="flex items-center gap-1">
                <span className="text-lg">
                  <Star width={18} />
                </span>
                <span className="font-semibold">{product.rating}</span>
              </div>
            )}
            {product.review && (
              <div className="text-gray-600">({product.review} reviews)</div>
            )}
            <div>
              {isInStock ? (
                <span className="text-green-600 font-semibold">✓ In Stock</span>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="">
            {/* <h3 className="font-bold mb-2">Description</h3> */}
            <p className="">
              {product.description || "No description available."}
            </p>
          </div>

          {/* Specifications */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold">
                  Specifications
                </CardTitle>

                <div>
                  {cartQuantity <= 0 ? (
                    <Button
                      className="rounded-2xl font-bold"
                      disabled={!isInStock}
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <div>
                      <div className="flex items-center gap-1 rounded-2xl w-fit">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-lg h-8 w-8 p-0"
                          onClick={() =>
                            setSelectedQuantity(
                              Math.max(selectedQuantity - 1, 1),
                            )
                          }
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-bold min-w-8 text-center">
                          {selectedQuantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-lg h-8 w-8 p-0"
                          onClick={() =>
                            setSelectedQuantity(
                              Math.min(selectedQuantity + 1, product.quantity),
                            )
                          }
                          disabled={selectedQuantity >= product.quantity}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm">
              {product.size && (
                <div className="flex justify-between">
                  <span className="font-semibold">Size:</span>
                  <span className="font-bold">{product.size}</span>
                </div>
              )}
              {product.quantity !== undefined && (
                <div className="flex justify-between">
                  <span className="font-semibold">
                    Available:
                  </span>
                  <span className="font-bold">{product.quantity} units</span>
                </div>
              )}
              {product.sold && (
                <div className="flex justify-between">
                  <span className="font-semibold">Sold:</span>
                  <span className="font-bold">{product.sold} units</span>
                </div>
              )}
              {product.colors && product.colors.length > 0 && (
                <div className="flex justify-between">
                  <span className="font-semibold">Colors:</span>
                  <span className="font-bold">
                    {product.colors.length} options
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
