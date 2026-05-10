import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const calculateResults = (state) => {
  let weightKg = state.unit === 'lbs' ? state.weight / 2.20462 : state.weight;
  
  // Base multiplier from goal
  let baseMultiplier = 2.0; // default muscle build
  switch(state.goal) {
    case 'cutting': baseMultiplier = 2.5; break;
    case 'fat_loss': baseMultiplier = 2.4; break;
    case 'bulking': baseMultiplier = 2.1; break;
    case 'recomp': baseMultiplier = 2.3; break;
    case 'muscle': baseMultiplier = 2.0; break;
  }

  // Activity adjustment
  let activityMult = 1.0;
  if (state.activity === 'active') activityMult = 1.1;
  else if (state.activity === 'athlete') activityMult = 1.25;

  // Experience adjustment
  let expMult = 1.0;
  if (state.experience === 'intermediate') expMult = 1.05;
  else if (state.experience === 'advanced') expMult = 1.1;

  let gPerKg = baseMultiplier * activityMult * expMult;
  let totalProtein = weightKg * gPerKg;
  let caloriesFromProtein = totalProtein * 4;
  let mealFrequency = state.activity === 'athlete' || state.goal === 'bulking' ? 5 : 4;
  let proteinPerMeal = totalProtein / mealFrequency;

  return {
    totalProtein: Math.round(totalProtein),
    proteinPerMeal: Math.round(proteinPerMeal),
    gPerKg: Number(gPerKg.toFixed(1)),
    caloriesFromProtein: Math.round(caloriesFromProtein),
    mealFrequency
  };
};

export const useCalculatorStore = create(
  persist(
    (set, get) => ({
      weight: 70,
      unit: 'kg',
      age: 25,
      gender: 'male',
      experience: 'beginner',
      goal: 'muscle',
      activity: 'active',
      
      // Results
      results: {
        totalProtein: 140,
        proteinPerMeal: 35,
        gPerKg: 2.0,
        caloriesFromProtein: 560,
        mealFrequency: 4
      },

      setField: (field, value) => set((state) => {
        const newState = { ...state, [field]: value };
        newState.results = calculateResults(newState);
        return newState;
      }),
    }),
    {
      name: 'haleemfx-storage',
    }
  )
);
