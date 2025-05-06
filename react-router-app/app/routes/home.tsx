import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tweeter - Share Your Thoughts" },
    { name: "description", content: "Welcome to Tweeter, a place to share your thoughts!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
