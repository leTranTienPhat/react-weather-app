import MainLayout from "@/components/layout/MainLayout";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Home from "@/pages/Home";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="weather-app-theme">
      <MainLayout>
        <Home />
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
