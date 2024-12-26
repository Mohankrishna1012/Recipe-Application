import React, { useState } from 'react';
import RecipeItem from './RecipeItem';

interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  steps: string[];
}

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([
    { id: 1, title: 'Pasta', ingredients: ['Pasta', 'Tomato Sauce', 'Cheese'], steps: ['Boil pasta', 'Add sauce', 'Sprinkle cheese'] },
    { id: 2, title: 'Salad', ingredients: ['Lettuce', 'Tomato', 'Cucumber'], steps: ['Chop vegetables', 'Mix ingredients', 'Serve'] },
    { id: 3, title: 'Pizza', ingredients: ['Dough', 'Tomato Sauce', 'Cheese', 'Toppings'], steps: ['Prepare dough', 'Add sauce and toppings', 'Bake in oven'] },
    { id: 4, title: 'Burger', ingredients: ['Buns', 'Patty', 'Lettuce', 'Cheese'], steps: ['Grill patty', 'Assemble ingredients in buns', 'Serve'] },
    { id: 5, title: 'Omelette', ingredients: ['Eggs', 'Onions', 'Cheese'], steps: ['Whisk eggs', 'Add onions and cheese', 'Cook in pan'] },
    { id: 6, title: 'Fried Rice', ingredients: ['Rice', 'Vegetables', 'Soy Sauce'], steps: ['Cook rice', 'Fry vegetables', 'Mix with rice and soy sauce'] },
    { id: 7, title: 'Soup', ingredients: ['Broth', 'Vegetables', 'Salt'], steps: ['Boil broth', 'Add vegetables', 'Simmer and season'] },
    { id: 8, title: 'Grilled Chicken', ingredients: ['Chicken', 'Spices', 'Oil'], steps: ['Marinate chicken', 'Grill until cooked', 'Serve'] },
    { id: 9, title: 'Tacos', ingredients: ['Taco Shells', 'Meat', 'Lettuce', 'Cheese'], steps: ['Cook meat', 'Assemble ingredients in shells', 'Serve'] },
    { id: 10, title: 'Spaghetti', ingredients: ['Spaghetti', 'Tomato Sauce', 'Meatballs'], steps: ['Cook spaghetti', 'Prepare meatballs', 'Combine with sauce'] },
    { id: 11, title: 'Pancakes', ingredients: ['Flour', 'Milk', 'Eggs'], steps: ['Mix ingredients', 'Pour batter on pan', 'Cook both sides'] },
    { id: 12, title: 'Brownies', ingredients: ['Chocolate', 'Flour', 'Sugar'], steps: ['Mix ingredients', 'Pour batter into pan', 'Bake in oven'] },
    { id: 13, title: 'Steak', ingredients: ['Beef Steak', 'Salt', 'Pepper'], steps: ['Season steak', 'Cook on grill or pan', 'Serve'] },
    { id: 14, title: 'Mashed Potatoes', ingredients: ['Potatoes', 'Butter', 'Milk'], steps: ['Boil potatoes', 'Mash with butter and milk', 'Serve'] },
    { id: 15, title: 'Smoothie', ingredients: ['Fruits', 'Milk', 'Honey'], steps: ['Blend ingredients together', 'Pour into glass', 'Serve chilled'] },
    { id: 16, title: 'Grilled Cheese Sandwich', ingredients: ['Bread', 'Cheese', 'Butter'], steps: ['Butter bread', 'Add cheese between slices', 'Grill until golden'] },
    { id: 17, title: 'Nachos', ingredients: ['Tortilla Chips', 'Cheese', 'Toppings'], steps: ['Layer chips on plate', 'Add cheese and toppings', 'Melt cheese in microwave or oven'] },
    { id: 18, title: 'Cupcakes', ingredients: ['Flour', 'Sugar', 'Frosting'], steps: ['Prepare batter', 'Bake in cupcake molds', 'Add frosting'] },
    { id: 19, title: 'Biryani', ingredients: ['Rice', 'Chicken', 'Spices'], steps: ['Cook rice', 'Prepare spiced chicken', 'Layer and simmer'] },
    { id: 20, title: 'French Toast', ingredients: ['Bread', 'Eggs', 'Milk'], steps: ['Whisk eggs and milk', 'Dip bread into mixture', 'Cook in pan'] },
  ]);
  

  const [searchTerm, setSearchTerm] = useState('');
  const [newRecipe, setNewRecipe] = useState({ title: '', ingredients: '', steps: '' });
  const [editRecipe, setEditRecipe] = useState<Recipe | null>(null);

  // Handle form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRecipe(prev => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editRecipe) {
      setEditRecipe({ ...editRecipe, [name]: value });
    }
  };

  // Add a new recipe
  const handleSaveRecipe = () => {
    if (!newRecipe.title || !newRecipe.ingredients || !newRecipe.steps) {
      alert('Please fill in all fields!');
      return;
    }

    const ingredientsArray = newRecipe.ingredients.split('\n').map(item => item.trim());
    const stepsArray = newRecipe.steps.split('\n').map(item => item.trim());

    setRecipes(prev => [
      ...prev,
      {
        id: prev.length + 1,
        title: newRecipe.title,
        ingredients: ingredientsArray,
        steps: stepsArray,
      },
    ]);

    setNewRecipe({ title: '', ingredients: '', steps: '' });
  };

  // Delete recipe handler
  const handleDelete = (id: number) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  // Edit recipe handler
  const handleEdit = (id: number) => {
    const recipeToEdit = recipes.find(recipe => recipe.id === id);
    if (recipeToEdit) {
      setEditRecipe(recipeToEdit);
    }
  };

  const handleUpdateRecipe = () => {
    if (editRecipe) {
      setRecipes(
        recipes.map(recipe => (recipe.id === editRecipe.id ? editRecipe : recipe))
      );
      setEditRecipe(null);
    }
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="recipe-list">
      <h1>Recipe Manager</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search Recipes..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', fontSize: '16px', width: '100%' }}
      />

      {/* Add Recipe Form */}
      <div style={{ marginBottom: '30px', padding: '10px', border: '1px solid #ccc' }}>
        <h2>Add New Recipe</h2>
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={newRecipe.title}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (separate by newline)"
          value={newRecipe.ingredients}
          onChange={handleInputChange}
          rows={5}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <textarea
          name="steps"
          placeholder="Steps (separate by newline)"
          value={newRecipe.steps}
          onChange={handleInputChange}
          rows={5}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button onClick={handleSaveRecipe} style={{ padding: '10px', fontSize: '16px' }}>
          Save Recipe
        </button>
      </div>

      {/* Edit Recipe Form */}
      {editRecipe && (
        <div style={{ marginBottom: '30px', padding: '10px', border: '1px solid #ccc' }}>
          <h2>Edit Recipe</h2>
          <input
            type="text"
            name="title"
            placeholder="Recipe Title"
            value={editRecipe.title}
            onChange={handleEditInputChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
          <textarea
            name="ingredients"
            placeholder="Ingredients (separate by newline)"
            value={editRecipe.ingredients.join('\n')}
            onChange={handleEditInputChange}
            rows={5}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
          <textarea
            name="steps"
            placeholder="Steps (separate by newline)"
            value={editRecipe.steps.join('\n')}
            onChange={handleEditInputChange}
            rows={5}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
          <button onClick={handleUpdateRecipe} style={{ padding: '10px', fontSize: '16px' }}>
            Update Recipe
          </button>
        </div>
      )}

      {/* Recipe Items */}
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map(recipe => (
          <RecipeItem
            key={recipe.id}
            recipe={recipe}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default RecipeList;
