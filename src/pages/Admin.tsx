import { useState, useEffect, useCallback, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import {
  Lock,
  Images,
  FileText,
  Trash2,
  Plus,
  Pencil,
  X,
  LogOut,
  Loader2,
  ShoppingBag,
  RotateCcw,
} from 'lucide-react'

// TODO: Replace with proper auth later
const ADMIN_PASSWORD = 'vizagadmin2024'
const STORAGE_KEY = 'vizag_admin_authed'

/* ============================================================
 *  Data interfaces
 * ============================================================ */

type GalleryCategory = 'Clinic Facilities' | 'Happy Pets' | 'Events' | 'Grooming'

interface GalleryItem {
  id: number
  title: string
  category: GalleryCategory
  image: string
  deletedAt?: string
}

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  readTime: string
  image: string
  youtubeUrl?: string
  deletedAt?: string
}

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  readTime: string
  image: string
  youtubeUrl?: string
  deletedAt?: string
}

interface Service {
  slug: string
  title: string
  shortDescription: string
  longDescription: string
  icon: string
  features: string[]
  category: 'veterinary' | 'grooming' | 'boarding'
  featured: boolean
  comingSoon?: boolean
}

interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  description: string
  deletedAt?: string
}

/* ============================================================
 *  Helpers
 * ============================================================ */

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

const API_BASE = '/api'

const daysUntilAutoDelete = (deletedAt: string): number => {
  const deleted = new Date(deletedAt).getTime()
  const autoDeleteAt = deleted + 30 * 24 * 60 * 60 * 1000
  return Math.max(0, Math.ceil((autoDeleteAt - Date.now()) / (24 * 60 * 60 * 1000)))
}

/* ============================================================
 *  Small UI primitives
 * ============================================================ */

const inputClass =
  'w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent text-sm'

const labelClass = 'block text-sm font-semibold text-slate-700 mb-1.5'

const btnPrimary =
  'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-ocean-700 text-white text-sm font-semibold hover:bg-ocean-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

const btnDanger =
  'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-700 text-sm font-semibold hover:bg-red-100 transition-colors border border-red-200'

const btnGhost =
  'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition-colors'

/* ============================================================
 *  Component
 * ============================================================ */

export default function Admin() {
  const [authed, setAuthed] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [authError, setAuthError] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'gallery' | 'blog' | 'store'>('gallery')

  // Restore auth from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'true') setAuthed(true)
    } catch {
      /* localStorage may be unavailable */
    }
  }, [])

  const handleLogin = (): void => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true)
      setAuthError('')
      setPassword('')
      try {
        localStorage.setItem(STORAGE_KEY, 'true')
      } catch {
        /* ignore */
      }
    } else {
      setAuthError('Incorrect password. Please try again.')
    }
  }

  const handleLogout = (): void => {
    setAuthed(false)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }

  /* --- Login screen --- */
  if (!authed) {
    return (
      <>
        <Helmet>
          <title>Admin | Vizag Animal Hospital</title>
        </Helmet>
        <Section bg="slate" className="min-h-[70vh] flex items-center">
          <Container>
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-ocean-100 flex items-center justify-center mb-4">
                    <Lock className="h-7 w-7 text-ocean-700" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900 mb-1">Admin Login</h1>
                  <p className="text-sm text-slate-500">Enter your password to access the admin panel.</p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleLogin()
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className={labelClass}>Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      className={inputClass}
                      autoFocus
                    />
                  </div>

                  {authError && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                      {authError}
                    </p>
                  )}

                  <button type="submit" className={btnPrimary + ' w-full'}>
                    Enter
                  </button>
                </form>
              </div>
            </div>
          </Container>
        </Section>
      </>
    )
  }

  /* --- Admin dashboard --- */
  const tabs: { key: typeof activeTab; label: string; icon: typeof Images }[] = [
    { key: 'gallery', label: 'Gallery Manager', icon: Images },
    { key: 'blog', label: 'Blog Manager', icon: FileText },
    { key: 'store', label: 'Store Manager', icon: ShoppingBag },
  ]

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Vizag Animal Hospital</title>
      </Helmet>

      <Section bg="slate" className="min-h-screen">
        <Container>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-sm text-slate-500">Manage gallery, blog posts, and store products.</p>
            </div>
            <button onClick={handleLogout} className={btnGhost}>
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-ocean-700 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 'gallery' && <GalleryManager />}
          {activeTab === 'blog' && <BlogManager />}
          {activeTab === 'store' && <StoreManager />}
        </Container>
      </Section>
    </>
  )
}

