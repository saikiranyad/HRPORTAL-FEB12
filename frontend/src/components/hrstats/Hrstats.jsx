import React from 'react'
import Navbar from '../shared/Navbar'
import { motion } from 'framer-motion'

const features = [
    { name: 'No of logons', description: '909090' },
    { name: 'Percentage Obtained', description: '90%' },
    { name: 'Success rate', description: 'High' },
    { name: 'Advanced security', description: 'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.' },
]

// Circle Animation Variant
const floatingVariant = {
  animate: {
    y: [0, 20, 0], // Moves up and down
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

const Hrstats = () => {
    return (
        <>
        <Navbar/>

        <div className="relative min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          
          {/* Floating Circles */}
          

          {/* Main Card */}
          <motion.div 
            className="max-w-4xl w-full bg-white shadow-2xl rounded-xl p-10 relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            variants={floatingVariant}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-center mb-10">HR Stats</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.name} 
                  className="bg-gray-500 text-white p-6 rounded-xl shadow-md"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <dt className="text-lg font-semibold text-white">{feature.name}</dt>
                  <dd className="mt-2 text-base text-gray-300">{feature.description}</dd>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
        </>
    )
}

export default Hrstats
