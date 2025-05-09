import React from 'react';

const newsArticles = [
  {
    title: 'Tech Conference 2025 Announced',
    date: 'May 5, 2025',
    summary: 'The world’s leading tech event will be held in Berlin this year.',
    link: '#'
  },
  {
    title: 'New AI Model Breaks Records',
    date: 'April 20, 2025',
    summary: 'A new AI model has surpassed GPT-4 in benchmark tests.',
    link: '#'
  }
];

const events = [
  {
    name: 'React Summit 2025',
    date: 'June 15, 2025',
    location: 'Amsterdam, Netherlands',
    link: '#'
  },
  {
    name: 'Web Dev Conference',
    date: 'August 3, 2025',
    location: 'San Francisco, USA',
    link: '#'
  }
];

export default function NewsEvents() {
  return (
    <div className="p-6 space-y-8">
      {/* News Section */}
      <section>
        <h1 className="text-2xl font-bold mb-4">Latest News</h1>
        <ul className="space-y-4">
          {newsArticles.map((news, index) => (
            <li key={index} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{news.title}</h2>
              <p className="text-sm text-gray-500">{news.date}</p>
              <p className="my-2">{news.summary}</p>
              <a href={news.link} className="text-blue-600 hover:underline">Read more</a>
            </li>
          ))}
        </ul>
      </section>

      {/* Events Section */}
      <section>
        <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
        <ul className="space-y-4">
          {events.map((event, index) => (
            <li key={index} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{event.name}</h2>
              <p className="text-sm text-gray-600">{event.date} | {event.location}</p>
              <a href={event.link} className="text-blue-600 hover:underline">More Info</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
