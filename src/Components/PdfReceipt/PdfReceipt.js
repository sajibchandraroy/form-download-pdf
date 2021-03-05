import React from 'react';
import './PdfReceipt.css';
import ReactToPdf from "react-to-pdf";

const PdfReceipt = (props) => {
    console.log(props)
    const ref = React.createRef();
    
    return (
        <div>
            <ReactToPdf targetRef={ref} filename="div-blue.pdf"  >
                {({ toPdf }) => (
                    <button onClick={toPdf}>Generate pdf</button>
                )}
            </ReactToPdf>
            <div className="Post" ref={ref} >
                <h1>{props.title}</h1>
                <img src={props.image} alt={props.title} />
                <p>{props.content}</p>
            </div>
        </div>
        
    );
};

export default PdfReceipt;