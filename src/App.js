//#region imports
import { BrowserRouter as Router, Switch, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import './MediaQuery.css';
import './CustomClasses.css';
import Login from './Pages/Login/Login';
import LoginLayoutRoute from './Components/Master/LoginLayout';
import SuperAdminLayoutRoute from './Components/Master/SuperAdminLayout';
import UserList from './Components/SuperAdmin/UserList';
import UserDetails from './Pages/SuperAdmin/UserDetails';
import UserEdit from './Pages/SuperAdmin/UserEdit';
import UserCreate from './Pages/SuperAdmin/UserCreate';
import SubjectCreate from './Pages/SuperAdmin/SubjectCreate';
import SubjectList from './Components/SuperAdmin/SubjectList';
import SubjectEdit from './Pages/SuperAdmin/SubjectEdit';
import SubjectDetails from './Pages/SuperAdmin/SubjectDetails';
import TeacherList from './Components/SuperAdmin/TeacherList';
import TeacherEdit from './Pages/SuperAdmin/TeacherEdit';
import TeacherDetails from './Pages/SuperAdmin/TeacherDetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TeacherLayout from './Components/Master/TeacherLayout';
import TeacherSubjectList from './Components/Teacher/SubjectList';
import AddContent from './Pages/Teacher/AddContent';
import { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { createContext } from 'react';
import StudentLayout from './Components/Master/StudentLayout';
import StuSubjectList from './Pages/Student/SubjectList';
import Subject from './Pages/Student/Subject';
//#endregion

const RedirectWithAlert = (navigation) => {
  return (
    <Redirect to={{ pathname: "/login" }} />
  )
}

export const ProgressContext = createContext()

function App() {

  const [progress, setProgress] = useState(0)
  const navigation = useHistory()


  return (
    //#region html
    <ProgressContext.Provider value={{ progress, setProgress }}>
      <Router>
        {
          localStorage.getItem("userModel") == null ?
            RedirectWithAlert(navigation) : ""
        }
        <ToastContainer style={{ width: "400px" }} />
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Switch>
          <LoginLayoutRoute path="/login" component={Login} />
          <LoginLayoutRoute exact path='/login' component={Login} />=
          <SuperAdminLayoutRoute exact path='/SuperAdmin' component={UserList} />
          <SuperAdminLayoutRoute exact path='/' component={UserList} />
          <SuperAdminLayoutRoute exact path='/SuperAdmin/User/Create' component={UserCreate} />
          <SuperAdminLayoutRoute exact path='/SuperAdmin/User/Details' component={UserDetails} />
          <SuperAdminLayoutRoute exact path='/SuperAdmin/User/Edit' component={UserEdit} />
          <SuperAdminLayoutRoute exact path='/SuperAdmin/Teacher/Edit' component={TeacherEdit} />
          <SuperAdminLayoutRoute exact path='/SuperAdmin/Teacher/Details' component={TeacherDetails} />
          <SuperAdminLayoutRoute exact path='/SuperAdmin/Subject/Create' component={SubjectCreate} />
          <SuperAdminLayoutRoute exact path='/SuperAdmin/Subject/Edit' component={SubjectEdit} />
          <SuperAdminLayoutRoute exact path='/SuperAdmin/Subject/Details' component={SubjectDetails} />
          <SuperAdminLayoutRoute exact path='/SuperAdmin/Subject' component={SubjectList} />
          <SuperAdminLayoutRoute exact path='/SuperAdmin/AssignRole/Teacher' component={TeacherList} />
          <TeacherLayout exact path='/Teacher/' component={TeacherSubjectList} />
          <TeacherLayout exact path='/Teacher/AddContent' component={AddContent} />
          <StudentLayout exact path='/Student' component={StuSubjectList} />
          <StudentLayout exact path='/Student/studentlist' component={StuSubjectList} />
          <StudentLayout exact path='/Student/subject' component={Subject} />
        </Switch>
      </Router>
    </ProgressContext.Provider>
    //#endregion
  );
}

export default App;
