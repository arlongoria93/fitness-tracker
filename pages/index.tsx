import Head from "next/head";
import Image from "next/image";
import { Heading } from "dracula-ui";

export default function Home(props) {
  return (
    <div className="flex items-center drac-bg-black justify-center min-h-screen">
      <Heading color="pink">Hello Vampire</Heading>
    </div>
  );
}
