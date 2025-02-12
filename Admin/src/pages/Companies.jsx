import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";


import { useEffect, useState } from "react";
import axios from "axios";
import CompaniesTable from "../components/companies/CompaniesTable";

const orderStats = {
    totaltokens: "1,234",
    pendingtokens: "56",

    totalRevenue: "$10000",
};

const Companies = () => {

    const [companyData, setCompanyData] = useState([]);
    const handlecompanydata = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/company/getAllCompanies', {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (response.data.success) {
                setCompanyData(response.data)
            }


        } catch (err) {
            console.log(err)
        }
    }


    const companylist = companyData.companies
    console.log(companylist);
    useEffect(() => {
        handlecompanydata();
    }
        , []);
    // console.log("Orders Data", orderData);
    return (
        <div className='flex-1 relative z-10 overflow-auto'>
            <Header title={"Companies Registeration table"} />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name='Total tokens' icon={ShoppingBag} value={orderStats.totaltokens} color='#6366F1' />
                    <StatCard name='Pending tokens' icon={Clock} value={orderStats.pendingtokens} color='#F59E0B' />

                    <StatCard name='Total money' icon={DollarSign} value={orderStats.totalRevenue} color='#EF4444' />
                </motion.div>


                <CompaniesTable companylist={companylist} />
            </main>
        </div>
    )
}

export default Companies
