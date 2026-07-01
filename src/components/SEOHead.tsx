interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
}

export default function SEOHead({ title, description, path }: SEOHeadProps) {
  return (
    <>
      {title && <title>{title} | SOLEMATE</title>}
      {description && <meta name="description" content={description} />}
      {path && <link rel="canonical" href={`https://xoralife.github.io/shoes-websites${path}`} />}
    </>
  );
}
