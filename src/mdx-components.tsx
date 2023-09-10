import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        img: (props) => <img style={{ marginBottom: '.7rem' }} loading="lazy" {...props} />,
        ...components,
    };
}
