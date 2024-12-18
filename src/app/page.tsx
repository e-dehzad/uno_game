// Importing the Game component from the components directory
import Game from '../components/Game';

// Defining the Home component, the main entry point for the home page
export default function Home() {
  return (
    // Main container element for the home page
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-200"
      // Classes applied:
      // - `flex`: Enables Flexbox layout
      // - `min-h-screen`: Sets the minimum height to the full viewport height
      // - `flex-col`: Arranges children in a column
      // - `items-center`: Aligns children horizontally to the center
      // - `justify-between`: Spreads children vertically with space between them
      // - `p-24`: Adds padding of 24 units
      // - `bg-gray-200`: Sets the background color to a light gray
    >
      <Game /> {/* Render the Game component inside the main container */}
    </main>
  );
}
