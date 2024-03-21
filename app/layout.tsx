import type { Metadata } from "next";
import Head from "next/head";
import { MainContainer } from "@/components";

import "/app/globals.scss";

interface IRootLayout {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Cyber-hack",
  description: "Cyber-hack-tool",
};

export default async function LocaleLayout({ children }: IRootLayout) {
  return (
    <html lang={"ru"}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <body>
        <MainContainer>{children}</MainContainer>
      </body>
    </html>
  );
}
