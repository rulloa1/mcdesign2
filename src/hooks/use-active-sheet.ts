import { useEffect, useState } from "react";

export type ActiveSheet = { number: string; title: string };

const fallback: ActiveSheet = { number: "G-001", title: "Cover" };

export function useActiveSheet() {
  const [active, setActive] = useState<ActiveSheet>(fallback);
  const [coverGone, setCoverGone] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-sheet-number]"));
    const cover = document.getElementById("cover");
    const contact = document.getElementById("contact");
    if (!sections.length) return;

    const middleObserver = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting)?.target as
          HTMLElement | undefined;
        if (!current) return;
        setActive({
          number: current.dataset["sheetNumber"] ?? fallback.number,
          title: current.dataset["sheetTitle"] ?? fallback.title,
        });
      },
      { rootMargin: "-49.9% 0px -49.9% 0px", threshold: 0 },
    );
    sections.forEach((section) => middleObserver.observe(section));

    const positionObserver = new IntersectionObserver(() => {
      if (cover) setCoverGone(cover.getBoundingClientRect().bottom <= 0);
    });
    if (cover) positionObserver.observe(cover);

    const contactObserver = new IntersectionObserver(
      ([entry]) => setContactVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.05 },
    );
    if (contact) contactObserver.observe(contact);

    return () => {
      middleObserver.disconnect();
      positionObserver.disconnect();
      contactObserver.disconnect();
    };
  }, []);

  return { active, coverGone, contactVisible };
}
