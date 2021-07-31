import { VFC } from 'react';
import { colors, createTheme, ThemeProvider } from '@material-ui/core';
import { TCanvas } from './three/TCanvas';

export const App: VFC = () => {
	const theme = createTheme({
		palette: {
			type: 'dark',
			text: {
				primary: colors.grey[300]
			},
			primary: {
				main: colors.orange[500]
			}
		}
	})

	return (
		<ThemeProvider theme={theme}>
			<TCanvas />
		</ThemeProvider>
	)
}
