import { useState } from "react";
import { Plus, X, Upload, Pencil, Trash2, Search } from "lucide-react";

export default function Partners() {
  const [showModal, setShowModal] = useState(false);

  const [partners, setPartners] = useState([
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      title: "React Technologies",
      description:
        "Strategic frontend development partner for enterprise applications.",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
      title: "Express Solutions",
      description: "Backend infrastructure and API integration partner.",
    },
  ]);

  const [formData, setFormData] = useState({
    logo: "",
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setPartners([...partners, formData]);

    setFormData({
      logo: "",
      title: "",
      description: "",
    });

    setShowModal(false);
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
              className="ml-3 w-full outline-none bg-transparent text-sm"
            />
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={() => setShowModal(true)}
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
              {partners.map((partner, index) => (
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
        <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
          {partners.map((partner, index) => (
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
                <button className="w-10 h-10 rounded-xl bg-[#0d9488]/10 hover:bg-[#0d9488] hover:text-white text-[#0d9488] flex items-center justify-center transition">
                  <Pencil size={18} />
                </button>

                <button className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-500 hover:text-white text-red-500 flex items-center justify-center transition">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* MODAL HEADER */}
            <div className="bg-gradient-to-r from-[#0d9488] to-[#0b7f75] px-8 py-6 text-white flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Add New Partner</h2>

                <p className="text-white/80 text-sm mt-1">
                  Fill in the partner information
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
              {/* LOGO */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Partner Logo URL
                </label>

                <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-[#0d9488] transition">
                  <Upload className="text-[#0d9488]" size={20} />

                  <input
                    type="text"
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                    placeholder="Paste logo image URL"
                    className="ml-3 w-full outline-none bg-transparent"
                    required
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
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 rounded-2xl border border-gray-200 hover:bg-gray-100 transition font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-[#0d9488] hover:bg-[#0b7f75] text-white px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                >
                  Save Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
