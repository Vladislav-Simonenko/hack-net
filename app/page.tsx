import { Homepage } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cyber-hack",

  openGraph: {
    title: "Cyber-hack",
    description: "Cyber-hack-tool",
    type: "website",
    url: "/",
    locale: "ru",
  },
};

export default async function Home() {
  return <Homepage />;
}
