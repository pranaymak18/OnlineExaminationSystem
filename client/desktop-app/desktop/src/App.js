//import './App.css';
import Login from './login';
function App() {
  document.cookie = 'email=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.cookie = 'role=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.cookie = 'orgId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  return (
    <div>
      <Login />
    </div>
  );
}

export default App;
