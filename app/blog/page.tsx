import { Suspense } from "react"
import BlogContent from "@/components/blog-content"

export default function BlogPage() {
  return (
    <Suspense fallback={null}>
      <BlogContent />
    </Suspense>
  )
}
