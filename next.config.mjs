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
    // basePath: "/main",
    async redirects() {
        return [
            {
                source: "/",
                destination: "/main",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
