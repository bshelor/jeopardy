export default function TopLeftContent({ children }: Record<any, any>) {
  return (
    <div className="absolute top-1 left-1 p-2 z-10">
      {children}
    </div>
  );
}
