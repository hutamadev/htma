import clsx from 'clsx';

interface ILoadingSkeletonProps {
  className?: string;
}

export default function LoadingSkeleton({
  className,
}: Readonly<ILoadingSkeletonProps>) {
  // Decorative only: the load itself is announced on the surrounding region
  // (aria-busy), so the placeholder must stay out of the accessibility tree.
  return <div aria-hidden='true' className={clsx('skeleton', className)} />;
}
