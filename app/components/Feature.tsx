export function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 bg-white shadow-xl rounded-xl border border-gray-200 hover:shadow-lg transition">
      <h3 className="text-xl text-black font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  )
}