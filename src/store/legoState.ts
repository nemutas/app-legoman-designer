import { proxy } from 'valtio';

type MaterialProxyType = {
	current: string
	data: {
		[matName: string]: {
			color: string
			roughness: number
			metalness: number
		}
	}
}

export const materialState = proxy<MaterialProxyType>({
	current: '',
	data: {
		head: {
			color: '#cb9607',
			roughness: 0.3,
			metalness: 0
		},
		body: {
			color: '#cb0606',
			roughness: 0.3,
			metalness: 0
		},
		arm: {
			color: '#cb0606',
			roughness: 0.3,
			metalness: 0
		},
		hand: {
			color: '#cb9607',
			roughness: 0.3,
			metalness: 0
		},
		foot: {
			color: '#0c12cc',
			roughness: 0.3,
			metalness: 0
		}
	}
})
