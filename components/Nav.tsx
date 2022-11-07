import { Text, Button, Heading, Avatar, Divider } from "dracula-ui";
import Link from "next/link";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

type Props = {};

const Nav = (props: Props) => {
  //create toggle function
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-24 items-center justify-between">
        <Heading color="white">
          Fitness Tracker
          <Heading as="span" size="xl" className="font-bold" color="pink">
            IO️
          </Heading>
        </Heading>
        <GiHamburgerMenu size={34} onClick={toggle} />
      </div>
      {isOpen && (
        <div className="flex flex-col w-full p-4 ">
          <div className="p-4">
            <Link href="/routine">
              <Heading color="white" size="md">
                Routines
              </Heading>
              <Text
                color="blackSecondary"
                className="hover:text-white transition duration-150 hover:ease-out"
              >
                Create a Routine
              </Text>
            </Link>
          </div>
          <Divider />
        </div>
      )}
    </div>
  );
};

export default Nav;
