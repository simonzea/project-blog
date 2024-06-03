import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';

import { loadBlogPost } from '@/helpers/file-helpers';

import { MDXRemote } from 'next-mdx-remote/rsc'

async function BlogPost({ params }) {
  console.log(params)

  const {frontmatter, content} = await loadBlogPost(params.postSlug);

  console.log(frontmatter);
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
      <MDXRemote
      source={content}
    />
      </div>
    </article>
  );
}

export default BlogPost;
