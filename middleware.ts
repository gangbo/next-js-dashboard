import {NextResponse, NextRequest} from "next/server";
import {defaultLocale, locales, getLocale} from "./services/i18n";


// Get the preferred locale, similar to the above or using a library


export function middleware(request: NextRequest) {
    console.log("middleware .......")

    // Check if there is any supported locale in the pathname
    const {pathname} = request.nextUrl
    if (pathname === "/favicon.ico" || pathname.startsWith("/api/")) {
        return;
    }

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    console.log(">>> pathnameHasLocale: ", pathnameHasLocale)

    if (pathnameHasLocale) return

    // Redirect if there is no locale
    const locale = getLocale(request.headers)
    console.log(">>> locale: ", locale)
    request.nextUrl.pathname = `/${locale}${pathname}`
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
        // Optional: only run on root (/) URL
        // '/'
    ],
}