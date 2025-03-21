import createMDX from "@next/mdx";
import { NextConfig } from "next";
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  basePath: "/dnd",
  pageExtensions: ["md", "mdx", "ts", "tsx"],
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
  },
});

export default withMDX(nextConfig);
