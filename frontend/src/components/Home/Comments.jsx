import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:7070";
function StarIcon({ filled }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      className="h-5 w-5 text-yellow-500"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const TestimonialCard = ({
  name,
  rating,
  comment,
  profileImage,
  role,
  timeAgo,
}) => {
  return (
    <>
      <Card
        color="transparent"
        shadow={false}
        className="w-full rounded-lg p-6"
      >
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="flex items-center gap-4 pb-2"
        >
          <Avatar
            size="md"
            variant="rounded"
            src={
              `${backendUrl}${profileImage}` ||
              "https://via.placeholder.com/150"
            }
            alt={name}
            className="shadow-lg"
          />
          <div className="flex w-full flex-col gap-1">
            <Typography
              variant="h6"
              color="blue-gray"
              className="font-bold text-lg"
              style={{ paddingLeft: "0.2rem" }}
            >
              {name}
            </Typography>
            {role && (
              <Typography
                variant="small"
                color="green"
                className="text-sm font-medium pl-2"
              >
                {role}
              </Typography>
            )}
            <Typography
              variant="small"
              color="gray"
              className="text-xs mt-1 pl-2"
            >
              {timeAgo}
            </Typography>
            <div className="flex justify-end items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} filled={star <= rating} />
              ))}
            </div>
          </div>
        </CardHeader>
        <CardBody className="relative p-0 pt-4">
          {/* Large black quotation mark */}
          <div className="absolute top-0 left-0 w-full text-6xl text-black opacity-20 font-serif -ml-6">
            &ldquo;
          </div>
          {/* Vertical line */}
          <div className="relative flex gap-4 pl-10 pr-4">
            <div className="border-l-2 border-green-300"></div>
            <Typography
              color="gray"
              className="text-base leading-relaxed pl-4 "
            >
              {comment}
            </Typography>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default TestimonialCard;
