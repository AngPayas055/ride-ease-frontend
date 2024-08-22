import LayoutHeader from "../Header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutHeader/>
      {children}
    </>
  )
}