import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
//material UI
import { Button, withStyles } from '@material-ui/core';
//constants
import { orange, orangeHover, white } from '../../constants/Colors';

const styles = (theme) => ({
	entriesWrapper: {
		width: '100%',
		borderTop: '1px solid #ddd',
		borderBottom: '1px solid #ddd',
		borderRadius: theme.spacing(0.5), //4px
		boxShadow: '0 1px 1px rgba(0, 0, 0, 0.05)',
		fontSize: '0.875rem',
		marginBottom: 40,
	},
	entriesTitle: {
		width: '100%',
		padding: '10px 15px',
		color: white,
		backgroundColor: '#de8f20',
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
		borderBottom: '1px solid #ddd',
		borderLeft: '1px solid #ddd',
		borderRight: '1px solid #ddd',
		fontSize: '1.3rem',
		margin: 0,
	},
	addEntryWrapper: {
		width: '100%',
		borderLeft: '1px solid #ddd',
		borderRight: '1px solid #ddd',
		height: 50,
		backgroundColor: '#fff',
		position: 'relative',
		'& > div': {
			right: -1,
			border: `1px solid #ddd`,
			bottom: -36,
			zIndex: 1,
			position: 'absolute',
			borderTop: 0,
			borderBottomLeftRadius: 5,
			borderBottomRightRadius: 5,
			padding: '0 3px 5px 3px',
			backgroundColor: white,
			'& button': {
				color: white,
				backgroundColor: orange,
				padding: '3px 8px',
				'&:hover': {
					backgroundColor: orangeHover,
				},
			},
		},
	},
	icon: {
		marginRight: 3,
	},
});

class EditableEntriesWrapper extends Component {
	entriesWrapper = createRef();

	//send the ref of the entries wrapper to the parent so that we can handle hiding or showing the save & cancel buttons
	sendRefToParent = () => {
		const { getWrapperRef } = this.props;
		getWrapperRef(this.entriesWrapper);
	};

	render() {
		const { classes, title, children, click, label } = this.props;
		return (
			<div
				className={classes.entriesWrapper}
				ref={this.entriesWrapper}
				onClick={this.sendRefToParent}
			>
				<h1 className={classes.entriesTitle}>{title}</h1>
				{children}
				<div className={classes.addEntryWrapper}>
					<div>
						<Button variant="contained" onClick={click}>
							<i className={`fas fa-plus ${classes.icon}`} />
							{label}
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

EditableEntriesWrapper.propTypes = {
	title: PropTypes.string,
	label: PropTypes.string,
	click: PropTypes.func,
	getWrapperRef: PropTypes.func,
};

export default withStyles(styles)(EditableEntriesWrapper);
