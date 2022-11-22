import { useState } from "react";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import Axios from "axios";
const url = "http://localhost:2000/user/register";

export const RegisterPage = () => {
  const [show] = useState(false);

  const registerSchema = Yup.object().shape({
    NIM: Yup.string().required().min(5,"NIM min 5 Character"),
    Password: Yup.string().required().min(8, "Password min 8 Character"),
    Username: Yup.string().required("username should be entered"),
    Email: Yup.string().email("email should be entered").required("email should be entered"),
    Password_confirmation: Yup.string()

    

  });

  const onRegister = async (data) => {
    try {
      const result = await Axios.post(url, data);
      alert(result.data);
    } catch (err) {
      alert(err.response.data);
    }
  };

  const AlertComp = () => {
    return (
      <Alert show="false" status="success">
        <AlertIcon />
        Register Success!
      </Alert>
    );
  };

  return (
    <div>
      <Formik
        initialValues={{
          NIM: "",
          Username: "",
          Email: "",
          Password: "",
          Password_confirmation: "",
          
        }}
        validationSchema={registerSchema}
        onSubmit={(values, action) => {
          onRegister(values);
        console.log(values)
          action.setFieldValue("NIM", "");
          action.setFieldValue("Username", "");
          action.setFieldValue("Password", "");
          action.setFieldValue("Email", "");
          action.setFieldValue("Password_confirmation", "");
          
        }}
      >
        {(props) => {
          console.log(props);
          return (
            <>
              {show ? <AlertComp /> : null}
              <Form>
              <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Register to your account</Heading>
          <FormControl id="NIM">
            <FormLabel>Nomer Induk Mahasiswa</FormLabel>
            <Input as={Field} name="NIM" />
            <ErrorMessage
                  name="NIM"
                  component="div"
                  style={{ color: "red" }}
                />
          </FormControl>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input as={Field} name="Username" />
            <ErrorMessage
                  name="Username"
                  component="div"
                  style={{ color: "red" }}
                />
          </FormControl>
          <FormControl id="Email">
            <FormLabel>Email address</FormLabel>
            <Input as={Field} name="Email" />
            <ErrorMessage
                  name="Email"
                  component="div"
                  style={{ color: "red" }}
                />
          </FormControl>
          <FormControl id="Password">
            <FormLabel>Password</FormLabel>
            <Input as={Field} name="Password" type="password" />
          </FormControl>
          <FormControl id="Password-confirmation">
            <FormLabel>Password Confirmation</FormLabel>
            <Input as={Field} name="Password_confirmation" type= "password" />
            <ErrorMessage
                  name="Password_confirmation"
                  component="div"
                  style={{ color: "red" }}
                />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Link color={'blue.500'}>Forgot password?</Link>
            </Stack>
            <Button colorScheme={'blue'} variant={'solid'} type="submit">
              Sign up
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
    </Form>
            </>
          );
        }
        }
      </Formik>
    </div>
  );
};