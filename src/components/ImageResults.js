import React from 'react';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';

class ImageResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            currentImage: '',
            loaded: false
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen(img) {
        this.setState({
            open: true,
            currentImage: img
        })
    }

    handleClose() {
        this.setState({
            open: false
        })
    }

    render() {
        let imageListContent;
        const images = this.props.images;

        if (this.props.loading) {
            return (
                <div className="text-center mt-5">
                    <CircularProgress />
                </div>
            )
        }
        if (images) {
            imageListContent = (
                <GridList cols={3} >
                    {images.map(img => (

                        <GridListTile className="justify-content-center text-center" >

                            {
                                // displays progress bar while image is loading
                            }
                            <>
                                <img
                                    style={{ display: this.state.loaded ? 'block' : 'none' }}
                                    src={img.largeImageURL}
                                    onLoad={() => this.setState({ loaded: true })}
                                    alt=''
                                />
                                {!this.state.loaded && <CircularProgress className="mt-5" />}
                            </>
                            <GridListTileBar
                                title={img.tags}
                                key={img.id}
                                actionIcon={
                                    <IconButton onClick={() => this.handleOpen(img.largeImageURL)} aria-label={`info about ${img.title}`}>
                                        <ZoomInIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))};

                </GridList>
            )

        } else {
            imageListContent = null;
        }

        const actions = [
            <Button label="Close" primary={true} onClick={this.handleClose} />
        ]
        return (
            <div>
                {imageListContent}
                <Dialog
                    //actions={actions}
                    modal="false"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <img src={this.state.currentImage} alt="" style={{ width: "100%" }} />
                    {/*<DialogActions>
                        <IconButton onClick={this.handleClose} >
                            <CloseIcon />
                        </IconButton>
                    </DialogActions>*/}
                </Dialog>

            </div>
        )
    }
}

// ensures an array is passed as props
ImageResults.propTypes = {
    images: PropTypes.array.isRequired
}
export default ImageResults;