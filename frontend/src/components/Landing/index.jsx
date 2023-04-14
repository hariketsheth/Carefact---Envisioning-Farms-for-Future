import { Input } from 'antd';
import { useHistory } from 'react-router-dom';

import './style.scss';


const Landing = () => {
  let history = useHistory();

  const onSearch = (value) => {
    history.push('/home');
  };
  
  return (
    <div className="Landing">
      <div className="navbar">
        <ul>
          <li className="about">About Us</li>
          <li>Demo</li>
          <li>Resources</li>
        </ul>
      </div>
      <h1>
        Reimagine
        <br />
        Farm Planning
      </h1>
      <div className="signup">
        <div>
          <h2>Plan your next farm years ahead.</h2>
          <p>Get valuable insights on our data analytics.</p>
        </div>
        <div className="space">
          <h3>Location</h3>
          <Input.Search
            className="search"
            placeholder="Search for your farmland"
            allowClear
            enterButton="Search"
            onSearch={onSearch}
            size="large"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
