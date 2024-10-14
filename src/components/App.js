
import React ,{useState,useEffect,useMemo} from "react";
import './../styles/App.css';
import axios from 'axios';

const App = () => {
  const [data,setData]=useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchApi = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        setData(response.data)
      
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);
  
  const memoizedData = useMemo(() => data, [data]);
  return (
    <div>
        {/* Do not remove the main div */}
        {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <ul>
          {memoizedData.map(post => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
