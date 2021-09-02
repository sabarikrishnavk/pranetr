import Head from 'next/head'
import Image from 'next/image' 
import { gql } from "@apollo/client";
import client from "../../lib/apollo-client"; 
import styled, { createGlobalStyle } from 'styled-components';

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
const HomePageStyle = styled.div`${props => props.homePageTemplate.HomeBody.WidgetBinder.Style}`;
const Footer = styled.div`${props => props.footerTemplate.Footer.WidgetBinder.Style}`;
   
export default function Home({headerTemplate,homePageTemplate, footerTemplate}) {
  // 
  return (  
  <div>   
      <HeaderStyle headerTemplate={headerTemplate}>
        <div dangerouslySetInnerHTML={{ __html: headerTemplate.Header.WidgetBinder.Template }} />  
      </HeaderStyle>

      <MenuStyle headerTemplate={headerTemplate}>
          <div dangerouslySetInnerHTML={{ __html: headerTemplate.Header.Menu.WidgetBinder.Template }} />  
          <script type="text/javascript"
            dangerouslySetInnerHTML={{ __html: headerTemplate.Header.Menu.WidgetBinder.Script}}>
        </script>
      </MenuStyle> 
      <HomePageStyle  homePageTemplate={homePageTemplate}>
          <div dangerouslySetInnerHTML={{ __html: homePageTemplate.HomeBody.HomeBanner }} />  
          <div dangerouslySetInnerHTML={{ __html: homePageTemplate.HomeBody.HomeRow1 }} />  
          <div dangerouslySetInnerHTML={{ __html: homePageTemplate.HomeBody.HomeRow2 }} />  
          <div dangerouslySetInnerHTML={{ __html: homePageTemplate.HomeBody.HomeRow3 }} />   
          <div dangerouslySetInnerHTML={{ __html: homePageTemplate.HomeBody.HomeRow4 }} />  
      </HomePageStyle>

      <Footer footerTemplate={footerTemplate}>
        <div dangerouslySetInnerHTML={{ __html: footerTemplate.Footer.WidgetBinder.Template }} />  
      </Footer>  
    </div>
  )
}
export async function getStaticPaths() {
  return {
    paths: [
      { params: { store: 'Site1' } },
      { params: { store: 'Site2' } }
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

      homePageTemplates(sort:"updated_at:DESC", publicationState :$publicationState, where :{storeIdentifier:$storeIdentifier   }){
        storeIdentifier
        HomeBody{
          WidgetBinder{
            Style
          }
          HomeBanner
          HomeRow1
          HomeRow2
          HomeRow3
          HomeRow4
        } 
      }

      footerTemplates(sort:"updated_at:DESC", publicationState : $publicationState, where :{storeIdentifier:$storeIdentifier}){
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

  //console.log("Home Body "+ JSON.stringify(data.homePageTemplates[0].HomeBody .WidgetBinder.Style))

  return {
    props: {
      headerTemplate    : data.headerTemplates[0],
      homePageTemplate  : data.homePageTemplates[0],
      footerTemplate    : data.footerTemplates[0]
    },
    revalidate: 60

 };
}
