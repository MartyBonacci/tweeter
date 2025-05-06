import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
    // route to about page
    route("/about", "routes/about.tsx"),
    // route to contact page
    route("/contact", "routes/contact.tsx"),
    // rout to services page
    route("/services", "routes/services.tsx"),
] satisfies RouteConfig;
