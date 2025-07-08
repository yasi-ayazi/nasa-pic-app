
export default function BlogPost({ params }) {
  return (
    <div>
      <h1>{params.slug.replace(/-/g, ' ')}</h1>
      <p>This is a blog post about: {params.slug}.</p>
    </div>
  );
}

export async function generateStaticParams() {
  return [
    { slug: 'my-new-post' },
    { slug: 'another-blog-entry' },
    { slug: 'why-space-is-cool' },
  ];
}
