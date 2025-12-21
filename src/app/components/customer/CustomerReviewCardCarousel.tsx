import { CustomerReviewType } from "@/app/types/customer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CustomerReviewCard from "./CustomerReviewCard";

type Props = {
  customerReviews: CustomerReviewType[];
};

const CustomerReviewCardCarousel = ({ customerReviews }: Props) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {customerReviews.map((customerReview, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <CustomerReviewCard customerReview={customerReview} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CustomerReviewCardCarousel;
