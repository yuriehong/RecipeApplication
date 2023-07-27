import * as Constants from '../constants/Constants';
import { fetchWrapper } from '../helpers/FetchWrapper';

export const recipeService = {
    fetchRecipes,
    createRecipe,
    deleteRecipe,
    updateRecipe
};

function fetchRecipes(userId) {
    const url = `${Constants.apiBaseUrl}/${Constants.apiRecipePath}/${Constants.recipes}/${userId}`;
    return fetchWrapper.get(url);
}

function createRecipe(recipe) {
    const url = `${Constants.apiBaseUrl}/${Constants.apiRecipePath}/${Constants.recipe}`;
    return fetchWrapper.post(url, recipe);
}

function deleteRecipe(recipeId) {
    const url = `${Constants.apiBaseUrl}/${Constants.apiRecipePath}/${Constants.recipe}/${recipeId}`;
    return fetchWrapper._delete(url);
}

function updateRecipe(recipe, recipeId) {
    const url = `${Constants.apiBaseUrl}/${Constants.apiRecipePath}/${Constants.recipe}/${recipeId}`;
    return fetchWrapper.put(url, recipe);
}