import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import SelectInputUnit from '../SelectInputUnit/SelectInputUnit';
import { ReactComponent as SearchIcon } from '../../../../assets/icons/IconSearch.svg';
import { useStyles, StyledTextField, AddButton } from '../../../../styles/MainStyles';
import NewCompanyStepper from '../../salesman/newCompanySteps/NewCompanyStepper/NewCompanyStepper';
import NewUserModal from '../../admin/NewUserModal/NewUserModal.jsx';

const typeArray = [
	{
		value: 'all',
		name: 'All',
	},
	{
		value: 'client',
		name: 'Client',
	},
	{
		value: 'prospect',
		name: 'Prospect',
	},
];

const statusArray = [
	{
		value: 'all',
		name: 'All',
	},
	{
		value: false,
		name: 'Inactive',
	},
	{
		value: true,
		name: 'Active',
	},
];

const FiltersView = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	return (
		<Grid container justifyContent="space-between" alignItems="center">
			<Grid item xs={8}>
				<Grid container spacing={1}>
					<Grid item xs={props.pageType !== 'companies' ? 6 : 4}>
						<StyledTextField
							value={props.localSearch}
							variant="outlined"
							fullWidth
							placeholder="Search"
							InputProps={{
								endAdornment: (
									<SearchIcon
										className={classes.searchIcon}
										style={{ cursor: 'pointer' }}
										onClick={() =>
											dispatch(
												props.setProperty({
													key: 'search',
													value: props.localSearch,
												}),
											)
										}
									/>
								),
							}}
							onChange={(e) => props.setLocalSearch(e.target.value)}
							onKeyDown={(e) =>
								e.key === 'Enter'
									? dispatch(props.setProperty({ key: 'search', value: props.localSearch }))
									: null
							}
						/>
					</Grid>
					{props.pageType === 'companies' && (
						<Grid item xs={4}>
							<SelectInputUnit
								className={classes.autoCompleteStyle}
								name="type"
								label={props.type ? '' : 'Type'}
								optionLabelField="name"
								valueField="value"
								placeholder="Type"
								value={props.type}
								native={false}
								optionsArray={typeArray}
								onChange={(e) =>
									dispatch(props.setProperty({ key: 'type', value: e.target.value }))
								}
							/>
						</Grid>
					)}
					<Grid item xs={props.pageType !== 'companies' ? 6 : 4}>
						<SelectInputUnit
							className={classes.autoCompleteStyle}
							name="status"
							label={
								props.status !== undefined && props.status !== null && props.status !== ''
									? ''
									: 'Status'
							}
							optionLabelField="name"
							valueField="value"
							placeholder="Status"
							value={props.status}
							optionsArray={statusArray}
							onChange={(e) =>
								dispatch(props.setProperty({ key: 'status', value: e.target.value }))
							}
						/>
					</Grid>
				</Grid>
			</Grid>
			<AddButton disableRipple style={{ marginRight: '8px' }} onClick={props.handleOpen}>
				<AddIcon className={classes.addIcon} />
				{' '}
				<Typography style={{ color: '#FFFFFF' }}>&nbsp;&nbsp;New&nbsp;</Typography>
			</AddButton>
			<NewCompanyStepper
				open={props.pageType === 'companies' && props.open}
				handleClose={props.handleClose}
			/>

			<NewUserModal
				open={props.pageType !== 'companies' && props.open}
				userType={props.userType}
				handleClose={props.handleClose}
			/>
		</Grid>
	);
};

FiltersView.displayName = 'FiltersView';
FiltersView.defaultProps = {};

export default React.memo(FiltersView);
