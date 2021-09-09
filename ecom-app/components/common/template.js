
// const TestBody = (props) =>{ 
//     let temp = parse(props.template); 
//     return (temp); 
// }
export default function LoadHtmlTemplate({ template }) {
    return <div dangerouslySetInnerHTML={{ __html: template}} />
}