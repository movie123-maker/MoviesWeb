'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

export default function MovieList({ movies }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return movies
    const q = query.trim().toLowerCase()
    return movies.filter((m) => {
      const title = m.title.toLowerCase()
      const director = m.director.name.toLowerCase()
      const summary = m.summary.toLowerCase()
      return title.includes(q) || director.includes(q) || summary.includes(q)
    })
  }, [query, movies])

  return (
    <div className="page">
      <header className="hero">
        <h1 className="hero__title">经典电影珍藏</h1>
        <p className="hero__subtitle">跨越时空的银幕杰作</p>

        <div className="search">
          <span className="search__icon" aria-hidden="true">&#128269;</span>
          <input
            type="text"
            className="search__input"
            placeholder="搜索电影标题、导演、剧情..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="搜索电影"
          />
        </div>

        <p className="hero__count">
          {query
            ? `找到 ${filtered.length} 部匹配影片`
            : `共 ${movies.length} 部经典影片`}
        </p>
      </header>

      <div className="grid">
        {filtered.map((movie, index) => (
          <Link href={`/movie/${index}`} key={index} className="card">
            <div className="card__rating">{movie.rating}</div>
            <div className="card__body">
              <h2 className="card__title">{movie.title}</h2>
              <p className="card__meta">
                {movie.year}
                <span className="card__dot">&middot;</span>
                {movie.director.name}
              </p>
              <div className="card__genres">
                {movie.genre.map((g) => (
                  <span key={g} className="card__genre">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <div className="empty">
            <p>未找到匹配的电影</p>
            <p className="empty__hint">试试其他关键词</p>
          </div>
        )}
      </div>
    </div>
  )
}
