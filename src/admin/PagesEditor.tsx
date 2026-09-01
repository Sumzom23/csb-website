import { useEffect, useState } from 'react'
import { Field, type JsonObject } from './JsonEditor'
import { getJson, putJson } from './api'

function humanizeSection(key: string) {
  const spaced = key.replace(/([A-Z])/g, ' $1')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

function PagesEditor() {
  const [content, setContent] = useState<JsonObject | null>(null)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  useEffect(() => {
    getJson<JsonObject>('/api/content').then(setContent)
  }, [])

  if (!content) return <p className="admin-loading">Loading page content…</p>

  const save = async () => {
    setStatus('saving')
    try {
      await putJson('/api/content', content)
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
          <h2>Page copy</h2>
          <p className="editor__hint">
            Every section on the site, editable directly. Saving writes to the site instantly.
          </p>
        </div>
        <button type="button" className="btn btn--primary" onClick={save} disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving…' : status === 'saved' ? 'Saved ✓' : 'Save changes'}
        </button>
      </div>
      {status === 'error' && <p className="editor__error">Something went wrong saving. Try again.</p>}

      {Object.entries(content).map(([sectionKey, sectionValue]) => (
        <details className="section" key={sectionKey} open={sectionKey === 'hero'}>
          <summary>{humanizeSection(sectionKey)}</summary>
          <div className="section__body">
            <Field
              label=""
              value={sectionValue}
              onChange={(next) => setContent({ ...content, [sectionKey]: next })}
            />
          </div>
        </details>
      ))}
    </div>
  )
}

export default PagesEditor
