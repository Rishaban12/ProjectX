import { useCallback, useEffect, useMemo, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { CircleUser } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface TestimonialItem {
  id: string
  text: string
  name: string
  role: string
  avatar?: {
    src: string
    alt: string
  }
}

export interface Testimonial1Props {
  badge?: {
    label: string
    variant?: 'default' | 'secondary' | 'outline'
  }
  heading?: string
  description?: string
  testimonials: TestimonialItem[]
  autoplay?: boolean
  autoplayDelay?: number
  className?: string
}

export function Testimonial1({
  badge,
  heading,
  description,
  testimonials,
  autoplay = true,
  autoplayDelay = 5000,
  className,
}: Testimonial1Props) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const plugins = useMemo(
    () => (autoplay ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: true })] : []),
    [autoplay, autoplayDelay],
  )
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, plugins)

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index)
    },
    [emblaApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className={cn('w-full py-4 md:py-6', className)}>
      <div className="mx-auto w-full px-4 md:px-6">
        {(badge || heading || description) && (
          <div className="mx-auto mb-16 max-w-3xl text-center">
            {badge && (
              <div className="mb-5 flex justify-center">
                <Badge variant={badge.variant ?? 'default'}>{badge.label}</Badge>
              </div>
            )}
            {heading && (
              <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl lg:text-5xl">{heading}</h2>
            )}
            {description && <p className="mt-4 text-base text-muted-foreground md:text-lg">{description}</p>}
          </div>
        )}

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="min-w-0 flex-[0_0_100%] px-4">
                <div className="flex flex-col items-center text-center">
                  <p className="mb-8 max-w-4xl text-lg font-normal text-ink md:px-8 lg:text-2xl">
                    “{testimonial.text}”
                  </p>
                  {testimonial.avatar?.src ? (
                    <div className="relative size-24 overflow-hidden rounded-full">
                      <img
                        className="absolute inset-0 size-full object-cover"
                        src={testimonial.avatar.src}
                        alt={testimonial.avatar.alt ?? testimonial.name}
                      />
                    </div>
                  ) : (
                    <span className="flex size-24 items-center justify-center rounded-full border border-line text-yellow">
                      <CircleUser className="h-10 w-10" />
                    </span>
                  )}
                  <p className="mt-4 text-sm font-medium text-ink md:text-lg">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground md:text-base">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {testimonials.length > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            {testimonials.map((testimonial, index) => (
              <Button
                key={testimonial.id}
                variant="ghost"
                size="sm"
                onClick={() => scrollTo(index)}
                className="p-2"
                aria-label={`Show testimonial ${index + 1}`}
              >
                <div
                  className={cn(
                    'size-2 rounded-full transition-colors',
                    index === selectedIndex ? 'bg-primary' : 'bg-muted-foreground/40',
                  )}
                />
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Testimonial1
