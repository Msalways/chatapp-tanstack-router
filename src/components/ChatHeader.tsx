interface ChatHeaderProps {
  title: string
  subtitle?: string
}

export default function ChatHeader({ title, subtitle }: ChatHeaderProps) {
  return (
    <header className="p-4 border-b border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </header>
  )
}
