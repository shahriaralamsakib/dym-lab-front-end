import React, { useEffect, useState } from "react";
import {
  fetchNewsEventsData,
  createNewsEvents,
  updateNewsEvents,
  deleteNewsEvents,
} from "../../services/api";

/**
 * News component — lists, creates, edits & deletes news items via modals
 */
export default function News() {
  const [news, setNews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ id: null, title: "", date: "", description: "", link: "" });

  /** Fetch all news on mount */
  useEffect(() => {
    refreshNews();
  }, []);

  const refreshNews = () => {
    fetchNewsEventsData()
      .then((res) => {
        if (res?.data?.length) setNews(res.data);
      })
      .catch((err) => console.error("Error fetching news data:", err));
  };

  /** Helpers to open/close modal */
  const openAddModal = () => {
    setForm({ id: null, title: "", date: "", description: "", link: "" });
    setIsModalOpen(true);
  };
  const openEditModal = (item) => {
    setForm(item);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  /** Handle form input */
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  /** Create & update handler */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (form.id) {
        await updateNewsEvents(form.id, form);
      } else {
        await createNewsEvents(form);
      }
      closeModal();
      refreshNews();
    } catch (err) {
      console.error("Error saving news:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  /** Delete with confirmation */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this news item?")) return;
    try {
      await deleteNewsEvents(id);
      refreshNews();
    } catch (err) {
      console.error("Error deleting news:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">News</h1>
          <p className="text-gray-600">Welcome to the Majeed Agricultural Robotics Lab dashboard.</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Add News
        </button>
      </div>

      {news.length === 0 ? (
        <p>No news available at the moment.</p>
      ) : (
        <div className="space-y-4">
          {news.map((item) => (
            <div key={item.id} className="border rounded p-4 shadow hover:shadow-md transition">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-600 mb-2">{item.date}</p>
              <p className="mb-2">{item.description}</p>
              <div className="flex gap-3 items-center">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Read more
                </a>
                <button
                  onClick={() => openEditModal(item)}
                  className="text-yellow-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative animate-fadeIn">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {form.id ? "Edit News" : "Add News"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Title" name="title" value={form.title} onChange={handleChange} />
              <Input label="Date" type="date" name="date" value={form.date} onChange={handleChange} />
              <Input
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                textarea
              />
              <Input label="Link" name="link" value={form.link} onChange={handleChange} />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : form.id ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/** Generic text / textarea input */
function Input({ label, textarea = false, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      {textarea ? (
        <textarea
          className="mt-1 w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
          rows={4}
          {...props}
        />
      ) : (
        <input
          className="mt-1 w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
          {...props}
        />
      )}
    </label>
  );
}
