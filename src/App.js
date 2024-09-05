import React from 'react';
import Home from './component/home/home';
import MainFilter from './component/main_filter/main_filter';
import CardsDetails from './component/card_detail/cards_details';
import Contact from './component/contact/contact';
import { Routes, Route } from 'react-router-dom';
import LoginComponent from './component/login/login';
import Team from './component/team/team';
import ModeratorCreate from './component/card_detail/create_forms/moderator_create';
import RealEstateObjectCreate from './component/card_detail/create_forms/real_estate_object_create';
import RealEstateObjectEdit from './component/card_detail/edit_forms/real_estate_object_edit';
import ModeratorEdit from './component/card_detail/edit_forms/moderator_edit';
import CreateEmployee from './component/card_detail/create_forms/employee_create';
import EditEmployee from './component/card_detail/edit_forms/employee_edit';
import MainTeam from './component/team/main_team';
import ModeratorPage from './component/moderator/moderators_page';

function App() {
  return (
    <div className="App" style={{ flexGrow: 1 }}>
      {/* <Header /> */}
      <Routes> 
        <Route exact path="/" element={<Home />} /> 
        <Route exact path="/main" element={<MainFilter />} />
        <Route exact path="/detail" element={<CardsDetails />} />
        <Route exact path="/contact_form" element={<Contact />} />
        <Route exact path="/team" element={<MainTeam/>} />
        <Route exact path="/employee/create" element={<CreateEmployee />} />
        <Route exact path="/employee/edit" element={<EditEmployee />} />
        <Route exact path="/moderator" element={<LoginComponent />} />
        <Route exact path="/moderators" element={<ModeratorPage />} />
        <Route exact path="/moderator/create" element={<ModeratorCreate />} />
        <Route exact path="/moderator/edit" element={<ModeratorEdit />} />
        <Route exact path="/entities/create" element={<RealEstateObjectCreate />} />
        <Route exact path="/entities/edit" element={<RealEstateObjectEdit />} />
      </Routes>
    </div>
  );
}

export default App;
