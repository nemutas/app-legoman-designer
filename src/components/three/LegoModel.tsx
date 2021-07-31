/*
gltfjsx: https://github.com/pmndrs/gltfjsx
code example: https://github.com/drcmda/floating-shoe
*/

import React, { memo, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { useSnapshot } from 'valtio';
import { useGLTF, useTexture } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { materialState } from '../../store/legoState';

type GLTFResult = GLTF & {
	nodes: {
		Head: THREE.Mesh
		Body: THREE.Mesh
		Waist: THREE.Mesh
		Crotch: THREE.Mesh
		Leg: THREE.Mesh
		Arm: THREE.Mesh
		Wrist: THREE.Mesh
		Hand: THREE.Mesh
	}
	materials: {
		head: THREE.MeshStandardMaterial
		body: THREE.MeshStandardMaterial
		foot: THREE.MeshStandardMaterial
		arm: THREE.MeshStandardMaterial
		wrist: THREE.MeshStandardMaterial
	}
}

const modelPath = './assets/LegoModel.glb'
useGLTF.preload(modelPath)

export const LegoModel: React.FC = memo((props: JSX.IntrinsicElements['group']) => {
	const group = useRef<THREE.Group>()
	const snap = useSnapshot(materialState)
	const [hovered, setHovered] = useState<string>('')

	// model load
	const { nodes } = useGLTF(modelPath) as GLTFResult
	const faceTexture = useTexture('./assets/face.png')
	faceTexture.flipY = false
	// ※ canvasの背景色を指定しないと、textrueを割り当てたmaterialのcolorが反映されない

	// material create
	const createMaterial = (
		matData: { color: string; roughness: number; metalness: number },
		texture?: THREE.Texture
	) => {
		return new THREE.MeshStandardMaterial({
			color: matData.color,
			roughness: matData.roughness,
			metalness: matData.metalness,
			map: texture ?? null
		})
	}

	// event
	const onPointerDowntHandler = (e: ThreeEvent<PointerEvent>) => {
		e.stopPropagation()
		materialState.current = e.object.name
	}

	const onPointerMissedHandler = () => {
		materialState.current = ''
	}

	const onPointerOverHandler = (e: ThreeEvent<PointerEvent>) => {
		e.stopPropagation()
		setHovered(e.object.name)
	}

	const onPointerOutHandler = (e: ThreeEvent<PointerEvent>) => {
		e.intersections.length === 0 && setHovered('')
	}

	// cursor
	useEffect(() => {
		if (hovered) {
			const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.data[hovered].color}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
			document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`
		} else {
			document.body.style.cursor = 'auto'
		}
	}, [hovered, snap.data])

	return (
		<group
			ref={group}
			{...props}
			dispose={null}
			position={[0, -2, 0]}
			rotation={[0, Math.PI / 2, 0]}
			onPointerDown={onPointerDowntHandler}
			onPointerMissed={onPointerMissedHandler}
			onPointerOver={onPointerOverHandler}
			onPointerOut={onPointerOutHandler}>
			<mesh
				name="head"
				castShadow
				receiveShadow
				geometry={nodes.Head.geometry}
				material={createMaterial(snap.data['head'], faceTexture)}
				position={[0, 3.23, 0]}
				scale={[0.46, 0.4, 0.46]}
			/>
			<mesh
				name="body"
				castShadow
				receiveShadow
				geometry={nodes.Body.geometry}
				material={createMaterial(snap.data['body'])}
				position={[0, 2.11, 0]}
				scale={[0.36, 0.63, 0.71]}
			/>
			<mesh
				name="foot"
				castShadow
				receiveShadow
				geometry={nodes.Waist.geometry}
				material={createMaterial(snap.data['foot'])}
				position={[0, 1.36, 0]}
				scale={[0.36, 0.16, 0.66]}
			/>
			<mesh
				name="foot"
				castShadow
				receiveShadow
				geometry={nodes.Crotch.geometry}
				material={createMaterial(snap.data['foot'])}
				position={[0, 1.07, 0]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={[0.33, 0.07, 0.33]}
			/>
			<mesh
				name="foot"
				castShadow
				receiveShadow
				geometry={nodes.Leg.geometry}
				material={createMaterial(snap.data['foot'])}
				position={[0, 1.07, 0.12]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={[0.33, 0.07, 0.33]}
			/>
			<mesh
				name="arm"
				castShadow
				receiveShadow
				geometry={nodes.Arm.geometry}
				material={createMaterial(snap.data['arm'])}
				position={[0, 2.38, 0.57]}
				rotation={[1.39, 0, 0]}
				scale={[0.25, 0.25, 0.25]}
			/>
			<mesh
				name="hand"
				castShadow
				receiveShadow
				geometry={nodes.Wrist.geometry}
				material={createMaterial(snap.data['hand'])}
				position={[0.1, 1.59, 0.89]}
				rotation={[-0.15, 0.05, -0.31]}
				scale={[0.13, 0.1, 0.14]}
			/>
			<mesh
				name="hand"
				castShadow
				receiveShadow
				geometry={nodes.Hand.geometry}
				material={createMaterial(snap.data['hand'])}
				position={[0.02, 1.28, 0.94]}
				rotation={[0, 0, -Math.PI / 2]}
				scale={[0.24, 0.21, 0.24]}
			/>
		</group>
	)
})
