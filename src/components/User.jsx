import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  IconButton,
  Select,
  Button,
  Grid,
  GridItem,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const User = () => {
  const [state, setState] = useState([]);
  const [search, setSearch] = useState(" ");
  const [page, setPage] = useState(1);
  // const [presentpage, setPresentPage] = useState(0)

  useEffect(() => {
    fetchData();
  }, [page]);

  const limit = 3;

  const fetchData = () => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`
      )
      .then(res => {
        console.log(res.data);
        setState(res.data);
      });
  };

  const handleSearch = e => {
    e.preventDefault();
    axios
      .get(`https://jsonplaceholder.typicode.com/users?_q=${search}`)
      .then(res => {
        // console.log(res.data);
        setState(res.data);
        setSearch(" ");
      });
  };

  return (
    <>
      <Box>
        <Box
          display="flex"
          justifyContent="center"
          marginTop="30px"
          marginBottom={10}
        >
          <Input
            variant="filled"
            placeholder="Search Here"
            width={["150px", "300px", "450px"]}
            onChange={e => setSearch(e.target.value)}
          />
          <IconButton
            aria-label="Search database"
            icon={<SearchIcon />}
            onClick={handleSearch}
          />
        </Box>

        <Grid
          templateColumns={["repeat(1,300px)", "", "repeat(3,400px)"]}
          textAlign="center"
          gap={10}
          margin="auto"
          justifyContent={["center", "", "space-around"]}
        >
          {state.map(e => (
            <GridItem
              w={["", "", "300"]}
              key={e.id}
              boxShadow="xl"
              borderRadius="10px"
              backgroundColor="#DAE5D0"
            >
              <Text
                fontSize="20px"
                textAlign={["center", "center", "left"]}
                marginLeft="10px"
                marginTop="10px"
                fontWeight="bold"
              >
                Name: {e.name}
              </Text>
              <Text
                fontSize="20px"
                textAlign={["center", "center", "left"]}
                marginLeft="10px"
                marginTop="10px"
                fontWeight="bold"
              >
                User Name: {e.username}
              </Text>
              <Text
                fontSize="20px"
                textAlign={["center", "center", "left"]}
                marginLeft="10px"
                marginTop="10px"
                fontWeight="bold"
              >
                Phone: {e.phone}
              </Text> 
              <Text
                fontSize="20px"
                textAlign={["center", "center", "left"]}
                marginLeft="10px"
                marginTop="10px"
                fontWeight="bold"
              >
                Email: {e.email}
              </Text>
              <Text
                fontSize="20px"
                textAlign={["center", "center", "left"]}
                marginLeft="10px"
                marginTop="10px"
                fontWeight="bold"
              >
                City: {e.address.city}
              </Text>
              <Text
                fontSize="20px"
                textAlign={["center", "center", "left"]}
                marginLeft="10px"
                marginTop="10px"
                fontWeight="bold"
              >
                Company Name: {e.company.name}
              </Text>
            </GridItem>
          ))}
        </Grid>

        <Box
          display="flex"
          gap="10px"
          marginTop={["80px", "100px", "170px"]}
          justifyContent="center"
        >
          <Button
            onClick={() => {
              if (page == 1) {
                setPage(page);
              } else {
                setPage(page - 1);
              }
            }}
            disabled={page == 1}
            colorScheme="blue"
          >
            Prev
          </Button>

          <Button
            onClick={() => {
              let totalpage = Math.ceil(10/limit);
              if (page > totalpage) {
                return;
              } else {
                setPage(page + 1);
              }
            }}
            disabled={page > state.length + 1}
            colorScheme="blue"
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
};
