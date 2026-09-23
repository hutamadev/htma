import clsx from 'clsx';

interface ILoadingSkeletonProps {
  className?: string;
}

export default function LoadingSkeleton({
  className,
}: Readonly<ILoadingSkeletonProps>) {
  return (
    <div
      className={clsx(
        className,
        'animate-pulse rounded bg-slate-300',
        'dark:bg-primary/40'
      )}
    ></div>
  );
}
