import React, { Suspense, VFC } from 'react';
import { useSnapshot } from 'valtio';
import { Environment, OrbitControls } from '@react-three/drei';
import { envState } from './controller/EnvironmentSelector';
import { LegoModel } from './LegoModel';

export const Lego: VFC = () => {
	const snap = useSnapshot(envState)

	return (
		<>
			{/* カメラ */}
			<OrbitControls enablePan={false} />

			{/* オブジェクト */}
			<Suspense fallback={null}>
				<LegoModel />
				<Environment preset={snap.preset} background={true} />
			</Suspense>
		</>
	)
}
