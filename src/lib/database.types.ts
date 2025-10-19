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
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      comments: {
        Row: {
          author_id: string
          content: string
          created_at: string
          id: string
          is_deleted: boolean
          like_count: number
          parent_id: string | null
          post_id: string
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          id?: string
          is_deleted?: boolean
          like_count?: number
          parent_id?: string | null
          post_id: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          id?: string
          is_deleted?: boolean
          like_count?: number
          parent_id?: string | null
          post_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      mission_completions: {
        Row: {
          completed_at: string
          id: string
          mission_id: string
          result_data: Json | null
          user_id: string
        }
        Insert: {
          completed_at?: string
          id?: string
          mission_id: string
          result_data?: Json | null
          user_id: string
        }
        Update: {
          completed_at?: string
          id?: string
          mission_id?: string
          result_data?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mission_completions_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mission_completions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      missions: {
        Row: {
          created_at: string
          daily_limit: number | null
          description: string | null
          display_order: number
          game_config: Json | null
          id: string
          is_active: boolean
          mission_type: Database["public"]["Enums"]["mission_type"]
          reward_amount: number
          reward_currency: Database["public"]["Enums"]["currency_type"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          daily_limit?: number | null
          description?: string | null
          display_order?: number
          game_config?: Json | null
          id?: string
          is_active?: boolean
          mission_type: Database["public"]["Enums"]["mission_type"]
          reward_amount: number
          reward_currency: Database["public"]["Enums"]["currency_type"]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          daily_limit?: number | null
          description?: string | null
          display_order?: number
          game_config?: Json | null
          id?: string
          is_active?: boolean
          mission_type?: Database["public"]["Enums"]["mission_type"]
          reward_amount?: number
          reward_currency?: Database["public"]["Enums"]["currency_type"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          author_id: string
          category: Database["public"]["Enums"]["post_category"]
          comment_count: number
          content: string
          created_at: string
          id: string
          is_deleted: boolean
          like_count: number
          title: string
          updated_at: string
          view_count: number
        }
        Insert: {
          author_id: string
          category?: Database["public"]["Enums"]["post_category"]
          comment_count?: number
          content: string
          created_at?: string
          id?: string
          is_deleted?: boolean
          like_count?: number
          title: string
          updated_at?: string
          view_count?: number
        }
        Update: {
          author_id?: string
          category?: Database["public"]["Enums"]["post_category"]
          comment_count?: number
          content?: string
          created_at?: string
          id?: string
          is_deleted?: boolean
          like_count?: number
          title?: string
          updated_at?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      prize_entries: {
        Row: {
          created_at: string
          id: string
          prize_id: string
          tickets_used: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          prize_id: string
          tickets_used: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          prize_id?: string
          tickets_used?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prize_entries_prize_id_fkey"
            columns: ["prize_id"]
            isOneToOne: false
            referencedRelation: "prizes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prize_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      prize_pity_counters: {
        Row: {
          current_count: number
          last_reset_at: string | null
          prize_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          current_count?: number
          last_reset_at?: string | null
          prize_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          current_count?: number
          last_reset_at?: string | null
          prize_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prize_pity_counters_prize_id_fkey"
            columns: ["prize_id"]
            isOneToOne: false
            referencedRelation: "prizes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prize_pity_counters_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      prizes: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          pity_reward_amount: number
          pity_reward_currency: Database["public"]["Enums"]["currency_type"]
          pity_threshold: number
          tickets_per_entry: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          pity_reward_amount: number
          pity_reward_currency: Database["public"]["Enums"]["currency_type"]
          pity_threshold?: number
          tickets_per_entry?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          pity_reward_amount?: number
          pity_reward_currency?: Database["public"]["Enums"]["currency_type"]
          pity_threshold?: number
          tickets_per_entry?: number
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          points: number
          referral_code: string | null
          referred_by: string | null
          tickets: number
          updated_at: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          points?: number
          referral_code?: string | null
          referred_by?: string | null
          tickets?: number
          updated_at?: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          points?: number
          referral_code?: string | null
          referred_by?: string | null
          tickets?: number
          updated_at?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reward_products: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          points_required: number
          stock: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          points_required: number
          stock?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          points_required?: number
          stock?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      wallet_transactions: {
        Row: {
          amount: number
          balance_after: number
          created_at: string
          currency: Database["public"]["Enums"]["currency_type"]
          description: string | null
          id: string
          reference_id: string | null
          transaction_type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
        }
        Insert: {
          amount: number
          balance_after: number
          created_at?: string
          currency: Database["public"]["Enums"]["currency_type"]
          description?: string | null
          id?: string
          reference_id?: string | null
          transaction_type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
        }
        Update: {
          amount?: number
          balance_after?: number
          created_at?: string
          currency?: Database["public"]["Enums"]["currency_type"]
          description?: string | null
          id?: string
          reference_id?: string | null
          transaction_type?: Database["public"]["Enums"]["transaction_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      withdrawal_requests: {
        Row: {
          admin_notes: string | null
          contact_info: Json
          created_at: string
          id: string
          points_used: number
          processed_at: string | null
          product_id: string
          status: Database["public"]["Enums"]["withdrawal_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          contact_info: Json
          created_at?: string
          id?: string
          points_used: number
          processed_at?: string | null
          product_id: string
          status?: Database["public"]["Enums"]["withdrawal_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          contact_info?: Json
          created_at?: string
          id?: string
          points_used?: number
          processed_at?: string | null
          product_id?: string
          status?: Database["public"]["Enums"]["withdrawal_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "withdrawal_requests_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "reward_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "withdrawal_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      currency_type: "points" | "tickets"
      mission_type:
        | "daily_attendance"
        | "watch_ad"
        | "referral"
        | "minigame_spelling"
        | "minigame_number"
        | "minigame_color"
        | "minigame_flag"
        | "minigame_reaction"
        | "minigame_decibel"
      post_category: "savings" | "benefits" | "free_events" | "general"
      transaction_type:
        | "mission_reward"
        | "attendance"
        | "referral"
        | "prize_entry"
        | "prize_pity"
        | "withdrawal"
        | "admin_adjustment"
      withdrawal_status: "pending" | "approved" | "rejected" | "completed"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      currency_type: ["points", "tickets"],
      mission_type: [
        "daily_attendance",
        "watch_ad",
        "referral",
        "minigame_spelling",
        "minigame_number",
        "minigame_color",
        "minigame_flag",
        "minigame_reaction",
        "minigame_decibel",
      ],
      post_category: ["savings", "benefits", "free_events", "general"],
      transaction_type: [
        "mission_reward",
        "attendance",
        "referral",
        "prize_entry",
        "prize_pity",
        "withdrawal",
        "admin_adjustment",
      ],
      withdrawal_status: ["pending", "approved", "rejected", "completed"],
    },
  },
} as const
