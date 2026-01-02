import { motion } from 'framer-motion'

const Section = ({ children, className = "", id = "" }) => {
    return (
        <section id={id} className={`min-h-screen flex flex-col justify-center py-12 lg:py-24 relative ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="container mx-auto px-4"
            >
                {children}
            </motion.div>
        </section>
    )
}

export default Section
