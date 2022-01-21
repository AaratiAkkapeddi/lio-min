import React, { Component, useState, useEffect } from 'react';
import './style.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {useLocation, useNavigate, useParams, RouteComponentProps} from "react-router";


const Header  = () => {
    return (
    	<header>
    		<a target="_blank" className="nav" href="/"><h1>Lio Min <span>加州作家</span></h1></a>
        </header>
    );
}

export default Header;
