import { Link, Navigate, useParams } from 'react-router-dom'
import BlogContent from '../components/BlogContent'
import Reveal from '../components/Reveal'
import { getBlogPost } from '../data/blog'
import { content } from '../data/content'
import '../components/ContentPage.css'
import '../components/BlogContent.css'

function BlogPost() {
  const { slug } = useParams()
  const post = slug ? getBlogPost(slug) : undefined
  const { blogPage } = content

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  return (
    <main className="content-page">
      <div className="content-page__masthead">
        <span>{blogPage.mastheadLeft}</span>
        <span>{blogPage.mastheadRight}</span>
      </div>

      <article className="content-page__inner">
        <Link className="blog-post__back" to="/blog">
          ← Back to blog
        </Link>

        <Reveal>
          <h1 className="content-page__title">{post.title}</h1>
          <p className="blog-post__meta">
            {post.author} · {post.date}
            {post.authorTitle && (
              <span className="blog-post__author-title">{post.authorTitle}</span>
            )}
          </p>

          <BlogContent content={post.content} />
        </Reveal>
      </article>
    </main>
  )
}

export default BlogPost
