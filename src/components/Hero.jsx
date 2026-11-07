import { motion } from 'framer-motion'

const Hero = () => {
    const scrollToTroubleshoot = () => {
        const el = document.getElementById('troubleshoot-wizard');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const openExpertHelp = () => {
        window.dispatchEvent(new Event('open-expert-modal'));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0, ease: "easeOut" }}
            className="space-y-6 lg:space-y-8"
        >
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-none text-black">
                Having Problem With WiFi?
            </h1>
            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Don't let slow internet hold you back. Get instant diagnostic and real-time support from our network experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                    onClick={scrollToTroubleshoot}
                    className="bg-black text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                >
                    Get Help
                </button>
                <button
                    onClick={openExpertHelp}
                    className="bg-white text-black border-2 border-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                >
                    Connect Now
                </button>
            </div>
        </motion.div>
    )
}

export default Hero
