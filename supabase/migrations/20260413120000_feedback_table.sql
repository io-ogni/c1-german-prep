-- Feedback table — users can submit feedback from any page
CREATE TABLE public.feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  page TEXT NOT NULL,
  message TEXT NOT NULL CHECK (length(message) BETWEEN 1 AND 1000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Users can only insert their own feedback — no read/update/delete
CREATE POLICY "Users can insert own feedback"
  ON public.feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_feedback_user_date ON public.feedback (user_id, created_at);
