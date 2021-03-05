import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PdfReceipt from '../PdfReceipt/PdfReceipt';
import Resizer from 'react-image-file-resizer';
import Patientpicture from '../ImageUploader/Patientpicture';

const PatientDetails = () => {
    const [state, setState] = useState({
        title: '',
        content: '',
        image: '',
        postSubmitted: false
    });

    const resizeFile = (file) => new Promise(resolve => {
        Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
            uri => {
                resolve(uri);
            },
            'base64'
        );
    });


    const { register, handleSubmit, errors } = useForm(); // initialize the hook
    const onSubmit = async (data) => {       
            setState({title: data.title , image: state.image, content: data.content , postSubmitted: true})
        }
     
    const onChange = async (event) => { 
        try {
            const file = event.target.files[0];
            const image1 = await resizeFile(file);
            setState({ image: image1 })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            { !state.postSubmitted ? 
        <div className="container">
            <div className="jumbotron mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="well well-sm">
                            <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                                <fieldset>
                                    <legend className="text-center header">Add new Post</legend>
                                    <div className="form-group">
                                        <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-user bigicon"></i></span>
                                        <input name="title" type="text" ref={register({ required: true })} placeholder="Post Title" className="form-control" />
                                        {errors.title && 'Title is required.'}
                                    </div>
                                    <div className="form-group">
                                        <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-user bigicon"></i></span>
                                        <input name="image" type="file" onChange={onChange} 
                                        ref={register({ required: true })} placeholder="https://" className="form-control" />
                                        {errors.image && 'Image is required.'}
                                    </div>
                                    <div className="form-group">
                                        <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-pencil-square-o bigicon"></i></span>
                                        <textarea className="form-control" ref={register({ required: true })} name="content" placeholder="Enter your text here" rows="7"></textarea>
                                        {errors.content && 'Details is required.'}
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        : 
        <PdfReceipt title={state.title} content={state.content} image={state.image} />
        // <Patientpicture title={state.title} content={state.content} image={state.image} />
        }
        </div>
    );
};

export default PatientDetails;