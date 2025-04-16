const questions = {
    "Ancient History": { question: "This empire reached its height under Emperor Trajan in 117 CE", answer: "What is the Roman Empire?" },
    "Physics": { question: "This force keeps planets in orbit around the sun", answer: "What is gravity?" },
    "Mountains": { question: "This mountain is the tallest in the world", answer: "What is Mount Everest?" },
    "Shakespeare": { question: "This tragedy features the character Iago", answer: "What is Othello?" },
    "Olympics": { question: "This city has hosted the Summer Olympics three times", answer: "What is London?" },
    "Sci-Fi Films": { question: "This 1982 film features a replicant saying 'All those moments will be lost in time, like tears in rain'", answer: "What is Blade Runner?" },
    "Medieval Times": { question: "This plague decimated Europe's population in the 14th century", answer: "What is the Black Death?" },
    "Chemistry": { question: "This element has the atomic number 79", answer: "What is Gold?" },
    "Rivers": { question: "This is the longest river in the world", answer: "What is the Nile?" },
    "Poetry": { question: "This American poet wrote 'The Road Not Taken'", answer: "Who is Robert Frost?" },
    "Basketball": { question: "This NBA team won the most championships", answer: "What is the Boston Celtics?" },
    "Comedies": { question: "This 1980 comedy film featured a gopher as a nemesis to the groundskeeper", answer: "What is Caddyshack?" },
    "Renaissance": { question: "This Italian family were powerful patrons of Renaissance art", answer: "Who are the Medici?" },
    "Biology": { question: "This process is how cells divide to create two identical daughter cells", answer: "What is mitosis?" },
    "Capitals": { question: "This is the capital city of Australia", answer: "What is Canberra?" },
    "Novels": { question: "This novel by F. Scott Fitzgerald features the character Jay Gatsby", answer: "What is The Great Gatsby?" },
    "Soccer": { question: "This country has won the most FIFA World Cup tournaments", answer: "What is Brazil?" },
    "Action Movies": { question: "This actor starred as John McClane in the Die Hard series", answer: "Who is Bruce Willis?" },
    "World Wars": { question: "This battle was the turning point of the Pacific War in WWII", answer: "What is the Battle of Midway?" },
    "Astronomy": { question: "This is the largest moon in our solar system", answer: "What is Ganymede?" },
    "Islands": { question: "This is the largest island in the world", answer: "What is Greenland?" },
    "Drama": { question: "This playwright wrote 'Death of a Salesman'", answer: "Who is Arthur Miller?" },
    "Tennis": { question: "This tournament is played on grass courts", answer: "What is Wimbledon?" },
    "Animation": { question: "This studio created 'Toy Story'", answer: "What is Pixar?" },
    "Cold War": { question: "This crisis in 1962 brought the world close to nuclear war", answer: "What is the Cuban Missile Crisis?" },
    "Geology": { question: "This type of rock forms from cooling magma", answer: "What is igneous rock?" },
    "Oceans": { question: "This ocean is the smallest and shallowest", answer: "What is the Arctic Ocean?" },
    "Mystery": { question: "This author created the detective Hercule Poirot", answer: "Who is Agatha Christie?" },
    "Motorsports": { question: "This race is known as 'The Greatest Spectacle in Racing'", answer: "What is the Indianapolis 500?" },
    "Horror Films": { question: "This 1973 film features a young girl possessed by a demon", answer: "What is The Exorcist?" },
    "Modern History": { question: "This wall fell in 1989, symbolizing the end of the Cold War", answer: "What is the Berlin Wall?" },
    "Technology": { question: "This company was founded by Steve Jobs and Steve Wozniak", answer: "What is Apple?" },
    "Landmarks": { question: "This tower in Paris was completed in 1889", answer: "What is the Eiffel Tower?" },
    "Fantasy": { question: "This author wrote 'The Hobbit' and 'The Lord of the Rings'", answer: "Who is J.R.R. Tolkien?" },
    "Winter Sports": { question: "This winter sport involves sliding stones toward a target", answer: "What is curling?" },
    "Directors": { question: "This director is known for films such as 'Jaws' and 'E.T.'", answer: "Who is Steven Spielberg?" }
};

// Extract the list of topics from the questions object
const topics = Object.keys(questions);

export { topics, questions };