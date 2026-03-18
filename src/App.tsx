import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import WelcomePage from "@/pages/WelcomePage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import HomePage from "@/pages/HomePage";
import ScaffoldPage from "@/pages/ScaffoldPage";
import ReadingPage from "@/pages/ReadingPage";
import ListeningPage from "@/pages/ListeningPage";
import VocabularyPage from "@/pages/VocabularyPage";
import GrammarPage from "@/pages/GrammarPage";
import GrammarSubPage from "@/pages/GrammarSubPage";
import VerbTablePage from "@/pages/VerbTablePage";
import WritingPage from "@/pages/WritingPage";
import WritingTipsPage from "@/pages/WritingTipsPage";
import SpeakingPage from "@/pages/SpeakingPage";
import WorkshopPhrasesPage from "@/pages/WorkshopPhrasesPage";
import TechIdiomsPage from "@/pages/TechIdiomsPage";
import C1ExpressionsPage from "@/pages/C1ExpressionsPage";
import MyVocabularyPage from "@/pages/MyVocabularyPage";
import MyTextsPage from "@/pages/MyTextsPage";
import ExamPrepPage from "@/pages/ExamPrepPage";
import DailyPracticePage from "@/pages/DailyPracticePage";
import SettingsPage from "@/pages/SettingsPage";
import FlashcardsPage from "@/pages/FlashcardsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Protected routes with layout */}
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="/" element={<HomePage />} />
              <Route path="/vocabulary" element={<VocabularyPage />} />
              <Route path="/grammar" element={<GrammarPage />} />
              <Route path="/grammar/:slug" element={<GrammarSubPage />} />
              <Route path="/grammar/verbs" element={<VerbTablePage />} />
              <Route path="/writing" element={<WritingPage />} />
              <Route path="/writing/tips" element={<WritingTipsPage />} />
              <Route path="/reading" element={<ReadingPage />} />
              <Route path="/listening" element={<ListeningPage />} />
              <Route path="/speaking" element={<SpeakingPage />} />
              <Route path="/speaking/workshop" element={<WorkshopPhrasesPage />} />
              <Route path="/speaking/idioms" element={<TechIdiomsPage />} />
              <Route path="/speaking/expressions" element={<C1ExpressionsPage />} />
              <Route path="/exam-prep" element={<ExamPrepPage />} />
              <Route path="/my-vocabulary" element={<MyVocabularyPage />} />
              <Route path="/my-texts" element={<MyTextsPage />} />
              <Route path="/daily-practice" element={<DailyPracticePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/flashcards" element={<FlashcardsPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
