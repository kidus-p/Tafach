import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
  import React, { useState } from "react";
  
  export function EcommerceCard({ recipe, onEdit, onDelete }) {
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const handleDelete = () => {
      onDelete(recipe._id);
      handleClose();
    };
  
    return (
      <>
        <Card className="w-96">
          <CardHeader shadow={false} floated={false} className="h-96">
            <img
              src={recipe.image || "https://via.placeholder.com/400"}
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <div className="mb-2 flex items-center justify-between">
              <Typography color="blue-gray" className="font-medium">
                {recipe.title}
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                ${recipe.price || "N/A"}
              </Typography>
            </div>
            <Typography
              variant="small"
              color="gray"
              className="font-normal opacity-75"
            >
              {recipe.description}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              ripple={false}
              fullWidth={true}
              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              onClick={() => onEdit(recipe._id)}
            >
              Edit
            </Button>
            <Button
              ripple={false}
              fullWidth={true}
              className="bg-red-500 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 mt-2"
              onClick={handleOpen}
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Confirm Delete</DialogHeader>
          <DialogBody>
            <Typography>
              Are you sure you want to delete this recipe?
            </Typography>
          </DialogBody>
          <DialogFooter>
            <Button
              color="red"
              onClick={handleDelete}
              className="mr-1"
            >
              Yes
            </Button>
            <Button
              color="blue-gray"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  }
  