import React from 'react';
import BlogHero from '@/components/BlogHero';
import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { BLOG_TITLE } from '../../constants';
import CodeSnippet from '../../components/CodeSnippet';

export const getloadBlogPost = React.cache(
  async (postSlug) => {
    return await loadBlogPost(postSlug);
  }
);

export async function generateMetadata({ params }) {
  const {frontmatter, content} = await getloadBlogPost(params.postSlug);

  return {
    title: `${frontmatter.title} • ${BLOG_TITLE}`,
    description: `${frontmatter.description}`
  };
}

async function BlogPost({ params }) {
  const {frontmatter, content} = await getloadBlogPost(params.postSlug);
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
      <MDXRemote
      source={content}
      components={{
        pre:CodeSnippet
      }}
    />
      </div>
    </article>
  );
}

export default BlogPost;
