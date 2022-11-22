import { React } from "react";
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
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import ColorModeToggle from "./Buttons";

const Links = ["Dashboard", "Projects", "Team"];

const NavLink = ({ children }) => {
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: "gray",
    }}
    href={"#"}
  >
    {children}
  </Link>;
};

const NavbarComp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { NIM } = useSelector((state) => state.userSlice.value);
  const dispatch = useDispatch();

  const onLogout = () => {
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
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Heading>Perpus App</Heading>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Image w="32" src="https://blog-eperpus.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2021/01/13044959/logo-eperpus.png"/>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
              >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
                ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Box></Box>
            {NIM ? (
              <>
              <ColorModeToggle/>
                <Text mr="2" ml="2">{NIM}</Text>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                    >
                    <Avatar
                      size={"sm"}
                      src={
                        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d8ddfe70-0b23-4aef-8d58-769268414fcb/dcaqmkf-c931e572-748a-4603-85f7-244232554b7f.png/v1/fill/w_1024,h_1494,q_80,strp/escanor___nanatsu_no_taizai_by_bryanfavr_dcaqmkf-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQ5NCIsInBhdGgiOiJcL2ZcL2Q4ZGRmZTcwLTBiMjMtNGFlZi04ZDU4LTc2OTI2ODQxNGZjYlwvZGNhcW1rZi1jOTMxZTU3Mi03NDhhLTQ2MDMtODVmNy0yNDQyMzI1NTRiN2YucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.FVk0F-1NIAsztT7fchnL0Xl4K86aA2uFuwXle6cvAyM"
                      }
                      />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>Settings</MenuItem>
                    <MenuDivider />
                    {NIM ? (
                      <MenuItem as={Link} to="/login" onClick={onLogout}>
                        LogOut
                      </MenuItem>
                    ) : null}
                  </MenuList>
                </Menu>{" "}
              </>
            ) : (
              <>
                <Button
                  as={Link}
                  to="/login"
                  variant={"solid"}
                  colorScheme={"teal"}
                  size={"sm"}
                  mr={4}
                  leftIcon={<AddIcon />}
                >
                  LogIn
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  variant={"solid"}
                  colorScheme={"teal"}
                  size={"sm"}
                  mr={4}
                  leftIcon={<AddIcon />}
                >
                  Register
                </Button>{" "}
              </>
            )}
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default NavbarComp;
