import React, { useEffect, useState } from "react";
import { Box, Icon, Stack, Text } from "@chakra-ui/react";
import { useRatePostMutation } from "../../generated/graphql";
import { StarIcon } from "@chakra-ui/icons";

interface RatingProps {
  size: number;
  icon: string;
  scale: number;
  fillColor: string;
  strokeColor: string;
  bookingId: number;
  postId: number;
}

const Rating: React.FC<RatingProps> = ({
  size,
  icon,
  scale,
  fillColor,
  strokeColor,
  bookingId,
  postId,
}) => {
  const [ratePost, { loading }] = useRatePostMutation({ notifyOnNetworkStatusChange: true });
  const [rating, setRating] = useState(0);
  const buttons = [];

  useEffect(() => {
    ratePost({
      variables: { bookingId: bookingId, postId: postId, userRating: rating },
      update: (cache) => {
        cache.evict({ fieldName: "me" });
      },
    });
  }, [rating]);

  const onClick = (idx) => {
    if (!isNaN(idx)) {
      // allow user to click first icon and set rating to zero if rating is already 1
      if (rating === 1 && idx === 1) {
        setRating(0);
      } else {
        setRating(idx);
      }
    }
  };

  const RatingIcon = ({ fill }) => {
    return (
      <StarIcon
        name={icon}
        size={`${size}px`}
        color={fillColor}
        stroke={strokeColor}
        onClick={onClick}
        fillOpacity={fill ? "100%" : "0"}
      />
    );
  };

  const RatingButton = ({ idx, fill }) => {
    return (
      <Box
        as="button"
        aria-label={`Rate ${idx}`}
        height={`${size}px`}
        width={`${size}px`}
        mx={1}
        onClick={() => onClick(idx)}
        _focus={{ outline: 0 }}
      >
        <RatingIcon fill={fill} />
      </Box>
    );
  };

  for (let i = 1; i <= scale; i++) {
    buttons.push(<RatingButton key={i} idx={i} fill={i <= rating} />);
  }

  return (
    <Stack isInline mt={8} justify="center">
      {buttons}
    </Stack>
  );
};

Rating.displayName = "Rating";

export default Rating;
