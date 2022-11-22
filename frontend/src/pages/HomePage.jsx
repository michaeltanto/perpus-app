import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
export const HomePage = () => {
  const [books, setBooks] = useState([]);
  const data = useSelector((state) => state.bookSlice.value);
  const getBooks = async () => {
    const result = await axios.get("http://localhost:2000/book/get");
    console.log(result.data);
    setBooks(result.data);
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
     <div>
      <Pagination/>
      <Flex wrap="wrap" justifyContent="center">
        {data.map((item) => {
          return (
            <Card maxW="sm" m="2">
              <CardBody>
                <Image
                  src={item.Images}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{item.Title}</Heading>
                  <Text>{item.Synopsis}</Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button variant="ghost" colorScheme="blue">
                    Add to cart
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          );
        })}
      </Flex>
      </div>
  );
};
