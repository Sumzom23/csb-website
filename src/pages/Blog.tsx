import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blog'
import { content } from '../data/content'
import Reveal from '../components/Reveal'
import '../components/ContentPage.css'
import '../components/BlogContent.css'

function Blog() {
  const { blogPage } = content

  return (
    <main className="content-page">
      <div className="content-page__masthead">
        <span>{blogPage.mastheadLeft}</span>
        <span>{blogPage.mastheadRight}</span>
      </div>

      <div className="content-page__inner content-page__inner--wide">
        <Reveal>
          <h1 className="content-page__title">{blogPage.title}</h1>
        </Reveal>

        <div className="blog-list">
          {blogPosts.map((post, index) => (
            <Reveal key={post.slug} delay={Math.min(index, 4) * 70}>
              <article className="blog-card">
                <h2 className="blog-card__title">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="blog-card__meta">
                  {post.author} · {post.date}
                </p>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <Link className="blog-card__link" to={`/blog/${post.slug}`}>
                  Read more
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="blog-footer-note">
          {blogPage.footerNoteLine1}
          <br />
          {blogPage.footerNoteLine2}
        </p>
      </div>
    </main>
  )
}

export default Blog
