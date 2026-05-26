import { Search, Mail, Phone, User } from "lucide-react";

import { useAdmin } from "../context/AdminContext";
import { useState } from "react";

export default function ContactSubmissions() {
  const { submissions } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  console.log("submission", submissions);

  const filteredSubmissions = submissions.filter((item) => {
    const search = searchTerm.toLowerCase();

    return (
      item?.name?.toLowerCase().includes(search) ||
      item?.email?.toLowerCase().includes(search) ||
      item?.mobile?.toLowerCase().includes(search) ||
      item?.message?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Enquiries
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all contact form requests and enquiries
          </p>
        </div>

        {/* SEARCH */}
        <div className="flex items-center bg-white border border-gray-200 px-4 py-3 rounded-2xl shadow-sm w-full sm:w-[320px]">
          <Search className="text-gray-400" size={18} />

          <input
            type="text"
            placeholder="Search submissions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-3 w-full outline-none bg-transparent text-sm"
          />
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="w-full bg-white rounded-[28px] shadow-sm border border-gray-100 overflow-hidden">
        {/* TABLE HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Submission List</h2>

            <p className="text-sm text-gray-500 mt-1">
              Total Submissions: {filteredSubmissions.length}
            </p>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className=" hidden md:block">
          <div className="overflow-auto max-h-[600px]">
            <table className="w-full">
              <thead className="bg-[#0d9488]/5">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Name
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Mobile Number
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Email
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Message
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredSubmissions.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    {/* NAME */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-[#0d9488]/10 flex items-center justify-center">
                          <User size={18} className="text-[#0d9488]" />
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {item.name}
                          </h3>
                        </div>
                      </div>
                    </td>

                    {/* MOBILE */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={16} />

                        <span>{item.mobile}</span>
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={16} />

                        <span>{item.email}</span>
                      </div>
                    </td>

                    {/* MESSAGE */}
                    <td className="px-6 py-5">
                      <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                        {item.message}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MOBILE CARDS */}
        <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
          {filteredSubmissions.map((item, index) => (
            <div
              key={index}
              className="border border-gray-100 rounded-3xl p-5 shadow-sm"
            >
              {/* TOP */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0d9488]/10 flex items-center justify-center flex-shrink-0">
                  <User className="text-[#0d9488]" size={22} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 text-lg">
                    {item.name}
                  </h3>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={15} />
                      {item.mobile}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 break-all">
                      <Mail size={15} />
                      {item.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* MESSAGE */}
              <div className="mt-5">
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.message}
                </p>
              </div>
            </div>
          ))}
        </div>
        {filteredSubmissions.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No submissions found
          </div>
        )}
      </div>
    </div>
  );
}
