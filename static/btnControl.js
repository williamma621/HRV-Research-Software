btnSearch.onclick = async () => {
    btnSearch.disabled = true;
    btnSearch.innerText = "Scanning...";
    incrementProgressBar(3, document.getElementById("search-progress"))

    const response = await fetch("/api/devices");
    const devices = await response.json();
    
    fillOptions(deviceSelect, devices)
    btnSearch.innerText = "Search Again";
    appState.isSearched = true;
    updateUI()
};

btnDisconnect.onclick = async () => {
    btnDisconnect.disabled = true;
    btnDisconnect.innerText = "Disconnecting...";
    const response = await fetch(`/api/disconnect`, { method: 'POST' });
    if (response.ok) { 
        btnDisconnect.innerText = "Disconnected";
        btnConnect.innerText = "Connect"
        appState.isConnected = false;
    }
    updateUI();

}
btnConnect.onclick = async () => {
    const address = deviceSelect.value;
    btnConnect.disabled = true;
    btnConnect.innerText = "Connecting...";

    const response = await fetch(`/api/connect/${address}`, { method: 'POST' });
    if (response.ok) { 
        btnConnect.innerText = "Connected";
        btnDisconnect.innerText = "Disconnect"
        appState.isConnected = true; }
    else { alert("Failed to connect: " + await response.text()); }
    updateUI()
}


btnStart.onclick = async () => {
    const response = await fetch("/api/record/start", { method: 'POST' });
    if (response.ok) {appState.isRecording = true;}
    updateUI();
    updateGraph();
}


btnPauseResume.onclick = async () => {
    const response = await fetch("/api/record/pause-resume", { method: 'POST' });
    const result = await response.json()
    if (result.status == "paused"){ appState.isPaused = true;}
    if (result.status == "resumed"){ appState.isPaused = false;}
    btnPauseResume.innerText = appState.isPaused ? 'Resume' : 'Pause';
    updateUI();
    updateGraph();
}


btnEnd.onclick = async () => {
    const response = await fetch("/api/record/end", { method: 'POST' });
    if (response.ok){ appState.isRecording = false; appState.isPaused = false; }
    updateUI();
    updateGraph();
}


btnExport.onclick = () => {export_csv(rr_record);}