"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { Button } from '../ui/button';

interface Quote {
  text: string;
  author: string;
}
interface QuotesProps {
  myquote: {
    text: string;
    author: string;
  };
}
const InspirationalQuotesWidget: React.FC<QuotesProps> = ({ myquote }) => {
  console.log(myquote);
  return (
    <div className="p-4">
      <blockquote className="text-xl italic text-left m-2 mb-10">
        {myquote.text && <p className="mb-4">{myquote.text}</p>}
        {myquote.author && <footer className="text-right text-sm">{myquote.author}</footer>}
      </blockquote>
    </div>
  );
};

export default InspirationalQuotesWidget;
