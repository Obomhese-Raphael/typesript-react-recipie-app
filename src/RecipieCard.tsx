import { useState } from 'react';
import { IRecipie } from './IRecipie';
import "./RecipieCard.css"

interface RecipieCardProps {
    recipie: IRecipie;
}

const RecipieCard: React.FC<RecipieCardProps> = ({ recipie }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    const formatInstructions = (instructions: string) => {
        return instructions.split('. ').map((step, index) => (
            <p key={index}>{step.trim()}.</p>
        ));
    };

    const getIngredients = () => {
        const ingredients: string[] = [];
        for (let i = 1; i <= 10; i++) {
            const ingredient = recipie[`strIngredient${i}` as keyof IRecipie];
            if (ingredient) {
                ingredients.push(ingredient as string);
            }
        }
        return ingredients;
    };


    return (
        <div className={`recipie-card ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand}>
            <img src={recipie.strMealThumb} alt={recipie.strMeal} className="recipie-image" />
            <h3>{recipie.strMeal}</h3>
            {isExpanded && (
                <div className="recipie-details">
                    <p><strong>Category:</strong> {recipie.strCategory}</p>
                    <p><strong>Area:</strong> {recipie.strArea}</p>
                    <div className="format-instructions">
                        {formatInstructions(recipie.strInstructions)}
                    </div>
                    <p><strong>Ingredients:</strong></p>
                    <ul>
                        {getIngredients().map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                        <br />
                        <br />
                        <p>Check it out on Youtube: </p>
                        <a style={{color: "blue", textDecoration: "none"}} href={recipie.strYoutube}>{recipie.strYoutube}</a>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RecipieCard;
