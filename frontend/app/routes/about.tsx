import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - Tweeter" },
    { name: "description", content: "About Tweeter - a platform to share your thoughts" },
  ];
}

export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About Tweeter</h1>
      <p className="mb-4">
        Tweeter is a platform where you can share your thoughts with the world.
      </p>
      <p className="mb-4">
        Our mission is to create a space where everyone can express themselves freely and connect with others who share similar interests. Whether you want to share your latest ideas, discuss trending topics, or simply stay updated with what's happening around you, Tweeter is the place to be.
      </p>
      <p className="mb-4">
        Join our growing community today and start sharing your unique voice!
      </p>
    </div>
  );
}