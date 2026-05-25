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
import { useAdmin } from "../context/AdminContext";
import axios from "axios";

export default function Publications() {
  const { token, publications, setPublications, API_URL } = useAdmin();
  console.log("publications", publications);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const filteredPublications = publications.filter(
    (publication) =>
      publication?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      publication?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [formData, setFormData] = useState({
    publicationImage: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      if (formData.publicationImage) {
        data.append("publicationImage", formData.publicationImage);
      }

      if (formData.pdf) {
        data.append("pdf", formData.pdf);
      }

      data.append("title", formData.title);
      data.append("description", formData.description);

      if (editId) {
        const res = await axios.patch(
          `${API_URL}/api/publications/update/${editId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPublications((prev) =>
          prev.map((item) =>
            item._id === editId ? res.data.publication : item
          )
        );
        setShowModal(false);
      } else {
        const res = await axios.post(`${API_URL}/api/publications/post`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPublications((prev) => [...prev, res.data.publication]);
      }

      setFormData({
        publicationImage: "",
        title: "",
        description: "",
        pdf: null,
      });

      setEditId(null);

      setShowModal(false);
    } catch (error) {
      console.log(error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`${API_URL}/api/publications/delete/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     setPublications((prev) => prev.filter((item) => item._id !== id));
  //   } catch (error) {
  //     console.log(error.response?.data || error);
  //   }
  // };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`${API_URL}/api/publications/delete/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPublications((prev) => prev.filter((item) => item._id !== deleteId));

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
                publicationImage: "",
                title: "",
                description: "",
                pdf: null,
              });

              setShowModal(true);
            }}
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
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full ">
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
              {filteredPublications.map((item, index) => (
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
                      href={item.pdf}
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
                      <button
                        className="w-10 h-10 rounded-xl bg-[#0d9488]/10 hover:bg-[#0d9488] hover:text-white text-[#0d9488] flex items-center justify-center transition"
                        onClick={() => {
                          setEditId(item._id);

                          setFormData({
                            publicationImage: "",
                            title: item.title || "",
                            description: item.description || "",
                            pdf: null,
                          });

                          setShowModal(true);
                        }}
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-500 hover:text-white text-red-500 flex items-center justify-center transition"
                        onClick={() => setDeleteId(item._id)}
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

        {/* MOBILE CARDS */}
        <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
          {filteredPublications.map((item, index) => (
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
                  href={item.pdf}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#0d9488]/10 text-[#0d9488] hover:bg-[#0d9488] hover:text-white transition"
                >
                  <Eye size={18} />
                  View PDF
                </a>

                {/* ACTIONS */}
                <div className="flex items-center justify-end gap-3 mt-5">
                  <button
                    className="w-10 h-10 rounded-xl bg-[#0d9488]/10 hover:bg-[#0d9488] hover:text-white text-[#0d9488] flex items-center justify-center transition"
                    onClick={() => {
                      setEditId(item._id);

                      setFormData({
                        publicationImage: "",
                        title: item.title || "",
                        description: item.description || "",
                        pdf: null,
                      });

                      setShowModal(true);
                    }}
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-500 hover:text-white text-red-500 flex items-center justify-center transition"
                    onClick={() => setDeleteId(item._id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredPublications.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No publications found
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-[32px] shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">
            {/* MODAL HEADER */}
            <div className="bg-gradient-to-r from-[#0d9488] to-[#0b7f75] px-8 py-6 text-white flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {editId ? "Edit Publication" : "Add Publication"}
                </h2>

                <p className="text-white/80 text-sm mt-1">
                  Upload publication details and PDF file
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);

                  setEditId(null);

                  setFormData({
                    publicationImage: "",
                    title: "",
                    description: "",
                    pdf: null,
                  });
                }}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Publication Image URL
                </label>

                <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3">
                  <Image size={18} className="text-[#0d9488]" />

                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        publicationImage: e.target.files[0],
                      })
                    }
                    className="ml-3 w-full outline-none"
                    required={!editId}
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
                    required={!editId}
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
                  onClick={() => {
                    setShowModal(false);

                    setEditId(null);

                    setFormData({
                      publicationImage: "",
                      title: "",
                      description: "",
                      pdf: null,
                    });
                  }}
                  className="px-6 py-3 rounded-2xl border border-gray-200 hover:bg-gray-100 transition font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-[#0d9488] hover:bg-[#0b7f75] text-white px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                >
                  {loading
                    ? "Processing..."
                    : editId
                    ? "Update Publication"
                    : "Save Publication"}
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
                onClick={() => setDeleteId(null)}
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
                  onClick={() => setDeleteId(null)}
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
