import { useEffect, useState } from 'react';

interface RssFeedReaderProps {
  items: any[];
}
const RssFeedReader: React.FC<RssFeedReaderProps> = ({ items}) => {
  return (
    <div className="p-1 text-xs h-[250px] overflow-y-scroll">
      <ul className="flex flex-col gap-4 h-[250px] w-full">
        {items && items.map((item, index) => {
          const imgUrl = item?.thumbnail?.replace(/\&amp;/gi, '&');
          return (
            <a key={index} role="button" className="flex gap-2" href={item.link} target="_blank">
              {imgUrl && <img src={imgUrl} className="min-w-[75px] h-10 mt-[6px]" />}
              <span className="text-gray-500 hover:text-gray-800 cursor-pointer">{item.title}</span>
            </a>
          );
        })}
      </ul>
    </div>
  );
}


export default RssFeedReader;