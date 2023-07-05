import React from 'react'

export const renderResultsCountMessage = (search: string, count: number) =>
  search && (
    <div>
      <p>
        {!count ? (
          <>
            No results for your query: <strong>{search}</strong>
          </>
        ) : (
          <>
            {count} result
            {count !== 1 && 's'} for your query: <strong>{search}</strong>
          </>
        )}
      </p>
    </div>
  )
