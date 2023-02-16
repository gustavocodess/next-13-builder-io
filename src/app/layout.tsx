export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
      <script async src="https://cdn.builder.io/js/webcomponents"></script>
    </html>
  )
}
