import raw from './content.json'

export type Slide = { photo: string; badge: string; caption: string; label: string }
export type Feature = { title: string; href?: string }
export type Testimonial = { quote: string; name: string }
export type LinkItem = { title: string; href: string }
export type BackfileItem = { title: string; description: string; href: string }

export type Content = {
  nav: { ctaLabel: string }
  initiatives: {
    mastheadLeft: string
    mastheadRight: string
    title: string
    intro: string
    lessons: {
      title: string
      text: string
      channelLabel: string
      channelHref: string
      videos: LinkItem[]
    }
    coaching: {
      title: string
      text: string
      menteeLabel: string
      menteeHref: string
      instructorLabel: string
      instructorHref: string
      partnersLabel: string
      partners: string[]
    }
    backfiles: { title: string; text: string; files: BackfileItem[] }
    tournaments: { title: string; text: string; items: LinkItem[] }
  }
  hero: {
    mastheadLeft: string
    mastheadRight: string
    titleLine1: string
    titleAccent: string
    titleSuffix: string
    deck: string
    ctaLabel: string
  }
  inPractice: { slides: Slide[] }
  whatWeProvide: { features: Feature[] }
  testimonials: { items: Testimonial[] }
  communityCTA: {
    titlePrefix: string
    titleEmphasis: string
    text: string
    buttonLabel: string
    buttonHref: string
  }
  footer: { mission: string; copyright: string; tagline: string }
  about: {
    mastheadLeft: string
    mastheadRight: string
    title: string
    quote: string
    bodyParagraphs: string[]
    valuesTitle: string
    valuesParagraphs: string[]
  }
  contact: {
    mastheadLeft: string
    mastheadRight: string
    title: string
    intro: string
    email: string
    discordLabel: string
    discordHref: string
  }
  blogPage: {
    mastheadLeft: string
    mastheadRight: string
    title: string
    footerNoteLine1: string
    footerNoteLine2: string
  }
  teamPage: { mastheadLeft: string; title: string; joinTitle: string; joinText: string }
}

export const content = raw as Content
