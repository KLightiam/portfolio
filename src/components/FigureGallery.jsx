import { useRef, useState } from 'react';
import { X } from 'lucide-react';

export default function FigureGallery({ figures, title }) {
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(null);

  const show = (fig) => {
    setOpen(fig);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <ul className="flex gap-3 overflow-x-auto pb-1">
        {figures.map((fig) => (
          <li key={fig.src} className="shrink-0">
            <button
              type="button"
              onClick={() => show(fig)}
              className="group block w-44 text-left cursor-zoom-in"
              aria-label={`Enlarge figure: ${fig.caption}`}
            >
              <span className="block h-28 rounded-md border border-rule bg-white overflow-hidden">
                <img
                  src={fig.src}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-contain p-1.5 transition-transform duration-200 group-hover:scale-[1.04]"
                />
              </span>
              <span className="block mt-1.5 text-xs text-slate leading-snug line-clamp-2">{fig.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
        className="m-auto w-[min(64rem,calc(100vw-2rem))] max-h-[calc(100vh-2rem)] rounded-xl bg-white p-0 shadow-2xl"
        aria-label={open ? `${title}: ${open.caption}` : title}
      >
        {open && (
          <figure className="p-4 sm:p-6">
            <div className="flex justify-between items-start gap-4 mb-3">
              <figcaption className="text-sm text-slate">
                <span className="font-semibold text-ink">{title}.</span> {open.caption}
              </figcaption>
              <button
                type="button"
                onClick={() => dialogRef.current.close()}
                className="shrink-0 p-1.5 -m-1.5 rounded-md text-slate hover:text-ink hover:bg-faint"
                aria-label="Close figure"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img src={open.src} alt={open.caption} className="w-full h-auto max-h-[75vh] object-contain" />
          </figure>
        )}
      </dialog>
    </>
  );
}
