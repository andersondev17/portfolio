'use client';
import { gridItems } from '@/data';
import dynamic from 'next/dynamic';
import { BentoGridItem } from './BentoGrid';

// Carga dinámica del BentoGrid para evitar problemas de SSR
const BentoGrid = dynamic(() => import('./BentoGrid').then(mod => mod.BentoGrid), {
    ssr: false,
    loading: () => (
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="h-[320px] bg-muted/20 rounded-3xl" />
            ))}
        </div>
    )
});

const Grid = () => {
    return (
        <section id="about">
            <BentoGrid>
                {gridItems.map(({ id, title, description, className, img, imgClassName, titleClassName, spareImg }) => (
                    <BentoGridItem
                        id={id}
                        key={title}
                        title={title}
                        description={description}
                        className={className}
                        img={img}
                        imgClassName={imgClassName}
                        titleClassName={titleClassName}
                        spareImg={spareImg}
                    />
                ))}
            </BentoGrid>
        </section>
    );
};

export default Grid;