import { useEffect, useState } from 'react'
import { getJson, putJson, uploadFile } from './api'
import { MoveButtons, reorder } from './JsonEditor'

type TeamGroup = 'executive' | 'leadership' | 'instructor'
type TeamMember = { name: string; role: string; bio: string; photo: string; group: TeamGroup }

const groupLabels: Record<TeamGroup, string> = {
  executive: 'Executive board',
  leadership: 'Leadership',
  instructor: 'Instructor',
}

function TeamEditor() {
  const [members, setMembers] = useState<TeamMember[] | null>(null)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null)

  useEffect(() => {
    getJson<TeamMember[]>('/api/team').then(setMembers)
  }, [])

  if (!members) return <p className="admin-loading">Loading team…</p>

  const update = (index: number, patch: Partial<TeamMember>) => {
    const copy = members.slice()
    copy[index] = { ...copy[index], ...patch }
    setMembers(copy)
  }

  const removeAt = (index: number) => {
    if (!confirm(`Remove ${members[index].name}?`)) return
    const copy = members.slice()
    copy.splice(index, 1)
    setMembers(copy)
  }

  const moveAt = (index: number, direction: -1 | 1) => {
    setMembers(reorder(members, index, direction))
  }

  const add = () => {
    setMembers([
      { name: 'New instructor', role: 'Instructor', bio: '', photo: '', group: 'instructor' },
      ...members,
    ])
  }

  const handleUpload = async (index: number, file: File) => {
    setUploadingIndex(index)
    try {
      const url = await uploadFile(file)
      update(index, { photo: url })
    } finally {
      setUploadingIndex(null)
    }
  }

  const save = async () => {
    setStatus('saving')
    try {
      await putJson('/api/team', members)
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
          <h2>Team</h2>
          <p className="editor__hint">{members.length} instructors. Add, edit, or remove anyone.</p>
        </div>
        <div className="editor__toolbar-actions">
          <button type="button" className="btn btn--ghost" onClick={add}>
            + Add member
          </button>
          <button type="button" className="btn btn--primary" onClick={save} disabled={status === 'saving'}>
            {status === 'saving' ? 'Saving…' : status === 'saved' ? 'Saved ✓' : 'Save changes'}
          </button>
        </div>
      </div>
      {status === 'error' && <p className="editor__error">Something went wrong saving. Try again.</p>}

      <div className="team-editor-list">
        {members.map((member, index) => (
          <div className="array-card" key={index}>
            <div className="array-card__head">
              <span className="array-card__index">
                {member.name || `Member ${index + 1}`} · {groupLabels[member.group]}
              </span>
              <span className="array-card__actions">
                <MoveButtons
                  onMoveUp={() => moveAt(index, -1)}
                  onMoveDown={() => moveAt(index, 1)}
                  canMoveUp={index > 0}
                  canMoveDown={index < members.length - 1}
                />
                <button type="button" className="btn btn--ghost btn--small" onClick={() => removeAt(index)}>
                  Remove
                </button>
              </span>
            </div>

            <div className="team-editor-row">
              <div className="team-editor-photo">
                {member.photo ? (
                  <img src={member.photo} alt="" />
                ) : (
                  <div className="team-editor-photo__empty">No photo</div>
                )}
                <label className="btn btn--ghost btn--small team-editor-upload">
                  {uploadingIndex === index ? 'Uploading…' : 'Upload photo'}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) void handleUpload(index, file)
                      e.target.value = ''
                    }}
                  />
                </label>
                <input
                  className="field__input"
                  type="text"
                  placeholder="or paste an image URL"
                  value={member.photo}
                  onChange={(e) => update(index, { photo: e.target.value })}
                />
              </div>

              <div className="team-editor-fields">
                <label className="field">
                  <span className="field__label">Name</span>
                  <input
                    className="field__input"
                    type="text"
                    value={member.name}
                    onChange={(e) => update(index, { name: e.target.value })}
                  />
                </label>
                <label className="field">
                  <span className="field__label">Role</span>
                  <input
                    className="field__input"
                    type="text"
                    value={member.role}
                    onChange={(e) => update(index, { role: e.target.value })}
                  />
                </label>
                <label className="field">
                  <span className="field__label">Section</span>
                  <select
                    className="field__input"
                    value={member.group}
                    onChange={(e) => update(index, { group: e.target.value as TeamGroup })}
                  >
                    <option value="executive">Executive board</option>
                    <option value="leadership">Leadership</option>
                    <option value="instructor">Instructor</option>
                  </select>
                </label>
                <label className="field">
                  <span className="field__label">Bio</span>
                  <textarea
                    className="field__textarea"
                    rows={5}
                    value={member.bio}
                    onChange={(e) => update(index, { bio: e.target.value })}
                  />
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamEditor
