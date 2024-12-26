import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyDI_fIWUHYvDZyXXAl8GkLaotqlHuFIFww",
  authDomain: "recipe-application-a1004.firebaseapp.com",
  projectId: "recipe-application-a1004",
  storageBucket: "recipe-application-a1004.firebasestorage.app",
  messagingSenderId: "194134290308",
  appId: "1:194134290308:web:3c64e06391ddae635177d1",
  measurementId: "G-33N0XF8YZ7"
};


const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);


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
