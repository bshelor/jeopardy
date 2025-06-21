export default function TopLeftContent({ children }: Record<any, any>) {
  return (
    <div className="absolute top-2 left-2 z-10">
      {children}
    </div>
  );
}
