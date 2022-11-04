import React, { useState, useEffect,createContext,useContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';


const GithubContext=createContext();

//provider,consumer-githuContext.provider

const GithubProvider=({children})=>{

   const[GithubUser,setGithubUser]=useState(mockUser);
   const[Repos,setRepos]=useState(mockRepos);
   const[Followers,setFollowers]=useState(mockFollowers);
   const[requests,setRequests]=useState(0);
   const[loading,setLoading]=useState(false);
   const[error,setError]=useState({show:false,msg:''});




   const searchGithubUser=async(user)=>{

     toggleError();
     setLoading(true);

    const repsonse=await axios(`${rootUrl}/users/${user}`).catch(error=>{console.log(error)})

    if(repsonse){

        setGithubUser(repsonse.data)
        const {login,followers_url}=repsonse.data;

        await Promise.allSettled([axios(`${rootUrl}/users/${login}/repos?per_page=100`),axios(`${followers_url}?per_page=100`)]).then((result)=>{
    
            const [repos,followers]=result;
            const status='fulfilled';

            if(repos.status===status){
               setRepos(repos.value.data)
            }
            if(followers.status===status){
               setFollowers(followers.value.data)
            }
            
            
        }).catch(error=>console.log(error))

        
    }else{
        toggleError(true,'there is not user with this username')
    }

    setLoading(false)

   }


   

   
   const checkRequests=()=>{

    axios(`${rootUrl}/rate_limit`).then(({data})=>{
        let {rate:{remaining}}=data;
        setRequests(remaining);
        
        if(remaining===0){
            toggleError(true,'sorry,you have exceded your hourly rate limit!')
        }
    })
     
   }


   useEffect(checkRequests,[]);

 
  function toggleError(show=false,msg=""){
    setError({show:show,msg:msg})
  }
    



    return <GithubContext.Provider value={{GithubUser,Repos,Followers,requests,error,searchGithubUser,loading}}>{children}</GithubContext.Provider>
}


const useGlobalContext=()=>{
    return  useContext(GithubContext)
}



export{GithubProvider,useGlobalContext,GithubContext}