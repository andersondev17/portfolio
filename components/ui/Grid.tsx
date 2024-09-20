import { motion } from "framer-motion";

const Grid = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                    key={index}
                    className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                    initial={{ scale: 0.8, opacity: 0 }} // Inicio reducido y transparente
                    animate={{ scale: 1, opacity: 1 }} // Expansión suave
                    whileHover={{
                        scale: 1.1, // Crece ligeramente al hacer hover
                        boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.2)", // Efecto de sombra
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }} // Suavidad en las transiciones
                >
                    <div className="p-4">
                        <h3 className="text-white text-lg font-semibold">Elemento {index + 1}</h3>
                        <p className="text-gray-400">Contenido dinámico en tiempo real.</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Grid;
