/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
            "cdn.inappstory.ru",
            "media.dodostatic.net",
            "cdn.dodostatic.net",
        ],
    },
};

export default nextConfig;
