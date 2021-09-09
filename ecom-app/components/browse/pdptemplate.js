import React from "react";
import styled from "styled-components";
import LoadHtmlTemplate from '../common/template';
import Mustache from 'mustache';

const PDPBody = styled.div`
  color: black;
  font-weight: bold;
  font-family: Segoe UI, sans-serif;
`; 

const PDPTemplate = (props) => {
    let template = props.template 
    let rendered = Mustache.render(template, props); 
    return (
      <PDPBody>   
           <LoadHtmlTemplate template = {rendered} /> 
      </PDPBody>
    );
};
  
export default PDPTemplate; 
 