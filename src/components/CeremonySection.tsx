import { downloadWeddingIcs, WEDDING_DATA } from '../data/weddingData';

interface CeremonySectionProps {
  onOpenSlideshow: (index: number) => void;
}

export function CeremonySection({ onOpenSlideshow }: CeremonySectionProps) {
  // April 2027 starts on Thursday (Sun=0, Mon=1, Tue=2, Wed=3, Thu=4)
  const aprilDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const leadingBlanks = 4;
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const galleryPhotos = WEDDING_DATA.photos.slice(1);

  return (
    <section
      id="ceremony"
      className="py-20 md:py-28 px-6 max-w-3xl mx-auto border-b border-stone-200/80"
      aria-labelledby="ceremony-heading"
    >
      {/* Greeting */}
      <div className="text-center max-w-md mx-auto mb-16">
        <h2
          id="ceremony-heading"
          className="font-editorial text-lg md:text-xl font-medium text-zinc-900 mb-8 tracking-wide"
        >
          모시는 글
        </h2>

        <div className="font-editorial text-[15px] text-zinc-700 leading-[2.05] space-y-0.5">
          {WEDDING_DATA.greeting.map((line, idx) =>
            line === '' ? (
              <div key={idx} className="h-4" aria-hidden="true" />
            ) : (
              <p key={idx}>{line}</p>
            )
          )}
        </div>

        <div className="mt-10 pt-8 border-t border-stone-200/80 space-y-2 text-[14px] text-zinc-800">
          <p>
            <span className="font-medium text-zinc-900">
              {WEDDING_DATA.groom.father} · {WEDDING_DATA.groom.mother}
            </span>
            <span className="text-stone-500 mx-1.5">의 {WEDDING_DATA.groom.order}</span>
            <span className="font-editorial font-medium text-zinc-900">
              {WEDDING_DATA.groom.firstName}
            </span>
          </p>
          <p>
            <span className="font-medium text-zinc-900">
              {WEDDING_DATA.bride.father} · {WEDDING_DATA.bride.mother}
            </span>
            <span className="text-stone-500 mx-1.5">의 {WEDDING_DATA.bride.order}</span>
            <span className="font-editorial font-medium text-zinc-900">
              {WEDDING_DATA.bride.firstName}
            </span>
          </p>
        </div>
      </div>

      {/* Unboxed Calm Monochrome Photo Strip */}
      <div className="mb-16 -mx-6">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-6 pb-3 overscroll-x-contain [scrollbar-width:thin]">
          {galleryPhotos.map((photo, idx) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => onOpenSlideshow(idx + 1)}
              aria-label={`${photo.alt} 크게 보기`}
              className="group relative aspect-[4/5] w-[72vw] max-w-[280px] flex-none snap-center overflow-hidden rounded-sm bg-stone-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover scale-[1.06] grayscale-[10%] transition-transform duration-500 group-hover:scale-[1.1]"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Unboxed April 2027 Typographic Calendar */}
      <div className="max-w-sm mx-auto py-10 border-t border-stone-200/80 text-center">
        <p className="font-editorial text-base font-medium text-zinc-900 mb-1">
          {WEDDING_DATA.date.displayFull}
        </p>
        <p className="text-xs text-stone-500 mb-8">
          {WEDDING_DATA.venue.fullName}
        </p>

        <div className="mb-6">
          <p className="font-handwriting text-3xl text-stone-700 mb-4 tracking-wide">
            2027. 04
          </p>
          <div className="grid grid-cols-7 text-center text-xs text-stone-400 mb-2.5">
            {weekdays.map((day, idx) => (
              <span key={day} className={idx === 0 ? 'text-rose-500/75' : undefined}>
                {day}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-2 text-center text-lg font-handwriting">
            {Array.from({ length: leadingBlanks }).map((_, i) => (
              <span key={`blank-${i}`} />
            ))}
            {aprilDays.map((day) => {
              const isWeddingDay = day === WEDDING_DATA.date.day;
              const colIndex = (leadingBlanks + day - 1) % 7;
              const isSunday = colIndex === 0;
              return (
                <div key={day} className="flex items-center justify-center">
                  <span
                    className={
                      isWeddingDay
                        ? 'w-9 h-9 rounded-full bg-rose-100 text-rose-900 ring-1 ring-rose-300 font-medium flex items-center justify-center'
                        : isSunday
                          ? 'text-rose-500/75'
                          : 'text-zinc-700'
                    }
                  >
                    {day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={downloadWeddingIcs}
          className="min-h-[44px] px-4 py-2 text-xs text-zinc-700 underline underline-offset-4 hover:text-zinc-950 transition-colors cursor-pointer"
        >
          캘린더에 일정 저장하기
        </button>
      </div>
    </section>
  );
}
