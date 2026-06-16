export type InvestmentType = 'Grant' | 'Loan' | 'Loan with Interest' | 'Equity';
export type HealthStatus = 'Good' | 'Fair' | 'Needs Attention';
export type PhotoCategory = 'Production' | 'Family' | 'Faith' | 'Milestone';

export interface WeeklyData {
  week: string;
  production: number;
  happiness: number;
  smileNote?: string;
  challengeNote?: string;
  productionNote?: string;
}

export interface FamilyMember {
  name: string;
  relation: string;
  occupation?: string;
  age?: number;
  school?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  date: string;
  category: PhotoCategory;
}

export interface Operator {
  id: string;
  name: string;
  city: string;
  state: string;
  mfuId: string;
  yearsInOperation: number;
  photo: string;
  bannerPhoto: string;
  oneLiner: string;
  bio: string;
  family: {
    photo?: string;
    story: string;
    members: FamilyMember[];
  };
  faith?: {
    denomination: string;
    statement: string;
  };
  health: {
    status: HealthStatus;
    note?: string;
  };
  investmentTypes: InvestmentType[];
  happinessScore: number;
  lastWeekProduction: number;
  productionTarget: number;
  cumulativeProduction: number;
  weeklyData: WeeklyData[];
  gallery: GalleryPhoto[];
}

export interface RegisteredUser {
  name: string;
  email: string;
  investmentInterest: string;
}

export interface InvestmentInterestPayload {
  operatorId: string;
  type: InvestmentType;
  amount: number;
  timeline?: string;
  message?: string;
}
