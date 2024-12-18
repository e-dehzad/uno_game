// Define props for the Deck component, requiring an onDraw function
interface DeckProps {
  onDraw: () => void; // Callback function triggered when the deck is clicked
}

// Deck component representing the draw pile in an Uno game
const Deck: React.FC<DeckProps> = ({ onDraw }) => {
  return (
    <button
      // Styling for the deck button: size, color, hover effect, and text styling
      className="w-24 h-36 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 text-white font-bold"
      onClick={onDraw} // Call the onDraw function when the button is clicked
    >
      Draw
    </button>
  );
};

export default Deck;
