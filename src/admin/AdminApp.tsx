import { useState } from 'react'
import PagesEditor from './PagesEditor'
import TeamEditor from './TeamEditor'
import BlogEditor from './BlogEditor'
import './admin.css'

const tabs = [
  { key: 'pages', label: 'Pages', render: () => <PagesEditor /> },
  { key: 'team', label: 'Team', render: () => <TeamEditor /> },
  { key: 'blog', label: 'Blog', render: () => <BlogEditor /> },
] as const

function AdminApp() {
  const [active, setActive] = useState<(typeof tabs)[number]['key']>('pages')
  const activeTab = tabs.find((tab) => tab.key === active)!

  return (
    <div className="admin">
      <aside className="admin__sidebar">
        <div className="admin__brand">Circuit Skillbuilder</div>
        <div className="admin__brand-sub">Content admin</div>
        <nav className="admin__nav">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`admin__nav-item${tab.key === active ? ' admin__nav-item--active' : ''}`}
              onClick={() => setActive(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <a className="admin__view-site" href="/" target="_blank" rel="noreferrer">
          View site ↗
        </a>
      </aside>
      <main className="admin__main">{activeTab.render()}</main>
    </div>
  )
}

export default AdminApp
