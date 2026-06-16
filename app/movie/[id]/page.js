import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'

async function getMovies() {
  const filePath = path.join(process.cwd(), 'movies.json')
  const data = await fs.readFile(filePath, 'utf8')
  return JSON.parse(data).movies
}

export default async function MovieDetail({ params }) {
  const movies = await getMovies()
  const movie = movies[Number(params.id)]

  if (!movie) notFound()

  return (
    <div className="detail">
      <Link href="/" className="detail__back">
        &larr; 返回列表
      </Link>

      <div className="detail__header">
        <div className="detail__rating">{movie.rating}</div>
        <h1 className="detail__title">{movie.title}</h1>
        <p className="detail__info-line">
          {movie.director.name} &middot; {movie.year} &middot; {movie.duration}
          分钟
        </p>
        <p className="detail__info-line">
          {movie.region.join(' / ')} &middot; {movie.genre.join('、')}
        </p>
      </div>

      <hr className="detail__divider" />

      <section>
        <h2 className="detail__section-title">剧情简介</h2>
        <p className="detail__summary">{movie.summary}</p>
      </section>

      <hr className="detail__divider" />

      <section>
        <h2 className="detail__section-title">影片信息</h2>
        <div className="detail__info-grid">
          <div className="detail__info-row">
            <span className="detail__info-label">导演</span>
            <span className="detail__info-value">
              {movie.director.name} &middot; {movie.director.region}
            </span>
          </div>
          <div className="detail__info-row">
            <span className="detail__info-label">年份</span>
            <span className="detail__info-value">{movie.year}</span>
          </div>
          <div className="detail__info-row">
            <span className="detail__info-label">片长</span>
            <span className="detail__info-value">{movie.duration} 分钟</span>
          </div>
          <div className="detail__info-row">
            <span className="detail__info-label">类型</span>
            <span className="detail__info-value">
              {movie.genre.join('、')}
            </span>
          </div>
          <div className="detail__info-row">
            <span className="detail__info-label">地区</span>
            <span className="detail__info-value">
              {movie.region.join(' / ')}
            </span>
          </div>
          <div className="detail__info-row">
            <span className="detail__info-label">评分</span>
            <span className="detail__info-value">{movie.rating}</span>
          </div>
        </div>
      </section>
    </div>
  )
}
