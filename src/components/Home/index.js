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



const Home  = ({work, contact, news, collaborations, playlists}) => {

	/* Groups work by category */
	let ungroupedWorks = work;
	let categories = [];
	let groupedWorks = {};
	

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
                	   {groupedWorks[category].map((project) => {
                	   	return(
                	   		<div className="project">
                	   			<div className="project-title"><ReactMarkdown>{project.fields.Title}</ReactMarkdown></div>
                	   			<div className="project-inner">
                	   				<a href={project.fields.Link}><ReactMarkdown>{project.fields.Description}</ReactMarkdown></a>
                	   			</div>
                	   		</div>
                	   		)
                	   })}
                	</div>
                  
       
                )

              
          })
	/* end code for grouping work by category */

	/* gets contact links */
	let contacts = contact.map((contactItem, index) =>{
		if(contactItem.fields.Text){
		return (
			<>	
				{ index !== 0 &&
					<span> / </span>
				}
				<a href={contactItem.fields.Url}>{contactItem.fields.Text}</a>
			</>
				)
			
		}
	})

	/* gets collaborations links */
	let collaborationitems = collaborations.map((collaborationItem) =>{
		if(collaborationItem.fields.Text){
			return (
		
				<a href={collaborationItem.fields.Link}><ReactMarkdown>{collaborationItem.fields.Text}</ReactMarkdown></a>
		
				)
		}
	})

	/* gets news items */
	let newsitems = news.map((newsItem) =>{
		if(newsItem.fields.NewsText){
			return (
		
				<div className="news-item">
					<span>{newsItem.fields["Date To Show"]}</span> - 
					<ReactMarkdown>{newsItem.fields.NewsText}</ReactMarkdown>
				</div>
		
				)
		}
	})
	

    return (
    	<>
    		{contacts}
    		{works}
    		{collaborationitems}
    		{newsitems}
        </>
    );
}

export default Home;
