"use client"

interface SchemaProps {
  schema: Record<string, any>
}

export function SchemaMarkup({ schema }: SchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}

export function MultipleSchemaMarkup({ schemas }: { schemas: Record<string, any>[] }) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  )
}
