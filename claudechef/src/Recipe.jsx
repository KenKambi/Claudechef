

export default function Recipe (){

    return(
        <main className="main-container">
            <div className="entry-container">
                <input type="text" placeholder="Enter ingredient" required/>
                <button>Add ingredient</button>
            </div>
            <h1>Ingredents on hand</h1>
            <ol>
                <li>Tomatos</li>
                <li>Tomatos</li>
                <li>Tomatos</li>
                <li>Tomatos</li>
                <li>Tomatos</li>
                <li>Tomatos</li>
            </ol>

            <div className="generate-container">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button> Get a recipe </button>
            </div>
        </main>
    )
}