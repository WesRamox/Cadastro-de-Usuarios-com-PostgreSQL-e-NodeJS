declare namespace Express {
  export interface Request {
    authenticatedUser?: {
      id: number
      email: string
    }
  }
}