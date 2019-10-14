import React from 'react';

class Canvas extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const img = this.refs.image;
    }

    render() {
        return(
            <div>
                <canvas ref="canvas" width={640} height={425} />
                <img ref="image" src={this.props.imgPreview} className="hidden" />
            </div>
        )
    }
}
export default Canvas
