interface Query {
  query: string
  variables?: object
  tags?: Array<string>
}

export async function query({ query, variables, tags }: Query) {
  const data = await fetch("https://gql.hashnode.com", {
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
      revalidate: 300,
    },
  }).then((r) => r.json())
  return data
}
