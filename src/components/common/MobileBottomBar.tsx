import { Phone, Calendar, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { clinicInfo } from "@/data/clinicInfo"

const whatsappUrl = `https://wa.me/${clinicInfo.whatsapp.replace(/\D/g, "")}`

export function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] px-4 py-2 sm:hidden">
      <div className="flex items-center justify-between">
        <a
          href={`tel:${clinicInfo.phone.replace(/\s/g, "")}`}
          className="flex flex-col items-center justify-center gap-0.5 w-[30%] text-ocean-700 active:text-ocean-800 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-ocean-50 flex items-center justify-center">
            <Phone className="h-5 w-5" />
          </div>
          <span className="text-[11px] font-medium">Call</span>
        </a>

        <Link
          to="/book-appointment"
          className="relative -top-5 flex flex-col items-center justify-center w-[40%]"
        >
          <div className="w-14 h-14 rounded-full bg-coral-500 text-white shadow-lg shadow-coral-500/30 flex items-center justify-center active:scale-95 transition-transform">
            <Calendar className="h-6 w-6" />
          </div>
          <span className="text-[11px] font-semibold text-slate-700 mt-1">Book Now</span>
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 w-[30%] text-green-600 active:text-green-700 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
            <MessageCircle className="h-5 w-5" />
          </div>
          <span className="text-[11px] font-medium">WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
