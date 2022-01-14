import React, { Component, useState, useEffect } from 'react';
import './style.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {useLocation, useNavigate, useParams, RouteComponentProps} from "react-router";
import ReactMarkdown from 'react-markdown'
import Header from '../Header'
import Contact from '../Contact'
import Side from '../Side'


const Home  = ({work, contact, news, collaborations, playlists}) => {

	/* Groups work by category */
	let ungroupedWorks = work;
	let categories = [];
	let groupedWorks = {};
	
	function openProjAccord(e){
		let el = e.target
		let parent = el.closest('.project');
		if(parent.classList.contains("on")){
			parent.classList.remove("on")
		}else{
			parent.classList.add("on")
		}
	}

	for (var i = work.length - 1; i >= 0; i--) {
		console.log(work[i].fields.Category)
		if(work[i].fields.Category && !categories.includes(work[i].fields.Category)){
			categories.push(work[i].fields.Category);
			groupedWorks[work[i].fields.Category] = []
			groupedWorks[work[i].fields.Category].push(work[i])
		}else if(work[i].fields.Category && categories.includes(work[i].fields.Category)){
			groupedWorks[work[i].fields.Category].push(work[i])
		}
	}
	let works = categories.map((category) => {

   				console.log(groupedWorks[category])
                return (
                	<div className="category-group">
                	   <h1>{category}</h1>
                	   <ul>
                	   {groupedWorks[category].map((project, index) => {
                	   	return(
                	   		<li key={index} className="project">
                	   			<div onClick={openProjAccord} className="project-title"><ReactMarkdown>{project.fields.Title}</ReactMarkdown></div>
                	   			<div className="project-inner">
                	   				<a href={project.fields.Link}><ReactMarkdown>{project.fields.Description}</ReactMarkdown></a>
                	   			</div>
                	   		</li>
                	   		)
                	   })}
                	   </ul>
                	</div>
                  
       
                )

              
          })
	/* end code for grouping work by category */


	

    return (
    	<div className="global-wrapper">
	    	<main>
	    		<Header/>
	    		<Contact contact={contact}/>
	    		<h1 className="work-heading">SELECTED WORK</h1>
	    		<div className="projects-wrapper">
	    			{works}
	    		</div>
	    		
	    	</main>
	    	<Side collaborations={collaborations} news={news} playlist={false}/>
        </div>
    );
}

export default Home;
