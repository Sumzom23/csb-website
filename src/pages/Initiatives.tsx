import { useEffect, useState } from 'react'
import { content } from '../data/content'
import Reveal from '../components/Reveal'
import '../components/ContentPage.css'
import './Initiatives.css'

const TAB_KEYS = ['lessons', 'coaching', 'backfiles', 'tournaments'] as const
type TabKey = (typeof TAB_KEYS)[number]

function isTabKey(value: string): value is TabKey {
  return (TAB_KEYS as readonly string[]).includes(value)
}

function readTabFromHash(): TabKey {
  const hash = window.location.hash.replace('#', '')
  return isTabKey(hash) ? hash : 'lessons'
}

function Initiatives() {
  const { initiatives } = content
  const { lessons, coaching, backfiles, tournaments } = initiatives
  const [activeTab, setActiveTab] = useState<TabKey>(readTabFromHash)

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'lessons', label: lessons.title },
    { key: 'coaching', label: coaching.title },
    { key: 'backfiles', label: backfiles.title },
    { key: 'tournaments', label: tournaments.title },
  ]

  useEffect(() => {
    const onHashChange = () => setActiveTab(readTabFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const selectTab = (key: TabKey) => {
    setActiveTab(key)
    window.history.replaceState(null, '', `#${key}`)
  }

  return (
    <main className="content-page">
      <div className="content-page__masthead">
        <span>{initiatives.mastheadLeft}</span>
        <span>{initiatives.mastheadRight}</span>
      </div>

      <div className="content-page__inner">
        <Reveal>
          <h1 className="content-page__title">{initiatives.title}</h1>
        </Reveal>

        <div className="initiative-tabs" role="tablist" aria-label="Initiatives">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.key}
              className={`initiative-tabs__btn${activeTab === tab.key ? ' initiative-tabs__btn--active' : ''}`}
              onClick={() => selectTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="initiative-panel" id={activeTab} role="tabpanel" key={activeTab}>
          {activeTab === 'lessons' && (
            <>
              <div className="content-page__body">
                <p>{lessons.text}</p>
              </div>
              <a className="initiative__cta" href={lessons.channelHref} target="_blank" rel="noreferrer">
                {lessons.channelLabel} ↗
              </a>
              <ul className="initiative__list">
                {lessons.videos.map((video) => (
                  <li key={video.href}>
                    <a href={video.href} target="_blank" rel="noreferrer">
                      {video.title}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {activeTab === 'coaching' && (
            <>
              <div className="content-page__body">
                <p>{coaching.text}</p>
              </div>
              <div className="initiative__actions">
                <a className="initiative__cta" href={coaching.menteeHref} target="_blank" rel="noreferrer">
                  {coaching.menteeLabel} ↗
                </a>
                <a
                  className="initiative__cta initiative__cta--ghost"
                  href={coaching.instructorHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {coaching.instructorLabel} ↗
                </a>
              </div>
              <div className="initiative__partners">
                <span className="initiative__partners-label">{coaching.partnersLabel}</span>
                <ul className="initiative__partners-list">
                  {coaching.partners.map((partner) => (
                    <li key={partner}>{partner}</li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {activeTab === 'backfiles' && (
            <>
              <div className="content-page__body">
                <p>{backfiles.text}</p>
              </div>
              <ul className="initiative__files">
                {backfiles.files.map((file) => (
                  <li key={file.href}>
                    <a href={file.href} target="_blank" rel="noreferrer">
                      {file.title}
                    </a>
                    <p>{file.description}</p>
                  </li>
                ))}
              </ul>
            </>
          )}

          {activeTab === 'tournaments' && (
            <>
              <ul className="initiative__list">
                {tournaments.items.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default Initiatives
