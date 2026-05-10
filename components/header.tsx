import ThemeSwitch from "./themeSwitch";
import { useRouter } from "next/router";
import Link from "next/link";
import { useRef, useState } from "react";

const navItems = [
  {
    label: "about",
    href: "/",
  },
  {
    label: "writing",
    href: "/writing",
  },
  {
    label: "design",
    href: "/design",
  },
];

const Header = () => {
  const router = useRouter();
  const navRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [pillStyle, setPillStyle] = useState({ left: 0, opacity: 0, width: 0 });

  const activeHref =
    navItems.find((item) =>
      item.href === "/"
        ? router.pathname === "/"
        : router.pathname.startsWith(item.href)
    )?.href ?? "/";

  function movePillTo(href: string) {
    const nav = navRef.current;
    const link = linkRefs.current[href];
    if (!nav || !link) {
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    setPillStyle({
      left: linkRect.left - navRect.left,
      opacity: 0.35,
      width: linkRect.width,
    });
  }

  function hidePill() {
    setPillStyle((style) => ({ ...style, opacity: 0 }));
  }

  return (
    <div className="w-full flex flex-col justify-center px-8">
      <nav className="flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16 ">
        <div
          ref={navRef}
          onMouseLeave={hidePill}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              hidePill();
            }
          }}
          className="relative ml-[-0.60rem] flex items-center gap-1"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 bg-[#dad3c1] transition-all duration-300 dark:bg-[#00444e]"
            style={{
              opacity: pillStyle.opacity,
              transform: `translateX(${pillStyle.left}px)`,
              width: pillStyle.width,
            }}
          />
          {navItems.map((item) => {
            const isActive = item.href === activeHref;

            return (
              <Link
                href={item.href}
                key={item.href}
                ref={(element) => {
                  linkRefs.current[item.href] = element;
                }}
                onMouseEnter={() => movePillTo(item.href)}
                onFocus={() => movePillTo(item.href)}
                className={
                  "relative z-10 inline-block px-2 py-1 text-sm transition-colors sm:px-3 sm:py-2 sm:text-base " +
                  (isActive
                    ? "text-black dark:text-white"
                    : "text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <ThemeSwitch />
      </nav>
    </div>
  );
};

export default Header;
