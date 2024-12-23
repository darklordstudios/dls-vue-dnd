interface User {
  Id?: number
  Name?: string
  Email?: string
  Role?: string
  Subscriptions?: []
  Key?: string
  Avatar?: string
  Authenticated?: boolean
}
export type { User }