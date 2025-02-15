import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router";
import "./styles.css";
import Login from '../login';
import ProtectedRoute from "../protected-route";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser, login } from "../../state-management/reducers/logon-reducer";
import Home from "../home";
import { Spinner } from '../index'

const App = ()=>{
    const user = useSelector(state => state.logon.user)
    const loading = useSelector(state => state.logon.checkingLoginStatus)
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(getLoggedInUser())
    }, [])
    //take spinner logic from here and use it in pin-detail and user-profile components
    return (
      loading ? (
        <Spinner message='Loading....!!'/>
      ):(
        user === undefined ? (
          <Login />
        ):
          (
            <div>
            <Routes>
              <Route
                path="/file/*"
                element={
                  <Home />
                }
              />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute> 
                }
              />
             </Routes>
            </div>
          )
      )
    );
  }

export default App;
