import { useEffect, useState } from 'react';
import { apiGet } from "../../utils/apiUtils";

const DefaultUrl = 'https://www.reddit.com/r/technology/top/.rss?t=day';

const RssFeedReader = () => {
  const [items, setItems] = useState<any[]>([]);
  const [url, setUrl] = useState(DefaultUrl);

  const fetch = async () => {
    if (url) {
      const { data, error } = await apiGet(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`, {
        noCache: true
      });
      if (error) {
        alert(error);
      } else {
        setItems(data?.items ?? []);
      }
    }
  };

  useEffect(() => {
    fetch();
  }, [url]);

  return (
    <div className="p-1 text-xs h-[250px] overflow-y-scroll">
      <ul className="flex flex-col gap-4 h-[250px] w-full">
        {items.map((item) => {
          const imgUrl = item?.thumbnail?.replace(/\&amp;/gi, '&');
          return (
            <a key={item.title} role="button" className="flex gap-2" href={item.link} target="_blank">
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