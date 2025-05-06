import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tweeter - Share Your Thoughts" },
    { name: "description", content: "Welcome to Tweeter, a place to share your thoughts!" },
  ];
}

export default function Home() {
  return (
      <main className="flex items-center justify-center pt-16 pb-4">
        <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
          <header className="flex flex-col items-center gap-9">
            <div className="w-[500px] max-w-[100vw] p-4 flex flex-col items-center">
              <img
                  src="/tweeter.svg"
                  alt="Tweeter"
                  className="w-40 h-40"
              />
              <h1 className="text-4xl font-bold text-center mt-4 text-gray-900 dark:text-white">
                Welcome to Tweeter
              </h1>
              <p className="text-xl text-center mt-2 text-gray-600 dark:text-gray-300">
                Share your thoughts with the world
              </p>
            </div>
          </header>
          <div className="max-w-[300px] w-full space-y-6 px-4">
            <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
              <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
                What&apos;s next?
              </p>
              <ul>
                {resources.map(({ href, text, icon }) => (
                    <li key={href}>
                      <a
                          className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                      >
                        {icon}
                        {text}
                      </a>
                    </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </main>
  );
}

const resources = [
  {
    href: "#",
    text: "Create Your First Tweet",
    icon: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
        >
          <path
              d="M10 4v12m-6-6h12"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
          />
        </svg>
    ),
  },
  {
    href: "#",
    text: "Find Friends",
    icon: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="20"
            viewBox="0 0 24 20"
            fill="none"
            className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
        >
          <path
              d="M17 8c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4zM3 18c0-3.3 2.7-6 6-6h8c3.3 0 6 2.7 6 6"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
          />
        </svg>
    ),
  },
];

