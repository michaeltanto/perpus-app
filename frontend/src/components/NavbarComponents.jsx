import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Heading,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Text,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch} from "react-redux";
import { logout } from "../redux/userSlice";

const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = ({ children }) => {
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: "gray",
    }}
    href={'#'}>
    {children}
  </Link>
  }

const NavbarComp = () => {
const { isOpen, onOpen, onClose } = useDisclosure();
const { NIM } = useSelector((state) => state.userSlice.value);
const dispatch = useDispatch()

  const onLogout =  () => {
    
    // console.log(password.current.value);
    try {
      

      dispatch(logout());
      localStorage.removeItem("token");
      

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
  
  return (
    <>
      <Box bg="gray" px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <Heading>Perpus App</Heading>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
         <Box>
          
          </Box>
            <Button
              as={Link} to="/login"
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              leftIcon={<AddIcon />}>
              Login
            </Button>
            <Button
            as={Link} to="/register"
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              leftIcon={<AddIcon />}>
              Register
            </Button>

            <Text >{NIM}</Text>
           
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuDivider />
                <MenuItem 
                as={Link} to="/login"
                onClick={onLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>Main Content Here</Box>
    </>
  );
}

export default NavbarComp



