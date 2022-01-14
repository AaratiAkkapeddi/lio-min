import React, { Component, useState, useEffect } from 'react';
import './style.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {Nav} from "../"
import {useLocation, useNavigate, useParams, RouteComponentProps} from "react-router";
import ReactMarkdown from 'react-markdown'

const Playlist = ({work, contact, news, collaborations, playlists}) => {
	const { id } = useParams()
    let currentPlaylist;
    let iframeSrc = ''
    for (var i = playlists.length - 1; i >= 0; i--) {
        if(playlists[i].fields.Slug?.trim() === id){
            currentPlaylist = playlists[i]
        }
    }


    return (
    	<>
		{currentPlaylist ?
            <>
                <h1>{currentPlaylist.fields.Title}</h1>
                <div dangerouslySetInnerHTML={{__html: currentPlaylist.fields["Embed Code"]}} />
            </>
            :
            <>
                <h1>Oh no! The page you are looking for does not exist. Try going back <a href="/">home.</a></h1>
            </>
        }
        </>
    );
}

export default Playlist;