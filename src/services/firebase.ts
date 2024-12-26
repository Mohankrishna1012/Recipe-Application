import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get } from 'firebase/database';

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAmKOpeIEnqj3mw5O6BPP6TTCr9BCZzSks",
    authDomain: "recipe-app-7f923.firebaseapp.com",
    databaseURL: "https://recipe-app-7f923-default-rtdb.firebaseio.com",
    projectId: "recipe-app-7f923",
    storageBucket: "recipe-app-7f923.firebasestorage.app",
    messagingSenderId: "346831143214",
    appId: "1:346831143214:web:66b9a78095390f375c3abf",
    measurementId: "G-HZEEZ689YW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

// Function to fetch recipes from Firebase
export const getRecipesFromDatabase = async () => {
  try {
    const recipesRef = ref(database, 'recipes'); // Assuming you're storing recipes under 'recipes'
    const snapshot = await get(recipesRef); // Get data
    if (snapshot.exists()) {
      return snapshot.val(); // Return the recipes if data exists
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

// Function to add a new recipe to Firebase
export const addRecipeToDatabase = async (recipe: any) => {
  try {
    const recipeRef = ref(database, 'recipes/' + recipe.id);
    await set(recipeRef, recipe);
    console.log("Recipe added to database!");
  } catch (error) {
    console.error("Error adding recipe:", error);
  }
};