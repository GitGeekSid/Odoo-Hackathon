
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import ExploreQuestions from './pages/ExploreQuestions'
import AskQuestionPage from "./pages/AskQuestionPage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import AnswerQuestionPage from "./pages/AnswerQuestionPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="stackit-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/explore" element={<ExploreQuestions />} />
            <Route path="/ask" element={<AskQuestionPage />} />
            <Route path="*" element={<SignIn />} />{ }
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/questions/:id/answer" element={<AnswerQuestionPage />} />

          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
