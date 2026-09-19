import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';

interface NextImageProps extends Omit<ImageProps, 'alt'> {
  alt: string;
  useSkeleton?: boolean;
  imgClassName?: string;
  blurClassName?: string;
  ref?: React.Ref<HTMLImageElement | null>;
}

export default function NextImage({
  src,
  width,
  height,
  alt,
  ref,
  className,
  imgClassName,
  fill,
  ...rest
}: Readonly<NextImageProps>) {
  const widthIsSet = className?.includes('w-') ?? false;

  return (
    <figure
      style={!widthIsSet && width ? { width: `${width}px` } : undefined}
      className={className}
    >
      <Image
        className={clsx(imgClassName)}
        src={src}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        alt={alt}
        ref={ref}
        {...rest}
      />
    </figure>
  );
}
