// Temporary types file - will be replaced by auto-generated types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {}
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}
