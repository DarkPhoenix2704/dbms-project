import {
  Heading,
  Box,
  FormControl,
  Input,
  FormErrorMessage,
  Text,
  Checkbox,
  Button,
  Stack,
} from "@chakra-ui/react";
import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { BaseLayout } from "../../layout";
interface Errors {
  email: boolean;
  password: boolean;
}
const Signin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Errors>({
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  const createAccount = () => {
    navigate("/signup");
  };

  const login = (e: FormEvent) => {
    e.preventDefault();
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return setError({
        ...error,
        email: true,
      });
    }
    if (password.length < 6) {
      return setError({
        ...error,
        password: true,
      });
    }
    setLoading(true);
    console.log("Logging In");
    setLoading(false);
  };

  return (
    <BaseLayout>
      <Box
        paddingBlock="16px"
        paddingInline={{
          base: "8px",
          md: "32px",
        }}
        borderRadius="8px"
        width={{
          base: "350px",
        }}
        backgroundColor="rgba(255, 255, 255, 0.1)"
        border="1px solid rgba(255, 255, 255, 0.05)"
        style={{
          backdropFilter: "blur(10px)",
        }}
      >
        <Heading textColor="white" fontFamily="Clash Display">
          Log In
        </Heading>
        <form>
          <FormControl
            marginBlockStart="12px"
            width={{
              base: "325px",
              md: "400px",
            }}
            isRequired
            label="Email"
            id="Email"
          >
            <Input
              isRequired
              placeholder="Enter your Email"
              disabled={loading}
              variant="filled"
              height="45px"
              fontWeight="regular"
              transition="0.3s ease-in all"
              fontSize="16px"
              backgroundColor="rgba(255,255,255,0.15)"
              textColor="white"
              fontFamily="Clash Display"
              border="none"
              borderRadius="10px"
              onChange={(e) => setEmail(e.target.value)}
              _placeholder={{
                textColor: "rgba(255, 255, 255, 0.25)",
              }}
              _focus={{
                boxShadow: "0px 3px 8px rgba(120,119,198,0.3)",
                border: "1px solid rgba(120,119,198,0.3)",
              }}
              _hover={{
                backgroundColor: "rgba(255,255,255,0.25)",
              }}
            />
            <FormErrorMessage>
              {error.email && (
                <Text fontFamily="Clash Display">
                  Please enter valid Email Address.
                </Text>
              )}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            marginBlockStart="12px"
            width={{
              base: "325px",
              md: "400px",
            }}
            isRequired
            label="Password"
            id="Password"
          >
            <Input
              isRequired
              placeholder="Password"
              disabled={loading}
              variant="filled"
              height="45px"
              fontWeight="regular"
              transition="0.3s ease-in all"
              fontSize="16px"
              backgroundColor="rgba(255,255,255,0.15)"
              textColor="white"
              fontFamily="Clash Display"
              border="none"
              borderRadius="10px"
              onChange={(e) => setPassword(e.target.value)}
              _placeholder={{
                textColor: "rgba(255, 255, 255, 0.25)",
              }}
              _focus={{
                boxShadow: "0px 3px 8px rgba(120,119,198,0.3)",
                border: "1px solid rgba(120,119,198,0.3)",
              }}
              _hover={{
                backgroundColor: "rgba(255,255,255,0.25)",
              }}
            />
            <FormErrorMessage>
              {error.password && (
                <Text fontFamily="Clash Display">
                  Please enter a Valid Password.
                </Text>
              )}
            </FormErrorMessage>
          </FormControl>
          <Checkbox
            onClick={() => setIsChecked(!isChecked)}
            marginBlockStart="12px"
            textColor="white"
            fontFamily="Clash Display"
          >
            Remember me
          </Checkbox>
          <Button
            marginBlockStart="16px"
            width="100%"
            backgroundColor="white"
            fontSize="18px"
            fontWeight="medium"
            height="45px"
            transition=".5s all ease"
            _hover={{
              boxShadow: "0px 8px 16px rgba(255, 255, 255, 0.15)",
              backgroundColor: "rgba(120,119,198,1)",
              textColor: "white",
            }}
            _active={{
              textColor: "white",
              background: "rgba(120,119,198,0.8)",
              boxShadow: "0px 8px 16px rgba(120,119,198,0.3)",
              backdropFilter: "blur(25px)",
            }}
            onClick={login}
          >
            Login
          </Button>
          <Button
            marginBlockStart="16px"
            width="100%"
            backgroundColor="white"
            fontSize="18px"
            fontWeight="medium"
            height="45px"
            transition=".5s all ease"
            _hover={{
              boxShadow: "0px 8px 16px rgba(255, 255, 255, 0.15)",
              backgroundColor: "rgba(120,119,198,1)",
              textColor: "white",
            }}
            _active={{
              textColor: "white",
              background: "rgba(120,119,198,0.8)",
              boxShadow: "0px 8px 16px rgba(120,119,198,0.3)",
              backdropFilter: "blur(25px)",
            }}
            onClick={createAccount}
          >
            Create an Account
          </Button>
        </form>
      </Box>
    </BaseLayout>
  );
};

export default Signin;
