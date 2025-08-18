import Image from 'next/image';

/**
 * ResponsiveImage component that handles proper scaling in Next.js 15
 * @param {Object} props - Component props
 * @param {string} props.src - Image source
 * @param {string} props.alt - Alt text
 * @param {number} props.width - Image width
 * @param {number} props.height - Image height
 * @param {string} props.placeholder - Placeholder type
 * @param {number} props.quality - Image quality
 * @param {string} props.className - CSS class name
 * @param {Object} props.style - Inline styles
 * @param {string} props.sizes - Responsive sizes (optional, will be auto-generated if not provided)
 */
export default function ResponsiveImage({
    src,
    alt,
    width,
    height,
    placeholder = 'blur',
    quality = 75,
    className,
    style,
    sizes,
    ...props
}) {
    // Auto-generate sizes if not provided
    const autoSizes = sizes || `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${width}px`;

    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            placeholder={placeholder}
            quality={quality}
            sizes={autoSizes}
            className={className}
            style={{
                width: '100%',
                height: 'auto',
                maxWidth: `${width}px`,
                ...style,
            }}
            {...props}
        />
    );
}
