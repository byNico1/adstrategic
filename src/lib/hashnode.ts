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

    const contentType = response.headers.get("content-type") ?? ""
    if (!response.ok || !contentType.includes("application/json")) {
      console.error("Hashnode API unavailable:", response.status, contentType)
      return null
    }

    const data = (await response.json()) as { errors?: unknown[] }
    if (data.errors?.length) {
      console.error("Hashnode GraphQL errors:", data.errors)
      return null
    }

    return data
  } catch (error) {
    console.error("Error fetching data:", error)
    return null
  }
}
