import { Fragment } from "react"
import { Disclosure, DisclosurePanel, DisclosureButton } from "@headlessui/react"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
}

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-slate-200 overflow-hidden"
        >
          <Disclosure defaultOpen={index === 0}>
            {({ open }) => (
              <>
                <DisclosureButton className="flex w-full items-center justify-between px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500">
                  <span className="font-semibold text-slate-800 pr-4">
                    {item.question}
                  </span>
                  <ChevronDownIcon
                    className={cn(
                      "h-5 w-5 text-ocean-600 flex-shrink-0 transition-transform duration-200",
                      open && "rotate-180"
                    )}
                  />
                </DisclosureButton>
                <DisclosurePanel className="px-5 pb-4 text-slate-600 leading-relaxed">
                  {item.answer}
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        </div>
      ))}
    </div>
  )
}