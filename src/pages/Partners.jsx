import { useState } from "react";
import { Plus, X, Upload, Pencil, Trash2, Search } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import axios from "axios";
export default function Partners() {
  const { partners, setPartners, token } = useAdmin();

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setloading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    logo: "",
    title: "",
    description: "",
  });

  const filteredPartners = partners.filter(
    (partner) =>
      partner?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setloading(true);

    const data = new FormData();

    if (formData.logo) {
      data.append("logo", formData.logo);
    }

    data.append("title", formData.title);
    data.append("description", formData.description);

    try {
      if (editId) {
        const res = await axios.patch(
          `${API_URL}/api/partners/update/${editId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedPartners = partners.map((partner) =>
          partner._id === editId ? res.data.partner : partner
        );

        setPartners(updatedPartners);
      } else {
        const res = await axios.post(`${API_URL}/api/partners/post`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPartners([...partners, res.data.partner]);
      }

      setFormData({
        logo: "",
        title: "",
        description: "",
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
    try {
      await axios.delete(`${API_URL}/api/partners/delete/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPartners(partners.filter((partner) => partner._id !== deleteId));

      setDeleteId(null);
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  return (
    <div className="w-full">
      {/* TOP HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Partners Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage and organize all partnership details
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* SEARCH */}
          <div className="flex items-center bg-white border border-gray-200 px-4 py-3 rounded-2xl shadow-sm w-full sm:w-[320px]">
            <Search className="text-gray-400" size={18} />

            <input
              type="text"
              placeholder="Search partners..."
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
                logo: "",
                title: "",
                description: "",
              });
              setShowModal(true);
            }}
            className="flex items-center justify-center gap-2 bg-[#0d9488] hover:bg-[#0b7f75] text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus size={20} />
            Add Partner
          </button>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-[28px] shadow-sm border border-gray-100 overflow-hidden">
        {/* TABLE HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Partners List</h2>

            <p className="text-sm text-gray-500 mt-1">
              Total Partners: {partners.length}
            </p>
          </div>
        </div>

        {/* TABLE */}

        <div className="overflow-x-auto hidden md:block">
          <table className="w-full">
            <thead className="bg-[#0d9488]/5">
              <tr>
                <th className="text-left px-4 sm:px-6 py-4 text-sm font-semibold text-gray-700">
                  Partner
                </th>

                <th className="text-left px-4 sm:px-6 py-4 text-sm font-semibold text-gray-700">
                  Title
                </th>

                <th className="text-left px-4 sm:px-6 py-4 text-sm font-semibold text-gray-700">
                  Description
                </th>

                <th className="text-center px-4 sm:px-6 py-4 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredPartners.map((partner, index) => (
                <tr
                  key={index}
                  className="hidden md:table-row border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  {/* DESKTOP TABLE ROW */}

                  <td className="px-4 sm:px-6 py-5">
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 border overflow-hidden">
                      <img
                        src={partner.logo}
                        alt={partner.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>

                  <td className="px-4 sm:px-6 py-5">
                    <h3 className="font-semibold text-gray-800">
                      {partner.title}
                    </h3>
                  </td>

                  <td className="px-4 sm:px-6 py-5">
                    <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                      {partner.description}
                    </p>
                  </td>

                  <td className="px-4 sm:px-6 py-5">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => {
                          setEditId(partner._id);

                          setFormData({
                            logo: "",
                            title: partner.title,
                            description: partner.description,
                          });

                          setShowModal(true);
                        }}
                        className="w-10 h-10 rounded-xl bg-[#0d9488]/10 hover:bg-[#0d9488] hover:text-white text-[#0d9488] flex items-center justify-center transition"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => setDeleteId(partner._id)}
                        className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-500 hover:text-white text-red-500 flex items-center justify-center transition"
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
          {filteredPartners.map((partner, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm"
            >
              {/* TOP */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 border overflow-hidden flex-shrink-0">
                  <img
                    src={partner.logo}
                    alt={partner.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 text-lg">
                    {partner.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center justify-end gap-3 mt-5">
                <button
                  onClick={() => {
                    setEditId(partner._id);

                    setFormData({
                      logo: "",
                      title: partner.title,
                      description: partner.description,
                    });

                    setShowModal(true);
                  }}
                  className="w-10 h-10 rounded-xl bg-[#0d9488]/10 hover:bg-[#0d9488] hover:text-white text-[#0d9488] flex items-center justify-center transition"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => setDeleteId(partner._id)}
                  className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-500 hover:text-white text-red-500 flex items-center justify-center transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {filteredPartners.length === 0 && (
          <div className="p-6 text-center text-gray-500">No partners found</div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* MODAL HEADER */}
            <div className="bg-gradient-to-r from-[#0d9488] to-[#0b7f75] px-8 py-6 text-white flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {editId ? "Edit Partner" : "Add New Partner"}
                </h2>

                <p className="text-white/80 text-sm mt-1">
                  Fill in the partner information
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  setEditId(null);
                  setFormData({
                    logo: "",
                    title: "",
                    description: "",
                  });
                }}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* LOGO */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Partner Logo URL
                </label>

                <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-[#0d9488] transition">
                  <Upload className="text-[#0d9488]" size={20} />

                  <input
                    type="file"
                    name="logo"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        logo: e.target.files[0],
                      })
                    }
                    placeholder="Logo image"
                    className="ml-3 w-full outline-none bg-transparent"
                    required={!editId}
                  />
                </div>
              </div>

              {/* TITLE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Partner Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter partner title"
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-[#0d9488] transition"
                  required
                />
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
                  placeholder="Write partner description..."
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none resize-none focus:border-[#0d9488] transition"
                  required
                ></textarea>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditId(null);
                    setFormData({
                      logo: "",
                      title: "",
                      description: "",
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
                    ? "Update Partner"
                    : "Save Partner"}
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
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
