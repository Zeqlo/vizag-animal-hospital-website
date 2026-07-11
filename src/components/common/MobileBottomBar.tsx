import { Phone, Calendar, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { clinicInfo } from "@/data/clinicInfo"

const whatsappUrl = `https://wa.me/${clinicInfo.whatsapp.replace(/\D/g, "")}`

export function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-slate-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] px-2 pt-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:hidden">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={`tel:${clinicInfo.phone.replace(/\s/g, "")}`}
          className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl active:bg-slate-100 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-ocean-50 flex items-center justify-center text-ocean-700">
            <Phone className="h-5 w-5" />
          </div>
          <span className="text-[11px] font-semibold text-slate-700">Call</span>
        </a>

        <Link
          to="/book-appointment"
          className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl bg-coral-500 text-white shadow-md active:bg-coral-600 transition-colors"
        >
          <Calendar className="h-5 w-5" />
          <span className="text-[11px] font-semibold">Book Now</span>
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl active:bg-slate-100 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-700">
            <MessageCircle className="h-5 w-5" />
          </div>
          <span className="text-[11px] font-semibold text-slate-700">WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
