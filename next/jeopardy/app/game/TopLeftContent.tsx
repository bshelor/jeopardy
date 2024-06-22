export default function TopLeftContent({ children }: Record<any, any>) {
  return (
    <div className="absolute top-0 left-0 p-2">
      {children}
    </div>
  );
}
