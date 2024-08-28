export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-xl font-bold capitalize'>
        {title}
      </h1>
      {children}
    </div>
  );
}
