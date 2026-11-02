import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import portfolioData from '../data/portfolio.json';

interface PersonalInfo {
  name: string;
  first_name: string;
  last_name: string;
  title: string;
  tagline: string;
  bio: string;
  availability: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  stats: {
    years_experience: string;
    live_projects: string;
  };
  social: {
    github: string;
    gitlab: string;
    linkedin: string;
    twitter: string;
    portfolio: string;
  };
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  status: string;
}

interface Experience {
  id: number;
  position: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

interface Project {
  id: number;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  year: string;
  status: string;
  link: string;
  demo: string;
  appStore?: string;
  playStore?: string;
}

interface Skill {
  name: string;
  level: number;
}

type Skills = Record<string, Skill[]>;

interface PortfolioState {
  personal_info: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skills;
  activeSection: string;
}

const initialState: PortfolioState = {
  ...(portfolioData as Omit<PortfolioState, 'activeSection'>),
  activeSection: 'home',
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
  },
});

export const { setActiveSection } = portfolioSlice.actions;
export default portfolioSlice.reducer;
