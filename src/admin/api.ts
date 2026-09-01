export async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`GET ${url} failed: ${res.status}`)
  return res.json() as Promise<T>
}

export async function putJson(url: string, body: unknown): Promise<void> {
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`PUT ${url} failed: ${res.status}`)
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolvePromise, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolvePromise(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export async function uploadFile(file: File): Promise<string> {
  const dataUrl = await fileToDataUrl(file)
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename: file.name, dataUrl }),
  })
  if (!res.ok) throw new Error(`upload failed: ${res.status}`)
  const { url } = (await res.json()) as { url: string }
  return url
}
