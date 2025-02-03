interface Query {
  query: string
  variables?: object
  tags?: Array<string>
}

export async function query({ query, variables, tags }: Query) {
  try {
    const response = await fetch("https://gql.hashnode.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: {
        tags,
        revalidate: 120,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}
