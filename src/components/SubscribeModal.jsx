import React from 'react';

// Simple utility function that opens the Beehiiv subscription form in a new tab
export const openSubscribeForm = () => {
  window.open('https://embeds.beehiiv.com/d7455a7d-5406-4269-baa1-a7ea2fcd88e1', '_blank');
};

// We keep the modal component for backward compatibility
function SubscribeModal({ isOpen, onClose }) {
  // If this component is rendered, it will just open the Beehiiv embed and close itself
  React.useEffect(() => {
    if (isOpen) {
      openSubscribeForm();
      onClose();
    }
  }, [isOpen, onClose]);

  return null; // No UI rendered
}

export default SubscribeModal;
