import React from 'react';
//import { useDispatch } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import SelectInputUnit from '../../../ui/reusables/SelectInputUnit/SelectInputUnit';
import { ReactComponent as SearchIcon } from '../../../../assets/icons/IconSearch.svg';
import { StyledTextField } from '../../../../styles/MainStyles';
import SelectFormControl from '../../../ui/reusables/SelectFormControl/SelectFormControl';
//import CustomPopper from '../../../ui/reusables/CustomPopper/CustomPopper';

const MemberTopbarView = (props) => {
	//const dispatch = useDispatch();

	return (
		<Grid item xs={12}>
			<Grid container direction="row">
				<Grid item container xs={4} justifyContent="flex-end" alignItems="center">
					<Grid item xs={4}>
						<Link to="/home" className={props.classes.styledLinks}>
							<Typography className={props.classes.title}>Home</Typography>
						</Link>
					</Grid>
					<Grid item xs={4}>
						<Link to="/" className={props.classes.styledLinks}>
							Ideas
						</Link>
					</Grid>
					<Grid item xs={4}>
						<Link to="/" className={props.classes.styledLinks}>
							Mkt Calendar
						</Link>
					</Grid>
				</Grid>
				<Grid
					item
					container
					spacing={2}
					xs={8}
					direction="row"
					justifyContent="space-around"
					style={{ borde: '10px solid #f7007c' }}
				>
					<Grid
						item
						xs={5}
						className={props.classes.selectBox}
						style={{ border: '2px solid #f75d14' }}
					>
						<SelectFormControl
							value={props.region}
							valueField="value"
							placeholder="All Regions"
							optionsArray={props.options}
							labelField="name"
							svgRight={17}
							onChange={(e) => props.setRegion(e.target.value)}
						/>
						<Grid item xs={6}>
							<StyledTextField
								id="searchField"
								className={props.classes.search}
								value={props.searchTerm}
								variant="filled"
								fullWidth
								placeholder="Idea/Ticker"
								InputProps={{
									endAdornment: (
										<SearchIcon
											className={props.classes.searchIcon}
											style={{ cursor: 'pointer', stroke: 'none' }}
										/>
									),
								}}
								// onKeyDown={(e) =>
								// 	e.key === 'Enter'
								// 		? dispatch(setProperty({ key: 'search', value: props.searchTerm }))
								// 		: null
								// }
								onChange={(e) => props.setSearchTerm(e.target.value)}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

MemberTopbarView.displayName = 'MemberTopbarView';
MemberTopbarView.defaultProps = {};

export default React.memo(MemberTopbarView);
