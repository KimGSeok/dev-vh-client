'use client';

interface HeadProps {
  title: string;
}

const Head = ({ title }: HeadProps) => {
  return (
    <>
      <title>{title}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
    </>
  )
}

export default Head;