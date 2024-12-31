
"use client";

import Image from "next/image";
import { memo } from "react";

const ProfileAvatar = memo(() => (
  <div className="relative inline-block h-24 w-24 rounded-full overflow-hidden">
    <Image
      src="/avatar.jpg"
      alt="Anderson Lopez - Software Developer"
      width={96}
      height={96}
      priority
      loading="eager"
      quality={75}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." 
      className="object-cover transition-opacity duration-300"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  </div>
));

ProfileAvatar.displayName = 'ProfileAvatar';

export default ProfileAvatar;