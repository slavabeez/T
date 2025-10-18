export type SubscriptionType = "none" | "pro" | "premium"
export type GradeType = "none" | "bronze" | "silver" | "gold" | "diamond"
export type PrivilegeCategory = "streaming" | "antivirus" | "lounge" | "restaurant" | "events" | "other"
export type LimitType = "unlimited" | "count" | "amount"
export type LimitPeriod = "daily" | "weekly" | "monthly" | "yearly"

export interface Profile {
  id: string
  first_name: string
  last_name: string
  middle_name?: string
  birth_date: string
  phone: string
  balance: number
  subscription_type: SubscriptionType
  subscription_paid_until?: string
  grade: GradeType
  is_admin: boolean
  created_at: string
  updated_at: string
}

export interface Privilege {
  id: string
  name: string
  description: string
  category: PrivilegeCategory
  icon?: string
  required_grade: GradeType
  required_subscription?: SubscriptionType
  limit_type: LimitType
  limit_value?: number
  limit_period?: LimitPeriod
  cost_in_privileges?: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface UserPrivilege {
  id: string
  user_id: string
  privilege_id: string
  used_count: number
  used_amount: number
  last_used_at?: string
  period_start: string
  created_at: string
  updated_at: string
  privilege?: Privilege
}
