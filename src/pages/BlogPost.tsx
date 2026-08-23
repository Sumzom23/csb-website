import { Link, Navigate, useParams } from 'react-router-dom'
import BlogContent from '../components/BlogContent'
import { getBlogPost } from '../data/blog'
import '../components/ContentPage.css'
import '../components/BlogContent.css'

function BlogPost() {
  const { slug } = useParams()
  const post = slug ? getBlogPost(slug) : undefined

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  return (
    <main className="content-page">
      <article className="content-page__inner">
        <Link className="blog-post__back" to="/blog">
          ← Back to Blog
        </Link>

        <p className="content-page__eyebrow">Blog</p>
        <h1 className="content-page__title">{post.title}</h1>
        <p className="blog-post__meta">
          {post.author} · {post.date}
          {post.authorTitle && (
            <span className="blog-post__author-title">{post.authorTitle}</span>
          )}
        </p>

        <BlogContent content={post.content} />
      </article>
    </main>
  )
}

export default BlogPost
