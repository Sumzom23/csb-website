import raw from './team.json'

export type TeamGroup = 'executive' | 'leadership' | 'instructor'

export type TeamMember = {
  name: string
  role: string
  bio: string
  photo: string
  group: TeamGroup
}

export const teamMembers: TeamMember[] = raw as TeamMember[]
