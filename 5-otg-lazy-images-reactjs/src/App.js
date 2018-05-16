import "./App.css";

import React, { Component } from "react";

import LazyLoad from 'react-lazyload';
import Loader from 'react-loader';
import Modal from 'react-responsive-modal';

const styles = {
	pageHeading: {
		color: "#fff", 
		backgroundColor: "#000", 
		padding: 20, 
		borderRadius: 25
	},
	itemTitleColor: {
		color: "#fff"
	}
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			open: false,
			itemTitle: "Default Title",
			itemUrl: "http://placehold.it/150/92c952",
			loading: null
		};
	}

	componentDidMount = async () => {
		await this.setState({ loading: true });
		await this.getDataFromApi();
		await this.setState({ loading: false });
	}

	onClick = item => this.setState({ open: true, itemTitle: item.title, itemUrl: item.url });

	onCloseModal = () => this.setState({ open: false });

	getDataFromApi = async () => {
		const res = await fetch("https://jsonplaceholder.typicode.com/photos");
		const json = await res.json();
		await this.setState({ data: json });
	};

	render() {
		const { open } = this.state;
		if (this.state.loading !== null && this.state.data) {
			return (
				<div className="lazyLoaderContainer">
					<h1 style={styles.pageHeading}>
						React.js Lazy Loader
					</h1>
					<Modal
						animationDuration={400}
						isVisible={this.state.open}
						open={open}
						onClose={this.onCloseModal}
					>
						<div className="modalContainer">
							<div className="modalTitle">
								{this.state.itemTitle}
							</div>
							<div>
								<img className="fullScreenImage" src={this.state.itemUrl} alt="API Item" />
							</div>
						</div>
					</Modal>
					{this.state.data.map((item, index) => (
						<LazyLoad key={`images_${index}`} height={210} offset={400} once>
							<div className="itemBox">
								<span className="title" style={styles.itemTitleColor}>{item.title}</span>
								<div className="image" onClick={() => this.onClick(item)}>
									<img className="imageShadow" src={item.thumbnailUrl} alt="API Item" />
								</div>
							</div>
						</LazyLoad>
					))}
				</div>
			);
		} else {
			return (
				<Loader className="bg" loaded={!this.state.loading} color="#ffff" />
			)
		}
	}
}

export default App;