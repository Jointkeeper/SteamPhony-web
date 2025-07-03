import { Helmet } from 'react-helmet-async';

export default function Blog() {
  return (
    <div className="container mx-auto py-8">
      <Helmet>
        <title>Digital Marketing Blog - Tips & Strategies</title>
        <meta name="description" content="Latest insights on digital marketing for restaurants and salons" />
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      <p>Latest insights on digital marketing for restaurants and salons.</p>
    </div>
  );
}
