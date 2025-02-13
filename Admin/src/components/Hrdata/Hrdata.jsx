// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Search } from "lucide-react";
// import axios from "axios";

// const Hrdata = ({hrlist}) => {
//     const [searchTerm, setSearchTerm] = useState("");
//   const [filteredhr, setFilteredhr] = useState([]);

//   useEffect(() => {
//     if (Array.isArray(hrlist)) {
//       setFilteredhr(hrlist);
//     } else {
//       setFilteredhr([]); // Ensure no crash when data is undefined
//     }
//   }, [hrlist]);

//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);

//     if (!Array.isArray(hrlist)) return;

//     const filtered = hrlist.filter(
//       (company) =>
//         company._id?.toLowerCase().includes(term) ||
//         company.name?.toLowerCase().includes(term)
//     );

//     setFilteredhr(filtered);
//   };
//   console.log(filteredhr)




//     // const handleCompanyApproval = async (companyId, status) => {
//     //   try {
//     //     const response = await axios.put(
//     //       `http://localhost:3000/api/v1/company/approve/${companyId}`,
//     //       { status },
//     //       {
//     //         headers: { "Content-Type": "application/json" },
//     //         withCredentials: true,
//     //       }
//     //     );
//     //     console.log(response)
    
//     //     if (response.data.success) {
//     //       alert(`Company ${status}d successfully`);
    
//     //       // Update status locally
//     //       setFilteredCompanies((prev) =>
//     //         prev.map((company) =>
//     //           company._id === companyId ? { ...company, status } : company
//     //         )
//     //       );
//     //     }
//     //   } catch (err) {
//     //     console.error("Error updating company status:", err);
//     //   }
//     // };

//   return (
//     <motion.div
//       className="shadow-lg rounded-xl p-6 border border-gray-700"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.4 }}
//     >
//       {/* <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-black">Hr List</h2>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search companies..."
//             className="text-black placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//           <Search className="absolute left-3 top-2.5 text-black" size={18} />
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-700">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Hr ID</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Hr Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Hr email</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Hr Gender</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Hr phone number</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-gray-700">
//             {filteredCompanies.length > 0 ? (
//               filteredCompanies.map((company) => (
//                 <motion.tr
//                   key={company._id}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
//                     {company._id || "N/A"}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
//                     {company.name || "N/A"}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
//                     {company.industry || "N/A"}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
//                     {company.location || "N/A"}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                         company.status === "approved"
//                           ? "bg-green-100 text-green-800"
//                           : company.status === "rejected"
//                           ? "bg-red-100 text-red-800"
//                           : "bg-yellow-100 text-yellow-800"
//                       }`}
//                     >
//                       {company.status || "N/A"}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
//                     {company.createdAt
//                       ? new Date(company.createdAt).toLocaleDateString()
//                       : "N/A"}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
//                     {company.status === "Pending" ? (
//                       <>
//                         <button
//                           className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
//                           onClick={() => handleCompanyApproval(company._id, "approved")}
//                         >
//                           Approve
//                         </button>
//                         <button
//                           className="ml-2 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
//                           onClick={() => handleCompanyApproval(company._id, "rejected")}
//                         >
//                           Decline
//                         </button>
//                       </>
//                     ) : (
//                       <span className="text-sm text-gray-500">{company.status}</span>
//                     )}
//                   </td>
//                 </motion.tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center py-4 text-gray-500">
//                   No companies found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div> */}
//     </motion.div>
//   )
// }

// export default Hrdata


import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import axios from "axios";

const Hrdata = ({ hrlist }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredhr, setFilteredhr] = useState([]);

  useEffect(() => {
    if (Array.isArray(hrlist)) {
      setFilteredhr(hrlist);
    } else {
      setFilteredhr([]); // Prevent errors when data is undefined
    }
  }, [hrlist]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (!Array.isArray(hrlist)) return;

    const filtered = hrlist.filter(
      (hr) =>
        hr._id?.toLowerCase().includes(term) ||
        hr.fullname?.toLowerCase().includes(term) ||
        hr.email?.toLowerCase().includes(term)
    );

    setFilteredhr(filtered);
  };

  const handleHrApproval = async (hrId, status) => {
    try {
      const response = await axios.post(
        `https://hrportal-feb12-backend.onrender.com/api/v1/user/approve-hr`,
        { userId: hrId, action: status },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        alert(`HR user ${status}d successfully`);

        // Update status locally
        setFilteredhr((prev) =>
          prev.map((hr) =>
            hr._id === hrId ? { ...hr, status } : hr
          )
        );
      }
    } catch (err) {
      console.error("Error updating HR status:", err);
    }
  };

  return (
    <motion.div
      className="shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-black">HR Users</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search HR users..."
            className="text-black placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-black" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">HR ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredhr.length > 0 ? (
              filteredhr.map((hr) => (
                <motion.tr
                  key={hr._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    {hr._id || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    {hr.fullname || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    {hr.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    {hr.gender || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    {hr.phoneNumber || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        hr.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : hr.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {hr.status || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {hr.status === "pending" ? (
                      <>
                        <button
                          className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                          onClick={() => handleHrApproval(hr._id, "approve")}
                        >
                          Approve
                        </button>
                        <button
                          className="ml-2 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                          onClick={() => handleHrApproval(hr._id, "reject")}
                        >
                          Decline
                        </button>
                      </>
                    ) : (
                      <span className="text-sm text-gray-500">{hr.status}</span>
                    )}
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No HR users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Hrdata;
