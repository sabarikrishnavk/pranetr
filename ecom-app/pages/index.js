import Head from 'next/head'
import Image from 'next/image' 
import { gql } from "@apollo/client";
import client from "../lib/apollo-client"; 
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
const Footer = styled.div`${props => props.footerTemplate.Footer.WidgetBinder.Style}`;
   
export default function Home({headerTemplate, footerTemplate}) {
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

      <Footer footerTemplate={footerTemplate}>
        <div dangerouslySetInnerHTML={{ __html: footerTemplate.Footer.WidgetBinder.Template }} />  
      </Footer>  
    </div>
  )
}
export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
     query page ($storeIdentifier: String) {
  
      headerTemplates(sort:"published_at:DESC", where :{storeIdentifier:$storeIdentifier}){
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
      footerTemplates(sort:"published_at:DESC", where :{storeIdentifier:$storeIdentifier}){
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
      "storeIdentifier" :"Site1"
    }
  });

  return {
    props: {
      headerTemplate: data.headerTemplates[0],
      footerTemplate: data.footerTemplates[0]
    },
    revalidate: 60

 };
}
