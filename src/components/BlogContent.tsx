import type { BlogBlock } from '../data/blog'
import './BlogContent.css'

type BlogContentProps = {
  content: BlogBlock[]
}

function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="blog-content">
      {content.map((block, index) => {
        if (block.type === 'paragraph') {
          return (
            <p key={index} className="blog-content__paragraph">
              {block.text}
            </p>
          )
        }

        if (block.type === 'list') {
          const ListTag = block.ordered === false ? 'ul' : 'ol'
          return (
            <ListTag key={index} className="blog-content__list">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ListTag>
          )
        }

        return (
          <blockquote key={index} className="blog-content__quote">
            <p>{block.text}</p>
            <footer>— {block.attribution}</footer>
          </blockquote>
        )
      })}
    </div>
  )
}

export default BlogContent
