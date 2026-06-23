import { motion } from "framer-motion"
import { Users } from "lucide-react"
import type { TeamMember } from "@/data/team"
import { Badge } from "@/components/ui/Badge"

interface TeamMemberCardProps {
  member: TeamMember
  index?: number
}

export function TeamMemberCard({ member, index = 0 }: TeamMemberCardProps) {
  const isComingSoon = member.name === "Coming Soon"

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 group"
    >
      <div className="relative overflow-hidden aspect-square">
        {isComingSoon ? (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <Users className="h-16 w-16 text-slate-400" />
          </div>
        ) : (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Badge variant={member.role === "veterinarian" ? "ocean" : "slate"}>
            {member.role === "veterinarian" ? "Veterinarian" : "Support Staff"}
          </Badge>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-heading font-bold text-lg text-slate-900">{member.name}</h3>
        {member.qualifications && (
          <p className="text-sm text-ocean-700 font-medium mb-1">{member.qualifications}</p>
        )}
        <p className="text-sm text-coral-600 font-semibold mb-2">{member.specialization}</p>
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{member.bio}</p>
        {!isComingSoon && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
            <span className="text-slate-500">{member.experience} years experience</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}