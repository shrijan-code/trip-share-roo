export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          created_at: string | null
          id: string
          passenger_id: string
          seats: number | null
          status: string | null
          trip_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          passenger_id: string
          seats?: number | null
          status?: string | null
          trip_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          passenger_id?: string
          seats?: number | null
          status?: string | null
          trip_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: number
          message: string
          name: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: never
          message: string
          name: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: never
          message?: string
          name?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          deleted_by_receiver: boolean | null
          deleted_by_sender: boolean | null
          id: string
          read: boolean | null
          receiver_id: string
          sender_id: string
          trip_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          deleted_by_receiver?: boolean | null
          deleted_by_sender?: boolean | null
          id?: string
          read?: boolean | null
          receiver_id: string
          sender_id: string
          trip_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          deleted_by_receiver?: boolean | null
          deleted_by_sender?: boolean | null
          id?: string
          read?: boolean | null
          receiver_id?: string
          sender_id?: string
          trip_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      ride_requests: {
        Row: {
          created_at: string | null
          departure_date: string
          description: string | null
          destination: string
          id: string
          is_public: boolean | null
          origin: string
          passenger_id: string
          passengers: number | null
          price_range_max: number | null
          price_range_min: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          departure_date: string
          description?: string | null
          destination: string
          id?: string
          is_public?: boolean | null
          origin: string
          passenger_id: string
          passengers?: number | null
          price_range_max?: number | null
          price_range_min?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          departure_date?: string
          description?: string | null
          destination?: string
          id?: string
          is_public?: boolean | null
          origin?: string
          passenger_id?: string
          passengers?: number | null
          price_range_max?: number | null
          price_range_min?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      trips: {
        Row: {
          created_at: string | null
          departure_date: string
          description: string | null
          destination: string
          driver_id: string
          id: string
          is_public: boolean | null
          origin: string
          price: number
          seats_available: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          departure_date: string
          description?: string | null
          destination: string
          driver_id: string
          id?: string
          is_public?: boolean | null
          origin: string
          price: number
          seats_available: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          departure_date?: string
          description?: string | null
          destination?: string
          driver_id?: string
          id?: string
          is_public?: boolean | null
          origin?: string
          price?: number
          seats_available?: number
          updated_at?: string | null
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
