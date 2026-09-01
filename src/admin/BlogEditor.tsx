import { useEffect, useState } from 'react'
import { getJson, putJson } from './api'
import { MoveButtons, reorder } from './JsonEditor'

type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'quote'; text: string; attribution: string }

type BlogPost = {
  slug: string
  title: string
  author: string
  authorTitle?: string
  date: string
  excerpt: string
  content: BlogBlock[]
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function blankBlock(type: BlogBlock['type']): BlogBlock {
  if (type === 'paragraph') return { type: 'paragraph', text: '' }
  if (type === 'list') return { type: 'list', items: [''], ordered: false }
  return { type: 'quote', text: '', attribution: '' }
}

function BlockEditor({
  block,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: {
  block: BlogBlock
  onChange: (b: BlogBlock) => void
  onRemove: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  canMoveUp: boolean
  canMoveDown: boolean
}) {
  return (
    <div className="array-card">
      <div className="array-card__head">
        <span className="array-card__index">{block.type}</span>
        <span className="array-card__actions">
          <MoveButtons onMoveUp={onMoveUp} onMoveDown={onMoveDown} canMoveUp={canMoveUp} canMoveDown={canMoveDown} />
          <button type="button" className="btn btn--ghost btn--small" onClick={onRemove}>
            Remove block
          </button>
        </span>
      </div>

      {block.type === 'paragraph' && (
        <label className="field">
          <span className="field__label">Text</span>
          <textarea
            className="field__textarea"
            rows={4}
            value={block.text}
            onChange={(e) => onChange({ ...block, text: e.target.value })}
          />
        </label>
      )}

      {block.type === 'quote' && (
        <>
          <label className="field">
            <span className="field__label">Quote</span>
            <textarea
              className="field__textarea"
              rows={3}
              value={block.text}
              onChange={(e) => onChange({ ...block, text: e.target.value })}
            />
          </label>
          <label className="field">
            <span className="field__label">Attribution</span>
            <input
              className="field__input"
              type="text"
              value={block.attribution}
              onChange={(e) => onChange({ ...block, attribution: e.target.value })}
            />
          </label>
        </>
      )}

      {block.type === 'list' && (
        <fieldset className="field-group field-group--array">
          <legend>Items</legend>
          {block.items.map((item, i) => (
            <label className="field" key={i}>
              <span className="field__label">
                Item {i + 1}
                <span className="field__label-actions">
                  <MoveButtons
                    onMoveUp={() => onChange({ ...block, items: reorder(block.items, i, -1) })}
                    onMoveDown={() => onChange({ ...block, items: reorder(block.items, i, 1) })}
                    canMoveUp={i > 0}
                    canMoveDown={i < block.items.length - 1}
                  />
                  <button
                    type="button"
                    className="field__remove"
                    onClick={() => {
                      const items = block.items.slice()
                      items.splice(i, 1)
                      onChange({ ...block, items })
                    }}
                  >
                    ×
                  </button>
                </span>
              </span>
              <input
                className="field__input"
                type="text"
                value={item}
                onChange={(e) => {
                  const items = block.items.slice()
                  items[i] = e.target.value
                  onChange({ ...block, items })
                }}
              />
            </label>
          ))}
          <button
            type="button"
            className="btn btn--ghost btn--small"
            onClick={() => onChange({ ...block, items: [...block.items, ''] })}
          >
            + Add item
          </button>
        </fieldset>
      )}
    </div>
  )
}

function PostEditor({
  post,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: {
  post: BlogPost
  onChange: (p: BlogPost) => void
  onRemove: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  canMoveUp: boolean
  canMoveDown: boolean
}) {
  const updateBlock = (index: number, block: BlogBlock) => {
    const content = post.content.slice()
    content[index] = block
    onChange({ ...post, content })
  }
  const removeBlock = (index: number) => {
    const content = post.content.slice()
    content.splice(index, 1)
    onChange({ ...post, content })
  }
  const moveBlock = (index: number, direction: -1 | 1) => {
    onChange({ ...post, content: reorder(post.content, index, direction) })
  }
  const addBlock = (type: BlogBlock['type']) => {
    onChange({ ...post, content: [...post.content, blankBlock(type)] })
  }

  return (
    <div className="array-card">
      <div className="array-card__head">
        <span className="array-card__index">{post.title || 'Untitled post'}</span>
        <span className="array-card__actions">
          <MoveButtons onMoveUp={onMoveUp} onMoveDown={onMoveDown} canMoveUp={canMoveUp} canMoveDown={canMoveDown} />
          <button type="button" className="btn btn--ghost btn--small" onClick={onRemove}>
            Remove post
          </button>
        </span>
      </div>

      <label className="field">
        <span className="field__label">Title</span>
        <input
          className="field__input"
          type="text"
          value={post.title}
          onChange={(e) => onChange({ ...post, title: e.target.value })}
        />
      </label>
      <label className="field">
        <span className="field__label">Slug (used in the URL)</span>
        <div className="field__row">
          <input
            className="field__input"
            type="text"
            value={post.slug}
            onChange={(e) => onChange({ ...post, slug: e.target.value })}
          />
          <button
            type="button"
            className="btn btn--ghost btn--small"
            onClick={() => onChange({ ...post, slug: slugify(post.title) })}
          >
            Generate from title
          </button>
        </div>
      </label>
      <label className="field">
        <span className="field__label">Author</span>
        <input
          className="field__input"
          type="text"
          value={post.author}
          onChange={(e) => onChange({ ...post, author: e.target.value })}
        />
      </label>
      <label className="field">
        <span className="field__label">Author title (optional)</span>
        <input
          className="field__input"
          type="text"
          value={post.authorTitle ?? ''}
          onChange={(e) => onChange({ ...post, authorTitle: e.target.value })}
        />
      </label>
      <label className="field">
        <span className="field__label">Date</span>
        <input
          className="field__input"
          type="text"
          value={post.date}
          onChange={(e) => onChange({ ...post, date: e.target.value })}
        />
      </label>
      <label className="field">
        <span className="field__label">Excerpt</span>
        <textarea
          className="field__textarea"
          rows={3}
          value={post.excerpt}
          onChange={(e) => onChange({ ...post, excerpt: e.target.value })}
        />
      </label>

      <fieldset className="field-group field-group--array">
        <legend>Content blocks</legend>
        {post.content.map((block, i) => (
          <BlockEditor
            key={i}
            block={block}
            onChange={(b) => updateBlock(i, b)}
            onRemove={() => removeBlock(i)}
            onMoveUp={() => moveBlock(i, -1)}
            onMoveDown={() => moveBlock(i, 1)}
            canMoveUp={i > 0}
            canMoveDown={i < post.content.length - 1}
          />
        ))}
        <div className="editor__toolbar-actions">
          <button type="button" className="btn btn--ghost btn--small" onClick={() => addBlock('paragraph')}>
            + Paragraph
          </button>
          <button type="button" className="btn btn--ghost btn--small" onClick={() => addBlock('list')}>
            + List
          </button>
          <button type="button" className="btn btn--ghost btn--small" onClick={() => addBlock('quote')}>
            + Quote
          </button>
        </div>
      </fieldset>
    </div>
  )
}

function BlogEditor() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  useEffect(() => {
    getJson<BlogPost[]>('/api/blog').then(setPosts)
  }, [])

  if (!posts) return <p className="admin-loading">Loading posts…</p>

  const update = (index: number, post: BlogPost) => {
    const copy = posts.slice()
    copy[index] = post
    setPosts(copy)
  }
  const removeAt = (index: number) => {
    if (!confirm(`Remove "${posts[index].title}"?`)) return
    const copy = posts.slice()
    copy.splice(index, 1)
    setPosts(copy)
  }
  const moveAt = (index: number, direction: -1 | 1) => {
    setPosts(reorder(posts, index, direction))
  }
  const add = () => {
    const newPost: BlogPost = {
      slug: 'untitled-post',
      title: 'Untitled post',
      author: '',
      date: '',
      excerpt: '',
      content: [{ type: 'paragraph', text: '' }],
    }
    setPosts([newPost, ...posts])
  }

  const save = async () => {
    setStatus('saving')
    try {
      await putJson('/api/blog', posts)
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="editor">
      <div className="editor__toolbar">
        <div>
          <h2>Blog</h2>
          <p className="editor__hint">{posts.length} posts.</p>
        </div>
        <div className="editor__toolbar-actions">
          <button type="button" className="btn btn--ghost" onClick={add}>
            + New post
          </button>
          <button type="button" className="btn btn--primary" onClick={save} disabled={status === 'saving'}>
            {status === 'saving' ? 'Saving…' : status === 'saved' ? 'Saved ✓' : 'Save changes'}
          </button>
        </div>
      </div>
      {status === 'error' && <p className="editor__error">Something went wrong saving. Try again.</p>}

      <div className="team-editor-list">
        {posts.map((post, index) => (
          <PostEditor
            key={index}
            post={post}
            onChange={(p) => update(index, p)}
            onRemove={() => removeAt(index)}
            onMoveUp={() => moveAt(index, -1)}
            onMoveDown={() => moveAt(index, 1)}
            canMoveUp={index > 0}
            canMoveDown={index < posts.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

export default BlogEditor
