import Head from 'next/head';
import { resolveRouteName } from '../routes';
import { getMetadata } from '../services/metadata';

export default function Metadata({ routePath }) {
  const routeName = resolveRouteName(routePath);
  const metadata = getMetadata(routeName);

  return (
    <Head>
      <title>{metadata.title}</title>
      {metadata.meta &&
        metadata.meta.map(({ name, property, content }) => (
          <meta
            key={`${name}_${property}`}
            name={name}
            property={property}
            content={content}
          />
        ))}
      {metadata.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: metadata.jsonLd }}
        />
      )}
      {metadata.canonicalUrl && (
        <link href={metadata.canonicalUrl} rel="canonical" />
      )}
    </Head>
  );
}
