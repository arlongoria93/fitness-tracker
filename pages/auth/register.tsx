import React, { useState } from "react";
import { Button, Box, Text, Heading, Input } from "dracula-ui";
import Router, { useRouter } from "next/router";

const register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setUserName("");
      setPassword("");
    }
  };
  return (
    <div className="flex flex-col space-y-4 items-center drac-bg-black justify-center min-h-screen">
      <Box className="min-h-screen flex flex-col">
        <Box className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <Box className="px-6 drac-bg-black-secondary py-8 rounded shadow-md  w-full">
            <Heading color="pink" className="mb-8 text-3xl text-center">
              {userName.toLowerCase() || "Sign up"}
            </Heading>{" "}
            <form onSubmit={handleRegister}>
              <Box className="flex flex-col space-y-4">
                <Input
                  color="white"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <Input
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button>
                  <Text color="black">Register</Text>
                </Button>
              </Box>{" "}
            </form>
            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the Terms of Service and Privacy
              Policy
            </div>
          </Box>

          <div className="text-grey-dark mt-6">
            Already have an account?
            <a
              className="no-underline border-b border-blue text-blue"
              href="../login/"
            >
              Log in
            </a>
            .
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default register;
