import Head from 'next/head'
import Image from 'next/image' 
import { gql } from "@apollo/client";
import client from "../../../lib/apollo-client"; 
import styled, { createGlobalStyle } from 'styled-components';
import React from 'react';
import LoadHtmlTemplate from '../../../components/common/template';
import PDPTemplate from '../../../components/browse/pdptemplate';

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  word-wrap: break-word;
  }
  body {
    font-family: Arial, Helvetica, Verdana, sans-serif;
    font-size: 16px;
    font-weight: normal;
    letter-spacing: .03rem;
    margin: 0 auto;
  }
  h1 {
    font-size: 4rem;
  }
  a {
    color: #bf9e5f;
    text-decoration: none;
    cursor: pointer;
  }
  a:hover {
    text-decoration: underline;
  }
  img {
    border: 0px;
    width: 100%;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  text-align: center;
`;


const HeaderStyle = styled.div`${props => props.headerTemplate.Header.WidgetBinder.Style}`; 
const MenuStyle = styled.div`${props => props.headerTemplate.Header.Menu.WidgetBinder.Style}`;
const PDPPageStyle = styled.div`${props => props.pdpPageTemplate.PDPBody.WidgetBinder.Style}`;

const Footer = styled.div`${props => props.footerTemplate.Footer.WidgetBinder.Style}`;
   


export default function PDPPage({headerTemplate, pdpPageTemplate, pdpPageData,footerTemplate}) {
  // 

  return (  
  <div>   
      <HeaderStyle headerTemplate={headerTemplate}> 
        <LoadHtmlTemplate template = {headerTemplate.Header.WidgetBinder.Template}/> 
      </HeaderStyle>

      <MenuStyle headerTemplate={headerTemplate}>
          <LoadHtmlTemplate template = {headerTemplate.Header.Menu.WidgetBinder.Template } />  
          <script type="text/javascript"
            dangerouslySetInnerHTML={{ __html: headerTemplate.Header.Menu.WidgetBinder.Script}}>
        </script>
      </MenuStyle> 

      <PDPPageStyle  pdpPageTemplate={pdpPageTemplate}>
          <PDPTemplate template = {pdpPageTemplate.PDPBody.WidgetBinder.Template } 
                  product = {pdpPageData} />  
       </PDPPageStyle>

      <Footer footerTemplate={footerTemplate}>
        <LoadHtmlTemplate template = {footerTemplate.Footer.WidgetBinder.Template }/>  
      </Footer>  
    </div>
  )
}
export async function getStaticPaths() {
  return {
    paths: [
      { params: { store: 'Site1' ,productid : "1"} },
      { params: { store: 'Site1' ,productid : "2"} }
    ],
    fallback: "blocking"
  };
} 
export async function getStaticProps({params ,preview = false}) {

  console.log("preview :: "+ preview)

  let publishState = preview ? "PREVIEW" : "LIVE" ;

  const { data } = await client.query({
    query: gql`
      query page ($storeIdentifier: String , $publicationState: PublicationState) {
  
      headerTemplates(sort:"updated_at:DESC",publicationState : $publicationState, where :{storeIdentifier:$storeIdentifier}){
        id,
        Header{
          Menu{
            WidgetBinder{
              Template
              Style
              Script
            }
          }
          WidgetBinder{
            Template
            Style
            
          }
        } 
      }
      pdpPageTemplates(sort:"updated_at:DESC", 
        publicationState :$publicationState, 
        where :{storeIdentifier:$storeIdentifier}){
          
          PDPBody{
            APIBinder{
              Name
              externalAPI
            }
            WidgetBinder{
              Style
              Template
              Data
            }
            
          }
      }
      footerTemplates(sort:"updated_at:DESC", 
        publicationState : $publicationState, 
        where :{storeIdentifier:$storeIdentifier}){

        Footer{
          WidgetBinder{
            Template
            Style
          }
        }
      }
    }
    `,
    variables:{
      "storeIdentifier" :params.store ,
      "publicationState": publishState
    }
  });

  if(data.pdpPageTemplates[0]==null){ 
    return {
      props: {
        headerTemplate  : data.headerTemplates[0],
        pdpPageTemplate :{
                          "PDPBody": {
                            "WidgetBinder": {
                              "Style": ".stores{\ncolor: \"blue\"\n}",
                              "Template": "Sorry !!! Invalid Product Page  "
                            }
                          }
                        },
        footerTemplate  : data.footerTemplates[0]
      },
      revalidate: 60

    };
  }else{

    let pdpurl = data.pdpPageTemplates[0].PDPBody.APIBinder.externalAPI;
    let seourl = params.productid;
    pdpurl = pdpurl.replace('{0}',seourl)
    console.log(pdpurl)
    const res = await fetch(pdpurl)
    const pdpdata = await res.json()
      
    return {
      props: {
        headerTemplate  : data.headerTemplates[0],
        pdpPageTemplate : data.pdpPageTemplates[0],
        pdpPageData     : pdpdata,
        footerTemplate  : data.footerTemplates[0]
      },
      revalidate: 60

    };

  }
}
