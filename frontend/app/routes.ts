
import { type RouteConfig } from "@remix-run/router";

import Home from "./routes/home";
import About from "./routes/about";
import Contact from "./routes/contact";
import Services from "./routes/services";
import Signup from "./routes/signup";
import Verify from "./routes/verify";

export default [
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/contact", element: <Contact /> },
    { path: "/services", element: <Services /> },
    { path: "/signup", element: <Signup /> },
    { path: "/verify", element: <Verify /> }
] satisfies RouteConfig[];
