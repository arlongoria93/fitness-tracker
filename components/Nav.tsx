import { MouseEvent, useState } from "react";
import { Text, Heading } from "dracula-ui";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSession } from "next-auth/react";

type Props = {};

const Nav = (props: Props) => {
  //create toggle function
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  let userName = "";

  useEffect(() => {
    //close nav if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside as any);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside as any);
    };
  }, []);

  if (session?.user.name) {
    userName = session.user.name[0].toUpperCase();
  }

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
              {session ? (
                <Text
                  onClick={() => signOut()}
                  color="blackSecondary"
                  size="md"
                  className="hover:text-white transition duration-150 hover:ease-out hover:cursor-pointer"
                >
                  {session.user && (
                    <div className="flex flex-row space-x-2 opacity-80">
                      <Text>Log out: </Text>
                      <Text color="green">
                        {session.user.name[0].toUpperCase() +
                          session.user.name.slice(1, session.user.name.length)}
                      </Text>
                    </div>
                  )}
                </Text>
              ) : (
                <Link href="/auth/signin">
                  <Text
                    color="blackSecondary"
                    size="md"
                    className="hover:text-white transition duration-150 hover:ease-out hover:cursor-pointer"
                  >
                    Log in
                  </Text>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
