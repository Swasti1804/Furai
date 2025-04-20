// src/pages/PetProfile.tsx

import React from "react";
import { useParams } from "react-router-dom";

const PetProfile = () => {
  const { petId } = useParams<{ petId: string }>();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Pet Profile</h1>
      <p>Viewing profile for pet with ID: {petId}</p>
      {/* Add more pet details here */}
    </div>
  );
};

export default PetProfile;
