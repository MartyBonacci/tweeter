
import { type RouteConfig } from "@remix-run/router";

export default [
    { path: "/", element: "routes/home.tsx" },
    { path: "/about", element: "routes/about.tsx" },
    { path: "/contact", element: "routes/contact.tsx" },
    { path: "/services", element: "routes/services.tsx" },
    { path: "/signup", element: "routes/signup.tsx" },
    { path: "/verify", element: "routes/verify.tsx" }
] satisfies RouteConfig[];
