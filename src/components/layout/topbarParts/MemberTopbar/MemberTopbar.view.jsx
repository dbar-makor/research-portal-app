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
		<Grid item xs={8}>
			<Grid container justifyContent="space-between">
				<Grid item xs={6}>
					<Grid container style={{ marginTop: '10px' }}>
						<Grid item xs={4}>
							<Link to="/home" className={props.classes.link}>
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
				</Grid>
				<Grid item xs={6}>
					<Grid container direction="row" justifyContent="flex-end" alignItems="center">
						<Grid item xs={5} className={props.classes.selectBox}>
							<SelectFormControl
								value={props.region}
								valueField="value"
								placeholder="All Regions"
								optionsArray={props.options}
								labelField="name"
								svgRight={17}
								onChange={(e) => props.setRegion(e.target.value)}
							/>
						</Grid>
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
