import { Text, Button, Heading, Avatar, Divider } from "dracula-ui";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

type Props = {};

const Nav = (props: Props) => {
  //create toggle function
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="mx-auto  px-2 sm:px-6 lg:px-8 bg-primary">
      <div className="relative flex h-24 items-center justify-between">
        <Link href="/">
          <Heading color="white">
            Fitness Tracker
            <Heading as="span" size="xl" className="font-bold" color="pink">
              IO️
            </Heading>
          </Heading>
        </Link>
        <GiHamburgerMenu size={34} onClick={toggle} />
      </div>
      {isOpen && (
        <div className="flex flex-col w-full p-4 ">
          <div className="flex flex-col p-4">
            <Heading color="white" size="md">
              Routines
            </Heading>
            <Link href="/routine/create">
              <Text
                color="blackSecondary"
                className="hover:text-white transition duration-150 hover:ease-out"
              >
                Create a Routine
              </Text>
            </Link>
            <Link href="/routine">
              <Text
                color="blackSecondary"
                className="hover:text-white transition duration-150 hover:ease-out"
              >
                My Routines
              </Text>
              <Heading color="white" size="md">
                Activities
              </Heading>
              <Link href="/activity">
                <Text
                  color="blackSecondary"
                  className="hover:text-white transition duration-150 hover:ease-out"
                >
                  All Activities
                </Text>
              </Link>
            </Link>
            <Link href="/activity/create">
              <Text
                color="blackSecondary"
                className="hover:text-white transition duration-150 hover:ease-out"
              >
                Create an Activity
              </Text>
            </Link>
            <div className="mt-4">
              <Text
                onClick={() => signOut()}
                as="a"
                color="blackSecondary"
                size="md"
              >
                Log out
              </Text>
            </div>
          </div>
          <Divider className="opacity-60" />
        </div>
      )}
    </div>
  );
};

export default Nav;
