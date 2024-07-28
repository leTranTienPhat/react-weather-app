import MainLayout from "@/components/layout/MainLayout";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";
import { SearchProvider } from "@/context/SearchContext";
import { LocalStorageProvider } from "@/context/LocalStorageContext";

function App() {
  return (
    <LocalStorageProvider>
      <ThemeProvider defaultTheme="dark" storageKey="weather-app-theme">
        <SearchProvider>
          <MainLayout>
            <Outlet />
            <Toaster />
          </MainLayout>
        </SearchProvider>
      </ThemeProvider>
    </LocalStorageProvider>
  );
}

export default App;
