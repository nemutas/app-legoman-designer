import { useSnapshot } from 'valtio';
import { css } from '@emotion/css';
import { Typography } from '@material-ui/core';
import { materialState } from '../../../store/legoState';
import { ColorPicker } from './ColorPiker';
import { EnvironmentSelector } from './EnvironmentSelector';
import { SliderStd } from './SliderStd';

export const LegoController: React.FC = () => {
	const snap = useSnapshot(materialState)

	const onChangeRoughtnessSlider = (value: number) => {
		if (snap.current) {
			materialState.data[snap.current].roughness = value
		}
	}

	const onChangeMetalnessSlider = (value: number) => {
		if (snap.current) {
			materialState.data[snap.current].metalness = value
		}
	}

	return (
		<div className={sCtrlContainer}>
			{/* カラー選択 */}
			<Typography variant="h4" color="textPrimary">
				{snap.current ? snap.current.toUpperCase() : 'NO SELECT'}
			</Typography>
			<div className={sCtrl}>
				<ColorPicker state={materialState} />
			</div>
			{/* 粗さ */}
			<div className={sCtrl}>
				<SliderStd
					label="Roughness"
					range={[0, 1]}
					step={0.1}
					defValue={snap.current ? snap.data[snap.current].roughness : 0}
					onChangeHandler={onChangeRoughtnessSlider}
				/>
			</div>
			{/* 光沢 */}
			<div className={sCtrl}>
				<SliderStd
					label="Metalness"
					range={[0, 1]}
					step={0.1}
					defValue={snap.current ? snap.data[snap.current].metalness : 0}
					onChangeHandler={onChangeMetalnessSlider}
				/>
			</div>
			{/* 周辺環境 */}
			<div className={sCtrl}>
				<EnvironmentSelector />
			</div>
		</div>
	)
}

const sCtrlContainer = css`
	position: absolute;
	top: 15px;
	left: 15px;
	padding: 20px;
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 10px;
`

const sCtrl = css`
	margin-top: 15px;
`
