import type { Route } from "./+types/services";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Services - Tweeter" },
    { name: "description", content: "Features and services offered by Tweeter" },
  ];
}

export default function Services() {
  const services = [
    {
      title: "Post Updates",
      description: "Share your thoughts, ideas, and moments with your followers in real-time."
    },
    {
      title: "Follow Friends",
      description: "Stay connected with friends, family, and interesting people from around the world."
    },
    {
      title: "Explore Trends",
      description: "Discover what's happening right now and join conversations on trending topics."
    },
    {
      title: "Private Messaging",
      description: "Send direct messages to connect privately with friends and followers."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tweeter Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div key={index} className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {service.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}