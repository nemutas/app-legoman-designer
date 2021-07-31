import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { useSnapshot } from 'valtio';
import { css } from '@emotion/css';

type ProxyType = {
	current: string
	data: {
		[key: string]: {
			color: string
		}
	}
}

type PropsType = {
	state: ProxyType
}

export const ColorPicker: React.FC<PropsType> = ({ state }) => {
	const snap = useSnapshot(state)

	const onChangeHandler = (color: string) => {
		if (snap.current) {
			state.data[snap.current].color = color
		}
	}
	return (
		<div className={sContainer}>
			<HexColorPicker
				className={sPicker}
				color={snap.current ? snap.data[snap.current].color : '#fff'}
				onChange={onChangeHandler}
			/>
		</div>
	)
}

const sContainer = css`
	display: flex;
	align-items: center;
	justify-items: center;
`

const sPicker = css`
	width: 100px;
	height: 100px;
`
