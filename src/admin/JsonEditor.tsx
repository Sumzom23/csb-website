type JsonValue = string | number | boolean | JsonValue[] | JsonObject
type JsonObject = { [key: string]: JsonValue }

function humanize(key: string) {
  const spaced = key.replace(/([A-Z])/g, ' $1')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

function isPlainObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function blankLike(value: JsonValue): JsonValue {
  if (typeof value === 'string') return ''
  if (typeof value === 'number') return 0
  if (typeof value === 'boolean') return false
  if (Array.isArray(value)) return []
  if (isPlainObject(value)) {
    const out: JsonObject = {}
    for (const key of Object.keys(value)) out[key] = blankLike(value[key])
    return out
  }
  return ''
}

function reorder<T>(list: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction
  if (target < 0 || target >= list.length) return list
  const copy = list.slice()
  const tmp = copy[index]
  copy[index] = copy[target]
  copy[target] = tmp
  return copy
}

type MoveProps = {
  onMoveUp?: () => void
  onMoveDown?: () => void
  canMoveUp?: boolean
  canMoveDown?: boolean
}

function MoveButtons({ onMoveUp, onMoveDown, canMoveUp, canMoveDown }: MoveProps) {
  if (!onMoveUp && !onMoveDown) return null
  return (
    <span className="move-buttons">
      <button
        type="button"
        className="move-buttons__btn"
        onClick={onMoveUp}
        disabled={!canMoveUp}
        aria-label="Move up"
        title="Move up"
      >
        ↑
      </button>
      <button
        type="button"
        className="move-buttons__btn"
        onClick={onMoveDown}
        disabled={!canMoveDown}
        aria-label="Move down"
        title="Move down"
      >
        ↓
      </button>
    </span>
  )
}

type FieldProps = {
  label: string
  value: JsonValue
  onChange: (value: JsonValue) => void
  onRemove?: () => void
} & MoveProps

function StringField({
  label,
  value,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: Omit<FieldProps, 'value'> & { value: string }) {
  const long = value.length > 70 || value.includes('\n')
  return (
    <label className="field">
      <span className="field__label">
        {label}
        <span className="field__label-actions">
          <MoveButtons
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            canMoveUp={canMoveUp}
            canMoveDown={canMoveDown}
          />
          {onRemove && (
            <button type="button" className="field__remove" onClick={onRemove} aria-label={`Remove ${label}`}>
              ×
            </button>
          )}
        </span>
      </span>
      {long ? (
        <textarea
          className="field__textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={Math.min(12, Math.max(3, Math.ceil(value.length / 55)))}
        />
      ) : (
        <input className="field__input" type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  )
}

export function Field({ label, value, onChange, onRemove, onMoveUp, onMoveDown, canMoveUp, canMoveDown }: FieldProps) {
  if (typeof value === 'string') {
    return (
      <StringField
        label={label}
        value={value}
        onChange={onChange}
        onRemove={onRemove}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        canMoveUp={canMoveUp}
        canMoveDown={canMoveDown}
      />
    )
  }

  if (typeof value === 'number') {
    return (
      <label className="field">
        <span className="field__label">{label}</span>
        <input
          className="field__input"
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </label>
    )
  }

  if (Array.isArray(value)) {
    const isObjectArray = value.length > 0 && isPlainObject(value[0])

    const update = (index: number, next: JsonValue) => {
      const copy = value.slice()
      copy[index] = next
      onChange(copy)
    }
    const removeAt = (index: number) => {
      const copy = value.slice()
      copy.splice(index, 1)
      onChange(copy)
    }
    const moveAt = (index: number, direction: -1 | 1) => {
      onChange(reorder(value, index, direction))
    }
    const add = () => {
      const template = value.length > 0 ? value[value.length - 1] : ''
      onChange([...value, blankLike(template)])
    }

    return (
      <fieldset className="field-group field-group--array">
        <legend>{label}</legend>
        {value.map((item, index) =>
          isObjectArray ? (
            <div className="array-card" key={index}>
              <div className="array-card__head">
                <span className="array-card__index">
                  {label} {index + 1}
                </span>
                <span className="array-card__actions">
                  <MoveButtons
                    onMoveUp={() => moveAt(index, -1)}
                    onMoveDown={() => moveAt(index, 1)}
                    canMoveUp={index > 0}
                    canMoveDown={index < value.length - 1}
                  />
                  <button type="button" className="btn btn--ghost btn--small" onClick={() => removeAt(index)}>
                    Remove
                  </button>
                </span>
              </div>
              <Field label="" value={item} onChange={(v) => update(index, v)} />
            </div>
          ) : (
            <StringField
              key={index}
              label={`${label} ${index + 1}`}
              value={String(item)}
              onChange={(v) => update(index, v)}
              onRemove={() => removeAt(index)}
              onMoveUp={() => moveAt(index, -1)}
              onMoveDown={() => moveAt(index, 1)}
              canMoveUp={index > 0}
              canMoveDown={index < value.length - 1}
            />
          ),
        )}
        <button type="button" className="btn btn--ghost btn--small" onClick={add}>
          + Add {label.toLowerCase()}
        </button>
      </fieldset>
    )
  }

  if (isPlainObject(value)) {
    return (
      <fieldset className="field-group">
        {label && <legend>{label}</legend>}
        {Object.entries(value).map(([key, v]) => (
          <Field
            key={key}
            label={humanize(key)}
            value={v}
            onChange={(nv) => onChange({ ...value, [key]: nv })}
          />
        ))}
      </fieldset>
    )
  }

  return null
}

export { MoveButtons, reorder }
export type { JsonValue, JsonObject }
