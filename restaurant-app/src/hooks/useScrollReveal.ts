import { useEffect, useRef } from "react"

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let revealed = false

    const reveal = () => {
      if (revealed) return
      revealed = true
      el.classList.add("is-visible")
      observer.unobserve(el)
      window.removeEventListener("scroll", onScroll)
    }

    const isInView = () => {
      const rect = el.getBoundingClientRect()
      return rect.top < window.innerHeight && rect.bottom > 0
    }

    // Primary: IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal()
      },
      { threshold: 0.05, ...options }
    )
    observer.observe(el)

    // Backup: scroll event listener for environments where
    // IntersectionObserver is unreliable (e.g. nested iframes)
    const onScroll = () => {
      if (isInView()) reveal()
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    // Reveal immediately if already in the viewport on mount
    if (isInView()) reveal()

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return ref
}
