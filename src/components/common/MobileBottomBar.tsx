import { Phone, Calendar, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { clinicInfo } from "@/data/clinicInfo"

const whatsappUrl = `https://wa.me/${clinicInfo.whatsapp.replace(/\D/g, "")}`

export function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-2.5 sm:hidden">
      <div className="flex items-center gap-2">
        <a
          href={`tel:${clinicInfo.phone.replace(/\s/g, "")}`}
          className="flex-1 flex items-center justify-center gap-1.5 bg-ocean-700 text-white rounded-xl py-3 text-sm font-semibold active:scale-95 transition-all"
        >
          <Phone className="h-4 w-4" />
          Call
        </a>

        <Link
          to="/book-appointment"
          className="flex-[1.4] flex items-center justify-center gap-1.5 bg-coral-500 text-white rounded-xl py-3 text-sm font-semibold active:scale-95 transition-all shadow-md"
        >
          <Calendar className="h-4 w-4" />
          Book Now
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 bg-green-500 text-white rounded-xl py-3 text-sm font-semibold active:scale-95 transition-all"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  )
}
