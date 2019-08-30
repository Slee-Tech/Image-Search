import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import ImageResults from './ImageResults';
import search from '../searchImage.svg';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            amount: 15,
            apiURL: 'https://pixabay.com/api/',
            apiKey: process.env.REACT_APP_API_KEY,
            loading: false,
            images: []
        }
        this.onTextChange = this.onTextChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
    }

    onTextChange(e) {
        const val = e.target.value;
        this.setState({
            loading: true,
            [e.target.name]: val
        }, () => {
            if (val === '') {
                this.setState({
                    images: []
                })
            } else {
                // invoke request when search text changes
                axios.get(`${this.state.apiURL}?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
                    .then(res => {
                        this.setState({
                            images: res.data.hits,
                            loading: false
                        })
                    })
                    .catch(err => console.log(err))
            }
        });
    }

    onAmountChange(e, index, value) {
        this.setState({
            amount: e.target.value
        })
    }

    render() {
        console.log(this.state.images);
        return (
            <div>
                <TextField
                    name="searchText"
                    value={this.state.searchText}
                    onChange={this.onTextChange}
                    fullWidth={true}
                    autoFocus={true}
                />

                <Select
                    value={this.state.amount}
                    name="amount"
                    onChange={this.onAmountChange}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                </Select>

                {this.state.searchText === '' ? <div className="row justify-content-center mt-5"><img src={search} height="490" alt="Search" /></div> : null}
                {this.state.images.length > 0 ? <ImageResults images={this.state.images} loading={this.state.loading} /> : null}

            </div>
        )
    }
}

export default Search;