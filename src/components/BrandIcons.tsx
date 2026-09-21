import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Line illustration of a T-shirt with a subtle gamosa-style trim on collar and sleeves
 */
export const TShirtGamosaIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', size }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* T-Shirt Outline */}
      <path
        d="M17 7C17 10 31 10 31 7L39 12L35 21L30 19V41C30 41.5 29.5 42 29 42H19C18.5 42 18 41.5 18 41V19L13 21L9 12L17 7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.04"
      />
      {/* Collar Gamosa Trim */}
      <path
        d="M17 7C17 10.5 31 10.5 31 7"
        stroke="#DC2626"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Red Gamosa accent dots on collar */}
      <circle cx="21" cy="9.2" r="0.9" fill="#DC2626" />
      <circle cx="24" cy="9.6" r="0.9" fill="#DC2626" />
      <circle cx="27" cy="9.2" r="0.9" fill="#DC2626" />

      {/* Left Sleeve Trim */}
      <line x1="9.5" y1="13" x2="13.5" y2="20.5" stroke="#DC2626" strokeWidth="2" strokeDasharray="1.5 1.5" />
      {/* Right Sleeve Trim */}
      <line x1="38.5" y1="13" x2="34.5" y2="20.5" stroke="#DC2626" strokeWidth="2" strokeDasharray="1.5 1.5" />

      {/* Hem Gamosa Woven Border Accent */}
      <line x1="18.5" y1="40" x2="29.5" y2="40" stroke="#DC2626" strokeWidth="1.8" />
      <line x1="18.5" y1="38" x2="29.5" y2="38" stroke="#E0A526" strokeWidth="1" strokeDasharray="2 1.5" />

      {/* Subtle Chest Emblem (Rhino / Star contour) */}
      <circle cx="21.5" cy="19.5" r="1.8" fill="#166534" />
    </svg>
  );
};

/**
 * Kaziranga One-Horned Rhino line icon
 */
export const AssamRhinoIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stylized graceful Rhino silhouette */}
      <path
        d="M26 12L29 7C28 10 27 12 26 12Z"
        fill="#E0A526"
        stroke="#CA8A04"
        strokeWidth="1"
      />
      <path
        d="M26 12C28 13.5 29 15.5 28.5 17C27.5 19.5 25 20 23 20L23 27L20 27L20 21L14 21L14 27L11 27L11 20C8 20 5 18 4 15C3 12 5 11 8 11C11 11 12 8 15 8C19 8 22 10 26 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.06"
      />
      {/* Eye & Armor fold line */}
      <circle cx="24" cy="14" r="1" fill="currentColor" />
      <path d="M12 12C13 14 13 18 12 20" stroke="#E0A526" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M18 10C19 13 19 17 18 21" stroke="#E0A526" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
};

/**
 * Assam Tea Leaf line icon (two leaves and a bud)
 */
export const AssamTeaLeafIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bud in center */}
      <path
        d="M16 5C16.5 8 16 12 16 26"
        stroke="#166534"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M16 5C17.5 7 18 10 16 13C14 10 14.5 7 16 5Z"
        fill="#E0A526"
        stroke="#166534"
        strokeWidth="1.2"
      />
      {/* Left Leaf */}
      <path
        d="M16 16C12 14 7 15 6 20C10 22 14 20 16 18"
        stroke="#166534"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#166534"
        fillOpacity="0.1"
      />
      {/* Right Leaf */}
      <path
        d="M16 14C20 12 25 13 26 18C22 20 18 18 16 16"
        stroke="#166534"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#166534"
        fillOpacity="0.1"
      />
    </svg>
  );
};
