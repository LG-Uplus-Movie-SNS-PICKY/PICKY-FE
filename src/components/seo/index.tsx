import { Helmet } from "react-helmet-async";

// SEO Component에 필요한 props 타입 정의
interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

function SEO({ title = "PICKY", description, image, url }: SEOProps) {
  const defaultImage = "https://www.picky-movie.com/images/picky.jpeg";
  const defaultURL = "https://www.picky-movie.com";

  return (
    <Helmet>
      {/* 기본 SEO Meta Data */}
      <title>{title}</title>

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="PICKY" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}

      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url ? defaultURL + url : defaultURL} />

      {/* Kakao Meta Data */}
      <meta property="kakao:title" content={title} />
      {description && (
        <meta property="kakao:description" content={description} />
      )}
      <meta property="kakao:image" content={image || defaultImage} />

      {/* Twitter Card */}
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:site" content="PICKY" />
      <meta property="twitter:title" content={title} />
      {description && (
        <meta property="twitter:description" content={description} />
      )}
      <meta property="twitter:image" content={image || defaultImage} />
      <meta
        property="twitter:url"
        content={url ? defaultURL + url : defaultURL}
      />
    </Helmet>
  );
}

export default SEO;
