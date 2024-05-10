import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { Link } from 'react-router-dom'
  import Data from "./Destination"
  import "./Search-Content.css"
   
  export default function CardDefault() {
    return(
    <>
    <div className="flex items-center justify-center">
      <div className="Search-Container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        {Data.map((item, index) => (
          <Card key={index} className="mt-6 w-full">
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                className="w-full h-full object-fill"
                src={item.imgURL[0]}
                alt="card-image"
              />
            </CardHeader>
            <CardBody className="w-full h-2/7 xs:h-3/6 sm:h-2/6 md:h-3/6 2xl:h-3/7">
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {item.TempatWisata}
              </Typography>
              <Typography className="text-center text-base Summary-Container  lg:text-md 2xl:text-lg">
                {item.simpulan}
              </Typography>
            </CardBody>
            <CardFooter className="pt-auto">
              <Link to={`/explore/${index + 1}`}>
                <Button>Read More</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
    </div>
    </>
    );
  }