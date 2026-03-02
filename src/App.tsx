import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import HomePage from "@/pages/HomePage";
import ScaffoldPage from "@/pages/ScaffoldPage";
import VocabularyPage from "@/pages/VocabularyPage";
import GrammarPage from "@/pages/GrammarPage";
import VerbTablePage from "@/pages/VerbTablePage";
import SettingsPage from "@/pages/SettingsPage";
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
            {/* Public auth routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Protected routes with layout */}
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="/" element={<HomePage />} />
              <Route path="/vocabulary" element={<VocabularyPage />} />
              <Route path="/grammar" element={<GrammarPage />} />
              <Route path="/grammar/verbs" element={<VerbTablePage />} />
              <Route path="/writing" element={<ScaffoldPage titleKey="page_writing" />} />
              <Route path="/reading" element={<ScaffoldPage titleKey="page_reading" />} />
              <Route path="/listening" element={<ScaffoldPage titleKey="page_listening" />} />
              <Route path="/exam-prep" element={<ScaffoldPage titleKey="page_exam_prep" />} />
              <Route path="/my-vocabulary" element={<ScaffoldPage titleKey="page_my_vocabulary" />} />
              <Route path="/my-texts" element={<ScaffoldPage titleKey="page_my_texts" />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
