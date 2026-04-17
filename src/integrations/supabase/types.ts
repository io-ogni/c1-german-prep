export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      daily_sessions: {
        Row: {
          actual_seconds: number | null
          completed_at: string | null
          correct_count: number
          created_at: string
          exercise_ids: Json
          exercises_completed: number
          exercises_planned: number
          flashcards_reviewed: number
          id: string
          planned_minutes: number
          started_at: string
          total_answered: number
          user_id: string
        }
        Insert: {
          actual_seconds?: number | null
          completed_at?: string | null
          correct_count?: number
          created_at?: string
          exercise_ids?: Json
          exercises_completed?: number
          exercises_planned: number
          flashcards_reviewed?: number
          id?: string
          planned_minutes: number
          started_at?: string
          total_answered?: number
          user_id: string
        }
        Update: {
          actual_seconds?: number | null
          completed_at?: string | null
          correct_count?: number
          created_at?: string
          exercise_ids?: Json
          exercises_completed?: number
          exercises_planned?: number
          flashcards_reviewed?: number
          id?: string
          planned_minutes?: number
          started_at?: string
          total_answered?: number
          user_id?: string
        }
        Relationships: []
      }
      dictionary: {
        Row: {
          article: string | null
          created_at: string
          id: string
          translation_en: string
          word_de: string
          word_type: string | null
        }
        Insert: {
          article?: string | null
          created_at?: string
          id?: string
          translation_en: string
          word_de: string
          word_type?: string | null
        }
        Update: {
          article?: string | null
          created_at?: string
          id?: string
          translation_en?: string
          word_de?: string
          word_type?: string | null
        }
        Relationships: []
      }
      exercise_progress: {
        Row: {
          attempts: number
          completed: boolean
          created_at: string
          exercise_id: string
          id: string
          last_attempt_at: string | null
          score: number | null
          user_id: string
        }
        Insert: {
          attempts?: number
          completed?: boolean
          created_at?: string
          exercise_id: string
          id?: string
          last_attempt_at?: string | null
          score?: number | null
          user_id: string
        }
        Update: {
          attempts?: number
          completed?: boolean
          created_at?: string
          exercise_id?: string
          id?: string
          last_attempt_at?: string | null
          score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercise_progress_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises: {
        Row: {
          area: string
          content: Json
          created_at: string
          difficulty: number
          exam_format: string | null
          exercise_type: string
          explanation_de: string | null
          explanation_en: string | null
          id: string
          instructions_de: string
          instructions_en: string
          level: string
          solution: Json
          sort_order: number
          title_de: string
          title_en: string
          topic: string
        }
        Insert: {
          area: string
          content: Json
          created_at?: string
          difficulty?: number
          exam_format?: string | null
          exercise_type: string
          explanation_de?: string | null
          explanation_en?: string | null
          id?: string
          instructions_de: string
          instructions_en: string
          level: string
          solution: Json
          sort_order?: number
          title_de: string
          title_en: string
          topic: string
        }
        Update: {
          area?: string
          content?: Json
          created_at?: string
          difficulty?: number
          exam_format?: string | null
          exercise_type?: string
          explanation_de?: string | null
          explanation_en?: string | null
          id?: string
          instructions_de?: string
          instructions_en?: string
          level?: string
          solution?: Json
          sort_order?: number
          title_de?: string
          title_en?: string
          topic?: string
        }
        Relationships: []
      }
      personal_vocabulary: {
        Row: {
          box_number: number
          created_at: string
          example_sentence: string | null
          id: string
          next_review_at: string
          review_count: number
          source_id: string | null
          source_type: string
          translation_custom: string | null
          translation_en: string
          updated_at: string
          user_id: string
          word_de: string
        }
        Insert: {
          box_number?: number
          created_at?: string
          example_sentence?: string | null
          id?: string
          next_review_at?: string
          review_count?: number
          source_id?: string | null
          source_type: string
          translation_custom?: string | null
          translation_en: string
          updated_at?: string
          user_id: string
          word_de: string
        }
        Update: {
          box_number?: number
          created_at?: string
          example_sentence?: string | null
          id?: string
          next_review_at?: string
          review_count?: number
          source_id?: string | null
          source_type?: string
          translation_custom?: string | null
          translation_en?: string
          updated_at?: string
          user_id?: string
          word_de?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          api_key_encrypted: string | null
          created_at: string
          current_streak: number
          display_name: string | null
          id: string
          last_practice_date: string | null
          ui_language: string
          updated_at: string
          user_id: string
          writing_level: string | null
        }
        Insert: {
          api_key_encrypted?: string | null
          created_at?: string
          current_streak?: number
          display_name?: string | null
          id?: string
          last_practice_date?: string | null
          ui_language?: string
          updated_at?: string
          user_id: string
          writing_level?: string | null
        }
        Update: {
          api_key_encrypted?: string | null
          created_at?: string
          current_streak?: number
          display_name?: string | null
          id?: string
          last_practice_date?: string | null
          ui_language?: string
          updated_at?: string
          user_id?: string
          writing_level?: string | null
        }
        Relationships: []
      }
      reading_progress: {
        Row: {
          answers: Json | null
          completed: boolean
          completed_at: string | null
          id: string
          reading_text_id: string
          score: number | null
          self_score: number | null
          time_spent_seconds: number | null
          user_id: string
        }
        Insert: {
          answers?: Json | null
          completed?: boolean
          completed_at?: string | null
          id?: string
          reading_text_id: string
          score?: number | null
          self_score?: number | null
          time_spent_seconds?: number | null
          user_id: string
        }
        Update: {
          answers?: Json | null
          completed?: boolean
          completed_at?: string | null
          id?: string
          reading_text_id?: string
          score?: number | null
          self_score?: number | null
          time_spent_seconds?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reading_progress_reading_text_id_fkey"
            columns: ["reading_text_id"]
            isOneToOne: false
            referencedRelation: "reading_texts"
            referencedColumns: ["id"]
          },
        ]
      }
      reading_texts: {
        Row: {
          created_at: string
          estimated_minutes: number
          exam_format: string | null
          id: string
          level: string
          questions: Json
          sort_order: number
          text_content: string
          text_type: string
          title_de: string
          title_en: string
          word_count: number
        }
        Insert: {
          created_at?: string
          estimated_minutes: number
          exam_format?: string | null
          id?: string
          level: string
          questions: Json
          sort_order?: number
          text_content: string
          text_type: string
          title_de: string
          title_en: string
          word_count: number
        }
        Update: {
          created_at?: string
          estimated_minutes?: number
          exam_format?: string | null
          id?: string
          level?: string
          questions?: Json
          sort_order?: number
          text_content?: string
          text_type?: string
          title_de?: string
          title_en?: string
          word_count?: number
        }
        Relationships: []
      }
      verb_conjugations: {
        Row: {
          bedeutung_en: string
          created_at: string
          frequency_rank: number
          id: string
          infinitiv: string
          is_irregular: boolean
          is_separable: boolean
          konjunktiv_ii: string
          perfekt: string
          praesens_du: string
          praesens_er: string
          praesens_ich: string
          praeteritum_ich: string
        }
        Insert: {
          bedeutung_en: string
          created_at?: string
          frequency_rank?: number
          id?: string
          infinitiv: string
          is_irregular?: boolean
          is_separable?: boolean
          konjunktiv_ii: string
          perfekt: string
          praesens_du: string
          praesens_er: string
          praesens_ich: string
          praeteritum_ich: string
        }
        Update: {
          bedeutung_en?: string
          created_at?: string
          frequency_rank?: number
          id?: string
          infinitiv?: string
          is_irregular?: boolean
          is_separable?: boolean
          konjunktiv_ii?: string
          perfekt?: string
          praesens_du?: string
          praesens_er?: string
          praesens_ich?: string
          praeteritum_ich?: string
        }
        Relationships: []
      }
      writing_prompts: {
        Row: {
          context_de: string
          context_en: string
          created_at: string
          exam_format: string | null
          id: string
          level: string
          model_answers: Json | null
          prompt_type: string
          sort_order: number
          starter_quotes: Json | null
          target_word_count: number
          text_type: string
          title_de: string
          title_en: string
        }
        Insert: {
          context_de: string
          context_en: string
          created_at?: string
          exam_format?: string | null
          id?: string
          level: string
          model_answers?: Json | null
          prompt_type: string
          sort_order?: number
          starter_quotes?: Json | null
          target_word_count: number
          text_type: string
          title_de: string
          title_en: string
        }
        Update: {
          context_de?: string
          context_en?: string
          created_at?: string
          exam_format?: string | null
          id?: string
          level?: string
          model_answers?: Json | null
          prompt_type?: string
          sort_order?: number
          starter_quotes?: Json | null
          target_word_count?: number
          text_type?: string
          title_de?: string
          title_en?: string
        }
        Relationships: []
      }
      writing_submissions: {
        Row: {
          created_at: string
          id: string
          llm_corrections: Json | null
          llm_feedback_de: string | null
          llm_feedback_en: string | null
          prompt_id: string
          score_aufgabengerechtheit: string | null
          score_kommunikative_gestaltung: string | null
          score_korrektheit: string | null
          score_repertoire: string | null
          text_content: string
          total_points: number | null
          updated_at: string
          user_id: string
          word_count: number
        }
        Insert: {
          created_at?: string
          id?: string
          llm_corrections?: Json | null
          llm_feedback_de?: string | null
          llm_feedback_en?: string | null
          prompt_id: string
          score_aufgabengerechtheit?: string | null
          score_kommunikative_gestaltung?: string | null
          score_korrektheit?: string | null
          score_repertoire?: string | null
          text_content: string
          total_points?: number | null
          updated_at?: string
          user_id: string
          word_count: number
        }
        Update: {
          created_at?: string
          id?: string
          llm_corrections?: Json | null
          llm_feedback_de?: string | null
          llm_feedback_en?: string | null
          prompt_id?: string
          score_aufgabengerechtheit?: string | null
          score_kommunikative_gestaltung?: string | null
          score_korrektheit?: string | null
          score_repertoire?: string | null
          text_content?: string
          total_points?: number | null
          updated_at?: string
          user_id?: string
          word_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "writing_submissions_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "writing_prompts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
