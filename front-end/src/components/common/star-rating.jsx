import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange, dimension }) {
  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      className={`p-2 rounded-full transition-colors ${
        star <= rating
          ? "text-yellow-500 hover:text-muted transition-all duration-500"
          : "text-black hover:bg-primary hover:text-primary-foreground"
      }`}
      variant="outline"
      size="icon"
      //style={{ width: `${dimension}px`, height: `${dimension}px` }} // Set button size dynamically
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
    >
      <StarIcon
        style={{
          width: `${dimension}px`,
          height: `${dimension}px`,
        }} // Set star size dynamically relative to button size
        className={`${star <= rating ? "fill-yellow-500" : "fill-black"}`}
      />
    </Button>
  ));
}

export default StarRatingComponent;
