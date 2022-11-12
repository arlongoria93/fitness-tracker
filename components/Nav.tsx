import { Text, Button, Heading, Avatar, Divider } from "dracula-ui";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSession } from "next-auth/react";

type Props = {};

const Nav = ({ user }: Props) => {
  //create toggle function
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = React.useState(false);
  const navRef = useRef(null);
  useEffect(() => {
    const closeDropDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener("mousedown", closeDropDown);
    return () => {
      document.body.removeEventListener("mousedown", closeDropDown);
    };
  }, []);

  return (
    <div
      ref={navRef}
      className="mx-auto  px-2 sm:px-6 lg:px-8 bg-primary shadow-md"
    >
      <div className="relative flex h-24 items-center justify-between">
        <Link href="/">
          <Heading color="white">
            Fitness Tracker
            <Heading as="span" size="xl" className="font-bold" color="pink">
              IO️
            </Heading>
          </Heading>
        </Link>
        <GiHamburgerMenu size={34} onClick={() => setIsOpen(!isOpen)} />
      </div>
      {isOpen && (
        <div className="flex flex-col w-full p-4 ">
          <div className="flex flex-col space-y-4 p-4">
            <div className="flex flex-col">
              <Heading color="white" size="md">
                Routines
              </Heading>
              <div className="flex flex-col p-1">
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
                </Link>
              </div>
            </div>
            <div className="flex flex-col">
              <Heading color="white" size="md">
                Activities
              </Heading>
              <div className="flex flex-col p-1">
                <Link href="/activity">
                  <Text
                    color="blackSecondary"
                    className="hover:text-white transition duration-150 hover:ease-out"
                  >
                    All Activities
                  </Text>
                </Link>
                <Link href="/activity/create">
                  <Text
                    color="blackSecondary"
                    className="hover:text-white transition duration-150 hover:ease-out"
                  >
                    Create an Activity
                  </Text>
                </Link>
              </div>
            </div>
            <div className="mt-4 p-1">
              <Text
                onClick={() => signOut()}
                as="a"
                color="blackSecondary"
                size="md"
              >
                Log out:{" "}
                {session?.user?.name?.charAt(0).toUpperCase() +
                  session?.user?.name?.slice(1)}
              </Text>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
