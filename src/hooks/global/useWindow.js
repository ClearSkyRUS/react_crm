import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"

const windowState = {
	isMobile: false,
	isStick: false,
	isSidebarVisible: false,
	swipeState: {
		startPos: { x: -1, y: -1 },
		currentPos: { x: -1, y: -1 }
	}
}

const useWindow = () => {
	const history = useHistory();
	const [isMobile, setIsMobile] = useState(windowState.isMobile)
	const [isStick, setIsStick] = useState(windowState.isStick)
	const [isSidebarVisible, setIsSidebarVisible] = useState(windowState.isSidebarVisible)
	const [swipeState, setSwipeState] = useState(windowState.swipeState)

	useEffect(() => {
		const resized = () => setIsMobile(window.innerWidth < 600)
		window.addEventListener('resize', resized)
		resized()
		return () => window.removeEventListener('resize', resized)
	}, [])

	useEffect(() => {
		setIsSidebarVisible(false)
	}, [history.location])

	const onSwipeMove = (position) => {
		let newSwipeState = {
			currentPos: position,
			startPos: (swipeState.startPos.x === -1 && swipeState.startPos.y === -1) ? position : swipeState.startPos
		}
		setSwipeState(newSwipeState)
	}

	const onSwipeEnd = () => {
		if (swipeState.currentPos.y - swipeState.startPos.y < 40 &&
			swipeState.startPos.y - swipeState.currentPos.y < 40) {
			if (!isSidebarVisible && swipeState.currentPos.x - swipeState.startPos.x > 50)
				setIsSidebarVisible(true)
			else if (isSidebarVisible && swipeState.startPos.x - swipeState.currentPos.x > 50)
				setIsSidebarVisible(false)
		}

		setSwipeState(windowState.swipeState)
	}

	return { isMobile, isStick, isSidebarVisible, setIsStick, setIsSidebarVisible, onSwipeMove, onSwipeEnd }
}

export default useWindow