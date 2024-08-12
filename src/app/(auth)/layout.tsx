import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <div className="w-full mx-auto flex h-full">
        <div
          className="w-full flex justify-center items-center bg-[url('/images/background.png')] bg-cover bg-no-repeat lg:bg-none"
        >
          <div className="w-full p-8 m-auto sm:w-3/5 sm:max-w-2xl rounded-lg sm:rounded-none bg-white bg-opacity-90">
            {children}
          </div>
          <div
            className="hidden h-full lg:block w-1/2 bg-[url('/images/background.png')] bg-cover bg-no-repeat"
          />
        </div>
      </div>

  );
}