/* ============================================================
 *  Gallery Manager
 * ============================================================ */

function GalleryManager(): JSX.Element {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  // trash state
  const [showTrash, setShowTrash] = useState<boolean>(false)
  const [trashItems, setTrashItems] = useState<GalleryItem[]>([])
  const [trashLoading, setTrashLoading] = useState<boolean>(false)

  // form state
  const [title, setTitle] = useState<string>('')
  const [category, setCategory] = useState<GalleryCategory>('Happy Pets')
  const [image, setImage] = useState<string>('')
  const [saving, setSaving] = useState<boolean>(false)
  const [formMsg, setFormMsg] = useState<string>('')

  const fetchItems = useCallback(async (): Promise<void> => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/gallery`)
      if (!res.ok) throw new Error('Failed to load gallery items')
      const data: GalleryItem[] = await res.json()
      setItems(data)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchTrash = useCallback(async (): Promise<void> => {
    setTrashLoading(true)
    try {
      const res = await fetch(`${API_BASE}/gallery?trash=true`)
      if (!res.ok) throw new Error('Failed to load trash items')
      const data: GalleryItem[] = await res.json()
      setTrashItems(data)
    } catch {
      /* ignore */
    } finally {
      setTrashLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchItems()
  }, [fetchItems])

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setImage(typeof reader.result === 'string' ? reader.result : '')
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (!title || !category || !image) {
      setFormMsg('Please fill in title, category, and image.')
      return
    }
    setSaving(true)
    setFormMsg('')
    try {
      const res = await fetch(`${API_BASE}/gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, image }),
      })
      if (!res.ok) throw new Error('Failed to add gallery item')
      const newItem: GalleryItem = await res.json()
      setItems((prev) => [...prev, newItem])
      setTitle('')
      setCategory('Happy Pets')
      setImage('')
      setFormMsg('Gallery item added successfully!')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setFormMsg(`Error: ${msg}`)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number): Promise<void> => {
    try {
      const res = await fetch(`${API_BASE}/gallery?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      setItems((prev) => prev.filter((i) => i.id !== id))
      setFormMsg('Item moved to Recently Deleted. Auto-deletes after 30 days.')
      // Refresh trash count
      void fetchTrash()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
    }
  }

  const handleRestore = async (id: number): Promise<void> => {
    try {
      const res = await fetch(`${API_BASE}/gallery?restore=${id}`, { method: 'PUT' })
      if (!res.ok) throw new Error('Failed to restore')
      void fetchItems()
      void fetchTrash()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
    }
  }

  const handlePermanentDelete = async (id: number): Promise<void> => {
    if (!confirm('Permanently delete? This cannot be undone.')) return
    try {
      const res = await fetch(`${API_BASE}/gallery?id=${id}&permanent=true`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete permanently')
      setTrashItems((prev) => prev.filter((i) => i.id !== id))
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
    }
  }

  const toggleTrash = async (): Promise<void> => {
    if (!showTrash && trashItems.length === 0) {
      await fetchTrash()
    }
    setShowTrash((prev) => !prev)
  }

  return (
    <div className="space-y-8">
      {/* Add form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Add New Gallery Item</h2>
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Item title" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as GalleryCategory)}
              className={inputClass}
            >
              <option value="Clinic Facilities">Clinic Facilities</option>
              <option value="Happy Pets">Happy Pets</option>
              <option value="Events">Events</option>
              <option value="Grooming">Grooming</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Image URL</label>
            <input value={image.startsWith('data:') ? '' : image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." className={inputClass} />
            <p className="text-xs text-slate-400 mt-1">Or upload a file below.</p>
            <input type="file" accept="image/*" onChange={handleFile} className="mt-2 text-sm text-slate-600" />
            {image.startsWith('data:') && (
              <p className="text-xs text-green-600 mt-1">File selected (base64). Will be used as image.</p>
            )}
          </div>
          <div className="sm:col-span-2 flex items-center gap-4">
            <button type="submit" className={btnPrimary} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              {saving ? 'Adding...' : 'Add Item'}
            </button>
            {formMsg && (
              <span className={`text-sm ${formMsg.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>{formMsg}</span>
            )}
          </div>
        </form>
      </div>

      {/* Items grid */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Current Gallery Items ({items.length})
        </h2>
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-ocean-600" />
          </div>
        ) : error ? (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-8">No gallery items yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div key={item.id} className="relative group rounded-lg overflow-hidden border border-slate-200">
                <div className="aspect-[4/3] bg-slate-100">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain" loading="lazy" />
                </div>
                <div className="p-2">
                  <p className="text-xs font-semibold text-slate-900 truncate">{item.title}</p>
                  <p className="text-[10px] text-slate-500">{item.category}</p>
                </div>
                <button
                  onClick={() => void handleDelete(item.id)}
                  className="absolute top-1 right-1 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recently Deleted */}
      <div className="bg-white rounded-xl border-2 border-amber-300 p-6">
        <button
          onClick={() => void toggleTrash()}
          className="flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-800"
        >
          <Trash2 className="h-4 w-4" />
          Recently Deleted ({trashItems.length})
          {showTrash ? ' ▲' : ' ▼'}
        </button>
        {showTrash && (
          <div className="mt-4">
            {trashLoading ? (
              <div className="flex justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
              </div>
            ) : trashItems.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">No deleted items.</p>
            ) : (
              <div className="space-y-3">
                {trashItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 p-3 rounded-lg border border-amber-200 bg-amber-50"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900 truncate">{item.title}</p>
                      <p className="text-xs text-amber-700 mt-0.5">
                        Deleted: {item.deletedAt ? new Date(item.deletedAt).toLocaleDateString() : '—'}
                      </p>
                      <p className="text-[10px] text-amber-600">
                        {item.deletedAt ? `Auto-deletes in ${daysUntilAutoDelete(item.deletedAt)} days` : ''}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => void handleRestore(item.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-semibold hover:bg-green-100 border border-green-200"
                        title="Restore"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Restore
                      </button>
                      <button
                        onClick={() => void handlePermanentDelete(item.id)}
                        className={btnDanger + ' !text-xs !px-3 !py-1.5'}
                        title="Delete permanently"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete Permanently
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ============================================================
 *  Blog Manager
 * ============================================================ */

function BlogManager(): JSX.Element {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  // trash state
  const [showTrash, setShowTrash] = useState<boolean>(false)
  const [trashItems, setTrashItems] = useState<BlogPost[]>([])
  const [trashLoading, setTrashLoading] = useState<boolean>(false)

  // form state
  const [editingSlug, setEditingSlug] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [slug, setSlug] = useState<string>('')
  const [excerpt, setExcerpt] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [category, setCategory] = useState<string>('Dog Care')
  const [readTime, setReadTime] = useState<string>('5 min read')
  const [image, setImage] = useState<string>('')
  const [youtubeUrl, setYoutubeUrl] = useState<string>('')
  const [saving, setSaving] = useState<boolean>(false)
  const [formMsg, setFormMsg] = useState<string>('')

  const fetchPosts = useCallback(async (): Promise<void> => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/blog-posts`)
      if (!res.ok) throw new Error('Failed to load blog posts')
      const data: BlogPost[] = await res.json()
      setPosts(data)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchTrash = useCallback(async (): Promise<void> => {
    setTrashLoading(true)
    try {
      const res = await fetch(`${API_BASE}/blog-posts?trash=true`)
      if (!res.ok) throw new Error('Failed to load trash items')
      const data: BlogPost[] = await res.json()
      setTrashItems(data)
    } catch {
      /* ignore */
    } finally {
      setTrashLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchPosts()
  }, [fetchPosts])

  // Auto-generate slug from title when not editing
  useEffect(() => {
    if (!editingSlug) {
      setSlug(slugify(title))
    }
  }, [title, editingSlug])

  const resetForm = (): void => {
    setEditingSlug('')
    setTitle('')
    setSlug('')
    setExcerpt('')
    setContent('')
    setCategory('Dog Care')
    setReadTime('5 min read')
    setImage('')
    setYoutubeUrl('')
    setFormMsg('')
  }

  const handleEdit = (post: BlogPost): void => {
    setEditingSlug(post.slug)
    setTitle(post.title)
    setSlug(post.slug)
    setExcerpt(post.excerpt)
    setContent(post.content)
    setCategory(post.category)
    setReadTime(post.readTime)
    setImage(post.image)
    setYoutubeUrl(post.youtubeUrl ?? '')
    setFormMsg('')
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    const finalSlug = editingSlug || slugify(title)
    if (!title || !content || !category || !readTime) {
      setFormMsg('Please fill in title, content, category, and read time.')
      return
    }
    setSaving(true)
    setFormMsg('')
    try {
      const body: Partial<BlogPost> = {
        title,
        slug: finalSlug,
        excerpt: excerpt || title,
        content,
        category,
        readTime,
        image,
        youtubeUrl: youtubeUrl || undefined,
      }
      const res = await fetch(`${API_BASE}/blog-posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('Failed to save blog post')
      const saved: BlogPost = await res.json()

      // Update local state
      setPosts((prev) => {
        const idx = prev.findIndex((p) => p.slug === saved.slug)
        if (idx >= 0) {
          const copy = [...prev]
          copy[idx] = saved
          return copy
        }
        return [saved, ...prev]
      })

      resetForm()
      setFormMsg(editingSlug ? 'Post updated successfully!' : 'Post created successfully!')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setFormMsg(`Error: ${msg}`)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (slugToDelete: string): Promise<void> => {
    try {
      const res = await fetch(`${API_BASE}/blog-posts?slug=${encodeURIComponent(slugToDelete)}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete post')
      setPosts((prev) => prev.filter((p) => p.slug !== slugToDelete))
      if (editingSlug === slugToDelete) resetForm()
      setFormMsg('Post moved to Recently Deleted. Auto-deletes after 30 days.')
      void fetchTrash()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
    }
  }

  const handleRestore = async (slug: string): Promise<void> => {
    try {
      const res = await fetch(`${API_BASE}/blog-posts?restore=${encodeURIComponent(slug)}`, {
        method: 'PUT',
      })
      if (!res.ok) throw new Error('Failed to restore')
      void fetchPosts()
      void fetchTrash()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
    }
  }

  const handlePermanentDelete = async (slug: string): Promise<void> => {
    if (!confirm('Permanently delete? This cannot be undone.')) return
    try {
      const res = await fetch(
        `${API_BASE}/blog-posts?slug=${encodeURIComponent(slug)}&permanent=true`,
        { method: 'DELETE' }
      )
      if (!res.ok) throw new Error('Failed to delete permanently')
      setTrashItems((prev) => prev.filter((p) => p.slug !== slug))
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
    }
  }

  const toggleTrash = async (): Promise<void> => {
    if (!showTrash && trashItems.length === 0) {
      await fetchTrash()
    }
    setShowTrash((prev) => !prev)
  }

  return (
    <div className="space-y-8">
      {/* Create/Edit form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            {editingSlug ? `Edit Post: ${editingSlug}` : 'Create New Blog Post'}
          </h2>
          {editingSlug && (
            <button onClick={resetForm} className={btnGhost}>
              <X className="h-4 w-4" />
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
              <option value="Dog Care">Dog Care</option>
              <option value="Cat Care">Cat Care</option>
              <option value="General Pet Health">General Pet Health</option>
              <option value="Nutrition">Nutrition</option>
              <option value="Emergency Tips">Emergency Tips</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Read Time</label>
            <input value={readTime} onChange={(e) => setReadTime(e.target.value)} placeholder="5 min read" className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              rows={10}
              className={inputClass + ' resize-y font-mono text-xs'}
            />
          </div>
          <div>
            <label className={labelClass}>Image URL (optional)</label>
            <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>YouTube Embed URL (optional)</label>
            <input value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." className={inputClass} />
          </div>
          <div className="sm:col-span-2 flex items-center gap-4">
            <button type="submit" className={btnPrimary} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              {saving ? 'Saving...' : editingSlug ? 'Update Post' : 'Create Post'}
            </button>
            {formMsg && (
              <span className={`text-sm ${formMsg.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
                {formMsg}
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Posts list */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Blog Posts ({posts.length})
        </h2>
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-ocean-600" />
          </div>
        ) : error ? (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
        ) : posts.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-8">No blog posts yet.</p>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.slug}
                className="flex items-center justify-between gap-4 p-4 rounded-lg border border-slate-200 hover:border-ocean-300 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-slate-900 truncate">{post.title}</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-ocean-100 text-ocean-700">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{post.readTime}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">/{post.slug}</p>
                  {post.youtubeUrl && <p className="text-[10px] text-red-500 mt-0.5">▶ YouTube embed</p>}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => handleEdit(post)} className={btnGhost} title="Edit post">
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>
                  <button onClick={() => void handleDelete(post.slug)} className={btnDanger} title="Delete post">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recently Deleted */}
      <div className="bg-white rounded-xl border-2 border-amber-300 p-6">
        <button
          onClick={() => void toggleTrash()}
          className="flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-800"
        >
          <Trash2 className="h-4 w-4" />
          Recently Deleted ({trashItems.length})
          {showTrash ? ' ▲' : ' ▼'}
        </button>
        {showTrash && (
          <div className="mt-4">
            {trashLoading ? (
              <div className="flex justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
              </div>
            ) : trashItems.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">No deleted posts.</p>
            ) : (
              <div className="space-y-3">
                {trashItems.map((post) => (
                  <div
                    key={post.slug}
                    className="flex items-center justify-between gap-4 p-3 rounded-lg border border-amber-200 bg-amber-50"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900 truncate">{post.title}</p>
                      <p className="text-xs text-amber-700 mt-0.5">
                        Deleted: {post.deletedAt ? new Date(post.deletedAt).toLocaleDateString() : '—'}
                      </p>
                      <p className="text-[10px] text-amber-600">
                        {post.deletedAt ? `Auto-deletes in ${daysUntilAutoDelete(post.deletedAt)} days` : ''}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => void handleRestore(post.slug)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-semibold hover:bg-green-100 border border-green-200"
                        title="Restore"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Restore
                      </button>
                      <button
                        onClick={() => void handlePermanentDelete(post.slug)}
                        className={btnDanger + ' !text-xs !px-3 !py-1.5'}
                        title="Delete permanently"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete Permanently
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ============================================================
 *  Store Manager (Products)
 * ============================================================ */

const PRODUCT_CATEGORIES = [
  'Dog Food',
  'Cat Food',
  'Pet Accessories',
  'Toys',
  'Clothing',
  'Medicine',
  'Supplements',
  'Grooming Products',
  'Tick Control',
  'Bird & Fish Supplies',
]

function StoreManager(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  // trash state
  const [showTrash, setShowTrash] = useState<boolean>(false)
  const [trashItems, setTrashItems] = useState<Product[]>([])
  const [trashLoading, setTrashLoading] = useState<boolean>(false)

  // form state
  const [editingId, setEditingId] = useState<number | null>(null)
  const [name, setName] = useState<string>('')
  const [category, setCategory] = useState<string>('Dog Food')
  const [price, setPrice] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [saving, setSaving] = useState<boolean>(false)
  const [formMsg, setFormMsg] = useState<string>('')

  // search/filter
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filterCategory, setFilterCategory] = useState<string>('All')

  const fetchProducts = useCallback(async (): Promise<void> => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/products?limit=2000`)
      if (!res.ok) throw new Error('Failed to load products')
      const data = await res.json()
      setProducts(data.items || [])
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchTrash = useCallback(async (): Promise<void> => {
    setTrashLoading(true)
    try {
      const res = await fetch(`${API_BASE}/products?trash=true`)
      if (!res.ok) throw new Error('Failed to load trash items')
      const data = await res.json()
      setTrashItems(data.items || [])
    } catch {
      /* ignore */
    } finally {
      setTrashLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchProducts()
  }, [fetchProducts])

  const resetForm = (): void => {
    setEditingId(null)
    setName('')
    setCategory('Dog Food')
    setPrice('')
    setImage('')
    setDescription('')
    setFormMsg('')
  }

  const handleEdit = (product: Product): void => {
    setEditingId(product.id)
    setName(product.name)
    setCategory(product.category)
    setPrice(String(product.price))
    setImage(product.image)
    setDescription(product.description)
    setFormMsg('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setImage(typeof reader.result === 'string' ? reader.result : '')
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (!name || !category) {
      setFormMsg('Please fill in name and category.')
      return
    }
    setSaving(true)
    setFormMsg('')
    try {
      const body = {
        id: editingId || undefined,
        name,
        category,
        price: parseFloat(price) || 0,
        image,
        description,
      }
      const url = editingId
        ? `${API_BASE}/products?id=${editingId}`
        : `${API_BASE}/products`
      const method = editingId ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('Failed to save product')
      const saved: Product = await res.json()

      setProducts((prev) => {
        const idx = prev.findIndex((p) => p.id === saved.id)
        if (idx >= 0) {
          const copy = [...prev]
          copy[idx] = saved
          return copy
        }
        return [...prev, saved]
      })

      resetForm()
      setFormMsg(editingId ? 'Product updated!' : 'Product added!')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setFormMsg(`Error: ${msg}`)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number): Promise<void> => {
    if (!confirm('Delete this product? It will be moved to Recently Deleted for 30 days.')) return
    try {
      const res = await fetch(`${API_BASE}/products?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete product')
      setProducts((prev) => prev.filter((p) => p.id !== id))
      if (editingId === id) resetForm()
      setFormMsg('Product moved to Recently Deleted. Auto-deletes after 30 days.')
      void fetchTrash()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
    }
  }

  const handleRestore = async (id: number): Promise<void> => {
    try {
      const res = await fetch(`${API_BASE}/products?restore=${id}`, { method: 'PUT' })
      if (!res.ok) throw new Error('Failed to restore')
      void fetchProducts()
      void fetchTrash()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
    }
  }

  const handlePermanentDelete = async (id: number): Promise<void> => {
    if (!confirm('Permanently delete? This cannot be undone.')) return
    try {
      const res = await fetch(`${API_BASE}/products?id=${id}&permanent=true`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete permanently')
      setTrashItems((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
    }
  }

  const toggleTrash = async (): Promise<void> => {
    if (!showTrash && trashItems.length === 0) {
      await fetchTrash()
    }
    setShowTrash((prev) => !prev)
  }

  // Filtered products for display
  const displayedProducts = useMemo(() => {
    let result = products
    if (filterCategory !== 'All') {
      result = result.filter((p) => p.category === filterCategory)
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }
    return result
  }, [products, filterCategory, searchTerm])

  return (
    <div className="space-y-8">
      {/* Add/Edit form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            {editingId ? `Edit Product #${editingId}` : 'Add New Product'}
          </h2>
          {editingId !== null && (
            <button onClick={resetForm} className={btnGhost}>
              <X className="h-4 w-4" />
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Price (₹)</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Image URL</label>
            <input
              value={image.startsWith('data:') ? '' : image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
            <p className="text-xs text-slate-400 mt-1">Or upload a file below.</p>
            <input type="file" accept="image/*" onChange={handleFile} className="mt-2 text-sm text-slate-600" />
            {image && (
              <div className="mt-2 inline-block">
                <img
                  src={image}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg border border-slate-200"
                />
              </div>
            )}
          </div>
          <div className="sm:col-span-2 flex items-center gap-4">
            <button type="submit" className={btnPrimary} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              {saving ? 'Saving...' : editingId !== null ? 'Update Product' : 'Add Product'}
            </button>
            {formMsg && (
              <span className={`text-sm ${formMsg.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
                {formMsg}
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Products list */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="text-lg font-bold text-slate-900">
            Products ({products.length})
          </h2>
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-500"
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-500"
            >
              <option value="All">All Categories</option>
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-ocean-600" />
          </div>
        ) : error ? (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
        ) : displayedProducts.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-8">No products found.</p>
        ) : (
          <>
            <p className="text-xs text-slate-400 mb-3">
              Showing {displayedProducts.length} of {products.length} products
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {displayedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-ocean-300 transition-colors"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-slate-300" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900 truncate">{product.name}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-ocean-100 text-ocean-700">
                        {product.category}
                      </span>
                      <span className="text-xs font-bold text-slate-700">₹{product.price}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button onClick={() => handleEdit(product)} className={btnGhost + ' !px-2 !py-2'} title="Edit product">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => void handleDelete(product.id)} className={btnDanger + ' !px-2 !py-2'} title="Delete product">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Recently Deleted */}
      <div className="bg-white rounded-xl border-2 border-amber-300 p-6">
        <button
          onClick={() => void toggleTrash()}
          className="flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-800"
        >
          <Trash2 className="h-4 w-4" />
          Recently Deleted ({trashItems.length})
          {showTrash ? ' ▲' : ' ▼'}
        </button>
        {showTrash && (
          <div className="mt-4">
            {trashLoading ? (
              <div className="flex justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
              </div>
            ) : trashItems.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">No deleted products.</p>
            ) : (
              <div className="space-y-3">
                {trashItems.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between gap-4 p-3 rounded-lg border border-amber-200 bg-amber-50"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900 truncate">{product.name}</p>
                      <p className="text-xs text-amber-700 mt-0.5">
                        Deleted: {product.deletedAt ? new Date(product.deletedAt).toLocaleDateString() : '—'}
                      </p>
                      <p className="text-[10px] text-amber-600">
                        {product.deletedAt ? `Auto-deletes in ${daysUntilAutoDelete(product.deletedAt)} days` : ''}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => void handleRestore(product.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-semibold hover:bg-green-100 border border-green-200"
                        title="Restore"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Restore
                      </button>
                      <button
                        onClick={() => void handlePermanentDelete(product.id)}
                        className={btnDanger + ' !text-xs !px-3 !py-1.5'}
                        title="Delete permanently"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete Permanently
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}