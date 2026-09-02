import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { docsMdxComponents } from "./mdx/components";

export async function DocsMdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={docsMdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug],
        },
      }}
    />
  );
}
