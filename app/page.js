import { promises as fs } from 'fs'
import path from 'path'
import MovieList from './_components/MovieList'

async function getMovies() {
  const filePath = path.join(process.cwd(), 'movies.json')
  const data = await fs.readFile(filePath, 'utf8')
  return JSON.parse(data).movies
}

export default async function HomePage() {
  const movies = await getMovies()
  return <MovieList movies={movies} />
}
