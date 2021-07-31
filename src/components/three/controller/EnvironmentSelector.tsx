import React from 'react';
import { proxy, useSnapshot } from 'valtio';
import { FormControl, MenuItem, Select, Typography } from '@material-ui/core';

type PresetType =
	| 'sunset'
	| 'dawn'
	| 'night'
	| 'warehouse'
	| 'forest'
	| 'apartment'
	| 'studio'
	| 'city'
	| 'park'
	| 'lobby'

export const envState = proxy<{ preset: PresetType }>({
	preset: 'sunset'
})

export const EnvironmentSelector: React.FC = () => {
	const snap = useSnapshot(envState)

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		envState.preset = event.target.value as PresetType
	}

	const envPresets: PresetType[] = [
		'sunset',
		'dawn',
		'night',
		'warehouse',
		'forest',
		'apartment',
		'studio',
		'city',
		'park',
		'lobby'
	]

	return (
		<FormControl style={{ width: '200px' }}>
			<Typography gutterBottom color="textPrimary">
				Environment
			</Typography>
			<Select
				labelId="environment-select-label"
				id="environment-select"
				value={snap.preset}
				onChange={handleChange}>
				{envPresets.map((preset, i) => (
					<MenuItem key={i} value={preset}>
						{preset}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}
