export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'quote'; text: string; attribution: string }

export type BlogPost = {
  slug: string
  title: string
  author: string
  authorTitle?: string
  date: string
  excerpt: string
  content: BlogBlock[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'counterplans-are-allowed-in-pf',
    title: 'Counter(plans) are allowed in PF.',
    author: 'Kai Niendorf',
    date: 'January 21, 2026',
    excerpt:
      'Maybe just call them counter advocacies… For the majority of PF’s history, most judges have rejected negative fiat. The most common argument against counterplans is an appeal to the NSDA rule book, which states that neither plans nor counterplans are allowed. In theory debates, this standard is called jurisdiction. While there are strategic ways to…',
    content: [
      { type: 'paragraph', text: 'Maybe just call them counter advocacies…' },
      {
        type: 'paragraph',
        text: 'For the majority of PF’s history, most judges have rejected negative fiat. The most common argument against counterplans is an appeal to the NSDA rule book, which states that neither plans nor counterplans are allowed. In theory debates, this standard is called jurisdiction. While there are strategic ways to theoretically exclude negative fiat from debate, jurisdiction, even at tournaments explicitly using the NSDA rules, is not one of them.',
      },
      {
        type: 'paragraph',
        text: 'To understand why, we need a baseline understanding of what the rules actually say about counterplans. As of November 12, the High School Unified Manual says the following:',
      },
      {
        type: 'paragraph',
        text: '“Plans/Counterplans: In Public Forum Debate, the Association defines a plan or counterplan as a formalized, comprehensive proposal for implementation. Neither the pro or con side is permitted to offer a plan or counterplan; rather, they should offer reasoning to support a position of advocacy. Debaters may offer generalized, practical solutions.”',
      },
      {
        type: 'paragraph',
        text: 'With this text in mind, I’ll present the case against jurisdiction as a standard when rejecting counter advocacies.',
      },
      {
        type: 'list',
        items: [
          'The association defines plans and counterplans the exact same way: “a formalized, comprehensive proposal for implementation.”',
          'The pro is explicitly allowed to advocate for the entirety of the resolution.',
          'The resolution itself therefore cannot be considered a “formalized comprehensive proposal for implementation.”',
          'For example, consider a past resolution: “The United States federal government should ban single-use plastics.',
          'A comparably specific counter advocacy might be “The United States federal government should adopt a carbon tax.”',
          'This counter advocacy is not a “formalized, comprehensive proposal for implementation” because it is no more formalized nor comprehensive than the resolution.',
          'Therefore, the con is allowed to “offer reasoning to support a position of advocacy” including the counter advocacy outlined above.',
        ],
      },
      {
        type: 'paragraph',
        text: 'In short, if the NSDA prohibits formalized proposals but allows generalized advocacies, then a jurisdictional argument rejecting all counter advocacies misinterprets the intent of the rule book. My strategic advice for negative teams is to refer to what we would normally call counterplans as “counter advocacies” during debates.',
      },
      {
        type: 'paragraph',
        text: 'Finally, there are many common misconceptions about the burdens of proof and rejoinder and their application to PF. The rules explicitly state that “Public Forum Debate focuses on advocacy of a position derived from the issues presented in the resolution, not a prescribed set of burdens.” As long as we accept traditional opportunity cost logic (which is a separate question from jurisdiction), it’s clear that a con team arguing for an alternate advocacy attempting to solve the harms presented in the 1AC would answer the resolutional question by presenting a unique opportunity cost disadvantage.',
      },
      {
        type: 'paragraph',
        text: 'So how should we go for theory against counter advocacies? I think there are two legitimate ways to make the case against negative fiat. First, is the ongoing philosophical debate between ethical actualism and ethical possibilism. Actualism might be ahead (?) which could imply that negative fiat doesn’t rejoin the Aff. Second, teams can point out that counter advocacies don’t disprove the truth of the resolution because they only show that the resolution would be a good idea if something that isn’t happening did happen. These arguments can both be developed further, but that isn’t the point of this article.',
      },
      {
        type: 'paragraph',
        text: 'If you’re interested in learning how to execute counterplans in PF, you should watch the lecture posted on the Circuit Skillbuilder YouTube Channel.',
      },
    ],
  },
  {
    slug: 'csb-scholarship-the-results',
    title: 'CSB Scholarship: the Results',
    author: 'Bryan Zhao',
    authorTitle: 'Senior at the Awty International School and founder of Circuit Skillbuilder',
    date: 'October 15, 2025',
    excerpt:
      'For the past 6 months CSB has been running our first ever fundraiser to award scholarships to hardworking debaters across the country which have financial barriers to success. Every year, countless extremely dedicated debaters are blocked from their full potential due to lack of funds to cover travel, registration fees, judging hires, and coaching. We…',
    content: [
      {
        type: 'paragraph',
        text: 'For the past 6 months CSB has been running our first ever fundraiser to award scholarships to hardworking debaters across the country which have financial barriers to success. Every year, countless extremely dedicated debaters are blocked from their full potential due to lack of funds to cover travel, registration fees, judging hires, and coaching. We are proud to report that the CSB community smashed its goal of $10,000 and fundraised over $14,000 to help alleviate this issue.',
      },
      {
        type: 'paragraph',
        text: 'We would like to thank everyone who donated no matter what sum. We would also like to thank everyone who shared our fundraiser with their friends, families, and social media platforms. We couldn’t have done it without you.',
      },
      {
        type: 'paragraph',
        text: 'The scholarship recipients are as follows (most students wanted to remain anonymous to protect information surrounding financial circumstances):',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          '-Junior from British Columbia',
          '-Junior from Indiana',
          '-Freshman from Massachusetts',
          '-Senior from Wisconsin',
          '-Sophomore from Florida',
          '-Senior from South Dakota',
          '-Junior from Texas',
          '-Junior from Iowa',
          '-Junior from Massachusetts',
          '-Sophomore from Florida',
        ],
      },
      { type: 'paragraph', text: 'See what our recipients have said:' },
      {
        type: 'quote',
        text: 'The Circuit Skillbuilder scholarship will allow me to compete at a few national circuit PF tournaments I wouldn’t have been able to attend otherwise. Debating in a geographically isolated region can be incredibly limiting, but this program is helping to change that.',
        attribution: 'Kai Niendorf',
      },
      {
        type: 'quote',
        text: 'I truly wouldn’t be able to compete without the CSB Grant. Debate is something I live for and they have single-handedly made it accessible for me!',
        attribution: 'Anonymous CSB Grant Recipient',
      },
      {
        type: 'quote',
        text: 'CSB’s scholarship program provided me with previously gatekept opportunities: the ability to fly out, compete and hire judges at prestigious and expensive national circuit tournaments. Additionally, CSB’s resources are literally a game changer for anyone attempting to enter the PF circuit, as they help you understand the intricacies of case-construction and high-level debate',
        attribution: 'Anonymous CSB Grant Recipient',
      },
      {
        type: 'quote',
        text: 'Circuit Skill Builder is truly focused on helping the debate community. I have sent their free cases to many novices who have told me it’s a great help and their scholarship program genuinely will make debate so much more accessible and equitable. In addition, everyone at CSB makes it their mission to make the space as welcoming as possible while considering the perspectives of disadvantaged debaters. I have experience immense kindness and professionalism at CSB and I’m I hope they continuing to thrive and aid the community.',
        attribution: 'Apollin Lu',
      },
      {
        type: 'quote',
        text: 'CSB has helped me in so many ways. As a debater coming from a trad background in a very small state, competing at the national level has been especially difficult. However, the CSB community has been incredibly friendly and resourceful. The consistent lectures and practice rounds that have been posted on the CSB YouTube page, as well as the resources on Discord, have been very beneficial to my debate career. Additionally, the CSB scholarship has given me some extra funds to continue my debate journey, especially as I continue to dive deeper into the national circuit. I can’t put into words how amazing this organization has been for me and so many other people.',
        attribution: 'Anonymous CSB Grant Recipient',
      },
    ],
  },
  {
    slug: 'csbs-scholarship-grant-fundraiser-hit-10000-in-donations',
    title: 'CSB’s Scholarship Program Fundraiser Reached $10,000 in Donations',
    author: 'Bryan Zhao',
    authorTitle: 'Senior at the Awty International School and founder of Circuit Skillbuilder',
    date: 'August 8, 2025',
    excerpt:
      'After nearly three months of fundraising, Circuit Skillbuilder’s Scholarship Program fundraiser hit the goal of acquiring $10,000 in donations. This is incredible, and will allow us to give 10 under-privileged debaters $1,000 each in grant funding—funding that will help subsidize the costs of attending pricey national circuit tournaments. Because as much as our other resources…',
    content: [
      {
        type: 'paragraph',
        text: 'After nearly three months of fundraising, Circuit Skillbuilder’s Scholarship Program fundraiser hit the goal of acquiring $10,000 in donations. This is incredible, and will allow us to give 10 under-privileged debaters $1,000 each in grant funding—funding that will help subsidize the costs of attending pricey national circuit tournaments. Because as much as our other resources (lectures, demo debates, free prep) help, the harsh reality is that none of that really matters if debaters don’t even have the funding to compete at high-level tournaments in the first place. Indeed, our mission is to provide avenues to succeed in the national circuit, and unfortunately, the circuit is expensive. So, the success of this fundraiser hopefully is step forward in reducing the most daunting barrier to circuit success: cost. Circuit Skillbuilder is currently in the process of creating an application for debaters to fill out so we can determine who receives the grant; we are also working on the prep rewards promised as part of our fundraiser reward system.',
      },
    ],
  },
]

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}
