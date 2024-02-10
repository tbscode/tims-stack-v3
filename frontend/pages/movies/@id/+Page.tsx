export default Page

import React from 'react'
import { withFallback } from 'vike-react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { usePageContext } from 'vike-react/usePageContext'
import { MovieDetails } from '../types'

function Page() {
  const { routeParams } = usePageContext()
  const id = routeParams!['id']

  return <Movie id={id} />
}

const Movie = withFallback(
  ({ id }: { id: string }) => {
    const result = useSuspenseQuery({
      queryKey: ['movie', id],
      queryFn: () => getStarWarsMovie(id),
      // Disabled to showcase error fallback
      retry: false
    })

    const { title, release_date } = result.data

    return (
      <>
        <h1>Star Wars Movies</h1>
        <ul>
          <li>
            Title: <b>{title}</b>
          </li>
          <li>
            Release date: <b>{release_date}</b>
          </li>
        </ul>
        <p>
          Source: <a href="https://star-wars.brillout.com">star-wars.brillout.com</a>.
        </p>
      </>
    )
  },
  {
    Loading: ({ id }) => `Loading movie ${id}`,
  }
)

async function getStarWarsMovie(id: string): Promise<MovieDetails> {
  await new Promise((r) => setTimeout(r, 500))

  if (Math.random() > 0.4) {
    throw new Error('Failed to fetch')
  }

  const response = await fetch(`https://star-wars.brillout.com/api/films/${id}.json`)
  return response.json()
}
