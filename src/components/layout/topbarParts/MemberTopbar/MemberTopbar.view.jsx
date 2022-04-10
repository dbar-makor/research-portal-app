import React from 'react';
//import { useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
// import SelectInputUnit from '../../../ui/reusables/SelectInputUnit/SelectInputUnit';
import { ReactComponent as SearchIcon } from '../../../../assets/icons/IconSearch.svg';
import { StyledTextField } from '../../../../styles/MainStyles';
//import CustomPopper from '../../../ui/reusables/CustomPopper/CustomPopper';

const MemberTopbarView = (props) => {
	//const dispatch = useDispatch();

	return (
		<Grid item xs={12}>
			<Grid container direction="row">
				<Grid item xs={6}>
					<StyledTextField
						id="searchField"
						className={props.classes.search}
						value={props.searchTerm}
						variant="filled"
						fullWidth
						placeholder="Search"
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
	);
};

MemberTopbarView.displayName = 'MemberTopbarView';
MemberTopbarView.defaultProps = {};

export default React.memo(MemberTopbarView);
