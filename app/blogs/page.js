import Link from 'next/link';

const samplePosts = [
  'my-new-post',
  'another-blog-entry',
  'why-space-is-cool'
];

export default function BlogsPage() {
  return (
    <div>
      <h1>Blog List</h1>
      <ul>
        {samplePosts.map((slug) => (
          <li key={slug}>
            <Link href={`/blogs/${slug}`}>{slug.replace(/-/g, ' ')}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
