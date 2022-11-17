import { useRef, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import Axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { Navigate } from "react-router-dom";

const url = "http://localhost:2000/users/login";

export const LoginPage = () => {
  // const router = useRouter
  const NIM = useRef("");
  const Password = useRef("");
  const dispatch = useDispatch();
  const [move, setMove] = useState(false);
//   console.log(move);

  const onLogin = async () => {
    console.log(NIM.current.value);
    // console.log(password.current.value);
    try {
      const user = {
        Password: Password.current.value,
        NIM: NIM.current.value,
      };
      console.log(user);
      const result = await Axios.post(url, user);
      console.log(result.NIM);

      dispatch(login(result.data.user));
      localStorage.setItem("token", result.data.token);
      setMove(true);

      // if (resUsername.data.length !== 0) {
      //   dispatch(login(resUsername.data[0]));
      //   console.log("test");
      // } else if (resEmail.data.length !== 0) {
      //   dispatch(login(resEmail.data[0]));
      //   localStorage.setItem("id", resEmail.data[0].id);
      //   console.log("test");
      //   setMove(true);
      // }
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    }
  };

  const bg = useColorModeValue('gray.50', 'gray.800')
  const color = useColorModeValue('white', 'gray.700')

  return move ? (
    <Navigate to="/" replace={true} />
  ) : (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={ bg }>
      
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} m={2}>
        
        
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          // m={10}
          rounded={'lg'}
          bg={color}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4} m={3}>
            <FormControl id="NIM">
              <FormLabel>Nomer Induk Mahasiswa</FormLabel>
              <Input type="email" ref={NIM}/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" ref={Password} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
              onClick={onLogin}
                bg="teal"
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                  
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}