//import './App.css';
import Login from './login';
function App() {
   document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
   document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
   document.cookie = "orgId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  return (
    <div>
      <Login />
    </div>
  );
}

export default App;
