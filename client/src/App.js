import './App.css';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './views/DashboardPage';
import AccountCreatePage from './views/AccountCreatePage';
import AccountUpdatePage from './views/AccountUpdatePage';
import SubAccountCreatePage from './views/SubAccountCreatePage';
import SubAccountUpdatePage from './views/SubAccountUpdatePage';

function App() {
  return (
    <div className="container mt-5">
      <Routes>
        <Route path="/accounts" element={<DashboardPage />} /> 
        <Route path="/accounts/add" element={<AccountCreatePage />} />
        <Route path="/accounts/edit/:id" element={<AccountUpdatePage />} />
        <Route path="/subaccounts" element={<DashboardPage />} /> 
        <Route path="/subaccounts/add" element={<SubAccountCreatePage />} />
        <Route path="/subaccounts/edit/:id" element={<SubAccountUpdatePage />} />


      </Routes>
    </div>
  );
}
export default App;