import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";

interface InstructionsProps {
  onClose: () => void; // Function to handle closing the instructions dialog
}

const Instructions: React.FC<InstructionsProps> = ({ onClose }) => {
  return (
    <Dialog>
      {/* Button to trigger the dialog */}
      <DialogTrigger asChild>
        <button
          onClick={onClose} // Call onClose when the button is clicked
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          How to Play
        </button>
      </DialogTrigger>

      {/* Dialog content */}
      <DialogContent className="sm:max-w-[425px] bg-white text-black dark:text-black p-6">
        {/* Dialog title */}
        <div className="border-b pb-2 mb-4">
          <DialogTitle className="text-lg font-bold text-black dark:text-black">How to Play Uno</DialogTitle>
        </div>

        {/* Instructions content */}
        <div className="mt-4 space-y-4 text-black dark:text-black">
          <p className="px-2">1. Each player starts with 7 cards.</p>
          <p className="px-2">
            2. Players take turns matching a card in their hand with the current card shown on the top of the deck
            either by number or color.
          </p>
          <p className="px-2">3. If the player has no matches, they must draw a card from the deck.</p>
          <p className="px-2">4. Special cards:</p>
          <ul className="list-disc list-inside pl-6">
            <li>Skip: Next player in sequence misses a turn</li>
            <li>Reverse: Order of play switches directions</li>
            <li>Draw Two: Next player draws 2 cards and misses turn</li>
          </ul>
          <p className="px-2">5. The first player to get rid of all their cards wins!</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Instructions;
