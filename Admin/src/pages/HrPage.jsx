import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";


import { useEffect, useState } from "react";
import axios from "axios";
import Hrdata from "../components/Hrdata/Hrdata";

const orderStats = {
    totaltokens: "1,234",
    pendingtokens: "56",

    totalRevenue: "$10000",
};

const HrPage = () => {
    const [hrData, setHrData] = useState([]);
    const handlehrdata = async () => {
        try {
            const response = await axios.get('https://hrportal-feb12-backend.onrender.com/api/v1/user/gethrusers', {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (response.data.success) {
                setHrData(response.data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const hrlist = hrData.hrUsers

    console.log(hrlist);
   
    useEffect(() => {
        handlehrdata();
    }
        , []);

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


                <Hrdata hrlist={hrlist} />
            </main>
        </div>
    )
}


export default HrPage
