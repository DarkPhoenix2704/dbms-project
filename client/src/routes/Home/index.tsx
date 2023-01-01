import React from "react";
import { Heading, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BaseLayout } from "../../layout";
const Home = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  return (
    <BaseLayout>
      <Heading textColor="white" fontFamily="Clash Display">
        Hi <span style={{ color: "red" }}> Diya</span>
      </Heading>
      <Button
        width="250px"
        backgroundColor="white"
        fontSize="18px"
        fontWeight="medium"
        height="45px"
        transition=".5s all ease"
        _hover={{
          boxShadow: "0px 8px 16px rgba(255, 255, 255, 0.15)",
          backgroundColor: "#DBF72C",
        }}
        _active={{
          textColor: "#DBF72C",
          background: "rgba(219, 247, 44, 0.15)",
          boxShadow: "0px 8px 16px rgba(219, 247, 44, 0.15)",
          backdropFilter: "blur(25px)",
        }}
        onClick={logout}
      >
        Logout
      </Button>
    </BaseLayout>
  );
};

export default Home;
