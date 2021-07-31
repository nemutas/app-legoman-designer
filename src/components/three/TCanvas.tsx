import { VFC } from 'react';
import { css } from '@emotion/css';
import { Canvas } from '@react-three/fiber';
import { LegoController } from './controller/LegoController';
import { Lego } from './Lego';

export const TCanvas: VFC = () => {
	return (
		<div className={sContainer}>
			<Canvas camera={{ fov: 50, position: [0, 1, 5] }} dpr={[1, 2]} shadows>
				<Lego />
			</Canvas>
			<LegoController />
		</div>
	)
}

const sContainer = css`
	position: relative;
	width: 100%;
	height: 100vh;
	/* canvasの背景色を指定しないと、textrueを割り当てたmaterialのcolorが反映されない */
	background-color: rgb(48, 48, 48);
`
