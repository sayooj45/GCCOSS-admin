import { useState } from "react";
import {
  Plus,
  Search,
  Image,
  FileText,
  File,
  X,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";

export default function Publications() {
  const [showModal, setShowModal] = useState(false);

  const [publications, setPublications] = useState([
    {
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      title: "Annual Business Report",
      description:
        "Comprehensive report covering annual business growth and market analysis.",
      pdf: "https://example.com/report.pdf",
    },
  ]);

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    description: "",
    pdf: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setPublications([...publications, formData]);

    setFormData({
      image: "",
      title: "",
      description: "",
      pdf: null,
    });

    setShowModal(false);
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Publications Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all publications, reports, and PDF documents
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* SEARCH */}
          <div className="flex items-center bg-white border border-gray-200 px-4 py-3 rounded-2xl shadow-sm w-full sm:w-[320px]">
            <Search className="text-gray-400" size={18} />

            <input
              type="text"
              placeholder="Search publications..."
              className="ml-3 w-full outline-none bg-transparent text-sm"
            />
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-[#0d9488] hover:bg-[#0b7f75] text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus size={20} />
            Add Publication
          </button>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-[28px] shadow-sm border border-gray-100 overflow-hidden">
        {/* TABLE HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Publications List
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Total Publications: {publications.length}
            </p>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="overflow-x-auto hidden lg:block">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-[#0d9488]/5">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Image
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Title
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Description
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  PDF
                </th>

                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {publications.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  {/* IMAGE */}
                  <td className="px-6 py-5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-16 rounded-2xl object-cover border"
                    />
                  </td>

                  {/* TITLE */}
                  <td className="px-6 py-5">
                    <h3 className="font-semibold text-gray-800">
                      {item.title}
                    </h3>
                  </td>

                  {/* DESCRIPTION */}
                  <td className="px-6 py-5">
                    <p className="text-sm text-gray-500 max-w-md">
                      {item.description}
                    </p>
                  </td>

                  {/* PDF */}
                  <td className="px-6 py-5">
                    <a
                      href={
                        typeof item.pdf === "string"
                          ? item.pdf
                          : URL.createObjectURL(item.pdf)
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0d9488]/10 text-[#0d9488] hover:bg-[#0d9488] hover:text-white transition"
                    >
                      <Eye size={16} />
                      View PDF
                    </a>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-3">
                      <button className="w-10 h-10 rounded-xl bg-[#0d9488]/10 hover:bg-[#0d9488] hover:text-white text-[#0d9488] flex items-center justify-center transition">
                        <Pencil size={18} />
                      </button>

                      <button className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-500 hover:text-white text-red-500 flex items-center justify-center transition">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="grid grid-cols-1 gap-4 p-4 lg:hidden">
          {publications.map((item, index) => (
            <div
              key={index}
              className="border border-gray-100 rounded-3xl overflow-hidden shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                  {item.description}
                </p>

                {/* PDF BUTTON */}
                <a
                  href={
                    typeof item.pdf === "string"
                      ? item.pdf
                      : URL.createObjectURL(item.pdf)
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#0d9488]/10 text-[#0d9488] hover:bg-[#0d9488] hover:text-white transition"
                >
                  <Eye size={18} />
                  View PDF
                </a>

                {/* ACTIONS */}
                <div className="flex items-center justify-end gap-3 mt-5">
                  <button className="w-10 h-10 rounded-xl bg-[#0d9488]/10 hover:bg-[#0d9488] hover:text-white text-[#0d9488] flex items-center justify-center transition">
                    <Pencil size={18} />
                  </button>

                  <button className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-500 hover:text-white text-red-500 flex items-center justify-center transition">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-[32px] shadow-2xl overflow-hidden">
            {/* MODAL HEADER */}
            <div className="bg-gradient-to-r from-[#0d9488] to-[#0b7f75] px-8 py-6 text-white flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Add Publication</h2>

                <p className="text-white/80 text-sm mt-1">
                  Upload publication details and PDF file
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
                  Publication Image URL
                </label>

                <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3">
                  <Image size={18} className="text-[#0d9488]" />

                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Paste image URL"
                    className="ml-3 w-full outline-none"
                    required
                  />
                </div>
              </div>

              {/* TITLE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Publication Title
                </label>

                <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3">
                  <FileText size={18} className="text-[#0d9488]" />

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter publication title"
                    className="ml-3 w-full outline-none"
                    required
                  />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Description
                </label>

                <textarea
                  rows="5"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write publication description..."
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none resize-none"
                  required
                ></textarea>
              </div>

              {/* PDF FILE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Upload PDF File
                </label>

                <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-2xl px-6 py-10 cursor-pointer hover:border-[#0d9488] hover:bg-[#0d9488]/5 transition">
                  <File size={42} className="text-[#0d9488] mb-4" />

                  <h3 className="text-base font-semibold text-gray-700">
                    Click to upload PDF
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">PDF files only</p>

                  <input
                    type="file"
                    name="pdf"
                    accept=".pdf"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pdf: e.target.files[0],
                      })
                    }
                    className="hidden"
                    required
                  />
                </label>

                {/* FILE NAME */}
                {formData.pdf && (
                  <div className="mt-4 flex items-center gap-3 bg-[#0d9488]/10 text-[#0d9488] px-4 py-3 rounded-2xl">
                    <File size={18} />

                    <span className="text-sm font-medium truncate">
                      {formData.pdf.name}
                    </span>
                  </div>
                )}
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
                  className="bg-[#0d9488] hover:bg-[#0b7f75] text-white px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                >
                  Save Publication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
