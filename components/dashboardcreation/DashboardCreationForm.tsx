// components/DashboardCreationForm.tsx

import { useState } from 'react';

interface DashboardCreationFormProps {
  onNameChange: (name: string) => void;
}

const DashboardCreationForm: React.FC<DashboardCreationFormProps> = ({ onNameChange }) => {
  const [name, setName] = useState<string>('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    onNameChange(event.target.value);
  };

  return (
    <div className="my-4">
      <label htmlFor="dashboardName">Dashboard Name:</label>
      <input
        required
        className="border border-black px-2 py-1"
        type="text"
        id="dashboardName"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter dashboard name"
      />
    </div>
  );
};

export default DashboardCreationForm;
