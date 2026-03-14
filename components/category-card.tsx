import Link from "next/link"

interface CategoryCardProps {
  category: {
    id: number
    name: string
    image: string
  }
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/shop?category=${category.id}`}>
      <div className="group cursor-pointer">
        <div className="relative overflow-hidden rounded-xl mb-4 h-32 md:h-40 bg-secondary/30 hover:bg-secondary/50 transition-colors">
          <img
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h3 className="text-center font-semibold text-foreground group-hover:text-primary transition-colors">
          {category.name}
        </h3>
      </div>
    </Link>
  )
}
