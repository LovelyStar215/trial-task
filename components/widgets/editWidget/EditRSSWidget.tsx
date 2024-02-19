import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { apiGet } from "../../../utils/apiUtils";
import _ from 'lodash';

interface EditRSSWidgetProps {
  onChangeRSSItems: (items: any[]) => void;
}

const DefaultUrl = 'https://www.reddit.com/r/technology/top/.rss?t=day';

const EditRSSWidget: React.FC<EditRSSWidgetProps> = ({ onChangeRSSItems }) => {

  const [items, setItems] = useState<any[]>([]);
  const [url, setUrl] = useState(DefaultUrl);

  const fetch = async () => {
    if (url) {
      const { data, error } = await apiGet(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`, {
        noCache: true
      });
      if (error) {
        console.log(error);
      } else {
        setItems(data?.items ?? []);
        onChangeRSSItems(items);  
        console.log(items);
      }
    }
  };
  const fetchDebounced = _.debounce(fetch, 200);
  useEffect(() => {
    fetchDebounced();
  }, [url]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    setUrl(link);
  };
  return (
    <Input type="text" placeholder="Input RSS Link" onChange={handleChange} value={url} />
  );
};

export default EditRSSWidget;
