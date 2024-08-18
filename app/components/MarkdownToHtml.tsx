import { Post } from "types/posts"
import "highlight.js/styles/monokai.css"

interface Props {
  post: Post
}

const MarkdownToHtml = ({ post }: Props) => {
  return (
    <div
      className="hashnode-content-style"
      dangerouslySetInnerHTML={{
        __html: post.content.html,
      }}
    />
  )
}

export default MarkdownToHtml
