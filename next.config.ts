import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_YOWYOB_BACKEND_API_URL}/:path*`
            }
        ]
    },

    images: {
        domains: ['bougna.net', 'st.depositphotos.com', 'c.wallhere.com','media.istockphoto.com'],
    },
   /* webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },*/
};

export default nextConfig;
