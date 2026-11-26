import { useEffect, useState } from 'react';
import { Check, Copy, ExternalLink, X } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export function VenueMapSection() {
  const [showFullMapModal, setShowFullMapModal] = useState(false);
  const [mapImageError, setMapImageError] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);

  useEffect(() => {
    if (!showFullMapModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowFullMapModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFullMapModal]);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(
        `${WEDDING_DATA.venue.address} ${WEDDING_DATA.venue.fullName}`
      );
      setAddressCopied(true);
      setTimeout(() => setAddressCopied(false), 2000);
    } catch {
      setAddressCopied(false);
    }
  };

  return (
    <section
      id="map"
      className="py-12 md:py-16 px-6 max-w-3xl mx-auto border-b border-stone-200/80"
      aria-labelledby="map-heading"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2
          id="map-heading"
          className="font-editorial text-lg md:text-xl font-medium text-zinc-900 mb-3 tracking-wide"
        >
          오시는 길
        </h2>
        <p className="text-[15px] font-medium text-zinc-900 mb-1">
          {WEDDING_DATA.venue.fullName}
        </p>
        <p className="text-sm text-stone-600 mb-4">
          {WEDDING_DATA.venue.address}
        </p>

        <button
          type="button"
          onClick={() => void handleCopyAddress()}
          className="min-h-[40px] px-3.5 py-1.5 border border-stone-300 rounded text-xs text-zinc-700 hover:bg-stone-100 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          {addressCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
              <span className="text-emerald-700">주소 복사됨</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-stone-500" aria-hidden="true" />
              <span>주소 복사</span>
            </>
          )}
        </button>
      </div>

      {/* Venue Map Image (Click to open Kakao/Naver Navigation) */}
      <div className="mb-7">
        <div className="border border-stone-200/80 bg-[#F7F3ED] overflow-hidden">
          <div className="relative w-full">
            {!mapImageError ? (
              <img
                src={WEDDING_DATA.venue.mapImage}
                alt="밀리토피아호텔 웨딩센터 약도 및 남위례역 확대도"
                referrerPolicy="no-referrer"
                onError={() => setMapImageError(true)}
                className="w-full h-auto block object-contain"
              />
            ) : (
              <div className="py-20 px-6 text-center text-sm text-stone-600">
                {WEDDING_DATA.venue.fullName} · {WEDDING_DATA.venue.address}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <button
            type="button"
            onClick={() => setShowFullMapModal(true)}
            className="col-span-2 min-h-[44px] px-4 py-2.5 border border-stone-300 bg-white text-sm font-medium text-zinc-800 hover:bg-stone-50 cursor-pointer"
          >
            약도 크게 보기
          </button>
          <a
            href={WEDDING_DATA.venue.kakaoMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-2 py-2.5 border border-stone-300 bg-white text-xs md:text-sm font-medium text-zinc-800 hover:bg-stone-50 inline-flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>카카오맵 길찾기</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" aria-hidden="true" />
          </a>
          <a
            href={WEDDING_DATA.venue.naverMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-2 py-2.5 border border-stone-300 bg-white text-xs md:text-sm font-medium text-zinc-800 hover:bg-stone-50 inline-flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>네이버 지도 길찾기</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Exact Verbatim Transit Instructions */}
      <div className="divide-y divide-stone-200/80 border-t border-stone-200/80">
        {WEDDING_DATA.transitSections.map((section) => (
          <div key={section.title} className="py-3.5">
            <h3 className="text-sm font-semibold text-zinc-900 mb-3">
              {section.title}
            </h3>

            <div className="space-y-2.5">
              {section.groups.map((group, idx) => (
                <div key={group.label ?? idx}>
                  {group.label && (
                    <p className="text-sm font-medium text-zinc-800 mb-1">
                      {group.label}
                    </p>
                  )}
                  <ul className="space-y-1 text-sm text-zinc-700 leading-relaxed">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-stone-400 select-none" aria-hidden="true">
                          ·
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {section.footerNote && (
              <div className="mt-3 pt-3 border-t border-stone-100 text-xs md:text-sm text-stone-600 space-y-0.5">
                {section.footerNote.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fullscreen Map Modal */}
      {showFullMapModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="약도 크게 보기"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowFullMapModal(false)}
        >
          <button
            type="button"
            onClick={() => setShowFullMapModal(false)}
            aria-label="약도 닫기"
            className="absolute top-4 right-4 min-h-[44px] min-w-[44px] rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
          <img
            src={WEDDING_DATA.venue.mapImage}
            alt="밀리토피아호텔 웨딩센터 약도 및 남위례역 확대도"
            referrerPolicy="no-referrer"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90dvh] max-w-full bg-[#F7F3ED] object-contain"
          />
        </div>
      )}
    </section>
  );
}
