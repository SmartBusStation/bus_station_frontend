/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
    async rewrites() {
        return [
            {
                source: "/yoyowb/:path*",
                destination: `${process.env.YOWYOB_BACKEND_API_URL}/:path*`,
            },
            {
                source: "/trip_agency/:path*",
                destination: `${process.env.TRIP_AGENCY_BACKEND_API_URL}/:path*`,
            },
        ];
    },
    images: {
        domains: [
            'bougna.net',
            'st.depositphotos.com',
            'c.wallhere.com',
            'media.istockphoto.com',
        ],
    },
};

module.exports = nextConfig;
