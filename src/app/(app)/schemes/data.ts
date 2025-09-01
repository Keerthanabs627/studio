// @ts-nocheck
import type { Scheme } from './actions';

// This is temporary mock data for government schemes.
// In a real application, this would come from a reliable, up-to-date source.
export const schemes: Scheme[] = [
  {
    id: 1,
    title: "PM-KISAN Scheme",
    description: "An income support scheme for all landholding farmer families in the country.",
    eligibility: "All landholding farmer families.",
    benefits: [
      "₹6,000 per year in three equal installments.",
      "Direct benefit transfer to bank accounts."
    ],
    link: "https://pmkisan.gov.in/",
  },
  {
    id: 2,
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description: "An insurance service for farmers for their yields.",
    eligibility: "All farmers including sharecroppers and tenant farmers growing notified crops in notified areas.",
    benefits: [
      "Comprehensive insurance cover against failure of the crop.",
      "Stabilizes the income of farmers to ensure their continuance in farming.",
      "Low premium rates for farmers."
    ],
    link: "https://pmfby.gov.in/",
  },
  {
    id: 3,
    title: "Kisan Credit Card (KCC) Scheme",
    description: "Provides farmers with timely access to credit for their cultivation and other needs.",
    eligibility: "All farmers - individuals/joint borrowers who are owner cultivators.",
    benefits: [
      "Revolving cash credit facility.",
      "Credit for consumption requirements, post-harvest expenses, and farm asset maintenance.",
      "Interest subvention available."
    ],
    link: "https://www.sbi.co.in/web/agri-rural/agriculture-banking/crop-finance/kisan-credit-card",
  },
    {
    id: 4,
    title: "National Mission for Sustainable Agriculture (NMSA)",
    description: "Aims to make agriculture more productive, sustainable, remunerative, and climate resilient.",
    eligibility: "Dependent on specific sub-missions and components.",
    benefits: [
      "Promotes location-specific integrated/composite farming systems.",
      "Soil and moisture conservation measures.",
      "Comprehensive soil health management.",
      "Judicious use of chemicals/fertilizers."
    ],
    link: "https://nmsa.dac.gov.in/",
  },
];
