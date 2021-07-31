import React from 'react';
import { Slider, Tooltip, Typography } from '@material-ui/core';

type PropsType = {
	label: string
	range: [number, number]
	step: number
	defValue: number
	onChangeHandler: (value: number) => void
}

export const SliderStd: React.FC<PropsType> = props => {
	const { label, range, step, defValue, onChangeHandler } = props

	const handleSliderChange = (event: any, newValue: number | number[]) => {
		const value = Array.isArray(newValue) ? newValue[0] : newValue
		onChangeHandler(value)
	}

	return (
		<div>
			<Typography gutterBottom color="textPrimary">
				{label}
			</Typography>
			<Slider
				ValueLabelComponent={ValueLabelComponent}
				aria-label="custom thumb label"
				min={range[0]}
				max={range[1]}
				step={step}
				value={defValue}
				onChange={handleSliderChange}
			/>
		</div>
	)
}

type VLCPropsType = {
	children: React.ReactElement
	open: boolean
	value: number
}

const ValueLabelComponent: React.FC<VLCPropsType> = props => {
	const { children, open, value } = props

	return (
		<Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
			{children}
		</Tooltip>
	)
}
