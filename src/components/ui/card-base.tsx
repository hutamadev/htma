interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: Readonly<CardProps>) {
  return (
    <div className={`flex w-full flex-col ${className ?? ''}`}>{children}</div>
  );
}
