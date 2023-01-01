import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Text,
  useToast,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { BaseLayout } from "../../layout";

interface Errors {
  name: boolean;
  email: boolean;
  password: boolean;
}
const Signup = () => {
  const [formError, setFormError] = React.useState<string>("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Errors>({
    name: false,
    email: false,
    password: false,
  });
  const navigate = useNavigate();
  const toast = useToast();

  const login = () => {
    navigate("/signin");
  };

  const createAccount = (e: FormEvent) => {
    e.preventDefault();

    if (name.length < 1) {
      return setError({
        ...error,
        name: true,
      });
    }
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
    try {
      api
        .post("/auth/signup", {
          name,
          email,
          password,
        })
        .then((res) => {
          if (res.data.success) {
            toast({
              title: "Account created.",
              description: "We've created your account for you.",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          } else {
            setFormError(res.data.message);
          }
        });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      navigate("/");
    }
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
          Create an Account
        </Heading>
        <form>
          <FormControl
            marginBlockStart="8px"
            width={{
              base: "325px",
              md: "400px",
            }}
            isRequired
            label="Full Name"
            id="Name"
          >
            <Input
              isRequired
              placeholder="Enter your Full Name"
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
              onChange={(e) => setName(e.target.value)}
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
            {error.name && (
              <Text
                marginBlockStart="8px"
                textColor="red.500"
                fontFamily="Clash Display"
              >
                Please enter your Full Name.
              </Text>
            )}
          </FormControl>

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
            {error.email && (
              <Text
                marginBlockStart="8px"
                textColor="red.500"
                fontFamily="Clash Display"
              >
                Please enter valid Email Address.
              </Text>
            )}
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
              placeholder="Create a Password"
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
            {error.password && (
              <Text
                marginBlockStart="8px"
                textColor="red.500"
                fontFamily="Clash Display"
              >
                Please enter a Valid Password.
              </Text>
            )}
          </FormControl>
          <Checkbox
            onClick={() => setIsChecked(!isChecked)}
            isRequired
            marginBlockStart="12px"
            textColor="white"
            fontFamily="Clash Display"
          >
            I agree to the Terms of Service
          </Checkbox>
          <Text>
            {formError.length > 0 && (
              <Text
                marginBlockStart="8px"
                textColor="red.500"
                fontFamily="Clash Display"
              >
                {formError}
              </Text>
            )}
          </Text>
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
            Create your Account
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
            onClick={login}
          >
            Login
          </Button>
        </form>
      </Box>
    </BaseLayout>
  );
};

export default Signup;
