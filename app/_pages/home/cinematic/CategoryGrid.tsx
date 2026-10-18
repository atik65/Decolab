"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useGetCategories } from "@/hooks/tanstack/useProducts";
import { CategoresResponse } from "@/app/_pages/home/HomeCategories";
import SmartImage from "./SmartImage";
import { useReveal } from "./useReveal";
import { copy, fallbackCategories, fallbackImages, Locale } from "./content";

interface Item {
  id: number;
  name: string;
  name_ar: string;
  image?: string;
}

const AUTOPLAY_MS = 4600;
const SPIN_S = 2.1; // seconds per quarter-turn
const MIN_CARDS = 8; // a full ring needs enough faces to read as a cylinder

/** wrap an angle into (-180, 180] */
const wrap = (a: number) => {
  const m = (((a + 180) % 360) + 360) % 360;
  return m - 180;
};
const mod = (v: number, m: number) => ((v % m) + m) % m;

const CategoryGrid = ({ locale }: { locale: Locale }) => {
  const t = copy[locale];
  const dir = locale === "ar" ? -1 : 1;
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const { data, isLoading, isError } = useGetCategories<CategoresResponse>();

  const items: Item[] = data?.results?.length
    ? data.results
    : isError || (!isLoading && !data?.results?.length)
      ? fallbackCategories
      : [];
  const ready = !isLoading;
  const n = items.length;

  /* repeat the categories until the ring is full */
  const faces = useMemo(() => {
    if (!n) return [];
    const reps = Math.ceil(MIN_CARDS / n);
    return Array.from({ length: n * reps }, (_, i) => ({
      item: items[i % n],
      i,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, data]);
  const total = faces.length;
  const step = total ? 360 / total : 45;
  const rk = total ? (0.5 / Math.tan(Math.PI / total)) * 1.4 : 1.3;

  const [k, setK] = useState(0); // index of the card facing the viewer
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduce, setReduce] = useState(false);
  const rot = useRef({ v: 0 }); // physical ring angle in degrees
  const kRef = useRef(0);
  const drag = useRef({
    id: -1,
    x: 0,
    start: 0,
    moved: false,
    lastX: 0,
    lastT: 0,
    vel: 0,
  });

  useReveal(root, [ready, n]);

  /* dim / hide cards by how far they face away */
  const paint = useCallback(() => {
    const el = ring.current;
    if (!el) return;
    gsap.set(el, { rotationY: rot.current.v });
    let best = 0;
    let bestA = 999;
    Array.from(el.children).forEach((c, i) => {
      const a = Math.abs(wrap(dir * i * step + rot.current.v));
      const card = c as HTMLElement;
      card.style.setProperty("--a", String(a / 180));
      card.dataset.back = String(a > 100);
      if (a < bestA) {
        bestA = a;
        best = i;
      }
    });
    Array.from(el.children).forEach((c, i) => {
      (c as HTMLElement).dataset.front = String(
        i === best && bestA < step / 2 + 1,
      );
    });
  }, [dir, step]);

  const spinTo = useCallback(
    (nextK: number, opts?: { duration?: number; ease?: string }) => {
      kRef.current = nextK;
      setK(mod(nextK, total || 1));
      gsap.killTweensOf(rot.current);
      const target = -dir * nextK * step;
      if (reduce) {
        rot.current.v = target;
        paint();
        return;
      }
      gsap.to(rot.current, {
        v: target,
        duration: opts?.duration ?? SPIN_S,
        ease: opts?.ease ?? "power3.inOut",
        onUpdate: paint,
      });
    },
    [dir, step, total, paint, reduce],
  );

  const next = useCallback(() => spinTo(kRef.current + 1), [spinTo]);
  const prev = useCallback(() => spinTo(kRef.current - 1), [spinTo]);

  /* rotate to the nearest face that shows category j */
  const goCategory = (j: number) => {
    let best = 0;
    for (let d = -Math.floor(total / 2); d <= Math.floor(total / 2); d++) {
      if (
        mod(kRef.current + d, n) === j &&
        (best === 0 || Math.abs(d) < Math.abs(best))
      )
        best = d;
    }
    if (best !== 0) spinTo(kRef.current + best);
  };

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  /* initial paint + keep angles right when the ring geometry changes */
  useEffect(() => {
    if (!ready) return;
    rot.current.v = -dir * kRef.current * step;
    paint();
  }, [ready, dir, step, paint]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ready]);

  useEffect(() => {
    const tween = rot.current;
    return () => void gsap.killTweensOf(tween);
  }, []);

  /* autoplay; re-arms after every move */
  useEffect(() => {
    if (!ready || total < 2 || paused || !inView || reduce) return;
    const id = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [k, ready, total, paused, inView, reduce, next]);

  /* ───────── drag with inertia ───────── */
  const pxToDeg = () => {
    const w =
      stage.current?.querySelector<HTMLElement>(".cn-ring3d-card")
        ?.offsetWidth ?? 280;
    return step / (w * 0.9);
  };
  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = {
      id: e.pointerId,
      x: e.clientX,
      start: rot.current.v,
      moved: false,
      lastX: e.clientX,
      lastT: e.timeStamp,
      vel: 0,
    };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      setPaused(true);
      gsap.killTweensOf(rot.current);
      stage.current?.setPointerCapture(e.pointerId);
    }
    if (!d.moved) return;
    rot.current.v = d.start + dx * pxToDeg();
    const dt = Math.max(1, e.timeStamp - d.lastT);
    d.vel = d.vel * 0.6 + (((e.clientX - d.lastX) * pxToDeg()) / dt) * 0.4; // deg per ms
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
    paint();
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    if (d.id !== e.pointerId) return;
    d.id = -1;
    if (d.moved) {
      const projected = rot.current.v + d.vel * 260; // coast a little, then settle on a face
      spinTo(Math.round((-dir * projected) / step), {
        duration: 1.6,
        ease: "power3.out",
      });
      setPaused(false);
    }
    window.setTimeout(() => (d.moved = false), 0);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") (dir === 1 ? next : prev)();
    if (e.key === "ArrowLeft") (dir === 1 ? prev : next)();
  };

  const activeCat = n ? mod(k, n) : 0;

  return (
    <section ref={root} className="cn-section cn-paper cn-ring-section" id="categories">
      <div
        className="cn-ring3d cn-rv"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={onKey}
        style={{ ["--rk" as string]: rk }}
      >
        <div
          ref={stage}
          className="cn-ring3d-stage"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="cn-ring3d-ring">
            <div ref={ring} className="cn-ring3d-rot">
              {!ready
                ? Array.from({ length: MIN_CARDS }).map((_, i) => (
                    <div
                      key={i}
                      className="cn-ring3d-card cn-skel"
                      style={{
                        transform: `rotateY(${dir * i * 45}deg) translateZ(var(--R))`,
                      }}
                    />
                  ))
                : faces.map(({ item: c, i }) => {
                    const name =
                      locale === "ar" && c.name_ar ? c.name_ar : c.name;
                    return (
                      <Link
                        key={`${c.id}-${i}`}
                        href={`/shop?category=${encodeURIComponent(c.name)}`}
                        className="cn-ring3d-card"
                        aria-label={name}
                        draggable={false}
                        tabIndex={mod(i - k, total) === 0 ? 0 : -1}
                        onClick={(e) => {
                          /* a drag never navigates; a side card spins to the front first */
                          const front =
                            mod(i, total) === mod(kRef.current, total);
                          if (drag.current.moved || !front) {
                            e.preventDefault();
                            if (!drag.current.moved) {
                              let d = mod(i - kRef.current, total);
                              if (d > total / 2) d -= total;
                              spinTo(kRef.current + d);
                            }
                          }
                        }}
                        style={{
                          transform: `rotateY(${dir * i * step}deg) translateZ(var(--R))`,
                        }}
                      >
                        <span className="cn-ring3d-media">
                          <SmartImage
                            src={c.image}
                            fallback={fallbackImages[i % fallbackImages.length]}
                            alt={name}
                            sizes="(max-width: 860px) 60vw, 300px"
                          />
                        </span>
                        <span className="cn-ring3d-idx f-logo">
                          {String((i % n) + 1).padStart(2, "0")}
                        </span>
                        <span className="cn-ring3d-foot">
                          <span className="cn-ring3d-name f-display">
                            {name}
                          </span>
                          <span className="cn-ring3d-go">
                            <span className="cn-ring3d-explore">
                              {t.explore}
                            </span>
                            <span className="cn-cat-arrow">
                              <ArrowUpRight size={18} />
                            </span>
                          </span>
                        </span>
                        <span className="cn-ring3d-veil" />
                      </Link>
                    );
                  })}
            </div>
          </div>
        </div>

        {ready && n > 1 && (
          <div className="cn-ring-ctrl">
            <button
              type="button"
              className="cn-ring-btn"
              onClick={prev}
              aria-label="Previous"
            >
              {dir === -1 ? (
                <ChevronRight size={18} />
              ) : (
                <ChevronLeft size={18} />
              )}
            </button>
            <div className="cn-ring-dots">
              {items.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  aria-label={locale === "ar" && c.name_ar ? c.name_ar : c.name}
                  aria-current={i === activeCat}
                  className="cn-ring-dot"
                  data-on={i === activeCat}
                  onClick={() => goCategory(i)}
                >
                  <i>
                    <b
                      key={`${k}-${paused}-${inView}`}
                      style={
                        i === activeCat && !reduce && !paused && inView
                          ? {
                              animation: `cn-dotfill ${AUTOPLAY_MS + SPIN_S * 1000}ms linear forwards`,
                            }
                          : undefined
                      }
                    />
                  </i>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="cn-ring-btn"
              onClick={next}
              aria-label="Next"
            >
              {dir === -1 ? (
                <ChevronLeft size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryGrid;
