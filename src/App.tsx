import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import { IRecipie } from './IRecipie';
import RecipieCard from './RecipieCard';
import logo from "../src/assets/logo.png"

const App: React.FC = () => {
  const [recipesFound, setRecipesFound] = useState<IRecipie[]>([]);
  const [recipeSearch, setRecipeSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(8)

  const searchForRecipes = async (query: string): Promise<IRecipie[]> => {
    const result = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await result.json();
    return data.meals || [];
  };

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    setVisibleCount(8); // Reset the visible count to the first 8 results
    const input = form.querySelector('#searchText') as HTMLInputElement;

    if (input) {
      setRecipeSearch(input.value);
      setVisibleCount(8);
    }
  };


  const loadMore = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setVisibleCount((count) => count + 8);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (recipeSearch) {
        try {
          const response = await searchForRecipes(recipeSearch);
          setRecipesFound(response);
          console.log('Fetched recipes:', response);
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      }
    };

    fetchData();
  }, [recipeSearch]);

  return (
    <div className='app'>
      <div className='navbar'>
        <div className='inner-navbar'>
          <img src={logo} className='logo' alt="Logo" />
          <h2>Dè Rèstaùrant🍔</h2>
          <form onSubmit={search} className="searchForm">
            <input
              type="text"
              value={recipeSearch}
              id="searchText"
              onChange={(e) => setRecipeSearch(e.target.value)}
            />
            <button>Search</button>
          </form>
        </div>
      </div>

      <div className='recipies-container container'>
        {recipesFound.length > 0 ? (
          recipesFound.slice(0, visibleCount).map((recipe) => (
            <RecipieCard key={recipe.idMeal} recipie={recipe} />
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </div>

      {visibleCount < recipesFound.length && (
        <button className='button' onClick={loadMore}>More</button>
      )}
    </div >
  );
};

export default App;
