interface Event {
  id: number
  title: string
  description: string
  is_team_event: boolean
  has_entry_fee: boolean
  entry_fee?: number
  event_date: string
  registration_deadline: string
}

interface EventCardProps {
  event: Event
}

const cardColors = [
  "bg-blue-500 text-white",
  "bg-purple-500 text-white",
  "bg-pink-500 text-white",
  "bg-green-500 text-white",
  "bg-yellow-400 text-gray-900",
]

export function EventCard({ event }: EventCardProps) {
  const isRegistrationOpen = new Date(event.registration_deadline) > new Date()
  const colorIndex = event.id % cardColors.length
  const cardColorClass = cardColors[colorIndex]

  return (
    <div
      className={`${cardColorClass} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer group`}
    >
      <div className="flex justify-between items-start gap-6 mb-8">
        <div className="flex-1 min-w-0">
          <h3 className="text-3xl md:text-4xl font-bold mb-3 group-hover:underline transition line-clamp-2">
            {event.title}
          </h3>
          <p className="opacity-95 leading-relaxed line-clamp-2">{event.description}</p>
        </div>
        <div className="flex-shrink-0">
          {isRegistrationOpen ? (
            <span className="inline-block px-4 py-2 bg-white text-purple-600 text-sm font-bold uppercase tracking-wide rounded-lg shadow-md">
              Open
            </span>
          ) : (
            <span className="inline-block px-4 py-2 bg-white/30 backdrop-blur text-white text-sm font-bold uppercase tracking-wide rounded-lg">
              Closed
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/30 pt-8">
        <div>
          <div className="text-xs opacity-75 mb-2 uppercase tracking-wider font-semibold">Type</div>
          <div className="text-lg font-bold">{event.is_team_event ? "Team" : "Individual"}</div>
        </div>
        <div>
          <div className="text-xs opacity-75 mb-2 uppercase tracking-wider font-semibold">Fee</div>
          <div className="text-lg font-bold">{event.has_entry_fee ? `$${event.entry_fee}` : "Free"}</div>
        </div>
        <div>
          <div className="text-xs opacity-75 mb-2 uppercase tracking-wider font-semibold">Event Date</div>
          <div className="text-lg font-bold">{new Date(event.event_date).toLocaleDateString()}</div>
        </div>
        <div>
          <div className="text-xs opacity-75 mb-2 uppercase tracking-wider font-semibold">Register By</div>
          <div className="text-lg font-bold">{new Date(event.registration_deadline).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  )
}
