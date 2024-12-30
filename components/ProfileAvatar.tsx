import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

const ProfileAvatar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}
      className="relative"
    >
      <div className="relative">
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple to-indigo-500 blur-md opacity-75 animate-pulse" />
        
        <Avatar className="h-24 w-24 border-4 border-background relative">
          <AvatarImage src="/avatar.jpg" alt="Anderson Lopez" />
          <AvatarFallback className="bg-gradient-to-r from-purple-600 to-indigo-600">
            AL
          </AvatarFallback>
        </Avatar>
      </div>
      
      {/* Decorative rings */}
      <div className="absolute -inset-1 rounded-full border border-purple-500/20 animate-[spin_8s_linear_infinite]" />
      <div className="absolute -inset-2 rounded-full border border-blue-500/20 animate-[spin_12s_linear_infinite_reverse]" />
    </motion.div>
  )
}

export default ProfileAvatar