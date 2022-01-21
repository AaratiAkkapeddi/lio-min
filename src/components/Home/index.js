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


const Home  = ({work, contact,  news, collaborations, playlists}) => {

	/* Groups work by category */
	let ungroupedWorks = work;
	let categories = [];
	let groupedWorks = {};
	let hpPlaylist = false
    for (var i = playlists.length - 1; i >= 0; i--) {
        if(playlists[i].fields.feature_on_hp){
            hpPlaylist = playlists[i].fields["Embed Code"]
        }
    }
    function openAccordion(e){
		let el = e.target
		let parent = el.closest('.accordion');
		if(parent.classList.contains("open")){
			parent.classList.remove("open")
		}else{
			parent.classList.add("open")
		}
	}
    function filterStuff(e){
   	   let el = e.target;
   	   let container = document.querySelector(".projects-wrapper")
       let filters = document.querySelectorAll(".category-filter")
       let groups = document.querySelectorAll(".category-group")
   	   let id = el.id.split("-trigger")[0];
   	   console.log("#"+id + "-group")
   	   let group = document.querySelector("#"+id + "-group");
   	   if(group.classList?.contains('on')){
   	   	group.classList?.remove('on')
   	   	el.classList.remove("on")
   	   }else{
        for (var i = filters.length - 1; i >= 0; i--) {
          filters[i].classList.remove("on")
        }
        for (var i = groups.length - 1; i >= 0; i--) {
          groups[i].classList.remove("on")
        }
   	   	group.classList?.add('on')
   	   	el.classList.add("on")
   	   	if(!container.classList.contains("on")){
   	   		container.classList.add("on")
   	   	}
   	   }
   	   if(!document.querySelector(".category-group.on")){
   	   		container.classList.remove("on")
   	   }
   }
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
	let works = categories.map((category, index) => {


                return (
                	<div key={index} id={category.toLowerCase().split(" ").join("-") + "-group"} className="category-group accordion">
                	   <h1 onClick={openAccordion} className="accordion-trigger">{category}<svg width="25" height="13" viewBox="0 0 25 13" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.999882 1L12.6912 12.25L24.3826 1" stroke="#964B00"/>
					</svg></h1>
                	   <ul className="accordion-inner">
                	   {groupedWorks[category].map((project, index) => {
                	   	return(
                	   		<li key={index} className="project">
                	   			<div onClick={openProjAccord} className="project-title"><ReactMarkdown>{project.fields.Title}</ReactMarkdown></div>
                	   			<div className="project-inner">
                	   				<ReactMarkdown>{project.fields.Description}</ReactMarkdown>
                	   			</div>
                	   		</li>
                	   		)
                	   })}
                	   </ul>
                	</div>
                  
       
                )

              
          })
	
	let filters = categories.map((category, index) => {


                return (
                	<li onClick={filterStuff} key={index} id={category.toLowerCase().split(" ").join("-") + "-trigger"} className="category-filter">
                	   {category} 	   
                	</li>       
                )

              
          })
	/* end code for grouping work by category */


	

    return (
    	<div className="global-wrapper">
	    	<main>
	    		<Header/>
	    		<Contact filters={filters} contact={contact}/>
	    		
	    		<div className="projects-wrapper">
	    		<h1 className="work-heading">SELECTED WORK</h1>
	    			{works}
	    		</div>
	    		
	    	</main>
	    	<Side collaborations={collaborations} news={news} playlist={hpPlaylist}/>
        </div>
    );
}

export default Home;
