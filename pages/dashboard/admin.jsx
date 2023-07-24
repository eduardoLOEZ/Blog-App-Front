import React, { useState, useEffect } from "react"
import { useRouter } from "next/router";
import { Helmet } from "react-helmet";
import WelcomeBanner from "@/components/dashboard/WelcomeBlog";
import "tailwindcss/tailwind.css";


const Admin = () => {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showPage, setShowPage] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/")
            setIsLoading(false)
        } else {
            try {

                const decodedToken = JSON.parse(atob(token.split(".")[1]));

                if (decodedToken.exp < Date.now() / 1000) {
                    // Redireccionar al inicio de sesión u otra página de error
                    router.push("/");
                    setIsLoading(false);
                } else {
                    // El token es válido, continuar con la carga de la ruta protegida
                    setIsLoading(false);
                    setShowPage(true); // Mostrar la página después de que la validación del token se haya completado
                }



            } catch (error) {
                router.push("/");
                setIsLoading(false);

            }

        }
    },[]);

    return (
        <>
          {isLoading ? null : showPage ? (
            <div className="flex h-screen overflow-hidden">
              <Helmet>
                <meta charSet="utf-8" />
                <title>BlogApp </title>
                <link rel="canonical" href="https://condominiosparaiso.com/" />
              </Helmet>
             
              {/* Content area */}
              <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/*  Site header */}
               
    
                <main>
                  <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                    {/* Welcome banner */}
                    <WelcomeBanner />
    
                    {/* Dashboard actions */}
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
                      {/* Left: Avatars */}
                     
    
                      {/* Right: Actions */}
                      <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                        {/* Date */}
                        <span className="hidden sm:block text-gray-400 text-sm">
                          Hoy es{" "}
                          {new Date().toLocaleDateString("es-ES", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
    
                    {/* Cards */}
                    
                  </div>
                </main>
              </div>
            </div>
          ) : null}
        </>
      );
}

export default Admin;