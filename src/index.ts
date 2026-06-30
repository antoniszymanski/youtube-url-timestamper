window.navigation.addEventListener("navigate", ev => {
	const url = new URL(ev.destination.url)
	if (url.protocol !== "https" || url.host !== "youtube.com" || url.pathname !== "/watch") {
		clearInterval(intervalId)
		return
	}
	intervalId = setInterval(update, 30000) // 30s
})

let intervalId: number | undefined

function update() {
	const player = document.querySelector("video")
	if (!player) {
		return
	}
	if (Number.isFinite(player.duration) && player.duration <= 600 /* 10 min */) {
		return
	}
	if (
		player.currentTime < 120 || // 2 min
		(Number.isFinite(player.duration) && player.duration - player.currentTime <= 120) // 2 min
	) {
		return
	}
	const formattedTime = formatTime(player.currentTime)
	const url = new URL(window.location.href)
	if (url.searchParams.get("t") !== formattedTime) {
		url.searchParams.set("t", formattedTime)
		window.history.replaceState(null, "", url)
	}
}

function formatTime(time: number) {
	const hours = Math.trunc(time / 3600)
	const minutes = Math.trunc(time / 60) % 60
	const seconds = Math.trunc(time % 60)
	return (hours > 0 ? `${hours}h` : "") + (minutes > 0 ? `${minutes}m` : "") + (seconds > 0 ? `${seconds}s` : "")
}
