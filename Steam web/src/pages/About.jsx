import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <div className="container mx-auto py-8">
      <Helmet>
        <title>About Steamphony Digital Agency</title>
        <meta name="description" content="Meet the team behind successful digital marketing campaigns" />
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">About Us</h1>
      <p>Meet the team behind successful digital marketing campaigns for restaurants and salons.</p>
    </div>
  );
}
