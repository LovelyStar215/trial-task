import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

interface EditEmbedWidgetProps {
  onChangeLink: (link: string) => void;
}

const EditEmbedWidget: React.FC<EditEmbedWidgetProps> = ({ onChangeLink }) => {

  const [text, setText] = useState("https://example.com");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    onChangeLink(link);
    setText(link);
  };

  return (
    <Input type="text" placeholder="Input Link" onChange={handleChange} value={text} />
  );
};

export default EditEmbedWidget;
