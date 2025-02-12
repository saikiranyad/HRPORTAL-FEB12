import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import axios from "axios";

const CompaniesTable = ({ companylist = [] }) => { // Default to empty array
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    if (Array.isArray(companylist)) {
      setFilteredCompanies(companylist);
    } else {
      setFilteredCompanies([]); // Ensure no crash when data is undefined
    }
  }, [companylist]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (!Array.isArray(companylist)) return;

    const filtered = companylist.filter(
      (company) =>
        company._id?.toLowerCase().includes(term) ||
        company.name?.toLowerCase().includes(term)
    );

    setFilteredCompanies(filtered);
  };




    const handleCompanyApproval = async (companyId, status) => {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/v1/company/approve/${companyId}`,
          { status },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(response)
    
        if (response.data.success) {
          alert(`Company ${status}d successfully`);
    
          // Update status locally
          setFilteredCompanies((prev) =>
            prev.map((company) =>
              company._id === companyId ? { ...company, status } : company
            )
          );
        }
      } catch (err) {
        console.error("Error updating company status:", err);
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
        <h2 className="text-xl font-semibold text-black">Company List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search companies..."
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
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Company ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Company Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Industry</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <motion.tr
                  key={company._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    {company._id || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    {company.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    {company.industry || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    {company.location || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        company.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : company.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {company.status || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    {company.createdAt
                      ? new Date(company.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {company.status === "Pending" ? (
                      <>
                        <button
                          className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                          onClick={() => handleCompanyApproval(company._id, "approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="ml-2 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                          onClick={() => handleCompanyApproval(company._id, "rejected")}
                        >
                          Decline
                        </button>
                      </>
                    ) : (
                      <span className="text-sm text-gray-500">{company.status}</span>
                    )}
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No companies found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default CompaniesTable;
