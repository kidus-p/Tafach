import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
  
  function RecipeCard({ recipe, handleCardClick, handleUpdateRecipe, handleDeleteRecipe, tab }) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:7070";
  
    return (
      <Card className="w-full max-w-[34rem] max-h-[20rem] border flex-row shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 rounded-lg overflow-hidden">
        {/* Card Header with Image */}
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="w-2/5 shrink-0 rounded-tl-lg rounded-bl-lg overflow-hidden"
        >
          <img
            src={`${backendUrl}${recipe.recipeImage}`}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </CardHeader>
  
        {/* Card Body */}
        <CardBody className="p-6 flex flex-col justify-between w-3/5 space-y-4">
          <div className="space-y-1">
            <Typography
              variant="h3"
              color="blue-gray"
              className="cursor-pointer hover:underline font-bold mb-2 text-2xl leading-tight"
              onClick={() => handleCardClick(recipe._id)}
            >
              {recipe.title}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="font-light text-sm leading-snug line-clamp-3"
            >
              {recipe.description}
            </Typography>
          </div>
  
          {/* Action Buttons */}
          {tab === "My Recipes" && (
            <div className="flex space-x-4 mt-3">
              <Button
                onClick={() => handleUpdateRecipe(recipe._id)}
                variant="text"
                size="sm"
                className="text-blue-600 font-medium text-sm transition-all duration-200 ease-in-out hover:text-blue-800 hover:scale-105"
              >
                Update
              </Button>
              <Button
                onClick={() => handleDeleteRecipe(recipe._id)}
                variant="text"
                size="sm"
                className="text-red-600 font-medium text-sm transition-all duration-200 ease-in-out hover:text-red-800 hover:scale-105"
              >
                Delete
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    );
  }
  
  export default RecipeCard;
  