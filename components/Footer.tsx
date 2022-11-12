import React from "react";
import { FaGithubAlt } from "react-icons/fa";
import { Heading, Text } from "dracula-ui";
type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="bg-primary h-24 ">
      <div className="container mx-auto flex flex-col space-x-4 justify-center items-center h-full">
        <div className="flex flex-row space-x-4 justify-center items-center">
          <Text>Made with ❤️ by Angelo</Text>
          <FaGithubAlt className="drac-text-black-secondary" />
        </div>
        <Heading color="green" size="sm">
          © 2022
        </Heading>
      </div>
    </div>
  );
};

export default Footer;
