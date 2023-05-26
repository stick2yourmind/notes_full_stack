import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="flex flex-col gap-4 min-h-screen w-full p-4 justify-start items-center relative bg-stone-950 text-pink-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
