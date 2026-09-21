import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Button } from "@/components/ui/button";
import { DEFAULT_SHARE_IMAGE } from "@/lib/seo";

function NotFoundComponent() {
  return (
    <main id="main" tabIndex={-1} className="sheet-grid flex min-h-dvh items-center justify-center bg-cyanotype px-4 text-chalk">
      <div className="max-w-md border border-rule-on-dark p-8 text-center">
        <p className="label text-blueline-on-dark">G-404</p>
        <h1 className="display mt-5 text-5xl">Sheet not found</h1>
        <p className="mt-4 text-chalk-muted">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="draw-link label text-chalk"
          >
            Back to the cover →
          </Link>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <main id="main" tabIndex={-1} className="flex min-h-dvh items-center justify-center bg-mylar px-4">
      <div className="max-w-md text-center">
        <h1 className="display text-4xl text-ink">
          This page didn't load
        </h1>
        <p className="mt-3 text-graphite">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-none bg-redline text-paper-white shadow-none hover:bg-redline-press"
          >
            Try again
          </Button>
          <a
            href="/"
            className="label inline-flex min-h-11 items-center justify-center border border-blueline px-4 text-ink hover:text-blueline"
          >
            Go home
          </a>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Michael Chandler — Construction Executive & Owner's Representative | McDesign" },
      {
        name: "description",
        content:
          "Portfolio of Michael Chandler: $500M+ of ultra-luxury residential, resort, and civil work across six regions, as builder, project manager, and owner's representative.",
      },
      { name: "author", content: "Michael Chandler" },
      { property: "og:title", content: "Michael Chandler — Construction Executive & Owner's Representative | McDesign" },
      {
        property: "og:description",
        content:
          "Portfolio of Michael Chandler: $500M+ of ultra-luxury residential, resort, and civil work across six regions, as builder, project manager, and owner's representative.",
      },
      { property: "og:site_name", content: "McDesign" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: DEFAULT_SHARE_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: DEFAULT_SHARE_IMAGE },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=IBM+Plex+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js-motion');try{if(sessionStorage.getItem('mc-intro'))document.documentElement.classList.add('intro-done')}catch(e){}",
          }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
