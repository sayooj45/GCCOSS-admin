import { useState } from "react";
import {
  Plus,
  Search,
  CalendarDays,
  MapPin,
  Image,
  Type,
  FileText,
  X,
  Pencil,
  Trash2,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import axios from "axios";

export default function Events() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { events, setEvents, token, API_URL } = useAdmin();
  const [loading, setloading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  console.log("events", events);

  const filteredEvents = events.filter(
    (event) =>
      event?.date?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event?.place?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event?.shortDescription
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      event?.longDescription?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [formData, setFormData] = useState({
    image: "",
    date: "",
    place: "",
    title: "",
    shortDescription: "",
    longDescription: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setloading(true);

    const data = new FormData();

    if (formData.image) {
      data.append("image", formData.image);
    }

    data.append("title", formData.title);
    data.append("date", formData.date);
    data.append("place", formData.place);
    data.append("shortDescription", formData.shortDescription);
    data.append("longDescription", formData.longDescription);

    try {
      if (editId) {
        const res = await axios.patch(
          `${API_URL}/api/events/update/${editId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedEvents = events.map((event) =>
          event._id === editId ? res.data.event : event
        );

        setEvents(updatedEvents);
      } else {
        const res = await axios.post(`${API_URL}/api/events/post`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEvents([...events, res.data.event]);
      }

      setFormData({
        image: "",
        date: "",
        place: "",
        title: "",
        shortDescription: "",
        longDescription: "",
      });

      setEditId(null);

      setShowModal(false);
    } catch (error) {
      console.log(error.response?.data || error);
    } finally {
      setloading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`${API_URL}/api/events/delete/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents(events.filter((event) => event._id !== deleteId));

      setDeleteId(null);
    } catch (error) {
      console.log(error.response?.data || error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Event Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all event details and activities
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* SEARCH */}
          <div className="flex items-center bg-white border border-gray-200 px-4 py-3 rounded-2xl shadow-sm w-full sm:w-[320px]">
            <Search className="text-gray-400" size={18} />

            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ml-3 w-full outline-none bg-transparent text-sm"
            />
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={() => {
              setEditId(null);
              setFormData({
                image: "",
                date: "",
                place: "",
                title: "",
                shortDescription: "",
                longDescription: "",
              });
              setShowModal(true);
            }}
            className="flex items-center justify-center gap-2 bg-[#0d9488] hover:bg-[#0b7f75] text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus size={20} />
            Add Event
          </button>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-[28px] shadow-sm border border-gray-100 overflow-hidden">
        {/* TABLE HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Events List</h2>

            <p className="text-sm text-gray-500 mt-1">
              Total Events: {events.length}
            </p>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className=" hidden md:block">
          <div className="overflow-auto max-h-[600px]">
            <table className="w-full ">
              <thead className="bg-[#0d9488]/5">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Image
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Date
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Place
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Title
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Short Description
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Long Description
                  </th>

                  <th className="text-center px-6 py-4 text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredEvents.map((event, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    {/* IMAGE */}
                    <td className="px-6 py-5">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-24 h-16 rounded-2xl object-cover border"
                      />
                    </td>

                    {/* DATE */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-gray-600">
                        <CalendarDays size={16} />
                        {event.date}
                      </div>
                    </td>

                    {/* PLACE */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={16} />
                        {event.place}
                      </div>
                    </td>

                    {/* TITLE */}
                    <td className="px-6 py-5">
                      <h3 className="font-semibold text-gray-800">
                        {event.title}
                      </h3>
                    </td>

                    {/* SHORT DESC */}
                    <td className="px-6 py-5">
                      <p className="text-sm text-gray-500 max-w-xs">
                        {event.shortDescription}
                      </p>
                    </td>

                    {/* LONG DESC */}
                    <td className="px-6 py-5">
                      <p className="text-sm text-gray-500 max-w-md">
                        {event.longDescription}
                      </p>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          className="w-10 h-10 rounded-xl bg-[#0d9488]/10 hover:bg-[#0d9488] hover:text-white text-[#0d9488] flex items-center justify-center transition"
                          onClick={() => {
                            setEditId(event._id);

                            setFormData({
                              image: "",
                              date: event.date || "",
                              place: event.place || "",
                              title: event.title || "",
                              shortDescription: event.shortDescription || "",
                              longDescription: event.longDescription || "",
                            });

                            setShowModal(true);
                          }}
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-500 hover:text-white text-red-500 flex items-center justify-center transition"
                          onClick={() => setDeleteId(event._id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MOBILE CARDS */}
        <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
          {filteredEvents.map((event, index) => (
            <div
              key={index}
              className="border border-gray-100 rounded-3xl overflow-hidden shadow-sm"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={15} />
                    {event.date}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={15} />
                    {event.place}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800">
                  {event.title}
                </h3>

                <p className="text-sm text-gray-500 mt-3">
                  {event.shortDescription}
                </p>

                <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                  {event.longDescription}
                </p>

                {/* ACTIONS */}
                <div className="flex items-center justify-end gap-3 mt-5">
                  <button
                    className="w-10 h-10 rounded-xl bg-[#0d9488]/10 hover:bg-[#0d9488] hover:text-white text-[#0d9488] flex items-center justify-center transition"
                    onClick={() => {
                      setEditId(event._id);

                      setFormData({
                        image: "",
                        date: "",
                        place: "",
                        title: "",
                        shortDescription: "",
                        longDescription: "",
                      });

                      setShowModal(true);
                    }}
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-500 hover:text-white text-red-500 flex items-center justify-center transition"
                    onClick={() => setDeleteId(event._id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredEvents.length === 0 && (
          <div className="p-6 text-center text-gray-500">No events found</div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-[32px] shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">
            {/* HEADER */}
            <div className="bg-gradient-to-r from-[#0d9488] to-[#0b7f75] px-8 py-6 text-white flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {editId ? "Edit Event" : "Add New Event"}
                </h2>

                <p className="text-white/80 text-sm mt-1">
                  Fill all event information
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* IMAGE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Event Image URL
                </label>

                <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3">
                  <Image size={18} className="text-[#0d9488]" />

                  <input
                    type="file"
                    name="image"
                    onChange={(e) => {
                      const file = e.target.files[0];

                      if (!file) return;

                      // IMAGE SIZE VALIDATION
                      if (file.size > 5 * 1024 * 1024) {
                        setImageError("Image size must be less than 5MB");
                        e.target.value = "";
                        return;
                      }

                      setImageError("");

                      setFormData({
                        ...formData,
                        image: file,
                      });
                    }}
                    className="ml-3 w-full outline-none"
                    required={!editId}
                  />
                </div>
                {imageError && (
                  <p className="text-red-500 text-sm mt-2">{imageError}</p>
                )}
              </div>

              {/* DATE + PLACE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Event Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Event Place
                  </label>

                  <input
                    type="text"
                    name="place"
                    value={formData.place}
                    onChange={handleChange}
                    placeholder="Enter location"
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none"
                    required
                  />
                </div>
              </div>

              {/* TITLE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Event Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter event title"
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none"
                  required
                />
              </div>

              {/* SHORT DESC */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Short Description
                </label>

                <textarea
                  rows="3"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Write short description..."
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none resize-none"
                  required
                ></textarea>
              </div>

              {/* LONG DESC */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Long Description
                </label>

                <textarea
                  rows="5"
                  name="longDescription"
                  value={formData.longDescription}
                  onChange={handleChange}
                  placeholder="Write long description..."
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none resize-none"
                  required
                ></textarea>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 rounded-2xl border border-gray-200 hover:bg-gray-100 transition font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#0d9488] hover:bg-[#0b7f75] text-white px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                >
                  {loading
                    ? "Processing..."
                    : editId
                    ? "Update Event"
                    : "Save Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[28px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* HEADER */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-5 text-white flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Delete Partner</h2>

                <p className="text-white/80 text-sm mt-1">
                  This action cannot be undone
                </p>
              </div>

              <button
                onClick={() => {
                  setDeleteId(null);
                  setEditId(null);
                  setFormData({
                    image: "",
                    date: "",
                    place: "",
                    title: "",
                    shortDescription: "",
                    longDescription: "",
                  });
                }}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* BODY */}
            <div className="p-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 size={34} className="text-red-500" />
              </div>

              <h3 className="text-xl font-bold text-center text-gray-800 mt-5">
                Are you sure?
              </h3>

              <p className="text-gray-500 text-center mt-2 leading-relaxed">
                Do you really want to delete this partner? This process cannot
                be undone.
              </p>

              {/* BUTTONS */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => {
                    setDeleteId(null);
                    setEditId(null);
                    setFormData({
                      image: "",
                      date: "",
                      place: "",
                      title: "",
                      shortDescription: "",
                      longDescription: "",
                    });
                  }}
                  className="flex-1 py-3 rounded-2xl border border-gray-200 hover:bg-gray-100 transition font-medium"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
