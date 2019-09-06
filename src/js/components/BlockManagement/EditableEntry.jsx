import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
//material UI
import { Button, withStyles, TextField } from '@material-ui/core';

const styles = (theme) => ({
	entryWrapper: {
		position: 'relative',
		width: '100%',
		padding: '10px 15px',
		backgroundColor: '#fff',
		border: '1px solid #ddd',
		'&:hover': {
			border: '1px solid #eea236',
		},
	},
	entry: {
		width: '100%',
		position: 'relative',
		border: '1px solid transparent',
		borderRadius: 3,
		'&:hover': {
			border: '1px solid #ccc',
		},
	},
	icon: {
		fontSize: '1rem',
		position: 'absolute',
		top: 6,
		left: 5,
	},
	entryInput: {
		padding: '5px 0 4px 25px',
		width: '100%',
		border: '1px solid transparent',
		margin: 0,
		'& .MuiFilledInput-multiline.MuiFilledInput-marginDense': {
			padding: 0,
			backgroundColor: 'transparent',
			height: 'auto',
			'&::before': {
				content: 'none',
			},
		},
		'& .MuiFilledInput-underline:after': {
			borderBottom: 'none',
		},
	},
	actionsWrapper: {
		position: 'absolute',
		zIndex: 1,
		right: -1,
		bottom: -42,
		backgroundColor: '#fff',
		border: '1px solid #eea236',
		borderTop: 0,
		borderBottomRightRadius: 3,
		borderBottomLeftRadius: 3,
		'& > div': {
			padding: '0 5px 5px',
			display: 'inline-flex',
			'& button': {
				marginRight: 3,
				'&:last-child': {
					marginRight: 0,
				},
			},
		},
	},
	saveClearWrapper: {
		position: 'relative',
		right: 0,
		bottom: 0,
		zIndex: 1,
		'& > div': {
			display: 'inline-flex',
			position: 'absolute',
			top: 1,
			right: 0,
		},
	},
	editBtn: {
		backgroundColor: '#f0ad4e',
		color: '#fff',
		minWidth: 30,
		padding: '1px 5px',
		'&:nth-of-type(1)': {
			marginRight: 1,
		},
		'&:hover': {
			backgroundColor: '#ec971f',
		},
	},
});

class EditableEntry extends Component {
	state = {
		isHover: false,
	};

	entryWrapper = createRef();

	//show buttons on mouse enter
	handleMouseEnter = () => {
		this.setState({ isHover: true });
	};

	//hide buttons on mouse leave
	handleMouseLeave = () => {
		this.setState({ isHover: false });
	};

	//send value of the input and the index of the current entry
	handleInput = ({ target: { value } }) => {
		const { editInput, index } = this.props;
		editInput(index, value);
	};

	//show save & cancel buttons of the current entry
	showSaveCancelBtns = () => {
		const { showSaveCancelBtns, index } = this.props;
		showSaveCancelBtns(index, this.entryWrapper);
	};

	//cancel editing input
	cancelEditing = () => {
		const { hideSaveCancelBtns, index } = this.props;
		hideSaveCancelBtns(index);
	};

	//save the value of the current entry
	saveEntry = () => {
		const { saveEntry, index } = this.props;
		saveEntry(index);
	};

	render() {
		const { isHover } = this.state,
			{ isEditing, classes, entryText, buttons, index } = this.props;
		return (
			<div
				className={classes.entryWrapper}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
				ref={this.entryWrapper}
			>
				<div className={classes.entry}>
					<div>
						<div className={classes.icon}>
							<i className="fas fa-pen" />
						</div>
						<TextField
							value={entryText}
							className={classes.entryInput}
							onFocus={this.showSaveCancelBtns}
							onChange={this.handleInput}
							margin="dense"
							variant="filled"
							multiline
						/>
					</div>
					{isEditing && (
						<div className={classes.saveClearWrapper}>
							<div>
								<Button variant="contained" className={classes.editBtn} onClick={this.saveEntry}>
									&#10004;
								</Button>
								<Button
									variant="contained"
									className={classes.editBtn}
									onClick={this.cancelEditing}
								>
									&#10006;
								</Button>
							</div>
						</div>
					)}
				</div>
				{isHover && !isEditing && (
					<div className={classes.actionsWrapper}>
						<div>
							{buttons.map((el, i) => (
								<Button
									key={i}
									variant="contained"
									color={el.color}
									onClick={() => el.click(index)}
								>
									{el.label}
								</Button>
							))}
						</div>
					</div>
				)}
			</div>
		);
	}
}

EditableEntry.propTypes = {
	entryText: PropTypes.string,
	buttons: PropTypes.array,
	isEditing: PropTypes.bool,
	index: PropTypes.number,
	hideSaveCancelBtns: PropTypes.func,
	showSaveCancelBtns: PropTypes.func,
	editInput: PropTypes.func,
	saveEntry: PropTypes.func,
};

export default withStyles(styles)(EditableEntry);
