'use client';

interface HeadProps {
  title: string;
}

const Head = ({ title }: HeadProps) => {
  return (
    <>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </>
  )
}

export default Head;