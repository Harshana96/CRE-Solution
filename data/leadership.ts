// Source: CRE_Solutions_Portfolio.pdf — "Our Leadership" section.
// No LinkedIn profiles, awards, or additional experience are provided in the
// source document — do not add any beyond what is listed here.

export interface Leader {
  name: string;
  role: string;
  credentials: string;
  quote: string;
  photo: string | null;
  initials: string;
}

export const leadership: Leader[] = [
  {
    name: "Gayan Thilakarathne",
    role: "Director",
    credentials: "B.Tech Electrical Engineering, Open University of Sri Lanka",
    quote: "Committed to delivering reliable and sustainable energy solutions for a brighter Sri Lanka.",
    photo: null,
    initials: "GT",
  },
  {
    name: "Asiri Rajapaksha",
    role: "Technical Director",
    credentials: "B.Sc. Electrical Engineering, University of Peradeniya",
    quote: "Engineering sustainable solutions for a cleaner, greener tomorrow.",
    photo: null,
    initials: "AR",
  },
];

export const leadershipIntro =
  "Driven by engineering, experience and a passion for a sustainable future, our leadership team is committed to delivering practical and reliable energy solutions for a cleaner, greener Sri Lanka.";
