import type { CartItemType } from "@/app/types/cart";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/zustands/cart";
import { Minus, Plus } from "lucide-react";

type CartItemCardProps = {
  item: CartItemType;
  isAtMaxStock: boolean;
};

const CartItemQuantityAdjustment = ({
  item,
  isAtMaxStock = true,
}: CartItemCardProps) => {
  const { updateItemQuantity, removeItemFromCart } = useCartStore();

  const handleDecrease = (productId: number) => {
    const newQuantity = item?.quantity - 1;

    if (newQuantity <= 0) {
      removeItemFromCart(productId);
      return;
    }

    updateItemQuantity(productId, newQuantity);
  };

  const handleIncrease = (productId: number) => {
    const newQuantity = item?.quantity + 1;
    updateItemQuantity(productId, newQuantity);
  };

  return (
    <div
      className={`flex items-center gap-2 border rounded-2xl p-1 ${isAtMaxStock ? "bg-red-500/50" : ""}`}
    >
      <Button
        variant="ghost"
        size="sm"
        className="rounded-lg h-7 w-7 p-0"
        onClick={() => handleDecrease(item?.productId)}
      >
        <Minus className="w-3 h-3" />
      </Button>

      <span className="font-bold min-w-6 text-center">{item?.quantity}</span>

      <Button
        variant="ghost"
        size="sm"
        disabled={isAtMaxStock}
        className="rounded-lg h-7 w-7 p-0"
        onClick={() => handleIncrease(item?.productId)}
      >
        <Plus className="w-3 h-3" />
      </Button>
    </div>
  );
};

export default CartItemQuantityAdjustment;
