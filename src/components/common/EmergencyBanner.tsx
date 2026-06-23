import { Phone, Siren } from "lucide-react"
import { clinicInfo } from "@/data/clinicInfo"

export function EmergencyBanner() {
  return (
    <div className="bg-gradient-to-r from-coral-600 to-coral-500 py-3 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
        <div className="flex items-center gap-2">
          <Siren className="h-5 w-5 text-white animate-pulse" />
          <span className="text-white font-semibold text-sm sm:text-base">
            24/7 Emergency: Online Consultation Only
          </span>
        </div>
        <a
          href={`tel:${clinicInfo.phone}`}
          className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-bold text-sm hover:bg-white/30 transition-colors"
        >
          <Phone className="h-4 w-4" />
          {clinicInfo.phone}
        </a>
      </div>
    </div>
  )
}