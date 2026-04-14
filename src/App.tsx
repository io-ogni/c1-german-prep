import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PostHogPageTracker } from "@/components/PostHogPageTracker";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
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
import VerbTablePage from "@/pages/VerbTablePage";
import WritingPage from "@/pages/WritingPage";

import SpeakingPage from "@/pages/SpeakingPage";
import MyVocabularyPage from "@/pages/MyVocabularyPage";
import MyTextsPage from "@/pages/MyTextsPage";
import ExamPrepPage from "@/pages/ExamPrepPage";
import DailyPracticePage from "@/pages/DailyPracticePage";
import SettingsPage from "@/pages/SettingsPage";
import ITDeutschPage from "@/pages/ITDeutschPage";

import ITRedewendungenPage from "@/pages/ITRedewendungenPage";
import ITVokabularPage from "@/pages/ITVokabularPage";
import ITUebungenPage from "@/pages/ITUebungenPage";
import FlashcardsPage from "@/pages/FlashcardsPage";
import ITUserStoriesPage from "@/pages/ITUserStoriesPage";
import WelcomePage from "@/pages/WelcomePage";
import NotFound from "@/pages/NotFound";
import { RootRoute } from "@/components/RootRoute";
import { initPostHog } from "@/lib/posthog";

initPostHog();

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <PostHogPageTracker />
          <Routes>
            {/* Root — welcome or dashboard depending on auth */}
            <Route path="/" element={<RootRoute />} />

            {/* Public routes */}
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Protected routes with layout */}
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/vocabulary" element={<VocabularyPage />} />
              <Route path="/grammar" element={<GrammarPage />} />
              <Route path="/grammar/verbs" element={<VerbTablePage />} />
              <Route path="/writing" element={<WritingPage />} />

              <Route path="/reading" element={<ReadingPage />} />
              <Route path="/listening" element={<ListeningPage />} />
              <Route path="/speaking" element={<SpeakingPage />} />
              <Route path="/exam-prep" element={<ExamPrepPage />} />
              <Route path="/my-vocabulary" element={<MyVocabularyPage />} />
              <Route path="/my-texts" element={<MyTextsPage />} />
              <Route path="/daily-practice" element={<DailyPracticePage />} />
              <Route path="/it-deutsch" element={<ITDeutschPage />} />
              <Route path="/it-deutsch/uebungen" element={<ITUebungenPage />} />

              <Route path="/it-deutsch/redewendungen" element={<ITRedewendungenPage />} />
              <Route path="/it-deutsch/vokabular" element={<ITVokabularPage />} />
              <Route path="/it-deutsch/user-stories" element={<ITUserStoriesPage />} />
              <Route path="/flashcards" element={<FlashcardsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
