import { CustomerReviewType } from "@/app/types/customer";
import { UserCircle2 } from "lucide-react";

type Props = {
  customerReview: CustomerReviewType;
};

const CustomerReviewCard = ({ customerReview }: Props) => {
  return (
    <div className="w-80 bg-white/10 backdrop-blur-lg border border-white/20 rounded-4xl shadow-xl p-6 my-10">
      <div className="flex items-center gap-4 mb-4">
        <UserCircle2 width={40} height={40} />
        <span className="text-lg font-semibold">{customerReview.name}</span>
      </div>
      <p className="text-sm">{customerReview.review}</p>
    </div>
  );
};

export default CustomerReviewCard;
