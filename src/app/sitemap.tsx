import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://nextjs-full-stack-application.vercel.app/',
      lastModified: new Date(),
    },
    {
      url: 'https://nextjs-full-stack-application.vercel.app/login',
      lastModified: new Date(),
    },
    {
      url: 'https://nextjs-full-stack-application.vercel.app/register',
      lastModified: new Date(),
    },
  ];
}
