"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { Button } from '../../ui/button';

interface Quote {
  text: string;
  author: string;
}
interface QuotesProps {
  onChangeQuotes: (text: string, author:string) => void;
}
const EditQutoesWidget: React.FC<QuotesProps> = ({ onChangeQuotes }) => {
  const [quote, setQuote] = useState<Quote>({ text: "", author: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [myQuote, setMyQuote] = useState<string>("");
  const [isEnabledMyQuote, setIsEnabledMyQuote] = useState<boolean>(false);

  useEffect(() => {
    fetchRandomQuote();
  }, []);
  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get<Quote[]>('https://type.fit/api/quotes');
      const quotes = response.data;
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
      onChangeQuotes(randomQuote.text, randomQuote.author);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const addMyQuote = () => {
    setQuote({
      text: myQuote,
      author: "me"
    });
    setIsEnabledMyQuote(false);
    onChangeQuotes(myQuote, "me");
  }

  return (
    <div className="p-4">
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        isEnabledMyQuote
          ? (
            <>
              <textarea className="text-xl italic text-left m-2 w-full border-2 h-40" onChange={(e) => setMyQuote(e.target.value)} />
              <Button
                className={'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mx-3'}
                onClick={addMyQuote}
                disabled={loading}
              >
                Add
              </Button>
            </>
          )
          : (
            <>
              <blockquote className="text-xl italic text-left m-2 mb-10">
                <p className="mb-4">{quote.text}</p>
                {quote.author && <footer className="text-right text-sm">{quote.author}</footer>}
              </blockquote>
              <div>
                <Button
                  className={classNames(
                    'bg-blue-500 hover:bg-blue-600 text-white text-sm mr-3',
                    { 'cursor-not-allowed': loading }
                  )}
                  onClick={fetchRandomQuote}
                  disabled={loading}
                >
                  Generate Quote
                </Button>
                <Button
                  className={classNames(
                    'bg-blue-500 hover:bg-blue-600 text-white text-sm',
                    { 'cursor-not-allowed': loading }
                  )}
                  onClick={() => setIsEnabledMyQuote(true)}
                  disabled={loading}
                >
                  Add my quote
                </Button>
              </div>
            </>
          )

      )}
    </div>
  );
};

export default EditQutoesWidget;
