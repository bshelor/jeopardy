export default function TopLeftContent({ children }) {
  return (
    <div className="absolute top-0 left-0 p-2">
      {children}
    </div>
  );
}
