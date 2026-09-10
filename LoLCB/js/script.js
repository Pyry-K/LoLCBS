const recipeOutput = document.getElementById("recipe-output");
const recipeName = document.body.dataset.recipeName || "";

function renderList(items) {
    if (!Array.isArray(items) || items.length === 0) {
        return "<p>No ingredients listed.</p>";
    }

    const listItems = items
        .map(item => `<p>${item}</p>`)
        .join("");

    return `<ul>${listItems}</ul>`;
}

function renderSteps(items) {
    if (!Array.isArray(items) || items.length === 0) {
        return "<p>No instructions listed.</p>";
    }

    const listItems = items
        .map((step, index) => `<p>${index + 1}. ${step}</p>`)
        .join("");

    return `<ol>${listItems}</ol>`;
}

function renderRecipe(data) {
    const recipe = data.find(item => item.name === recipeName) || data[0];

    if (!recipeOutput) {
        return;
    }

    if (!recipe) {
        recipeOutput.innerHTML = `<p>No recipe data found for ${recipeName}.</p>`;
        return;
    }

    recipeOutput.innerHTML = `
        <article class="recipe-card">
            <h2>${recipe["name"]} ${recipe["name-title"]}</h2>
            <p><strong>Full Name:</strong> ${recipe["full-name"]}</p>
            <p><strong>Recipe:</strong> ${recipe.recipe}</p>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <p><strong>Region:</strong> ${recipe.region}</p>
            <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
            <p><strong>Prep time:</strong> ${recipe["prep-time"]}</p>
            <p><strong>Cook time:</strong> ${recipe["cook-time"]}</p>
            <div class="recipe-section">
                <h3>Description</h3>
                <p>${recipe.description}</p>
            </div>

            <div class="recipe-section">
                <h3>Ingredients</h3>
                ${renderList(recipe.ingredients)}
            </div>

            <div class="recipe-section">
                <h3>Instructions</h3>
                ${renderSteps(recipe.Instructions)}
            </div>
            <br>
            <p><strong>Notes:</strong> ${recipe.Notes}</p>
        </article>
    `;
}

fetch("../data/test.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        renderRecipe(data);
    })
    .catch(error => {
        console.error("Failed to load JSON data:", error);
        if (recipeOutput) {
            recipeOutput.innerHTML = "<p>Unable to load recipe data.</p>";
        }
    });
